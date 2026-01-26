package com.halaltsx.controller;

import com.halaltsx.dto.StockDto;
import com.halaltsx.dto.StockListResponse;
import com.halaltsx.service.StockService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/stocks")
@RequiredArgsConstructor
@Tag(name = "Stocks", description = "Stock listing and search operations")
public class StockController {

    private final StockService stockService;

    @GetMapping
    @Operation(summary = "List all stocks", description = "Returns a paginated list of TSX stocks with basic information and compliance status")
    public ResponseEntity<StockListResponse> getStocks(
            @Parameter(description = "Search by stock name or ticker symbol")
            @RequestParam(required = false) String search,

            @Parameter(description = "Filter by compliance status")
            @RequestParam(required = false, defaultValue = "ALL") String compliance,

            @Parameter(description = "Filter by market sector")
            @RequestParam(required = false) String sector,

            @Parameter(description = "Sort field")
            @RequestParam(required = false, defaultValue = "name") String sort,

            @Parameter(description = "Sort direction")
            @RequestParam(required = false, defaultValue = "asc") String direction,

            @Parameter(description = "Page number (0-indexed)")
            @RequestParam(required = false, defaultValue = "0") int page,

            @Parameter(description = "Page size")
            @RequestParam(required = false, defaultValue = "20") int size) {

        Sort.Direction sortDirection = "desc".equalsIgnoreCase(direction) ?
                Sort.Direction.DESC : Sort.Direction.ASC;

        String sortField = mapSortField(sort);
        Pageable pageable = PageRequest.of(page, Math.min(size, 100), Sort.by(sortDirection, sortField));

        StockListResponse response = stockService.getStocks(search, compliance, sector, pageable);

        return ResponseEntity.ok(response);
    }

    @GetMapping("/{symbol}")
    @Operation(summary = "Get stock details", description = "Returns detailed information about a specific stock")
    public ResponseEntity<StockDto> getStockBySymbol(
            @Parameter(description = "Stock ticker symbol (e.g., 'RY.TO')")
            @PathVariable String symbol) {

        StockDto stock = stockService.getStockBySymbol(symbol.toUpperCase());
        return ResponseEntity.ok(stock);
    }

    private String mapSortField(String sort) {
        return switch (sort.toLowerCase()) {
            case "symbol" -> "symbol";
            case "price", "currentprice" -> "currentPrice";
            case "marketcap" -> "marketCap";
            case "sector" -> "sector";
            default -> "name";
        };
    }
}

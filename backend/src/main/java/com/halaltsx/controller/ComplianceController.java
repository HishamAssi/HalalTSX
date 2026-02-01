package com.halaltsx.controller;

import com.halaltsx.dto.ComplianceDto;
import com.halaltsx.model.ComplianceResult;
import com.halaltsx.model.Stock;
import com.halaltsx.repository.ComplianceRepository;
import com.halaltsx.repository.StockRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/stocks")
@RequiredArgsConstructor
@Tag(name = "Compliance", description = "Stock compliance information")
public class ComplianceController {

    private final StockRepository stockRepository;
    private final ComplianceRepository complianceRepository;

    @GetMapping("/{symbol}/compliance")
    @Operation(summary = "Get compliance details", description = "Returns detailed Halal compliance breakdown for a stock")
    public ResponseEntity<ComplianceDto> getStockCompliance(
            @Parameter(description = "Stock ticker symbol (e.g., 'RY.TO')")
            @PathVariable String symbol) {

        Stock stock = stockRepository.findBySymbol(symbol.toUpperCase())
                .orElseThrow(() -> new EntityNotFoundException("Stock not found: " + symbol));

        ComplianceResult complianceResult = complianceRepository.findByStockId(stock.getId())
                .orElseThrow(() -> new EntityNotFoundException("Compliance data not found for: " + symbol));

        ComplianceDto compliance = ComplianceDto.fromEntity(complianceResult);
        return ResponseEntity.ok(compliance);
    }
}

package com.halaltsx.service;

import com.halaltsx.dto.DataFreshness;
import com.halaltsx.dto.StockDto;
import com.halaltsx.dto.StockListResponse;
import com.halaltsx.dto.StockSummaryDto;
import com.halaltsx.model.ComplianceResult;
import com.halaltsx.model.Stock;
import com.halaltsx.repository.ComplianceRepository;
import com.halaltsx.repository.StockRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class StockService {

    private final StockRepository stockRepository;
    private final ComplianceRepository complianceRepository;

    @Transactional(readOnly = true)
    public StockListResponse getStocks(
            String search,
            String complianceFilter,
            String sector,
            Pageable pageable) {

        Page<Stock> stockPage;

        if (search != null && !search.trim().isEmpty()) {
            stockPage = stockRepository.searchBySymbolOrName(search.trim(), pageable);
        } else if (sector != null && !sector.trim().isEmpty()) {
            stockPage = stockRepository.findBySector(sector.trim(), pageable);
        } else {
            stockPage = stockRepository.findAllActive(pageable);
        }

        List<StockSummaryDto> stockDtos = stockPage.getContent().stream()
                .map(stock -> {
                    Optional<ComplianceResult> compliance = complianceRepository.findByStockId(stock.getId());
                    stock.setComplianceResult(compliance.orElse(null));
                    return StockSummaryDto.fromEntity(stock);
                })
                .collect(Collectors.toList());

        if (complianceFilter != null && !complianceFilter.equals("ALL")) {
            stockDtos = stockDtos.stream()
                    .filter(dto -> dto.getComplianceStatus().equals(complianceFilter))
                    .collect(Collectors.toList());
        }

        Page<StockSummaryDto> resultPage = new PageImpl<>(
                stockDtos,
                pageable,
                stockPage.getTotalElements());

        LocalDateTime latestUpdate = stockPage.getContent().stream()
                .map(Stock::getPriceUpdatedAt)
                .filter(java.util.Objects::nonNull)
                .max(LocalDateTime::compareTo)
                .orElse(null);

        DataFreshness freshness = DataFreshness.of(latestUpdate, null);

        return StockListResponse.fromPage(resultPage, freshness);
    }

    @Transactional(readOnly = true)
    public StockDto getStockBySymbol(String symbol) {
        Stock stock = stockRepository.findBySymbolWithCompliance(symbol)
                .orElseThrow(() -> new EntityNotFoundException("Stock not found: " + symbol));

        return StockDto.fromEntity(stock);
    }

    @Transactional(readOnly = true)
    public List<String> getAllSectors() {
        return stockRepository.findAllSectors();
    }

    @Transactional
    public Stock saveStock(Stock stock) {
        return stockRepository.save(stock);
    }

    @Transactional(readOnly = true)
    public Optional<Stock> findBySymbol(String symbol) {
        return stockRepository.findBySymbol(symbol);
    }

    @Transactional(readOnly = true)
    public long getStockCount() {
        return stockRepository.count();
    }

    @Transactional(readOnly = true)
    public long getStockCountBySector(String sector) {
        return stockRepository.countBySector(sector);
    }

    @Transactional(readOnly = true)
    public long getCompliantStockCountBySector(String sector) {
        return complianceRepository.countCompliantBySector(sector);
    }
}

package com.halaltsx.service;

import com.halaltsx.model.Stock;
import com.halaltsx.repository.StockRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class PriceUpdateService {

    private final StockRepository stockRepository;
    private final AlphaVantageService alphaVantageService;
    private final ComplianceService complianceService;

    private static final LocalTime MARKET_OPEN = LocalTime.of(9, 30);
    private static final LocalTime MARKET_CLOSE = LocalTime.of(16, 0);

    @Scheduled(fixedRateString = "${price.update.interval:300000}")
    @Transactional
    public void updatePrices() {
        if (!isMarketHours()) {
            log.debug("Outside market hours, skipping price update");
            return;
        }

        log.info("Starting scheduled price update");

        List<Stock> stocks = stockRepository.findAll();
        int updated = 0;
        int failed = 0;

        for (Stock stock : stocks) {
            if (!stock.getIsActive()) continue;

            try {
                alphaVantageService.fetchStockQuote(stock.getSymbol())
                        .ifPresent(quote -> {
                            stock.setCurrentPrice(quote.getCurrentPrice());
                            stock.setPriceUpdatedAt(LocalDateTime.now());
                            stockRepository.save(stock);
                        });
                updated++;

                Thread.sleep(12000);

            } catch (Exception e) {
                log.error("Failed to update price for {}: {}", stock.getSymbol(), e.getMessage());
                failed++;
            }
        }

        log.info("Price update completed. Updated: {}, Failed: {}", updated, failed);
    }

    @Scheduled(cron = "0 0 6 * * MON")
    @Transactional
    public void weeklyComplianceRescreen() {
        log.info("Starting weekly compliance re-screening");

        List<Stock> stocks = stockRepository.findAll();
        int screened = 0;

        for (Stock stock : stocks) {
            if (!stock.getIsActive()) continue;

            try {
                complianceService.screenStock(stock);
                screened++;
            } catch (Exception e) {
                log.error("Failed to re-screen {}: {}", stock.getSymbol(), e.getMessage());
            }
        }

        log.info("Weekly compliance re-screening completed. Screened: {}", screened);
    }

    private boolean isMarketHours() {
        LocalTime now = LocalTime.now();
        return !now.isBefore(MARKET_OPEN) && !now.isAfter(MARKET_CLOSE);
    }

    @Transactional
    public void updateSingleStock(String symbol) {
        Stock stock = stockRepository.findBySymbol(symbol)
                .orElseThrow(() -> new IllegalArgumentException("Stock not found: " + symbol));

        alphaVantageService.fetchStockQuote(symbol)
                .ifPresent(quote -> {
                    stock.setCurrentPrice(quote.getCurrentPrice());
                    stock.setPriceUpdatedAt(LocalDateTime.now());
                    stockRepository.save(stock);
                    log.info("Updated price for {}: {}", symbol, quote.getCurrentPrice());
                });
    }
}

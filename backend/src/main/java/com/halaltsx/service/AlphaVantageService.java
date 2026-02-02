package com.halaltsx.service;

import com.halaltsx.config.AlphaVantageConfig;
import com.halaltsx.model.PriceHistory;
import com.halaltsx.model.Stock;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class AlphaVantageService {

    private final WebClient alphaVantageWebClient;
    private final AlphaVantageConfig config;

    public Optional<Stock> fetchStockQuote(String symbol) {
        try {
            log.info("Fetching quote for symbol: {}", symbol);

            @SuppressWarnings("unchecked")
            Map<String, Object> response = alphaVantageWebClient.get()
                    .uri(uriBuilder -> uriBuilder
                            .queryParam("function", "GLOBAL_QUOTE")
                            .queryParam("symbol", symbol)
                            .queryParam("apikey", config.getApiKey())
                            .build())
                    .retrieve()
                    .bodyToMono(Map.class)
                    .block();

            if (response == null || !response.containsKey("Global Quote")) {
                log.warn("No quote data returned for symbol: {}", symbol);
                return Optional.empty();
            }

            @SuppressWarnings("unchecked")
            Map<String, String> quote = (Map<String, String>) response.get("Global Quote");

            if (quote == null || quote.isEmpty()) {
                return Optional.empty();
            }

            Stock stock = Stock.builder()
                    .symbol(symbol)
                    .currentPrice(new BigDecimal(quote.getOrDefault("05. price", "0")))
                    .priceUpdatedAt(LocalDateTime.now())
                    .build();

            return Optional.of(stock);
        } catch (Exception e) {
            log.error("Error fetching quote for symbol {}: {}", symbol, e.getMessage());
            return Optional.empty();
        }
    }

    public Optional<Map<String, Object>> fetchCompanyOverview(String symbol) {
        try {
            log.info("Fetching company overview for symbol: {}", symbol);

            @SuppressWarnings("unchecked")
            Map<String, Object> response = alphaVantageWebClient.get()
                    .uri(uriBuilder -> uriBuilder
                            .queryParam("function", "OVERVIEW")
                            .queryParam("symbol", symbol)
                            .queryParam("apikey", config.getApiKey())
                            .build())
                    .retrieve()
                    .bodyToMono(Map.class)
                    .block();

            if (response == null || response.isEmpty() || response.containsKey("Note")) {
                log.warn("No overview data returned for symbol: {}", symbol);
                return Optional.empty();
            }

            return Optional.of(response);
        } catch (Exception e) {
            log.error("Error fetching company overview for symbol {}: {}", symbol, e.getMessage());
            return Optional.empty();
        }
    }

    public List<PriceHistory> fetchDailyPriceHistory(Stock stock, int days) {
        List<PriceHistory> priceHistories = new ArrayList<>();

        try {
            log.info("Fetching daily price history for symbol: {}", stock.getSymbol());

            @SuppressWarnings("unchecked")
            Map<String, Object> response = alphaVantageWebClient.get()
                    .uri(uriBuilder -> uriBuilder
                            .queryParam("function", "TIME_SERIES_DAILY")
                            .queryParam("symbol", stock.getSymbol())
                            .queryParam("outputsize", days > 100 ? "full" : "compact")
                            .queryParam("apikey", config.getApiKey())
                            .build())
                    .retrieve()
                    .bodyToMono(Map.class)
                    .block();

            if (response == null || !response.containsKey("Time Series (Daily)")) {
                log.warn("No price history returned for symbol: {}", stock.getSymbol());
                return priceHistories;
            }

            @SuppressWarnings("unchecked")
            Map<String, Map<String, String>> timeSeries =
                    (Map<String, Map<String, String>>) response.get("Time Series (Daily)");

            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
            LocalDate cutoffDate = LocalDate.now().minusDays(days);

            for (Map.Entry<String, Map<String, String>> entry : timeSeries.entrySet()) {
                LocalDate date = LocalDate.parse(entry.getKey(), formatter);

                if (date.isBefore(cutoffDate)) {
                    continue;
                }

                Map<String, String> dayData = entry.getValue();

                PriceHistory priceHistory = PriceHistory.builder()
                        .stock(stock)
                        .date(date)
                        .openPrice(new BigDecimal(dayData.get("1. open")))
                        .highPrice(new BigDecimal(dayData.get("2. high")))
                        .lowPrice(new BigDecimal(dayData.get("3. low")))
                        .closePrice(new BigDecimal(dayData.get("4. close")))
                        .volume(Long.parseLong(dayData.get("5. volume")))
                        .build();

                priceHistories.add(priceHistory);
            }

            log.info("Fetched {} price history records for symbol: {}", priceHistories.size(), stock.getSymbol());
        } catch (Exception e) {
            log.error("Error fetching price history for symbol {}: {}", stock.getSymbol(), e.getMessage());
        }

        return priceHistories;
    }

    public Optional<Map<String, Object>> fetchIncomeStatement(String symbol) {
        try {
            log.info("Fetching income statement for symbol: {}", symbol);

            @SuppressWarnings("unchecked")
            Map<String, Object> response = alphaVantageWebClient.get()
                    .uri(uriBuilder -> uriBuilder
                            .queryParam("function", "INCOME_STATEMENT")
                            .queryParam("symbol", symbol)
                            .queryParam("apikey", config.getApiKey())
                            .build())
                    .retrieve()
                    .bodyToMono(Map.class)
                    .block();

            if (response == null || response.isEmpty() || response.containsKey("Note")) {
                return Optional.empty();
            }

            return Optional.of(response);
        } catch (Exception e) {
            log.error("Error fetching income statement for symbol {}: {}", symbol, e.getMessage());
            return Optional.empty();
        }
    }

    public Optional<Map<String, Object>> fetchBalanceSheet(String symbol) {
        try {
            log.info("Fetching balance sheet for symbol: {}", symbol);

            @SuppressWarnings("unchecked")
            Map<String, Object> response = alphaVantageWebClient.get()
                    .uri(uriBuilder -> uriBuilder
                            .queryParam("function", "BALANCE_SHEET")
                            .queryParam("symbol", symbol)
                            .queryParam("apikey", config.getApiKey())
                            .build())
                    .retrieve()
                    .bodyToMono(Map.class)
                    .block();

            if (response == null || response.isEmpty() || response.containsKey("Note")) {
                return Optional.empty();
            }

            return Optional.of(response);
        } catch (Exception e) {
            log.error("Error fetching balance sheet for symbol {}: {}", symbol, e.getMessage());
            return Optional.empty();
        }
    }
}

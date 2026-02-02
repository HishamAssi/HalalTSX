package com.halaltsx.service;

import com.halaltsx.dto.PriceHistoryResponse;
import com.halaltsx.dto.PricePointDto;
import com.halaltsx.model.PriceHistory;
import com.halaltsx.model.Stock;
import com.halaltsx.repository.PriceHistoryRepository;
import com.halaltsx.repository.StockRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class PriceHistoryService {

    private final PriceHistoryRepository priceHistoryRepository;
    private final StockRepository stockRepository;

    @Transactional(readOnly = true)
    public PriceHistoryResponse getPriceHistory(String symbol, String period) {
        Stock stock = stockRepository.findBySymbol(symbol)
                .orElseThrow(() -> new EntityNotFoundException("Stock not found: " + symbol));

        LocalDate endDate = LocalDate.now();
        LocalDate startDate = calculateStartDate(endDate, period);

        List<PriceHistory> priceHistories = priceHistoryRepository
                .findByStockIdAndDateBetween(stock.getId(), startDate, endDate);

        List<PricePointDto> pricePoints = priceHistories.stream()
                .map(PricePointDto::fromEntity)
                .collect(Collectors.toList());

        // If no historical data, generate sample data for demo purposes
        if (pricePoints.isEmpty()) {
            pricePoints = generateSamplePriceHistory(stock, startDate, endDate);
        }

        return PriceHistoryResponse.of(symbol, period, pricePoints);
    }

    private LocalDate calculateStartDate(LocalDate endDate, String period) {
        return switch (period.toUpperCase()) {
            case "1W" -> endDate.minusWeeks(1);
            case "1M" -> endDate.minusMonths(1);
            case "3M" -> endDate.minusMonths(3);
            case "6M" -> endDate.minusMonths(6);
            case "1Y" -> endDate.minusYears(1);
            case "5Y" -> endDate.minusYears(5);
            case "MAX" -> endDate.minusYears(10);
            default -> endDate.minusYears(1); // Default to 1 year
        };
    }

    /**
     * Generate sample price history for demonstration when real data is unavailable.
     * In production, this would be replaced with actual Alpha Vantage data.
     */
    private List<PricePointDto> generateSamplePriceHistory(Stock stock, LocalDate startDate, LocalDate endDate) {
        java.util.List<PricePointDto> points = new java.util.ArrayList<>();

        if (stock.getCurrentPrice() == null) {
            return points;
        }

        java.math.BigDecimal basePrice = stock.getCurrentPrice();
        java.util.Random random = new java.util.Random(stock.getSymbol().hashCode());

        LocalDate currentDate = endDate;
        java.math.BigDecimal currentPrice = basePrice;

        while (!currentDate.isBefore(startDate)) {
            // Skip weekends
            if (currentDate.getDayOfWeek().getValue() <= 5) {
                // Generate daily price variation (±2%)
                double change = (random.nextDouble() - 0.5) * 0.04;
                currentPrice = currentPrice.multiply(java.math.BigDecimal.valueOf(1 + change))
                        .setScale(4, java.math.RoundingMode.HALF_UP);

                java.math.BigDecimal dayVariation = currentPrice.multiply(java.math.BigDecimal.valueOf(random.nextDouble() * 0.02));
                java.math.BigDecimal high = currentPrice.add(dayVariation);
                java.math.BigDecimal low = currentPrice.subtract(dayVariation);
                java.math.BigDecimal open = currentPrice.add(dayVariation.multiply(java.math.BigDecimal.valueOf(random.nextDouble() - 0.5)));

                points.add(PricePointDto.builder()
                        .date(currentDate)
                        .open(open)
                        .high(high)
                        .low(low)
                        .close(currentPrice)
                        .volume((long) (random.nextDouble() * 1000000 + 100000))
                        .build());
            }
            currentDate = currentDate.minusDays(1);
        }

        return points;
    }

    @Transactional
    public void savePriceHistory(PriceHistory priceHistory) {
        priceHistoryRepository.save(priceHistory);
    }
}

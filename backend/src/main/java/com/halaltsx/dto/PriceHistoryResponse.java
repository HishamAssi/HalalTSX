package com.halaltsx.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PriceHistoryResponse {

    private String symbol;
    private String period;
    private LocalDate startDate;
    private LocalDate endDate;
    private Integer dataPoints;
    private List<PricePointDto> prices;
    private DataFreshness dataFreshness;

    public static PriceHistoryResponse of(String symbol, String period, List<PricePointDto> prices) {
        LocalDate startDate = prices.isEmpty() ? null : prices.get(prices.size() - 1).getDate();
        LocalDate endDate = prices.isEmpty() ? null : prices.get(0).getDate();

        return PriceHistoryResponse.builder()
                .symbol(symbol)
                .period(period)
                .startDate(startDate)
                .endDate(endDate)
                .dataPoints(prices.size())
                .prices(prices)
                .dataFreshness(DataFreshness.of(
                        endDate != null ? endDate.atStartOfDay() : null,
                        null))
                .build();
    }
}

package com.halaltsx.dto;

import com.halaltsx.model.ComplianceResult;
import com.halaltsx.model.Stock;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StockDetailDto {

    private Long id;
    private String symbol;
    private String name;
    private String sector;
    private String exchange;
    private String description;

    // Price information
    private BigDecimal currentPrice;
    private BigDecimal priceChange;
    private BigDecimal priceChangePercent;
    private BigDecimal marketCap;

    // Compliance information
    private String complianceStatus;
    private Boolean requiresPurification;
    private BigDecimal purificationPercentage;
    private ComplianceDto compliance;

    // Timestamps
    private LocalDateTime priceUpdatedAt;
    private LocalDateTime complianceScreenedAt;

    // Data freshness
    private DataFreshness dataFreshness;

    public static StockDetailDto fromEntity(Stock stock) {
        StockDetailDtoBuilder builder = StockDetailDto.builder()
                .id(stock.getId())
                .symbol(stock.getSymbol())
                .name(stock.getName())
                .sector(stock.getSector())
                .currentPrice(stock.getCurrentPrice())
                .marketCap(stock.getMarketCap())
                .priceUpdatedAt(stock.getPriceUpdatedAt());

        ComplianceResult complianceResult = stock.getComplianceResult();
        if (complianceResult != null) {
            builder.complianceStatus(complianceResult.getScreeningStatus().name())
                    .requiresPurification(complianceResult.getRequiresPurification())
                    .purificationPercentage(complianceResult.getPurificationPercentage())
                    .complianceScreenedAt(complianceResult.getScreenedAt())
                    .compliance(ComplianceDto.fromEntity(complianceResult));
        } else {
            builder.complianceStatus("UNABLE_TO_VERIFY");
        }

        builder.dataFreshness(DataFreshness.of(stock.getPriceUpdatedAt(),
                complianceResult != null ? complianceResult.getScreenedAt() : null));

        return builder.build();
    }
}

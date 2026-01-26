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
public class StockSummaryDto {

    private Long id;
    private String symbol;
    private String name;
    private String sector;
    private BigDecimal currentPrice;
    private BigDecimal priceChange;
    private BigDecimal priceChangePercent;
    private BigDecimal marketCap;
    private String complianceStatus;
    private Boolean requiresPurification;
    private LocalDateTime priceUpdatedAt;

    public static StockSummaryDto fromEntity(Stock stock) {
        StockSummaryDtoBuilder builder = StockSummaryDto.builder()
                .id(stock.getId())
                .symbol(stock.getSymbol())
                .name(stock.getName())
                .sector(stock.getSector())
                .currentPrice(stock.getCurrentPrice())
                .marketCap(stock.getMarketCap())
                .priceUpdatedAt(stock.getPriceUpdatedAt());

        if (stock.getComplianceResult() != null) {
            ComplianceResult compliance = stock.getComplianceResult();
            builder.complianceStatus(compliance.getScreeningStatus().name())
                    .requiresPurification(compliance.getRequiresPurification());
        } else {
            builder.complianceStatus(ComplianceResult.ScreeningStatus.UNABLE_TO_VERIFY.name());
        }

        return builder.build();
    }
}

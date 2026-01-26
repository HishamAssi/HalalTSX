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
public class StockDto {

    private Long id;
    private String symbol;
    private String name;
    private String sector;
    private String subIndustry;
    private BigDecimal currentPrice;
    private BigDecimal priceChange;
    private BigDecimal priceChangePercent;
    private BigDecimal marketCap;
    private String complianceStatus;
    private Boolean requiresPurification;
    private BigDecimal purificationPercentage;
    private LocalDateTime priceUpdatedAt;

    public static StockDto fromEntity(Stock stock) {
        StockDtoBuilder builder = StockDto.builder()
                .id(stock.getId())
                .symbol(stock.getSymbol())
                .name(stock.getName())
                .sector(stock.getSector())
                .subIndustry(stock.getSubIndustry())
                .currentPrice(stock.getCurrentPrice())
                .marketCap(stock.getMarketCap())
                .priceUpdatedAt(stock.getPriceUpdatedAt());

        if (stock.getComplianceResult() != null) {
            ComplianceResult compliance = stock.getComplianceResult();
            builder.complianceStatus(compliance.getScreeningStatus().name())
                    .requiresPurification(compliance.getRequiresPurification())
                    .purificationPercentage(compliance.getPurificationPercentage());
        } else {
            builder.complianceStatus(ComplianceResult.ScreeningStatus.UNABLE_TO_VERIFY.name());
        }

        return builder.build();
    }
}

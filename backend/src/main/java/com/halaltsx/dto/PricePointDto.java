package com.halaltsx.dto;

import com.halaltsx.model.PriceHistory;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PricePointDto {

    private LocalDate date;
    private BigDecimal open;
    private BigDecimal high;
    private BigDecimal low;
    private BigDecimal close;
    private Long volume;

    public static PricePointDto fromEntity(PriceHistory priceHistory) {
        return PricePointDto.builder()
                .date(priceHistory.getDate())
                .open(priceHistory.getOpenPrice())
                .high(priceHistory.getHighPrice())
                .low(priceHistory.getLowPrice())
                .close(priceHistory.getClosePrice())
                .volume(priceHistory.getVolume())
                .build();
    }
}

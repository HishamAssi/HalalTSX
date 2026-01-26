package com.halaltsx.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.domain.Page;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StockListResponse {

    private List<StockSummaryDto> content;
    private int page;
    private int size;
    private long totalElements;
    private int totalPages;
    private DataFreshness dataFreshness;

    public static StockListResponse fromPage(Page<StockSummaryDto> page, DataFreshness dataFreshness) {
        return StockListResponse.builder()
                .content(page.getContent())
                .page(page.getNumber())
                .size(page.getSize())
                .totalElements(page.getTotalElements())
                .totalPages(page.getTotalPages())
                .dataFreshness(dataFreshness)
                .build();
    }
}

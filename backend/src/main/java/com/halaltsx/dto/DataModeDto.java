package com.halaltsx.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DataModeDto {

    private String mode;
    private String displayName;
    private long stockCount;
    private long compliantCount;
    private boolean allowRuntimeSwitch;
    private String description;

    public static DataModeDto testMode(long stockCount, long compliantCount, boolean allowSwitch) {
        return DataModeDto.builder()
                .mode("test")
                .displayName("Test Mode")
                .stockCount(stockCount)
                .compliantCount(compliantCount)
                .allowRuntimeSwitch(allowSwitch)
                .description("Sample dataset with ~39 curated TSX stocks for development and demos")
                .build();
    }

    public static DataModeDto fullMode(long stockCount, long compliantCount, boolean allowSwitch) {
        return DataModeDto.builder()
                .mode("full")
                .displayName("Full Scale Mode")
                .stockCount(stockCount)
                .compliantCount(compliantCount)
                .allowRuntimeSwitch(allowSwitch)
                .description("Complete TSX dataset with ~500+ stocks for production-like testing")
                .build();
    }
}

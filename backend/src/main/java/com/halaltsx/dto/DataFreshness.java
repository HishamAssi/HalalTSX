package com.halaltsx.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DataFreshness {

    private LocalDateTime pricesUpdatedAt;
    private LocalDateTime financialsUpdatedAt;

    @JsonProperty("isStale")
    private boolean stale;
    private String message;

    private static final long STALE_THRESHOLD_HOURS = 24;

    public static DataFreshness of(LocalDateTime pricesUpdatedAt, LocalDateTime financialsUpdatedAt) {
        LocalDateTime now = LocalDateTime.now();
        boolean isStale = false;
        String message = "Data is up to date";

        if (pricesUpdatedAt != null) {
            long hoursSinceUpdate = ChronoUnit.HOURS.between(pricesUpdatedAt, now);
            if (hoursSinceUpdate > STALE_THRESHOLD_HOURS) {
                isStale = true;
                message = "Price data may be outdated (last updated " + hoursSinceUpdate + " hours ago)";
            }
        } else {
            isStale = true;
            message = "Price data unavailable";
        }

        return DataFreshness.builder()
                .pricesUpdatedAt(pricesUpdatedAt)
                .financialsUpdatedAt(financialsUpdatedAt)
                .stale(isStale)
                .message(message)
                .build();
    }
}

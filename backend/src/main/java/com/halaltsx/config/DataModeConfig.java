package com.halaltsx.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(prefix = "app.data-mode")
@Data
public class DataModeConfig {

    /**
     * Data mode: "test" for ~39 sample stocks, "full" for all TSX stocks (~500+)
     */
    private String mode = "test";

    /**
     * Whether to allow runtime mode switching via API
     */
    private boolean allowRuntimeSwitch = true;

    public boolean isTestMode() {
        return "test".equalsIgnoreCase(mode);
    }

    public boolean isFullMode() {
        return "full".equalsIgnoreCase(mode);
    }

    public void setModeIfAllowed(String newMode) {
        if (allowRuntimeSwitch) {
            this.mode = newMode;
        }
    }
}

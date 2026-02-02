package com.halaltsx.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.WebClient;

@Configuration
public class AlphaVantageConfig {

    @Value("${alphavantage.api-key}")
    private String apiKey;

    @Value("${alphavantage.base-url}")
    private String baseUrl;

    @Value("${alphavantage.rate-limit.requests-per-minute:5}")
    private int requestsPerMinute;

    @Bean
    public WebClient alphaVantageWebClient() {
        return WebClient.builder()
                .baseUrl(baseUrl)
                .build();
    }

    public String getApiKey() {
        return apiKey;
    }

    public String getBaseUrl() {
        return baseUrl;
    }

    public int getRequestsPerMinute() {
        return requestsPerMinute;
    }
}

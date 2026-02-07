package com.halaltsx.config;

import com.github.benmanes.caffeine.cache.Caffeine;
import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.cache.caffeine.CaffeineCacheManager;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.concurrent.TimeUnit;

@Configuration
@EnableCaching
public class CacheConfig {

    public static final String STOCKS_CACHE = "stocks";
    public static final String STOCK_DETAIL_CACHE = "stockDetail";
    public static final String SECTORS_CACHE = "sectors";
    public static final String COMPLIANCE_CACHE = "compliance";
    public static final String PRICE_HISTORY_CACHE = "priceHistory";

    @Bean
    public CacheManager cacheManager() {
        CaffeineCacheManager cacheManager = new CaffeineCacheManager();
        cacheManager.setCaffeine(Caffeine.newBuilder()
                .maximumSize(500)
                .expireAfterWrite(5, TimeUnit.MINUTES)
                .recordStats());
        cacheManager.setCacheNames(java.util.List.of(
                STOCKS_CACHE,
                STOCK_DETAIL_CACHE,
                SECTORS_CACHE,
                COMPLIANCE_CACHE,
                PRICE_HISTORY_CACHE
        ));
        return cacheManager;
    }
}

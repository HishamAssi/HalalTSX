package com.halaltsx.config;

import com.github.benmanes.caffeine.cache.Caffeine;
import com.github.benmanes.caffeine.cache.LoadingCache;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.atomic.AtomicInteger;

@Component
@Order(1)
public class RateLimitingFilter extends OncePerRequestFilter {

    @Value("${app.rate-limit.requests-per-minute:100}")
    private int requestsPerMinute;

    private final LoadingCache<String, AtomicInteger> requestCountsPerIp = Caffeine.newBuilder()
            .expireAfterWrite(1, TimeUnit.MINUTES)
            .build(key -> new AtomicInteger(0));

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {

        // Skip rate limiting for health checks and actuator
        String path = request.getRequestURI();
        if (path.startsWith("/actuator") || path.equals("/health")) {
            filterChain.doFilter(request, response);
            return;
        }

        String clientIp = getClientIp(request);
        AtomicInteger requestCount = requestCountsPerIp.get(clientIp);

        if (requestCount.incrementAndGet() > requestsPerMinute) {
            response.setStatus(HttpStatus.TOO_MANY_REQUESTS.value());
            response.setContentType("application/json");
            response.getWriter().write("""
                    {"error": "Rate limit exceeded", "message": "Too many requests. Please try again later."}
                    """);
            return;
        }

        // Add rate limit headers
        response.setHeader("X-RateLimit-Limit", String.valueOf(requestsPerMinute));
        response.setHeader("X-RateLimit-Remaining", String.valueOf(Math.max(0, requestsPerMinute - requestCount.get())));

        filterChain.doFilter(request, response);
    }

    private String getClientIp(HttpServletRequest request) {
        String xForwardedFor = request.getHeader("X-Forwarded-For");
        if (xForwardedFor != null && !xForwardedFor.isEmpty()) {
            return xForwardedFor.split(",")[0].trim();
        }
        return request.getRemoteAddr();
    }
}

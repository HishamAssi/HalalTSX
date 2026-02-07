package com.halaltsx.config;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.time.Duration;
import java.time.Instant;
import java.util.UUID;

@Component
@Order(Ordered.HIGHEST_PRECEDENCE)
public class RequestLoggingFilter extends OncePerRequestFilter {

    private static final Logger log = LoggerFactory.getLogger(RequestLoggingFilter.class);
    private static final String REQUEST_ID_HEADER = "X-Request-ID";

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {

        // Skip logging for actuator and swagger endpoints
        String path = request.getRequestURI();
        if (path.startsWith("/actuator") || path.startsWith("/swagger") ||
            path.startsWith("/v3/api-docs") || path.startsWith("/webjars")) {
            filterChain.doFilter(request, response);
            return;
        }

        String requestId = request.getHeader(REQUEST_ID_HEADER);
        if (requestId == null || requestId.isBlank()) {
            requestId = UUID.randomUUID().toString().substring(0, 8);
        }

        response.setHeader(REQUEST_ID_HEADER, requestId);

        Instant start = Instant.now();
        String method = request.getMethod();
        String queryString = request.getQueryString();
        String fullPath = queryString != null ? path + "?" + queryString : path;

        log.info("[{}] --> {} {}", requestId, method, fullPath);

        try {
            filterChain.doFilter(request, response);
        } finally {
            long durationMs = Duration.between(start, Instant.now()).toMillis();
            int status = response.getStatus();

            String logLevel = status >= 500 ? "ERROR" : (status >= 400 ? "WARN" : "INFO");

            if (status >= 500) {
                log.error("[{}] <-- {} {} {} ({}ms)", requestId, method, fullPath, status, durationMs);
            } else if (status >= 400) {
                log.warn("[{}] <-- {} {} {} ({}ms)", requestId, method, fullPath, status, durationMs);
            } else {
                log.info("[{}] <-- {} {} {} ({}ms)", requestId, method, fullPath, status, durationMs);
            }
        }
    }
}

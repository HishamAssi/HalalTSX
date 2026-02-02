# Research: Halal Stock Screener for TSX

**Branch**: `001-halal-stock-screener` | **Date**: 2026-01-25

## Research Tasks

### 1. Alpha Vantage API Integration for TSX Stocks

**Decision**: Use Alpha Vantage API with the following endpoints:
- `SYMBOL_SEARCH` - Find TSX stocks by keyword
- `GLOBAL_QUOTE` - Get current price and basic metrics
- `TIME_SERIES_DAILY` - Historical price data for charts
- `OVERVIEW` - Fundamental data (market cap, sector, financial ratios)
- `INCOME_STATEMENT` - Revenue breakdown for income screening
- `BALANCE_SHEET` - Debt and cash positions for ratio calculations

**Rationale**: Alpha Vantage provides comprehensive fundamental data needed for Halal compliance screening. The API covers TSX stocks (use ".TO" suffix, e.g., "RY.TO" for Royal Bank of Canada).

**Alternatives Considered**:
- Yahoo Finance: Good price data but inconsistent fundamental data API
- Financial Modeling Prep: Similar coverage but Alpha Vantage better documented
- TMX Data: Official but expensive for this use case

**Implementation Notes**:
- TSX symbols require ".TO" suffix (e.g., "TD.TO", "SHOP.TO")
- Free tier: 25 API calls/day (insufficient for production)
- Premium tier: 75 calls/minute, 500/day needed for reasonable stock coverage
- Cache aggressively - fundamental data changes quarterly, prices daily
- Implement retry logic with exponential backoff for rate limits

### 2. Halal Stock Screening Criteria (AAOIFI Standards)

**Decision**: Implement AAOIFI (Accounting and Auditing Organization for Islamic Financial Institutions) screening standards as they are widely accepted.

**Screening Criteria**:

| Criterion | Threshold | Calculation |
|-----------|-----------|-------------|
| Business Activity | Must pass | Exclude: conventional finance, alcohol, tobacco, pork, gambling, adult entertainment, weapons |
| Debt Ratio | < 33% | Interest-bearing debt / trailing 12-month avg market cap |
| Liquidity Ratio | < 33% | (Cash + interest-bearing securities) / trailing 12-month avg market cap |
| Non-Halal Income | < 5% | Non-permissible revenue / total revenue |

**Rationale**: AAOIFI standards are the most widely recognized globally. The 33% threshold is based on the hadith prohibiting excessive debt. The 5% income threshold allows for incidental non-halal income that must be purified.

**Alternatives Considered**:
- S&P Shariah Index methodology: Very similar, 33% thresholds
- DJIM (Dow Jones Islamic Market): Uses 33.33% for some ratios
- MSCI Islamic Index: Slightly different calculation methods

**Business Activity Categories (Prohibited)**:
- GICS Sector 40 (Financials) - except Islamic banks, takaful
- Consumer Staples sub-industries: Brewers, Distillers, Tobacco
- Consumer Discretionary: Casinos, Gambling
- Industrials: Aerospace & Defense (weapons manufacturing)
- Custom screening needed for: Media (adult content), Hotels (alcohol service)

### 3. Price Update Strategy

**Decision**: Implement polling-based updates with configurable intervals.

**Rationale**: Alpha Vantage doesn't support WebSocket connections. Given the 15-minute delay on free tier and rate limits, real-time updates aren't feasible. Polling every 60 seconds during market hours is sufficient.

**Implementation**:
- Backend scheduled task polls Alpha Vantage every 5 minutes for watched stocks
- Frontend polls backend every 30-60 seconds for price updates
- Display "last updated" timestamp on all price data
- Cache prices in PostgreSQL for offline resilience (FR-014)

**Alternatives Considered**:
- WebSocket from backend to frontend: Unnecessary complexity for the update frequency
- Server-Sent Events: Good alternative, but polling simpler for MVP

### 4. Data Caching Strategy

**Decision**: Multi-layer caching with PostgreSQL as persistence layer.

**Cache Tiers**:
1. **Application cache (in-memory)**: Price data, 30-second TTL
2. **Database cache**: All stock data, financial metrics
3. **Alpha Vantage responses**: Store raw responses for debugging

**Rationale**: Minimizes API calls while ensuring data availability during outages. PostgreSQL provides durability for the 24-hour offline requirement (SC-007).

**Data Refresh Schedule**:
- Stock prices: Every 5 minutes during market hours (9:30 AM - 4:00 PM ET)
- Fundamental data: Weekly (financial statements quarterly)
- Stock list (TSX symbols): Weekly

### 5. TSX Stock Universe

**Decision**: Start with TSX Composite Index components (~220 stocks), expand to full TSX (~1,500 stocks) post-MVP.

**Rationale**: The TSX Composite represents the most actively traded Canadian stocks and is manageable within Alpha Vantage rate limits. Full TSX coverage requires premium API tier.

**Data Source for Stock List**:
- Seed database with TSX Composite components
- Store: symbol, company name, sector, sub-industry
- Manual curation may be needed for accurate sector classification

### 6. Purification Calculation

**Decision**: Calculate purification as: `purification_percentage = non_halal_income / total_income * 100`

**Rationale**: If a stock has < 5% non-halal income, it's considered compliant but requires income purification. Investors donate this percentage of dividends received.

**Display**: Show purification requirement on stock detail page when non_halal_income > 0% but < 5%.

### 7. Frontend Technology Choices

**Decision**: React 18 with Vite, TypeScript, TanStack Query for data fetching.

**Rationale**:
- Vite: Fast development, modern build tooling
- TanStack Query: Handles caching, background refetching, optimistic updates
- TypeScript: Type safety for financial calculations
- Tailwind CSS: Rapid UI development

**Key Libraries**:
- `@tanstack/react-query`: Server state management
- `recharts` or `lightweight-charts`: Price charts (FR-007)
- `react-router-dom`: Navigation
- `axios`: HTTP client

### 8. Backend Technology Choices

**Decision**: Spring Boot 3.2+ with Java 21, Spring Data JPA, Flyway migrations.

**Rationale**:
- Spring Boot: Mature, well-documented, excellent for REST APIs
- Java 21 LTS: Virtual threads for better concurrency
- Spring Data JPA: Simplifies database operations
- Flyway: Database version control

**Key Dependencies**:
- `spring-boot-starter-web`: REST API
- `spring-boot-starter-data-jpa`: Database access
- `spring-boot-starter-validation`: Input validation
- `spring-boot-starter-cache`: Application-level caching
- `postgresql`: Database driver
- `flyway-core`: Database migrations

### 9. Error Handling for External API

**Decision**: Implement circuit breaker pattern with fallback to cached data.

**Rationale**: Alpha Vantage may be unavailable or rate-limited. Users should see cached data rather than errors.

**Implementation**:
- Circuit breaker (Resilience4j) for Alpha Vantage calls
- Fallback to cached data with staleness indicator
- Log all API failures for monitoring
- Display user-friendly messages ("Prices may be delayed")

## Summary

All technical unknowns have been resolved:
- ✅ Alpha Vantage API integration approach defined
- ✅ Halal screening criteria (AAOIFI standards) documented with thresholds
- ✅ Price update strategy (polling) selected
- ✅ Caching strategy (multi-tier) defined
- ✅ Stock universe scope defined (TSX Composite for MVP)
- ✅ Frontend stack confirmed (React + Vite + TypeScript)
- ✅ Backend stack confirmed (Spring Boot 3 + Java 21)
- ✅ Error handling approach defined (circuit breaker + cached fallback)

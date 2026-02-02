# Data Model: Halal Stock Screener for TSX

**Branch**: `001-halal-stock-screener` | **Date**: 2026-01-25

## Entity Relationship Diagram

```
┌─────────────────┐       ┌─────────────────────┐
│     Stock       │       │  ComplianceResult   │
├─────────────────┤       ├─────────────────────┤
│ id (PK)         │──1:1──│ id (PK)             │
│ symbol          │       │ stock_id (FK)       │
│ name            │       │ business_compliant  │
│ sector          │       │ debt_ratio          │
│ sub_industry    │       │ liquidity_ratio     │
│ current_price   │       │ income_ratio        │
│ market_cap      │       │ is_compliant        │
│ price_updated   │       │ purification_pct    │
│ created_at      │       │ screened_at         │
│ updated_at      │       └─────────────────────┘
└─────────────────┘
        │
        │ 1:N
        ▼
┌─────────────────┐       ┌─────────────────────┐
│  PriceHistory   │       │  FinancialMetrics   │
├─────────────────┤       ├─────────────────────┤
│ id (PK)         │       │ id (PK)             │
│ stock_id (FK)   │──N:1──│ stock_id (FK)       │
│ date            │       │ fiscal_period       │
│ open            │       │ total_debt          │
│ high            │       │ interest_debt       │
│ low             │       │ cash                │
│ close           │       │ interest_securities │
│ volume          │       │ total_revenue       │
└─────────────────┘       │ non_halal_revenue   │
                          │ report_date         │
                          └─────────────────────┘
```

## Entities

### Stock

Represents a TSX-listed company.

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | BIGINT | PK, AUTO_INCREMENT | Unique identifier |
| symbol | VARCHAR(10) | UNIQUE, NOT NULL | TSX ticker symbol (e.g., "RY.TO") |
| name | VARCHAR(255) | NOT NULL | Company name |
| sector | VARCHAR(100) | | GICS sector classification |
| sub_industry | VARCHAR(100) | | GICS sub-industry classification |
| current_price | DECIMAL(12,4) | | Latest stock price in CAD |
| market_cap | DECIMAL(18,2) | | Market capitalization in CAD |
| price_updated_at | TIMESTAMP | | When current_price was last updated |
| is_active | BOOLEAN | DEFAULT true | Whether stock is actively traded |
| created_at | TIMESTAMP | NOT NULL | Record creation time |
| updated_at | TIMESTAMP | NOT NULL | Record last update time |

**Indexes**:
- `idx_stock_symbol` on `symbol`
- `idx_stock_sector` on `sector`
- `idx_stock_is_active` on `is_active`

### ComplianceResult

Represents the Halal screening outcome for a stock.

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | BIGINT | PK, AUTO_INCREMENT | Unique identifier |
| stock_id | BIGINT | FK(Stock), UNIQUE, NOT NULL | Reference to stock |
| business_activity_compliant | BOOLEAN | | Passes business activity screening |
| business_activity_reason | VARCHAR(500) | | Reason for non-compliance if applicable |
| debt_ratio | DECIMAL(8,4) | | Interest-bearing debt / market cap |
| debt_ratio_compliant | BOOLEAN | | debt_ratio < 0.33 |
| liquidity_ratio | DECIMAL(8,4) | | Cash + int securities / market cap |
| liquidity_ratio_compliant | BOOLEAN | | liquidity_ratio < 0.33 |
| income_ratio | DECIMAL(8,4) | | Non-halal income / total revenue |
| income_ratio_compliant | BOOLEAN | | income_ratio < 0.05 |
| is_compliant | BOOLEAN | NOT NULL | Overall compliance status |
| requires_purification | BOOLEAN | DEFAULT false | income_ratio > 0 but < 0.05 |
| purification_percentage | DECIMAL(6,4) | | Percentage to purify from dividends |
| screening_status | VARCHAR(20) | NOT NULL | COMPLIANT, NON_COMPLIANT, UNABLE_TO_VERIFY |
| screened_at | TIMESTAMP | NOT NULL | When screening was performed |
| created_at | TIMESTAMP | NOT NULL | Record creation time |
| updated_at | TIMESTAMP | NOT NULL | Record last update time |

**Indexes**:
- `idx_compliance_stock_id` on `stock_id`
- `idx_compliance_is_compliant` on `is_compliant`
- `idx_compliance_status` on `screening_status`

**Validation Rules**:
- `debt_ratio` must be >= 0
- `liquidity_ratio` must be >= 0
- `income_ratio` must be >= 0 and <= 1
- `purification_percentage` must be >= 0 and <= 100
- `screening_status` must be one of: COMPLIANT, NON_COMPLIANT, UNABLE_TO_VERIFY

### FinancialMetrics

Company financial data used for screening calculations.

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | BIGINT | PK, AUTO_INCREMENT | Unique identifier |
| stock_id | BIGINT | FK(Stock), NOT NULL | Reference to stock |
| fiscal_period | VARCHAR(10) | NOT NULL | e.g., "2024-Q4", "2024-FY" |
| total_debt | DECIMAL(18,2) | | Total debt in CAD |
| interest_bearing_debt | DECIMAL(18,2) | | Interest-bearing debt in CAD |
| cash_and_equivalents | DECIMAL(18,2) | | Cash holdings in CAD |
| interest_bearing_securities | DECIMAL(18,2) | | Interest-bearing securities in CAD |
| total_revenue | DECIMAL(18,2) | | Total revenue for period in CAD |
| non_halal_revenue | DECIMAL(18,2) | | Revenue from non-halal sources in CAD |
| report_date | DATE | NOT NULL | Date of financial report |
| data_source | VARCHAR(50) | | Source of data (e.g., "ALPHA_VANTAGE") |
| created_at | TIMESTAMP | NOT NULL | Record creation time |
| updated_at | TIMESTAMP | NOT NULL | Record last update time |

**Indexes**:
- `idx_financial_stock_id` on `stock_id`
- `idx_financial_period` on `fiscal_period`
- `idx_financial_stock_period` on `(stock_id, fiscal_period)` UNIQUE

### PriceHistory

Historical price data for chart display.

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | BIGINT | PK, AUTO_INCREMENT | Unique identifier |
| stock_id | BIGINT | FK(Stock), NOT NULL | Reference to stock |
| date | DATE | NOT NULL | Trading date |
| open_price | DECIMAL(12,4) | | Opening price in CAD |
| high_price | DECIMAL(12,4) | | Daily high in CAD |
| low_price | DECIMAL(12,4) | | Daily low in CAD |
| close_price | DECIMAL(12,4) | NOT NULL | Closing price in CAD |
| adjusted_close | DECIMAL(12,4) | | Adjusted close (for splits/dividends) |
| volume | BIGINT | | Trading volume |
| created_at | TIMESTAMP | NOT NULL | Record creation time |

**Indexes**:
- `idx_price_history_stock_id` on `stock_id`
- `idx_price_history_date` on `date`
- `idx_price_history_stock_date` on `(stock_id, date)` UNIQUE

## State Transitions

### ComplianceResult.screening_status

```
           ┌─────────────────┐
           │                 │
           ▼                 │
┌─────────────────┐    ┌─────┴────────┐    ┌─────────────────┐
│  UNABLE_TO_     │───▶│  COMPLIANT   │◀──▶│  NON_COMPLIANT  │
│  VERIFY         │    │              │    │                 │
└─────────────────┘    └──────────────┘    └─────────────────┘
           │                 │                      │
           │                 │                      │
           └─────────────────┴──────────────────────┘
                     Re-screening on new data
```

**Transitions**:
- UNABLE_TO_VERIFY → COMPLIANT: When sufficient financial data becomes available and stock passes all criteria
- UNABLE_TO_VERIFY → NON_COMPLIANT: When sufficient financial data becomes available and stock fails any criterion
- COMPLIANT → NON_COMPLIANT: When quarterly financials show violation of any threshold
- NON_COMPLIANT → COMPLIANT: When quarterly financials show all thresholds now met
- Any state → UNABLE_TO_VERIFY: When data becomes stale or unavailable

## Derived Fields

These fields are calculated, not stored:

| Entity | Field | Calculation |
|--------|-------|-------------|
| ComplianceResult | debt_ratio | financial_metrics.interest_bearing_debt / trailing_12_month_avg_market_cap |
| ComplianceResult | liquidity_ratio | (financial_metrics.cash_and_equivalents + financial_metrics.interest_bearing_securities) / trailing_12_month_avg_market_cap |
| ComplianceResult | income_ratio | financial_metrics.non_halal_revenue / financial_metrics.total_revenue |
| ComplianceResult | is_compliant | business_activity_compliant AND debt_ratio_compliant AND liquidity_ratio_compliant AND income_ratio_compliant |
| ComplianceResult | requires_purification | income_ratio > 0 AND income_ratio < 0.05 |
| ComplianceResult | purification_percentage | income_ratio * 100 (when requires_purification = true) |

## Business Rules

1. **Stock Uniqueness**: Each stock is uniquely identified by its TSX symbol
2. **Compliance One-to-One**: Each stock has exactly one current compliance result
3. **Financial Metrics History**: Multiple financial metrics records per stock (one per fiscal period)
4. **Price History**: One record per stock per trading day
5. **Compliance Recalculation**: Compliance must be recalculated when:
   - New financial metrics are loaded (quarterly)
   - Market cap changes significantly (>10% from screening date)
6. **Trailing 12-Month Average**: For ratio calculations, use average market cap over past 12 months
7. **Data Freshness**: Price data older than 24 hours should be flagged as stale

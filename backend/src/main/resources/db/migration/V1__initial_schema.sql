-- Halal TSX Stock Screener - Initial Schema
-- Version: 1
-- Date: 2026-01-25

-- Stock table
CREATE TABLE stock (
    id BIGSERIAL PRIMARY KEY,
    symbol VARCHAR(10) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    sector VARCHAR(100),
    sub_industry VARCHAR(100),
    current_price DECIMAL(12, 4),
    market_cap DECIMAL(18, 2),
    price_updated_at TIMESTAMP,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_stock_symbol ON stock(symbol);
CREATE INDEX idx_stock_sector ON stock(sector);
CREATE INDEX idx_stock_is_active ON stock(is_active);

-- Compliance Result table
CREATE TABLE compliance_result (
    id BIGSERIAL PRIMARY KEY,
    stock_id BIGINT UNIQUE NOT NULL REFERENCES stock(id) ON DELETE CASCADE,
    business_activity_compliant BOOLEAN,
    business_activity_reason VARCHAR(500),
    debt_ratio DECIMAL(8, 4),
    debt_ratio_compliant BOOLEAN,
    liquidity_ratio DECIMAL(8, 4),
    liquidity_ratio_compliant BOOLEAN,
    income_ratio DECIMAL(8, 4),
    income_ratio_compliant BOOLEAN,
    is_compliant BOOLEAN NOT NULL,
    requires_purification BOOLEAN DEFAULT false,
    purification_percentage DECIMAL(6, 4),
    screening_status VARCHAR(20) NOT NULL,
    screened_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT chk_screening_status CHECK (screening_status IN ('COMPLIANT', 'NON_COMPLIANT', 'UNABLE_TO_VERIFY'))
);

CREATE INDEX idx_compliance_stock_id ON compliance_result(stock_id);
CREATE INDEX idx_compliance_is_compliant ON compliance_result(is_compliant);
CREATE INDEX idx_compliance_status ON compliance_result(screening_status);

-- Financial Metrics table
CREATE TABLE financial_metrics (
    id BIGSERIAL PRIMARY KEY,
    stock_id BIGINT NOT NULL REFERENCES stock(id) ON DELETE CASCADE,
    fiscal_period VARCHAR(10) NOT NULL,
    total_debt DECIMAL(18, 2),
    interest_bearing_debt DECIMAL(18, 2),
    cash_and_equivalents DECIMAL(18, 2),
    interest_bearing_securities DECIMAL(18, 2),
    total_revenue DECIMAL(18, 2),
    non_halal_revenue DECIMAL(18, 2),
    report_date DATE NOT NULL,
    data_source VARCHAR(50),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uk_financial_stock_period UNIQUE (stock_id, fiscal_period)
);

CREATE INDEX idx_financial_stock_id ON financial_metrics(stock_id);
CREATE INDEX idx_financial_period ON financial_metrics(fiscal_period);

-- Price History table
CREATE TABLE price_history (
    id BIGSERIAL PRIMARY KEY,
    stock_id BIGINT NOT NULL REFERENCES stock(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    open_price DECIMAL(12, 4),
    high_price DECIMAL(12, 4),
    low_price DECIMAL(12, 4),
    close_price DECIMAL(12, 4) NOT NULL,
    adjusted_close DECIMAL(12, 4),
    volume BIGINT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uk_price_history_stock_date UNIQUE (stock_id, date)
);

CREATE INDEX idx_price_history_stock_id ON price_history(stock_id);
CREATE INDEX idx_price_history_date ON price_history(date);

-- Function to auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for auto-updating updated_at
CREATE TRIGGER update_stock_updated_at
    BEFORE UPDATE ON stock
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_compliance_result_updated_at
    BEFORE UPDATE ON compliance_result
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_financial_metrics_updated_at
    BEFORE UPDATE ON financial_metrics
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

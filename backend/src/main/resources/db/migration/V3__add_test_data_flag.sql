-- Add is_test_data column to distinguish test stocks from full-scale stocks
ALTER TABLE stock ADD COLUMN IF NOT EXISTS is_test_data BOOLEAN DEFAULT false;

-- Mark all existing stocks as test data (the original ~39 sample stocks)
UPDATE stock SET is_test_data = true WHERE is_test_data IS NULL OR is_test_data = false;

-- Create index for efficient filtering by data mode
CREATE INDEX IF NOT EXISTS idx_stock_is_test_data ON stock(is_test_data);

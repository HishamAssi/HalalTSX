-- Seed initial TSX Composite stocks
-- This includes a representative sample of TSX stocks across different sectors

INSERT INTO stock (symbol, name, sector, sub_industry, current_price, market_cap, is_active, created_at, updated_at) VALUES
-- Information Technology
('SHOP.TO', 'Shopify Inc.', 'Information Technology', 'Internet Services & Infrastructure', 98.50, 124500000000, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('CSU.TO', 'Constellation Software Inc.', 'Information Technology', 'Application Software', 3850.00, 81000000000, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('OTEX.TO', 'Open Text Corporation', 'Information Technology', 'Application Software', 42.50, 11500000000, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('DCBO.TO', 'Docebo Inc.', 'Information Technology', 'Application Software', 45.00, 1500000000, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('KXS.TO', 'Kinaxis Inc.', 'Information Technology', 'Application Software', 165.00, 4800000000, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

-- Energy
('ENB.TO', 'Enbridge Inc.', 'Energy', 'Oil & Gas Storage & Transportation', 48.75, 98000000000, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('TRP.TO', 'TC Energy Corporation', 'Energy', 'Oil & Gas Storage & Transportation', 52.00, 54000000000, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('CNQ.TO', 'Canadian Natural Resources', 'Energy', 'Oil & Gas Exploration & Production', 78.50, 82000000000, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('SU.TO', 'Suncor Energy Inc.', 'Energy', 'Integrated Oil & Gas', 42.00, 58000000000, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('IMO.TO', 'Imperial Oil Limited', 'Energy', 'Integrated Oil & Gas', 72.50, 42000000000, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

-- Materials
('NTR.TO', 'Nutrien Ltd.', 'Materials', 'Fertilizers & Agricultural Chemicals', 68.50, 35000000000, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('ABX.TO', 'Barrick Gold Corporation', 'Materials', 'Gold', 21.50, 37500000000, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('FNV.TO', 'Franco-Nevada Corporation', 'Materials', 'Gold', 185.00, 35500000000, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('WPM.TO', 'Wheaton Precious Metals', 'Materials', 'Precious Metals & Minerals', 65.00, 29500000000, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('CCL-B.TO', 'CCL Industries Inc.', 'Materials', 'Paper Packaging', 68.00, 11500000000, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

-- Industrials
('CNR.TO', 'Canadian National Railway', 'Industrials', 'Railroads', 165.00, 110000000000, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('CP.TO', 'Canadian Pacific Kansas City', 'Industrials', 'Railroads', 112.00, 105000000000, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('WCN.TO', 'Waste Connections Inc.', 'Industrials', 'Environmental & Facilities Services', 215.00, 55000000000, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('CAE.TO', 'CAE Inc.', 'Industrials', 'Aerospace & Defense', 28.50, 9000000000, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('TIH.TO', 'Toromont Industries Ltd.', 'Industrials', 'Trading Companies & Distributors', 118.00, 9500000000, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

-- Consumer Discretionary
('DOL.TO', 'Dollarama Inc.', 'Consumer Discretionary', 'General Merchandise Stores', 118.00, 33500000000, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('ATD.TO', 'Alimentation Couche-Tard', 'Consumer Discretionary', 'Food Retail', 82.00, 85000000000, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('QSR.TO', 'Restaurant Brands International', 'Consumer Discretionary', 'Restaurants', 95.00, 42500000000, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('MG.TO', 'Magna International Inc.', 'Consumer Discretionary', 'Auto Parts & Equipment', 62.00, 17500000000, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('GIL.TO', 'Gildan Activewear Inc.', 'Consumer Discretionary', 'Apparel & Accessories', 48.00, 8500000000, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

-- Consumer Staples
('L.TO', 'Loblaw Companies Limited', 'Consumer Staples', 'Food Retail', 168.00, 54000000000, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('MRU.TO', 'Metro Inc.', 'Consumer Staples', 'Food Retail', 78.00, 18500000000, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('SAP.TO', 'Saputo Inc.', 'Consumer Staples', 'Packaged Foods & Meats', 28.50, 11500000000, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('EMP-A.TO', 'Empire Company Limited', 'Consumer Staples', 'Food Retail', 38.50, 10000000000, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

-- Health Care
('WELL.TO', 'WELL Health Technologies', 'Health Care', 'Health Care Technology', 4.50, 1100000000, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('CTC-A.TO', 'Canadian Tire Corporation', 'Consumer Discretionary', 'Specialty Stores', 152.00, 8500000000, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

-- Real Estate
('BAM.TO', 'Brookfield Asset Management', 'Financials', 'Asset Management & Custody Banks', 58.00, 95000000000, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('BN.TO', 'Brookfield Corporation', 'Financials', 'Multi-Sector Holdings', 55.00, 85000000000, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

-- Utilities
('FTS.TO', 'Fortis Inc.', 'Utilities', 'Electric Utilities', 55.50, 26500000000, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('H.TO', 'Hydro One Limited', 'Utilities', 'Electric Utilities', 42.00, 25000000000, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('EMA.TO', 'Emera Incorporated', 'Utilities', 'Electric Utilities', 48.00, 13000000000, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

-- Communication Services
('BCE.TO', 'BCE Inc.', 'Communication Services', 'Integrated Telecommunication Services', 48.50, 44000000000, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('T.TO', 'TELUS Corporation', 'Communication Services', 'Integrated Telecommunication Services', 24.50, 36500000000, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('RCI-B.TO', 'Rogers Communications Inc.', 'Communication Services', 'Integrated Telecommunication Services', 52.00, 27500000000, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Add sample compliance results for demonstration
-- Compliant stocks
INSERT INTO compliance_result (stock_id, business_activity_compliant, debt_ratio, debt_ratio_compliant, liquidity_ratio, liquidity_ratio_compliant, income_ratio, income_ratio_compliant, is_compliant, requires_purification, purification_percentage, screening_status, screened_at, created_at, updated_at)
SELECT id, true, 0.15, true, 0.12, true, 0.00, true, true, false, 0, 'COMPLIANT', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
FROM stock WHERE symbol IN ('SHOP.TO', 'CSU.TO', 'OTEX.TO', 'KXS.TO', 'DCBO.TO', 'CNR.TO', 'CP.TO', 'WCN.TO', 'TIH.TO', 'DOL.TO', 'ATD.TO', 'L.TO', 'MRU.TO', 'SAP.TO', 'NTR.TO', 'FNV.TO', 'WPM.TO', 'CCL-B.TO', 'ABX.TO');

-- Compliant with purification
INSERT INTO compliance_result (stock_id, business_activity_compliant, debt_ratio, debt_ratio_compliant, liquidity_ratio, liquidity_ratio_compliant, income_ratio, income_ratio_compliant, is_compliant, requires_purification, purification_percentage, screening_status, screened_at, created_at, updated_at)
SELECT id, true, 0.22, true, 0.18, true, 0.02, true, true, true, 2.00, 'COMPLIANT', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
FROM stock WHERE symbol IN ('ENB.TO', 'TRP.TO', 'CNQ.TO', 'SU.TO', 'FTS.TO', 'H.TO', 'EMA.TO', 'BCE.TO', 'T.TO');

-- Non-compliant (high debt ratio)
INSERT INTO compliance_result (stock_id, business_activity_compliant, debt_ratio, debt_ratio_compliant, liquidity_ratio, liquidity_ratio_compliant, income_ratio, income_ratio_compliant, is_compliant, requires_purification, purification_percentage, screening_status, screened_at, created_at, updated_at)
SELECT id, true, 0.45, false, 0.15, true, 0.01, true, false, false, 0, 'NON_COMPLIANT', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
FROM stock WHERE symbol IN ('QSR.TO', 'MG.TO', 'GIL.TO', 'RCI-B.TO');

-- Non-compliant (prohibited sector - Financials)
INSERT INTO compliance_result (stock_id, business_activity_compliant, business_activity_reason, debt_ratio, debt_ratio_compliant, liquidity_ratio, liquidity_ratio_compliant, income_ratio, income_ratio_compliant, is_compliant, requires_purification, purification_percentage, screening_status, screened_at, created_at, updated_at)
SELECT id, false, 'Operates in prohibited sector: Financials', 0.10, true, 0.20, true, 0.00, true, false, false, 0, 'NON_COMPLIANT', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
FROM stock WHERE symbol IN ('BAM.TO', 'BN.TO');

-- Non-compliant (Aerospace & Defense)
INSERT INTO compliance_result (stock_id, business_activity_compliant, business_activity_reason, debt_ratio, debt_ratio_compliant, liquidity_ratio, liquidity_ratio_compliant, income_ratio, income_ratio_compliant, is_compliant, requires_purification, purification_percentage, screening_status, screened_at, created_at, updated_at)
SELECT id, false, 'Operates in prohibited industry: Aerospace & Defense', 0.18, true, 0.22, true, 0.00, true, false, false, 0, 'NON_COMPLIANT', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
FROM stock WHERE symbol = 'CAE.TO';

-- Unable to verify (remaining stocks)
INSERT INTO compliance_result (stock_id, business_activity_compliant, is_compliant, screening_status, screened_at, created_at, updated_at)
SELECT id, true, false, 'UNABLE_TO_VERIFY', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
FROM stock WHERE id NOT IN (SELECT stock_id FROM compliance_result);

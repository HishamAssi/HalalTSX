-- Full-scale TSX Composite stocks data
-- This migration adds additional stocks to simulate production-like data volume
-- These stocks are marked as is_test_data = false (full-scale mode only)

-- Financials (Major Banks and Insurance) - Non-Halal due to conventional finance
INSERT INTO stock (symbol, name, sector, sub_industry, current_price, market_cap, is_active, is_test_data, created_at, updated_at) VALUES
('RY.TO', 'Royal Bank of Canada', 'Financials', 'Diversified Banks', 145.00, 203000000000, true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('TD.TO', 'Toronto-Dominion Bank', 'Financials', 'Diversified Banks', 82.00, 150000000000, true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('BNS.TO', 'Bank of Nova Scotia', 'Financials', 'Diversified Banks', 68.00, 82000000000, true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('BMO.TO', 'Bank of Montreal', 'Financials', 'Diversified Banks', 128.00, 92000000000, true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('CM.TO', 'Canadian Imperial Bank of Commerce', 'Financials', 'Diversified Banks', 68.00, 62000000000, true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('NA.TO', 'National Bank of Canada', 'Financials', 'Diversified Banks', 115.00, 39000000000, true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('MFC.TO', 'Manulife Financial Corporation', 'Financials', 'Life & Health Insurance', 32.00, 58000000000, true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('SLF.TO', 'Sun Life Financial Inc.', 'Financials', 'Life & Health Insurance', 72.00, 42000000000, true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('IFC.TO', 'Intact Financial Corporation', 'Financials', 'Property & Casualty Insurance', 235.00, 42000000000, true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('GWO.TO', 'Great-West Lifeco Inc.', 'Financials', 'Life & Health Insurance', 42.00, 39000000000, true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('POW.TO', 'Power Corporation of Canada', 'Financials', 'Multi-Sector Holdings', 42.00, 28000000000, true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('FFH.TO', 'Fairfax Financial Holdings', 'Financials', 'Property & Casualty Insurance', 1250.00, 32000000000, true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('X.TO', 'TMX Group Limited', 'Financials', 'Financial Exchanges & Data', 38.00, 10500000000, true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('CWB.TO', 'Canadian Western Bank', 'Financials', 'Regional Banks', 28.00, 2800000000, true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('LB.TO', 'Laurentian Bank of Canada', 'Financials', 'Regional Banks', 28.00, 1200000000, true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('EQB.TO', 'EQB Inc.', 'Financials', 'Thrifts & Mortgage Finance', 95.00, 3600000000, true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

-- Additional Energy stocks
('CVE.TO', 'Cenovus Energy Inc.', 'Energy', 'Integrated Oil & Gas', 22.00, 42000000000, true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('HSE.TO', 'Husky Energy Inc.', 'Energy', 'Integrated Oil & Gas', 8.50, 8500000000, true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('OVV.TO', 'Ovintiv Inc.', 'Energy', 'Oil & Gas Exploration & Production', 52.00, 14000000000, true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('ARX.TO', 'ARC Resources Ltd.', 'Energy', 'Oil & Gas Exploration & Production', 22.00, 15000000000, true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('TOU.TO', 'Tourmaline Oil Corp.', 'Energy', 'Oil & Gas Exploration & Production', 62.00, 21000000000, true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('WCP.TO', 'Whitecap Resources Inc.', 'Energy', 'Oil & Gas Exploration & Production', 10.00, 6000000000, true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('PSK.TO', 'PrairieSky Royalty Ltd.', 'Energy', 'Oil & Gas Exploration & Production', 24.00, 5500000000, true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('TVE.TO', 'Tamarack Valley Energy Ltd.', 'Energy', 'Oil & Gas Exploration & Production', 4.50, 2100000000, true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('BTE.TO', 'Baytex Energy Corp.', 'Energy', 'Oil & Gas Exploration & Production', 5.50, 3000000000, true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('CPG.TO', 'Crescent Point Energy Corp.', 'Energy', 'Oil & Gas Exploration & Production', 9.00, 5200000000, true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('VET.TO', 'Vermilion Energy Inc.', 'Energy', 'Oil & Gas Exploration & Production', 16.00, 2600000000, true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('MEG.TO', 'MEG Energy Corp.', 'Energy', 'Oil & Gas Exploration & Production', 25.00, 7500000000, true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('PPL.TO', 'Pembina Pipeline Corporation', 'Energy', 'Oil & Gas Storage & Transportation', 48.00, 26000000000, true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('KEY.TO', 'Keyera Corp.', 'Energy', 'Oil & Gas Storage & Transportation', 35.00, 8000000000, true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('IPL.TO', 'Inter Pipeline Ltd.', 'Energy', 'Oil & Gas Storage & Transportation', 20.00, 8500000000, true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('GEI.TO', 'Gibson Energy Inc.', 'Energy', 'Oil & Gas Storage & Transportation', 22.00, 3200000000, true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

-- Additional Materials stocks
('FM.TO', 'First Quantum Minerals Ltd.', 'Materials', 'Copper', 16.00, 11000000000, true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('TECK-B.TO', 'Teck Resources Limited', 'Materials', 'Diversified Metals & Mining', 52.00, 26000000000, true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('LUN.TO', 'Lundin Mining Corporation', 'Materials', 'Diversified Metals & Mining', 12.00, 9200000000, true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('HBM.TO', 'Hudbay Minerals Inc.', 'Materials', 'Copper', 8.00, 2800000000, true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('IVN.TO', 'Ivanhoe Mines Ltd.', 'Materials', 'Copper', 12.00, 14000000000, true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('K.TO', 'Kinross Gold Corporation', 'Materials', 'Gold', 8.50, 10500000000, true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('AEM.TO', 'Agnico Eagle Mines Limited', 'Materials', 'Gold', 78.00, 38000000000, true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('ELD.TO', 'Eldorado Gold Corporation', 'Materials', 'Gold', 15.00, 3000000000, true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('YRI.TO', 'Yamana Gold Inc.', 'Materials', 'Gold', 6.00, 5800000000, true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('IMG.TO', 'IAMGOLD Corporation', 'Materials', 'Gold', 3.50, 1700000000, true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('SSL.TO', 'Sandstorm Gold Ltd.', 'Materials', 'Precious Metals & Minerals', 6.50, 1950000000, true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('OR.TO', 'Osisko Gold Royalties Ltd.', 'Materials', 'Precious Metals & Minerals', 18.00, 3200000000, true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('PAAS.TO', 'Pan American Silver Corp.', 'Materials', 'Silver', 22.00, 8000000000, true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('MAG.TO', 'MAG Silver Corp.', 'Materials', 'Silver', 18.00, 1800000000, true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('LIF.TO', 'Labrador Iron Ore Royalty', 'Materials', 'Steel', 32.00, 2000000000, true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('SJ.TO', 'Stella-Jones Inc.', 'Materials', 'Forest Products', 82.00, 5200000000, true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('WFG.TO', 'West Fraser Timber Co. Ltd.', 'Materials', 'Paper & Forest Products', 115.00, 9500000000, true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('CFP.TO', 'Canfor Corporation', 'Materials', 'Paper & Forest Products', 22.00, 2800000000, true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('MRE.TO', 'Martinrea International Inc.', 'Materials', 'Auto Parts & Equipment', 12.00, 950000000, true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

-- Additional Industrials stocks
('RBA.TO', 'Ritchie Bros. Auctioneers', 'Industrials', 'Trading Companies & Distributors', 72.00, 8000000000, true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('STN.TO', 'Stantec Inc.', 'Industrials', 'Research & Consulting Services', 98.00, 10800000000, true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('WSP.TO', 'WSP Global Inc.', 'Industrials', 'Research & Consulting Services', 195.00, 23000000000, true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('SNC.TO', 'SNC-Lavalin Group Inc.', 'Industrials', 'Construction & Engineering', 38.00, 6700000000, true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('ARE.TO', 'Aecon Group Inc.', 'Industrials', 'Construction & Engineering', 18.00, 1100000000, true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('BDT.TO', 'Bird Construction Inc.', 'Industrials', 'Construction & Engineering', 12.00, 650000000, true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('FTT.TO', 'Finning International Inc.', 'Industrials', 'Trading Companies & Distributors', 38.00, 6200000000, true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('TFII.TO', 'TFI International Inc.', 'Industrials', 'Trucking', 165.00, 14500000000, true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('MDA.TO', 'MDA Ltd.', 'Industrials', 'Aerospace & Defense', 18.00, 2200000000, true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('BDGI.TO', 'Badger Infrastructure Solutions', 'Industrials', 'Environmental & Facilities Services', 32.00, 1100000000, true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('NFI.TO', 'NFI Group Inc.', 'Industrials', 'Construction Machinery & Heavy Trucks', 15.00, 1050000000, true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('ATA.TO', 'ATS Corporation', 'Industrials', 'Industrial Machinery', 52.00, 4800000000, true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('EIF.TO', 'Exchange Income Corporation', 'Industrials', 'Diversified Support Services', 58.00, 2600000000, true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('CJT.TO', 'Cargojet Inc.', 'Industrials', 'Air Freight & Logistics', 125.00, 2100000000, true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

-- Additional Consumer Discretionary stocks
('BYD.TO', 'Boyd Group Services Inc.', 'Consumer Discretionary', 'Specialty Stores', 265.00, 5700000000, true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('MTY.TO', 'MTY Food Group Inc.', 'Consumer Discretionary', 'Restaurants', 52.00, 1300000000, true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('RCH.TO', 'Richelieu Hardware Ltd.', 'Consumer Discretionary', 'Building Products', 42.00, 2400000000, true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('LNR.TO', 'Linamar Corporation', 'Consumer Discretionary', 'Auto Parts & Equipment', 62.00, 4000000000, true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('MRX.TO', 'Martinrea International', 'Consumer Discretionary', 'Auto Parts & Equipment', 12.00, 950000000, true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('PBH.TO', 'Premium Brands Holdings', 'Consumer Discretionary', 'Packaged Foods & Meats', 92.00, 4100000000, true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('GOOS.TO', 'Canada Goose Holdings Inc.', 'Consumer Discretionary', 'Apparel & Accessories', 15.00, 1600000000, true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('ROOT.TO', 'Roots Corporation', 'Consumer Discretionary', 'Apparel Retail', 2.50, 105000000, true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('TOY.TO', 'Spin Master Corp.', 'Consumer Discretionary', 'Leisure Products', 32.00, 3300000000, true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('ACQ.TO', 'AutoCanada Inc.', 'Consumer Discretionary', 'Specialty Stores', 22.00, 600000000, true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('PRMW.TO', 'Primo Water Corporation', 'Consumer Discretionary', 'Soft Drinks', 18.00, 2900000000, true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('ITP.TO', 'Intertape Polymer Group', 'Materials', 'Paper Packaging', 28.00, 1650000000, true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

-- Additional Consumer Staples stocks
('WN.TO', 'George Weston Limited', 'Consumer Staples', 'Food Retail', 185.00, 25000000000, true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('NWC.TO', 'The North West Company', 'Consumer Staples', 'Food Retail', 38.00, 1850000000, true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('ATZ.TO', 'Aritzia Inc.', 'Consumer Discretionary', 'Apparel Retail', 42.00, 4800000000, true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('JWEL.TO', 'Jamieson Wellness Inc.', 'Consumer Staples', 'Personal Products', 28.00, 1200000000, true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('HLF.TO', 'High Liner Foods Incorporated', 'Consumer Staples', 'Packaged Foods & Meats', 12.00, 400000000, true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('ADW-A.TO', 'Andrew Peller Limited', 'Consumer Staples', 'Distillers & Vintners', 8.50, 365000000, true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

-- Health Care stocks
('CXR.TO', 'Concordia International Corp.', 'Health Care', 'Pharmaceuticals', 0.25, 15000000, true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('BPF-U.TO', 'Boston Pizza Royalties Income Fund', 'Consumer Discretionary', 'Restaurants', 15.00, 350000000, true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('CIGI.TO', 'Colliers International Group', 'Real Estate', 'Real Estate Services', 145.00, 6500000000, true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('FSV.TO', 'FirstService Corporation', 'Real Estate', 'Real Estate Services', 195.00, 8700000000, true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

-- Real Estate (REITs)
('REI-U.TO', 'RioCan Real Estate Investment Trust', 'Real Estate', 'Retail REITs', 20.00, 6000000000, true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('HR-U.TO', 'H&R Real Estate Investment Trust', 'Real Estate', 'Diversified REITs', 12.00, 3600000000, true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('AP-U.TO', 'Allied Properties Real Estate Trust', 'Real Estate', 'Office REITs', 22.00, 2800000000, true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('CAR-U.TO', 'Canadian Apartment Properties REIT', 'Real Estate', 'Residential REITs', 48.00, 8500000000, true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('IIP-U.TO', 'InterRent Real Estate Trust', 'Real Estate', 'Residential REITs', 14.00, 2000000000, true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('GRT-U.TO', 'Granite Real Estate Investment Trust', 'Real Estate', 'Industrial REITs', 78.00, 4800000000, true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('WIR-U.TO', 'WPT Industrial Real Estate Trust', 'Real Estate', 'Industrial REITs', 22.00, 1400000000, true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('SMU-U.TO', 'Summit Industrial Income REIT', 'Real Estate', 'Industrial REITs', 22.00, 3600000000, true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('DIR-U.TO', 'Dream Industrial Real Estate Trust', 'Real Estate', 'Industrial REITs', 14.00, 3500000000, true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('CRT-U.TO', 'CT Real Estate Investment Trust', 'Real Estate', 'Retail REITs', 15.00, 3200000000, true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('SRU-U.TO', 'SmartCentres Real Estate Trust', 'Real Estate', 'Retail REITs', 25.00, 4500000000, true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('CHP-U.TO', 'Choice Properties Real Estate Trust', 'Real Estate', 'Retail REITs', 14.00, 10000000000, true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('FCR-U.TO', 'First Capital Real Estate Trust', 'Real Estate', 'Retail REITs', 16.00, 3500000000, true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('BEI-U.TO', 'Boardwalk Real Estate Trust', 'Real Estate', 'Residential REITs', 55.00, 2800000000, true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('KMP-U.TO', 'Killam Apartment REIT', 'Real Estate', 'Residential REITs', 18.00, 2000000000, true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('MI-U.TO', 'Minto Apartment Real Estate Trust', 'Real Estate', 'Residential REITs', 16.00, 1100000000, true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('NWH-U.TO', 'NorthWest Healthcare Properties', 'Real Estate', 'Health Care REITs', 8.00, 2000000000, true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('D-U.TO', 'Dream Office Real Estate Trust', 'Real Estate', 'Office REITs', 18.00, 1000000000, true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('AAV.TO', 'Advantage Energy Ltd.', 'Energy', 'Oil & Gas Exploration & Production', 10.00, 1900000000, true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

-- Additional Utilities stocks
('AQN.TO', 'Algonquin Power & Utilities', 'Utilities', 'Multi-Utilities', 8.50, 5800000000, true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('CU.TO', 'Canadian Utilities Limited', 'Utilities', 'Multi-Utilities', 32.00, 8600000000, true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('ACO-X.TO', 'ATCO Ltd.', 'Utilities', 'Multi-Utilities', 42.00, 4800000000, true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('TA.TO', 'TransAlta Corporation', 'Utilities', 'Independent Power Producers', 12.00, 3200000000, true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('NPI.TO', 'Northland Power Inc.', 'Utilities', 'Independent Power Producers', 22.00, 5500000000, true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('BLX.TO', 'Boralex Inc.', 'Utilities', 'Independent Power Producers', 32.00, 3300000000, true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('INE.TO', 'Innergex Renewable Energy', 'Utilities', 'Independent Power Producers', 10.00, 1900000000, true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('CPX.TO', 'Capital Power Corporation', 'Utilities', 'Independent Power Producers', 42.00, 4900000000, true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

-- Additional Information Technology stocks
('LSPD.TO', 'Lightspeed Commerce Inc.', 'Information Technology', 'Application Software', 22.00, 3300000000, true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('NVEI.TO', 'Nuvei Corporation', 'Information Technology', 'Data Processing Services', 32.00, 4500000000, true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('ET.TO', 'Evertz Technologies Limited', 'Information Technology', 'Communications Equipment', 12.00, 900000000, true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('TIXT.TO', 'TELUS International', 'Information Technology', 'IT Consulting Services', 8.50, 2300000000, true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('CGI.TO', 'CGI Inc.', 'Information Technology', 'IT Consulting Services', 145.00, 34000000000, true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('DSG.TO', 'Descartes Systems Group', 'Information Technology', 'Application Software', 115.00, 9800000000, true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('ENGH.TO', 'Enghouse Systems Limited', 'Information Technology', 'Application Software', 32.00, 1800000000, true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('GSY.TO', 'goeasy Ltd.', 'Financials', 'Consumer Finance', 165.00, 2700000000, true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('REAL.TO', 'Real Matters Inc.', 'Information Technology', 'Data Processing Services', 5.00, 450000000, true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('DND.TO', 'Dye & Durham Limited', 'Information Technology', 'Application Software', 15.00, 1000000000, true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('TOI.TO', 'Topicus.com Inc.', 'Information Technology', 'Application Software', 95.00, 7800000000, true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('ALYA.TO', 'Alithya Group Inc.', 'Information Technology', 'IT Consulting Services', 2.50, 225000000, true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('BB.TO', 'BlackBerry Limited', 'Information Technology', 'Systems Software', 3.50, 2000000000, true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('SHOP.NE', 'Shopify Inc. (NE)', 'Information Technology', 'Internet Services & Infrastructure', 98.00, 124000000000, true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('MDF.TO', 'mdf commerce inc.', 'Information Technology', 'Internet Services & Infrastructure', 4.00, 115000000, true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

-- Communication Services
('QBR-B.TO', 'Quebecor Inc.', 'Communication Services', 'Cable & Satellite', 28.00, 6500000000, true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('CCA.TO', 'Cogeco Communications Inc.', 'Communication Services', 'Cable & Satellite', 62.00, 2700000000, true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('CGO.TO', 'Cogeco Inc.', 'Communication Services', 'Cable & Satellite', 58.00, 950000000, true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('SJR-B.TO', 'Shaw Communications Inc.', 'Communication Services', 'Cable & Satellite', 40.00, 20000000000, true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('ZZZ.TO', 'Sleep Country Canada Holdings', 'Consumer Discretionary', 'Home Furnishing Retail', 28.00, 1000000000, true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('TC.TO', 'Tucows Inc.', 'Communication Services', 'Internet Services & Infrastructure', 22.00, 240000000, true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('WILD.TO', 'WildBrain Ltd.', 'Communication Services', 'Movies & Entertainment', 1.50, 260000000, true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('DHX-B.TO', 'DHX Media Ltd.', 'Communication Services', 'Movies & Entertainment', 2.00, 280000000, true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('CJR-B.TO', 'Corus Entertainment Inc.', 'Communication Services', 'Broadcasting', 0.80, 170000000, true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

-- Additional smaller cap stocks across sectors
('TCS.TO', 'TECSYS Inc.', 'Information Technology', 'Application Software', 38.00, 560000000, true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('WELL.V', 'WELL Health Technologies (V)', 'Health Care', 'Health Care Technology', 4.20, 1050000000, true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('DOC.V', 'CloudMD Software & Services', 'Health Care', 'Health Care Technology', 0.25, 65000000, true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('NXO.TO', 'Nexoptic Technology Corp.', 'Information Technology', 'Technology Hardware', 0.15, 8000000, true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('ONC.TO', 'Oncolytics Biotech Inc.', 'Health Care', 'Biotechnology', 2.50, 145000000, true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('ZEN.TO', 'Zenabis Global Inc.', 'Health Care', 'Pharmaceuticals', 0.02, 5000000, true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('FANS.TO', 'FansUnite Entertainment Inc.', 'Consumer Discretionary', 'Casinos & Gaming', 0.15, 15000000, true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('GDNP.TO', 'Good Natured Products Inc.', 'Materials', 'Paper Packaging', 0.25, 40000000, true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('CSTR.TO', 'Canstar Resources Inc.', 'Materials', 'Gold', 0.50, 80000000, true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('VOXR.TO', 'Vox Royalty Corp.', 'Materials', 'Precious Metals & Minerals', 3.00, 180000000, true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('PBX.V', 'PowerBand Solutions Inc.', 'Information Technology', 'Application Software', 0.05, 8000000, true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('PKK.CN', 'Peak Fintech Group Inc.', 'Information Technology', 'Data Processing Services', 0.80, 95000000, true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('TXG.TO', 'Torex Gold Resources Inc.', 'Materials', 'Gold', 18.00, 1550000000, true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('NG.TO', 'NovaGold Resources Inc.', 'Materials', 'Gold', 5.50, 1850000000, true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('STLC.TO', 'Stelco Holdings Inc.', 'Materials', 'Steel', 42.00, 2400000000, true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

-- More diversified stocks
('CCO.TO', 'Cameco Corporation', 'Energy', 'Coal & Consumable Fuels', 52.00, 22500000000, true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('DML.TO', 'Denison Mines Corp.', 'Energy', 'Coal & Consumable Fuels', 2.20, 1900000000, true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('NXE.TO', 'NexGen Energy Ltd.', 'Energy', 'Coal & Consumable Fuels', 8.00, 3900000000, true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('U.TO', 'Sprott Inc.', 'Financials', 'Asset Management & Custody Banks', 52.00, 1300000000, true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('SII.TO', 'Sprott Inc. (Alt)', 'Financials', 'Asset Management & Custody Banks', 48.00, 1200000000, true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('AGF-B.TO', 'AGF Management Limited', 'Financials', 'Asset Management & Custody Banks', 8.00, 550000000, true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('CIX.TO', 'CI Financial Corp.', 'Financials', 'Asset Management & Custody Banks', 15.00, 2900000000, true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('IGM.TO', 'IGM Financial Inc.', 'Financials', 'Asset Management & Custody Banks', 38.00, 9000000000, true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('ONEX.TO', 'Onex Corporation', 'Financials', 'Multi-Sector Holdings', 85.00, 7200000000, true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('ECN.TO', 'ECN Capital Corp.', 'Financials', 'Specialized Finance', 3.00, 750000000, true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('DFY.TO', 'Definity Financial Corporation', 'Financials', 'Property & Casualty Insurance', 42.00, 4800000000, true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('TSU.TO', 'Trisura Group Ltd.', 'Financials', 'Property & Casualty Insurance', 42.00, 2000000000, true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('IAG.TO', 'iA Financial Corporation', 'Financials', 'Life & Health Insurance', 95.00, 10000000000, true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('EFN.TO', 'Element Fleet Management', 'Financials', 'Specialized Finance', 22.00, 8600000000, true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('HCG.TO', 'Home Capital Group Inc.', 'Financials', 'Thrifts & Mortgage Finance', 38.00, 1550000000, true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('FN.TO', 'First National Financial', 'Financials', 'Thrifts & Mortgage Finance', 38.00, 2300000000, true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('MIC.TO', 'Genworth MI Canada Inc.', 'Financials', 'Thrifts & Mortgage Finance', 32.00, 2700000000, true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT (symbol) DO NOTHING;

-- Add compliance results for all new full-scale stocks
-- Generate varied compliance data to simulate realistic screening outcomes

-- Compliant stocks (approximately 40% of new stocks)
INSERT INTO compliance_result (stock_id, business_activity_compliant, debt_ratio, debt_ratio_compliant, liquidity_ratio, liquidity_ratio_compliant, income_ratio, income_ratio_compliant, is_compliant, requires_purification, purification_percentage, screening_status, screened_at, created_at, updated_at)
SELECT id, true,
    ROUND((RANDOM() * 0.25)::numeric, 4), -- debt ratio 0-25%
    true,
    ROUND((RANDOM() * 0.25)::numeric, 4), -- liquidity ratio 0-25%
    true,
    0.00,
    true,
    true,
    false,
    0,
    'COMPLIANT',
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
FROM stock
WHERE is_test_data = false
AND sector IN ('Information Technology', 'Materials', 'Industrials', 'Consumer Discretionary', 'Consumer Staples', 'Utilities')
AND id NOT IN (SELECT stock_id FROM compliance_result);

-- Compliant with purification (approximately 20%)
INSERT INTO compliance_result (stock_id, business_activity_compliant, debt_ratio, debt_ratio_compliant, liquidity_ratio, liquidity_ratio_compliant, income_ratio, income_ratio_compliant, is_compliant, requires_purification, purification_percentage, screening_status, screened_at, created_at, updated_at)
SELECT id, true,
    ROUND((RANDOM() * 0.30)::numeric, 4),
    true,
    ROUND((RANDOM() * 0.28)::numeric, 4),
    true,
    ROUND((RANDOM() * 0.04)::numeric, 4), -- 0-4% non-halal income (requires purification)
    true,
    true,
    true,
    ROUND((RANDOM() * 4)::numeric, 2), -- 0-4% purification
    'COMPLIANT',
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
FROM stock
WHERE is_test_data = false
AND sector = 'Energy'
AND id NOT IN (SELECT stock_id FROM compliance_result);

-- Non-compliant - Financials sector (prohibited business activity)
INSERT INTO compliance_result (stock_id, business_activity_compliant, business_activity_reason, debt_ratio, debt_ratio_compliant, liquidity_ratio, liquidity_ratio_compliant, income_ratio, income_ratio_compliant, is_compliant, requires_purification, purification_percentage, screening_status, screened_at, created_at, updated_at)
SELECT id, false, 'Operates in prohibited sector: Conventional Financial Services',
    ROUND((RANDOM() * 0.20)::numeric, 4),
    true,
    ROUND((RANDOM() * 0.25)::numeric, 4),
    true,
    0.00,
    true,
    false,
    false,
    0,
    'NON_COMPLIANT',
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
FROM stock
WHERE is_test_data = false
AND sector = 'Financials'
AND id NOT IN (SELECT stock_id FROM compliance_result);

-- Non-compliant - High debt ratio
INSERT INTO compliance_result (stock_id, business_activity_compliant, debt_ratio, debt_ratio_compliant, liquidity_ratio, liquidity_ratio_compliant, income_ratio, income_ratio_compliant, is_compliant, requires_purification, purification_percentage, screening_status, screened_at, created_at, updated_at)
SELECT id, true,
    ROUND((0.35 + RANDOM() * 0.25)::numeric, 4), -- 35-60% debt ratio (exceeds 33% threshold)
    false,
    ROUND((RANDOM() * 0.25)::numeric, 4),
    true,
    ROUND((RANDOM() * 0.03)::numeric, 4),
    true,
    false,
    false,
    0,
    'NON_COMPLIANT',
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
FROM stock
WHERE is_test_data = false
AND sector = 'Real Estate'
AND id NOT IN (SELECT stock_id FROM compliance_result);

-- Non-compliant - High liquidity ratio (Communication Services as example)
INSERT INTO compliance_result (stock_id, business_activity_compliant, debt_ratio, debt_ratio_compliant, liquidity_ratio, liquidity_ratio_compliant, income_ratio, income_ratio_compliant, is_compliant, requires_purification, purification_percentage, screening_status, screened_at, created_at, updated_at)
SELECT id, true,
    ROUND((RANDOM() * 0.30)::numeric, 4),
    true,
    ROUND((0.35 + RANDOM() * 0.20)::numeric, 4), -- 35-55% liquidity (exceeds 33% threshold)
    false,
    ROUND((RANDOM() * 0.03)::numeric, 4),
    true,
    false,
    false,
    0,
    'NON_COMPLIANT',
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
FROM stock
WHERE is_test_data = false
AND sector = 'Communication Services'
AND id NOT IN (SELECT stock_id FROM compliance_result);

-- Unable to verify for any remaining stocks without compliance data
INSERT INTO compliance_result (stock_id, business_activity_compliant, is_compliant, screening_status, screened_at, created_at, updated_at)
SELECT id, true, false, 'UNABLE_TO_VERIFY', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
FROM stock WHERE id NOT IN (SELECT stock_id FROM compliance_result);

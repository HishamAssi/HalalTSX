import { StockSummary, ComplianceStatus } from '@/types';

export const createMockStock = (overrides: Partial<StockSummary> = {}): StockSummary => ({
  id: 1,
  symbol: 'TEST.TO',
  name: 'Test Company Inc.',
  sector: 'Technology',
  currentPrice: 100.0,
  priceChange: 2.5,
  priceChangePercent: 2.56,
  marketCap: 5000000000,
  complianceStatus: 'COMPLIANT' as ComplianceStatus,
  requiresPurification: false,
  priceUpdatedAt: '2026-01-25T12:00:00Z',
  ...overrides,
});

export const createMockStockWithNulls = (): StockSummary => ({
  id: 2,
  symbol: 'NULL.TO',
  name: 'Null Values Corp',
  sector: null,
  currentPrice: 50.0,
  priceChange: null,
  priceChangePercent: null,
  marketCap: null,
  complianceStatus: 'COMPLIANT' as ComplianceStatus,
  requiresPurification: false,
  priceUpdatedAt: null,
});

export const createMockNonCompliantStock = (): StockSummary => ({
  id: 3,
  symbol: 'BAD.TO',
  name: 'Non Compliant Inc.',
  sector: 'Financials',
  currentPrice: 75.0,
  priceChange: -1.5,
  priceChangePercent: -1.96,
  marketCap: 10000000000,
  complianceStatus: 'NON_COMPLIANT' as ComplianceStatus,
  requiresPurification: false,
  priceUpdatedAt: '2026-01-25T10:00:00Z',
});

export const createMockUnverifiedStock = (): StockSummary => ({
  id: 4,
  symbol: 'UNKNOWN.TO',
  name: 'Unverified Corp',
  sector: 'Consumer Discretionary',
  currentPrice: 25.0,
  priceChange: 0,
  priceChangePercent: 0,
  marketCap: 500000000,
  complianceStatus: 'UNABLE_TO_VERIFY' as ComplianceStatus,
  requiresPurification: false,
  priceUpdatedAt: '2026-01-25T09:00:00Z',
});

export const createMockPurificationStock = (): StockSummary => ({
  id: 5,
  symbol: 'PURE.TO',
  name: 'Purification Required Inc.',
  sector: 'Energy',
  currentPrice: 60.0,
  priceChange: 0.5,
  priceChangePercent: 0.84,
  marketCap: 8000000000,
  complianceStatus: 'COMPLIANT' as ComplianceStatus,
  requiresPurification: true,
  priceUpdatedAt: '2026-01-25T11:00:00Z',
});

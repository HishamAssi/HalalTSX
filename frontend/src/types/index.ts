// Stock types
export interface StockSummary {
  id: number;
  symbol: string;
  name: string;
  sector?: string | null;
  currentPrice: number;
  priceChange?: number | null;
  priceChangePercent?: number | null;
  marketCap?: number | null;
  complianceStatus: ComplianceStatus;
  requiresPurification?: boolean;
  priceUpdatedAt?: string | null;
}

export interface StockDetail extends StockSummary {
  subIndustry?: string;
  compliance?: ComplianceSummary;
}

// Compliance types
export type ComplianceStatus = 'COMPLIANT' | 'NON_COMPLIANT' | 'UNABLE_TO_VERIFY';

export interface ComplianceSummary {
  status: ComplianceStatus;
  businessActivityCompliant?: boolean;
  debtRatioCompliant?: boolean;
  liquidityRatioCompliant?: boolean;
  incomeRatioCompliant?: boolean;
  requiresPurification?: boolean;
  purificationPercentage?: number;
  screenedAt: string;
}

export interface ComplianceCriterion {
  name: 'BUSINESS_ACTIVITY' | 'DEBT_RATIO' | 'LIQUIDITY_RATIO' | 'INCOME_RATIO';
  displayName: string;
  compliant: boolean;
  value?: number;
  threshold?: number;
  reason?: string;
}

export interface ComplianceDetail {
  stockSymbol: string;
  status: ComplianceStatus;
  criteria: ComplianceCriterion[];
  requiresPurification?: boolean;
  purificationPercentage?: number;
  screenedAt: string;
  dataSource?: string;
}

// Price history types
export interface PricePoint {
  date: string;
  open?: number;
  high?: number;
  low?: number;
  close: number;
  volume?: number;
}

export type PriceHistoryPeriod = '1W' | '1M' | '3M' | '6M' | '1Y' | '5Y' | 'MAX';

// Sector types
export interface Sector {
  name: string;
  stockCount: number;
  compliantCount?: number;
}

// Education types
export interface ScreeningCriterion {
  id: string;
  name: string;
  description: string;
  threshold: string;
  thresholdValue?: number | null;
  rationale: string;
  category: string;
  source: string;
  displayOrder: number;
}

// API Response types
export interface StockListResponse {
  content: StockSummary[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  dataFreshness?: DataFreshness;
}

export interface StockDetailResponse {
  id: number;
  symbol: string;
  name: string;
  sector?: string;
  exchange?: string;
  description?: string;
  currentPrice?: number;
  priceChange?: number;
  priceChangePercent?: number;
  dayHigh?: number;
  dayLow?: number;
  weekHigh52?: number;
  weekLow52?: number;
  previousClose?: number;
  volume?: number;
  marketCap?: number;
  complianceStatus: ComplianceStatus;
  requiresPurification?: boolean;
  purificationPercentage?: number;
  compliance?: ComplianceBreakdown;
  priceUpdatedAt?: string;
  complianceScreenedAt?: string;
  dataFreshness?: DataFreshness;
}

export interface ComplianceBreakdown {
  status: ComplianceStatus;
  isCompliant: boolean;
  requiresPurification?: boolean;
  purificationPercentage?: number;
  screenedAt?: string;
  criteria: ComplianceCriterionDetail[];
}

export interface ComplianceCriterionDetail {
  name: string;
  description: string;
  passed: boolean;
  threshold: string;
  currentValue: string;
  reason?: string;
}

export interface PriceHistoryResponse {
  symbol: string;
  period: string;
  startDate?: string;
  endDate?: string;
  dataPoints: number;
  prices: PricePoint[];
  dataFreshness?: DataFreshness;
}

export interface ComplianceDetailResponse {
  compliance: ComplianceDetail;
}

export interface SectorListResponse {
  sectors: Sector[];
}

export interface EducationResponse {
  title: string;
  introduction: string;
  criteria: ScreeningCriterion[];
  additionalResources: string[];
  disclaimer: string;
}

export interface DataFreshness {
  pricesUpdatedAt?: string;
  financialsUpdatedAt?: string;
  isStale: boolean;
  message?: string;
}

export interface HealthResponse {
  status: 'UP' | 'DEGRADED' | 'DOWN';
  database?: 'UP' | 'DOWN';
  externalApi?: 'UP' | 'DOWN';
  lastPriceUpdate?: string;
  stockCount?: number;
}

export interface ErrorResponse {
  error: string;
  message: string;
  details?: Record<string, unknown>;
  timestamp: string;
}

// Filter types
export interface StockFilters {
  search?: string;
  compliance?: ComplianceStatus | 'ALL';
  sector?: string;
  sort?: 'name' | 'symbol' | 'price' | 'marketCap' | 'sector';
  direction?: 'asc' | 'desc';
  page?: number;
  size?: number;
}

// Data mode types
export type DataMode = 'test' | 'full';

export interface DataModeResponse {
  mode: DataMode;
  displayName: string;
  stockCount: number;
  compliantCount: number;
  allowRuntimeSwitch: boolean;
  description: string;
}

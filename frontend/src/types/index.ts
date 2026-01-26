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

export type PriceHistoryPeriod = '1M' | '3M' | '6M' | '1Y' | '5Y';

// Sector types
export interface Sector {
  name: string;
  stockCount: number;
  compliantCount?: number;
}

// Education types
export interface ScreeningCriterion {
  name: string;
  description: string;
  threshold?: string;
  rationale?: string;
  calculation?: string;
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
  stock: StockDetail;
  dataFreshness?: DataFreshness;
}

export interface PriceHistoryResponse {
  symbol: string;
  period: string;
  prices: PricePoint[];
}

export interface ComplianceDetailResponse {
  compliance: ComplianceDetail;
}

export interface SectorListResponse {
  sectors: Sector[];
}

export interface EducationResponse {
  criteria: ScreeningCriterion[];
  introduction?: string;
  methodology?: string;
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

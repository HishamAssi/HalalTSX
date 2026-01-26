import axios, { AxiosInstance, AxiosError } from 'axios';
import {
  StockListResponse,
  StockDetailResponse,
  PriceHistoryResponse,
  ComplianceDetailResponse,
  SectorListResponse,
  EducationResponse,
  HealthResponse,
  StockFilters,
  PriceHistoryPeriod,
  ErrorResponse,
} from '@/types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api/v1';

const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ErrorResponse>) => {
    const message = error.response?.data?.message || error.message || 'An error occurred';
    console.error('API Error:', message);
    return Promise.reject(error);
  }
);

export const stockApi = {
  getStocks: async (filters: StockFilters = {}): Promise<StockListResponse> => {
    const params = new URLSearchParams();

    if (filters.search) params.append('search', filters.search);
    if (filters.compliance && filters.compliance !== 'ALL') {
      params.append('compliance', filters.compliance);
    }
    if (filters.sector) params.append('sector', filters.sector);
    if (filters.sort) params.append('sort', filters.sort);
    if (filters.direction) params.append('direction', filters.direction);
    if (filters.page !== undefined) params.append('page', String(filters.page));
    if (filters.size) params.append('size', String(filters.size));

    const response = await apiClient.get<StockListResponse>(`/stocks?${params.toString()}`);
    return response.data;
  },

  getStockBySymbol: async (symbol: string): Promise<StockDetailResponse> => {
    const response = await apiClient.get<StockDetailResponse>(`/stocks/${encodeURIComponent(symbol)}`);
    return response.data;
  },

  getStockPriceHistory: async (
    symbol: string,
    period: PriceHistoryPeriod = '1Y'
  ): Promise<PriceHistoryResponse> => {
    const response = await apiClient.get<PriceHistoryResponse>(
      `/stocks/${encodeURIComponent(symbol)}/price-history?period=${period}`
    );
    return response.data;
  },

  getStockCompliance: async (symbol: string): Promise<ComplianceDetailResponse> => {
    const response = await apiClient.get<ComplianceDetailResponse>(
      `/stocks/${encodeURIComponent(symbol)}/compliance`
    );
    return response.data;
  },
};

export const sectorApi = {
  getSectors: async (): Promise<SectorListResponse> => {
    const response = await apiClient.get<SectorListResponse>('/sectors');
    return response.data;
  },
};

export const educationApi = {
  getScreeningCriteria: async (): Promise<EducationResponse> => {
    const response = await apiClient.get<EducationResponse>('/education/criteria');
    return response.data;
  },
};

export const healthApi = {
  getHealth: async (): Promise<HealthResponse> => {
    const response = await apiClient.get<HealthResponse>('/health');
    return response.data;
  },
};

export default apiClient;

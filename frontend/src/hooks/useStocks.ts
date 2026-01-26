import { useQuery } from '@tanstack/react-query';
import { stockApi } from '@/services/api';
import { StockFilters, StockListResponse } from '@/types';

export function useStocks(filters: StockFilters = {}) {
  return useQuery<StockListResponse>({
    queryKey: ['stocks', filters],
    queryFn: () => stockApi.getStocks(filters),
    staleTime: 30000,
  });
}

export function useStockDetail(symbol: string) {
  return useQuery({
    queryKey: ['stock', symbol],
    queryFn: () => stockApi.getStockBySymbol(symbol),
    enabled: !!symbol,
    staleTime: 30000,
  });
}

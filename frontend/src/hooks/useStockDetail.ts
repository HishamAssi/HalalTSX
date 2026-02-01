import { useQuery } from '@tanstack/react-query';
import { stockApi } from '@/services/api';
import { StockDetailResponse } from '@/types';

export function useStockDetail(symbol: string) {
  return useQuery<StockDetailResponse>({
    queryKey: ['stock', symbol],
    queryFn: () => stockApi.getStockBySymbol(symbol),
    enabled: !!symbol,
    staleTime: 30 * 1000, // 30 seconds
    refetchInterval: 60 * 1000, // Refetch every minute
  });
}

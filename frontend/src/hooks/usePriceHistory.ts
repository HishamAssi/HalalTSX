import { useQuery } from '@tanstack/react-query';
import { stockApi } from '@/services/api';
import { PriceHistoryResponse, PriceHistoryPeriod } from '@/types';

export function usePriceHistory(symbol: string, period: PriceHistoryPeriod = '1Y') {
  return useQuery<PriceHistoryResponse>({
    queryKey: ['priceHistory', symbol, period],
    queryFn: () => stockApi.getStockPriceHistory(symbol, period),
    enabled: !!symbol,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

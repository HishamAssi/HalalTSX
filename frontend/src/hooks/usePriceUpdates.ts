import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';

const POLL_INTERVAL = 60000;

export function usePriceUpdates(enabled = true) {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!enabled) return;

    const interval = setInterval(() => {
      queryClient.invalidateQueries({ queryKey: ['stocks'] });
    }, POLL_INTERVAL);

    return () => clearInterval(interval);
  }, [enabled, queryClient]);
}

export function useStockPriceUpdates(symbol: string, enabled = true) {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!enabled || !symbol) return;

    const interval = setInterval(() => {
      queryClient.invalidateQueries({ queryKey: ['stock', symbol] });
    }, POLL_INTERVAL);

    return () => clearInterval(interval);
  }, [enabled, symbol, queryClient]);
}

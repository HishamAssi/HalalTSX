import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { configApi } from '@/services/api';
import { DataMode } from '@/types';

export function useDataMode() {
  return useQuery({
    queryKey: ['dataMode'],
    queryFn: () => configApi.getDataMode(),
    staleTime: 60000, // 1 minute
    refetchOnWindowFocus: false,
  });
}

export function useSwitchDataMode() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (mode: DataMode) => configApi.switchDataMode(mode),
    onSuccess: () => {
      // Invalidate all queries that depend on data mode
      queryClient.invalidateQueries({ queryKey: ['dataMode'] });
      queryClient.invalidateQueries({ queryKey: ['stocks'] });
      queryClient.invalidateQueries({ queryKey: ['sectors'] });
    },
  });
}

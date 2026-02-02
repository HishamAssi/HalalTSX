import { useQuery } from '@tanstack/react-query';
import { sectorApi } from '@/services/api';
import { Sector } from '@/types';

export function useSectors() {
  return useQuery<Sector[]>({
    queryKey: ['sectors'],
    queryFn: async () => {
      const response = await sectorApi.getSectors();
      return response.sectors;
    },
    staleTime: 5 * 60 * 1000, // Sectors rarely change, cache for 5 minutes
  });
}

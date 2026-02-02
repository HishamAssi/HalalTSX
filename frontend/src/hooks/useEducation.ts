import { useQuery } from '@tanstack/react-query';
import { educationApi } from '@/services/api';
import { EducationResponse } from '@/types';

export function useEducation() {
  return useQuery<EducationResponse>({
    queryKey: ['education', 'criteria'],
    queryFn: () => educationApi.getScreeningCriteria(),
    staleTime: 24 * 60 * 60 * 1000, // 24 hours - educational content rarely changes
    gcTime: 24 * 60 * 60 * 1000,
  });
}

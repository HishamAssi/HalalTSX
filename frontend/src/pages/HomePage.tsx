import { useState, useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useStocks } from '@/hooks/useStocks';
import { useSectors } from '@/hooks/useSectors';
import { usePriceUpdates } from '@/hooks/usePriceUpdates';
import StockList from '@/components/StockList/StockList';
import SearchFilter from '@/components/SearchFilter/SearchFilter';
import { ApiErrorFallback } from '@/components/ErrorBoundary';
import { StockFilters, ComplianceStatus, StockListResponse } from '@/types';

export default function HomePage() {
  const queryClient = useQueryClient();
  const [filters, setFilters] = useState<StockFilters>({
    page: 0,
    size: 20,
    compliance: 'ALL',
    search: '',
    sector: '',
  });

  const { data, isLoading, error, isFetching, refetch } = useStocks(filters);
  const { data: sectors = [], isLoading: sectorsLoading } = useSectors();

  usePriceUpdates(true);

  // Get cached data if API fails
  const cachedData = queryClient.getQueryData<StockListResponse>(['stocks', filters]);

  const handlePageChange = (newPage: number) => {
    setFilters((prev) => ({ ...prev, page: newPage }));
  };

  const handleSearchChange = useCallback((search: string) => {
    setFilters((prev) => ({ ...prev, search, page: 0 }));
  }, []);

  const handleComplianceChange = useCallback((compliance: ComplianceStatus | 'ALL') => {
    setFilters((prev) => ({ ...prev, compliance, page: 0 }));
  }, []);

  const handleSectorChange = useCallback((sector: string) => {
    setFilters((prev) => ({ ...prev, sector, page: 0 }));
  }, []);

  const handleClearAll = useCallback(() => {
    setFilters({
      page: 0,
      size: 20,
      compliance: 'ALL',
      search: '',
      sector: '',
    });
  }, []);

  const hasActiveFilters =
    filters.search !== '' ||
    filters.compliance !== 'ALL' ||
    filters.sector !== '';

  // Show error with cached fallback if available
  const showErrorWithCachedData = error && cachedData;
  const showErrorNoData = error && !cachedData;

  if (showErrorNoData) {
    return (
      <div className="text-center py-12">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
          <h2 className="text-lg font-semibold text-red-800 mb-2">Error Loading Stocks</h2>
          <p className="text-red-600">
            Unable to load stock data. Please try again later.
          </p>
          <button
            onClick={() => refetch()}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Halal Stock Screener
        </h1>
        <p className="text-gray-600">
          Find Shariah-compliant investment opportunities on the Toronto Stock Exchange
        </p>
      </div>

      <SearchFilter
        search={filters.search || ''}
        onSearchChange={handleSearchChange}
        compliance={filters.compliance || 'ALL'}
        onComplianceChange={handleComplianceChange}
        sector={filters.sector || ''}
        onSectorChange={handleSectorChange}
        sectors={sectors}
        sectorsLoading={sectorsLoading}
        onClearAll={handleClearAll}
        hasActiveFilters={hasActiveFilters}
      />

      {showErrorWithCachedData && (
        <div className="mb-6">
          <ApiErrorFallback
            error={error as Error}
            onRetry={() => refetch()}
            message="Failed to refresh stock data"
          />
        </div>
      )}

      {data?.dataFreshness?.isStale && !showErrorWithCachedData && (
        <div className="mb-6 bg-amber-50 border border-amber-200 rounded-lg p-4">
          <p className="text-amber-800 text-sm">
            {data.dataFreshness.message || 'Price data may be outdated'}
          </p>
        </div>
      )}

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-lg border border-gray-200 p-4 animate-pulse"
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <div className="h-5 bg-gray-200 rounded w-20 mb-2" />
                  <div className="h-4 bg-gray-200 rounded w-40" />
                </div>
                <div className="h-6 bg-gray-200 rounded w-20" />
              </div>
              <div className="flex justify-between items-center">
                <div className="h-4 bg-gray-200 rounded w-24" />
                <div className="h-6 bg-gray-200 rounded w-16" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <>
          {isFetching && (
            <div className="mb-4 text-sm text-gray-500 flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              Refreshing prices...
            </div>
          )}

          <StockList
            stocks={(data || cachedData)?.content || []}
            page={(data || cachedData)?.page || 0}
            totalPages={(data || cachedData)?.totalPages || 0}
            totalElements={(data || cachedData)?.totalElements || 0}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
}

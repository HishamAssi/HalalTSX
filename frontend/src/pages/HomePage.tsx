import { useState } from 'react';
import { useStocks } from '@/hooks/useStocks';
import { usePriceUpdates } from '@/hooks/usePriceUpdates';
import StockList from '@/components/StockList/StockList';
import { StockFilters } from '@/types';

export default function HomePage() {
  const [filters, setFilters] = useState<StockFilters>({
    page: 0,
    size: 20,
    compliance: 'ALL',
  });

  const { data, isLoading, error, isFetching } = useStocks(filters);

  usePriceUpdates(true);

  const handlePageChange = (newPage: number) => {
    setFilters((prev) => ({ ...prev, page: newPage }));
  };

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
          <h2 className="text-lg font-semibold text-red-800 mb-2">Error Loading Stocks</h2>
          <p className="text-red-600">
            Unable to load stock data. Please try again later.
          </p>
          <button
            onClick={() => window.location.reload()}
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

      {data?.dataFreshness?.isStale && (
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
            stocks={data?.content || []}
            page={data?.page || 0}
            totalPages={data?.totalPages || 0}
            totalElements={data?.totalElements || 0}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
}

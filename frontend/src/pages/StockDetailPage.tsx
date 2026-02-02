import { useParams, Link } from 'react-router-dom';
import { useStockDetail } from '@/hooks/useStockDetail';
import StockDetail from '@/components/StockDetail/StockDetail';

export default function StockDetailPage() {
  const { symbol } = useParams<{ symbol: string }>();
  const { data: stock, isLoading, error } = useStockDetail(symbol || '');

  if (!symbol) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No stock symbol provided</p>
        <Link
          to="/"
          className="text-green-600 hover:text-green-700 mt-4 inline-block"
        >
          &larr; Back to Stock List
        </Link>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
          <h2 className="text-lg font-semibold text-red-800 mb-2">
            Error Loading Stock
          </h2>
          <p className="text-red-600">
            Unable to load data for {symbol}. The stock may not exist or there
            was a server error.
          </p>
          <Link
            to="/"
            className="mt-4 inline-block px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Back to Stock List
          </Link>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        {/* Header Skeleton */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-32 mb-4" />
            <div className="flex items-center gap-3 mb-2">
              <div className="h-8 bg-gray-200 rounded w-24" />
              <div className="h-6 bg-gray-200 rounded w-20" />
            </div>
            <div className="h-5 bg-gray-200 rounded w-48 mb-2" />
            <div className="h-4 bg-gray-200 rounded w-32" />

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 mt-4 border-t border-gray-100">
              {[...Array(4)].map((_, i) => (
                <div key={i}>
                  <div className="h-4 bg-gray-200 rounded w-20 mb-2" />
                  <div className="h-5 bg-gray-200 rounded w-24" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Chart Skeleton */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="animate-pulse">
            <div className="flex justify-between items-center mb-4">
              <div className="h-6 bg-gray-200 rounded w-32" />
              <div className="flex gap-1">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-8 w-10 bg-gray-200 rounded" />
                ))}
              </div>
            </div>
            <div className="h-64 bg-gray-100 rounded" />
          </div>
        </div>

        {/* Compliance Skeleton */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="animate-pulse">
            <div className="flex justify-between items-center mb-6">
              <div className="h-6 bg-gray-200 rounded w-48" />
              <div className="flex gap-2">
                <div className="h-6 bg-gray-200 rounded w-24" />
                <div className="h-6 bg-gray-200 rounded w-20" />
              </div>
            </div>
            <div className="space-y-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-32 bg-gray-100 rounded" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!stock) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Stock not found</p>
        <Link
          to="/"
          className="text-green-600 hover:text-green-700 mt-4 inline-block"
        >
          &larr; Back to Stock List
        </Link>
      </div>
    );
  }

  return <StockDetail stock={stock} />;
}

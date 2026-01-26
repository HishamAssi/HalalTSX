import { useParams, Link } from 'react-router-dom';
import { useStockDetail } from '@/hooks/useStocks';
import ComplianceIndicator from '@/components/ComplianceIndicator/ComplianceIndicator';

function formatPrice(price: number | null | undefined): string {
  if (price == null) return 'N/A';
  return new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD',
  }).format(price);
}

function formatMarketCap(marketCap: number | null | undefined): string {
  if (marketCap == null) return 'N/A';
  if (marketCap >= 1e12) return `$${(marketCap / 1e12).toFixed(2)}T`;
  if (marketCap >= 1e9) return `$${(marketCap / 1e9).toFixed(2)}B`;
  if (marketCap >= 1e6) return `$${(marketCap / 1e6).toFixed(2)}M`;
  return `$${marketCap.toLocaleString()}`;
}

export default function StockDetailPage() {
  const { symbol } = useParams<{ symbol: string }>();
  const { data, isLoading, error } = useStockDetail(symbol || '');

  if (isLoading) {
    return (
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-48 mb-4" />
        <div className="h-6 bg-gray-200 rounded w-64 mb-8" />
        <div className="h-64 bg-gray-200 rounded" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="text-center py-12">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
          <h2 className="text-lg font-semibold text-red-800 mb-2">Stock Not Found</h2>
          <p className="text-red-600 mb-4">
            Unable to load stock details for {symbol}
          </p>
          <Link
            to="/"
            className="inline-block px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Back to Stocks
          </Link>
        </div>
      </div>
    );
  }

  const stock = data.stock;

  return (
    <div>
      <Link
        to="/"
        className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6"
      >
        <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Stocks
      </Link>

      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold text-gray-900">{stock.symbol}</h1>
              <ComplianceIndicator
                status={stock.complianceStatus}
                requiresPurification={stock.requiresPurification}
                size="lg"
              />
            </div>
            <p className="text-xl text-gray-600">{stock.name}</p>
            {stock.sector && (
              <p className="text-gray-500 mt-1">
                {stock.sector}
                {stock.subIndustry && ` / ${stock.subIndustry}`}
              </p>
            )}
          </div>

          <div className="text-right">
            <p className="text-4xl font-bold text-gray-900">
              {formatPrice(stock.currentPrice)}
            </p>
            <p className="text-gray-500">
              Market Cap: {formatMarketCap(stock.marketCap)}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Price Chart</h2>
          <div className="h-64 flex items-center justify-center text-gray-400 border border-dashed border-gray-200 rounded">
            Price chart will be implemented in Phase 5 (User Story 3)
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Halal Compliance Breakdown
          </h2>
          <div className="h-64 flex items-center justify-center text-gray-400 border border-dashed border-gray-200 rounded">
            Compliance breakdown will be implemented in Phase 5 (User Story 3)
          </div>
        </div>
      </div>
    </div>
  );
}

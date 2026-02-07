import { Link } from 'react-router-dom';
import { StockSummary } from '@/types';
import ComplianceIndicator from '@/components/ComplianceIndicator/ComplianceIndicator';

interface StockCardProps {
  stock: StockSummary;
}

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

function formatTimestamp(timestamp: string | null | undefined): string {
  if (!timestamp) return 'Unknown';
  const date = new Date(timestamp);
  return date.toLocaleString('en-CA', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function isStalePrice(timestamp: string | null | undefined): boolean {
  if (!timestamp) return true;
  const date = new Date(timestamp);
  const now = new Date();
  const hoursDiff = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
  return hoursDiff > 24; // Price is stale if older than 24 hours
}

function formatPriceChange(percent: number | null | undefined): string | null {
  if (percent == null) return null;
  const sign = percent >= 0 ? '+' : '';
  return `${sign}${percent.toFixed(2)}%`;
}

export default function StockCard({ stock }: StockCardProps) {
  const priceChangeClass =
    stock.priceChange !== undefined && stock.priceChange !== null
      ? stock.priceChange >= 0
        ? 'text-green-600'
        : 'text-red-600'
      : '';

  const isStale = isStalePrice(stock.priceUpdatedAt);

  return (
    <Link
      to={`/stock/${encodeURIComponent(stock.symbol)}`}
      className="block bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md hover:border-gray-300 transition-all"
    >
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-gray-900 truncate">{stock.symbol}</h3>
            <ComplianceIndicator
              status={stock.complianceStatus}
              requiresPurification={stock.requiresPurification}
              showLabel={false}
              size="sm"
            />
          </div>
          <p className="text-sm text-gray-600 truncate">{stock.name}</p>
        </div>
        <div className="text-right ml-4">
          <p className="font-semibold text-gray-900">{formatPrice(stock.currentPrice)}</p>
          {formatPriceChange(stock.priceChangePercent) && (
            <p className={`text-sm ${priceChangeClass}`}>
              {formatPriceChange(stock.priceChangePercent)}
            </p>
          )}
        </div>
      </div>

      <div className="flex justify-between items-center text-sm">
        <div className="flex items-center gap-4">
          {stock.sector && (
            <span className="text-gray-500 truncate max-w-[150px]">{stock.sector}</span>
          )}
          <span className="text-gray-400">{formatMarketCap(stock.marketCap)}</span>
        </div>
        <ComplianceIndicator
          status={stock.complianceStatus}
          requiresPurification={stock.requiresPurification}
          size="sm"
        />
      </div>

      <div className="mt-3 pt-3 border-t border-gray-100">
        <div className="flex items-center gap-2">
          {isStale && (
            <span className="inline-flex items-center gap-1 text-xs text-amber-600">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              Stale
            </span>
          )}
          <p className={`text-xs ${isStale ? 'text-amber-500' : 'text-gray-400'}`}>
            Updated: {formatTimestamp(stock.priceUpdatedAt)}
          </p>
        </div>
      </div>
    </Link>
  );
}

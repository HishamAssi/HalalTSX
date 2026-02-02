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
        <p className="text-xs text-gray-400">
          Updated: {formatTimestamp(stock.priceUpdatedAt)}
        </p>
      </div>
    </Link>
  );
}

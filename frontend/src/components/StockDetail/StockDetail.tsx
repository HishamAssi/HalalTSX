import { useState } from 'react';
import { Link } from 'react-router-dom';
import { StockDetailResponse, PriceHistoryPeriod } from '@/types';
import { usePriceHistory } from '@/hooks/usePriceHistory';
import ComplianceIndicator from '@/components/ComplianceIndicator/ComplianceIndicator';
import ComplianceBreakdown from '@/components/ComplianceBreakdown/ComplianceBreakdown';
import PriceChart from '@/components/PriceChart/PriceChart';

interface StockDetailProps {
  stock: StockDetailResponse;
}

function formatPrice(price: number | undefined | null): string {
  if (price == null) return 'N/A';
  return new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD',
  }).format(price);
}

function formatMarketCap(marketCap: number | undefined | null): string {
  if (marketCap == null) return 'N/A';
  if (marketCap >= 1e12) return `$${(marketCap / 1e12).toFixed(2)}T`;
  if (marketCap >= 1e9) return `$${(marketCap / 1e9).toFixed(2)}B`;
  if (marketCap >= 1e6) return `$${(marketCap / 1e6).toFixed(2)}M`;
  return `$${marketCap.toLocaleString()}`;
}

function formatPriceChange(change: number | null | undefined): string | null {
  if (change == null) return null;
  const sign = change >= 0 ? '+' : '';
  return `${sign}${change.toFixed(2)}%`;
}

function formatVolume(volume: number | undefined | null): string {
  if (volume == null) return 'N/A';
  return volume.toLocaleString();
}

export default function StockDetail({ stock }: StockDetailProps) {
  const [period, setPeriod] = useState<PriceHistoryPeriod>('1Y');
  const { data: priceHistory, isLoading: priceHistoryLoading } = usePriceHistory(
    stock.symbol,
    period
  );

  const priceChangeColor =
    stock.priceChange != null
      ? stock.priceChange >= 0
        ? 'text-green-600'
        : 'text-red-600'
      : '';

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <Link
              to="/"
              className="text-sm text-green-600 hover:text-green-700 mb-2 inline-block"
            >
              &larr; Back to Stock List
            </Link>
            <div className="flex items-center gap-3 mt-2">
              <h1 className="text-2xl font-bold text-gray-900">{stock.symbol}</h1>
              <ComplianceIndicator
                status={stock.complianceStatus}
                requiresPurification={stock.requiresPurification}
                size="md"
              />
            </div>
            <p className="text-lg text-gray-600 mt-1">{stock.name}</p>
            {stock.sector && (
              <p className="text-sm text-gray-500 mt-1">{stock.sector}</p>
            )}
          </div>

          <div className="text-right">
            <p className="text-3xl font-bold text-gray-900">
              {formatPrice(stock.currentPrice)}
            </p>
            {formatPriceChange(stock.priceChangePercent) && (
              <p className={`text-lg ${priceChangeColor}`}>
                {formatPriceChange(stock.priceChangePercent)}
              </p>
            )}
          </div>
        </div>

        {/* Key Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-gray-100">
          <div>
            <p className="text-sm text-gray-500">Day Range</p>
            <p className="font-medium text-gray-900">
              {formatPrice(stock.dayLow)} - {formatPrice(stock.dayHigh)}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">52 Week Range</p>
            <p className="font-medium text-gray-900">
              {formatPrice(stock.weekLow52)} - {formatPrice(stock.weekHigh52)}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Market Cap</p>
            <p className="font-medium text-gray-900">
              {formatMarketCap(stock.marketCap)}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Volume</p>
            <p className="font-medium text-gray-900">{formatVolume(stock.volume)}</p>
          </div>
        </div>

        {/* Previous Close */}
        <div className="flex flex-wrap gap-6 mt-4 pt-4 border-t border-gray-100 text-sm">
          <div>
            <span className="text-gray-500">Previous Close: </span>
            <span className="font-medium text-gray-900">
              {formatPrice(stock.previousClose)}
            </span>
          </div>
          {stock.exchange && (
            <div>
              <span className="text-gray-500">Exchange: </span>
              <span className="font-medium text-gray-900">{stock.exchange}</span>
            </div>
          )}
        </div>

        {/* Data Freshness Warning */}
        {stock.dataFreshness?.isStale && (
          <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
            <p className="text-sm text-amber-800">
              {stock.dataFreshness.message || 'Price data may be outdated'}
            </p>
          </div>
        )}
      </div>

      {/* Price Chart */}
      <PriceChart
        prices={priceHistory?.prices || []}
        symbol={stock.symbol}
        period={period}
        onPeriodChange={setPeriod}
        isLoading={priceHistoryLoading}
      />

      {/* Compliance Breakdown */}
      {stock.compliance && (
        <ComplianceBreakdown
          compliance={stock.compliance}
          requiresPurification={stock.requiresPurification}
          purificationPercentage={stock.purificationPercentage}
        />
      )}

      {/* Company Description */}
      {stock.description && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            About {stock.name}
          </h3>
          <p className="text-gray-600 leading-relaxed">{stock.description}</p>
        </div>
      )}
    </div>
  );
}

import { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from 'recharts';
import { PricePoint, PriceHistoryPeriod } from '@/types';

interface PriceChartProps {
  prices: PricePoint[];
  symbol?: string;
  period: PriceHistoryPeriod;
  onPeriodChange: (period: PriceHistoryPeriod) => void;
  isLoading?: boolean;
}

const PERIOD_OPTIONS: { value: PriceHistoryPeriod; label: string }[] = [
  { value: '1W', label: '1W' },
  { value: '1M', label: '1M' },
  { value: '3M', label: '3M' },
  { value: '6M', label: '6M' },
  { value: '1Y', label: '1Y' },
  { value: '5Y', label: '5Y' },
];

export default function PriceChart({
  prices,
  period,
  onPeriodChange,
  isLoading = false,
}: PriceChartProps) {
  const [chartType, setChartType] = useState<'line' | 'area'>('area');

  // Sort prices by date ascending for the chart
  const sortedPrices = [...prices].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  // Calculate price change for color
  const priceChange =
    sortedPrices.length >= 2
      ? sortedPrices[sortedPrices.length - 1].close - sortedPrices[0].close
      : 0;
  const isPositive = priceChange >= 0;
  const chartColor = isPositive ? '#16a34a' : '#dc2626';

  // Format date based on period
  const formatDate = (date: string) => {
    const d = new Date(date);
    if (period === '1W' || period === '1M') {
      return d.toLocaleDateString('en-CA', { month: 'short', day: 'numeric' });
    }
    if (period === '3M' || period === '6M' || period === '1Y') {
      return d.toLocaleDateString('en-CA', { month: 'short', year: '2-digit' });
    }
    return d.toLocaleDateString('en-CA', { year: 'numeric' });
  };

  // Format price for tooltip
  const formatPrice = (value: number) =>
    new Intl.NumberFormat('en-CA', {
      style: 'currency',
      currency: 'CAD',
    }).format(value);

  // Custom tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-3">
          <p className="text-sm text-gray-500">
            {new Date(label).toLocaleDateString('en-CA', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
          <p className="text-lg font-semibold text-gray-900">
            {formatPrice(data.close)}
          </p>
          {data.high && data.low && (
            <div className="text-xs text-gray-500 mt-1">
              <span>H: {formatPrice(data.high)}</span>
              <span className="mx-2">|</span>
              <span>L: {formatPrice(data.low)}</span>
            </div>
          )}
          {data.volume && (
            <p className="text-xs text-gray-500">
              Vol: {data.volume.toLocaleString()}
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex justify-between items-center mb-4">
          <div className="h-6 bg-gray-200 rounded w-32 animate-pulse" />
          <div className="flex gap-1">
            {PERIOD_OPTIONS.map((_, i) => (
              <div
                key={i}
                className="h-8 w-10 bg-gray-200 rounded animate-pulse"
              />
            ))}
          </div>
        </div>
        <div className="h-64 bg-gray-100 rounded animate-pulse" />
      </div>
    );
  }

  if (prices.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Price History</h3>
          <div className="flex gap-1">
            {PERIOD_OPTIONS.map((option) => (
              <button
                key={option.value}
                onClick={() => onPeriodChange(option.value)}
                className={`px-3 py-1 text-sm rounded ${
                  period === option.value
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
        <div className="h-64 flex items-center justify-center text-gray-500">
          No price history available for this period
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-4">
          <h3 className="text-lg font-semibold text-gray-900">Price History</h3>
          <div className="flex gap-1 border border-gray-200 rounded-lg overflow-hidden">
            <button
              onClick={() => setChartType('area')}
              className={`px-2 py-1 text-xs ${
                chartType === 'area'
                  ? 'bg-gray-100 text-gray-900'
                  : 'text-gray-500 hover:bg-gray-50'
              }`}
            >
              Area
            </button>
            <button
              onClick={() => setChartType('line')}
              className={`px-2 py-1 text-xs ${
                chartType === 'line'
                  ? 'bg-gray-100 text-gray-900'
                  : 'text-gray-500 hover:bg-gray-50'
              }`}
            >
              Line
            </button>
          </div>
        </div>
        <div className="flex gap-1">
          {PERIOD_OPTIONS.map((option) => (
            <button
              key={option.value}
              onClick={() => onPeriodChange(option.value)}
              className={`px-3 py-1 text-sm rounded transition-colors ${
                period === option.value
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === 'area' ? (
            <AreaChart data={sortedPrices}>
              <defs>
                <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={chartColor} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={chartColor} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis
                dataKey="date"
                tickFormatter={formatDate}
                stroke="#9ca3af"
                fontSize={12}
                tickLine={false}
              />
              <YAxis
                domain={['auto', 'auto']}
                tickFormatter={(value) => `$${value.toFixed(0)}`}
                stroke="#9ca3af"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="close"
                stroke={chartColor}
                strokeWidth={2}
                fill="url(#colorPrice)"
              />
            </AreaChart>
          ) : (
            <LineChart data={sortedPrices}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis
                dataKey="date"
                tickFormatter={formatDate}
                stroke="#9ca3af"
                fontSize={12}
                tickLine={false}
              />
              <YAxis
                domain={['auto', 'auto']}
                tickFormatter={(value) => `$${value.toFixed(0)}`}
                stroke="#9ca3af"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="close"
                stroke={chartColor}
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
}

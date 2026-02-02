import { Sector } from '@/types';

interface SectorFilterProps {
  sectors: Sector[];
  value: string;
  onChange: (value: string) => void;
  isLoading?: boolean;
}

export default function SectorFilter({
  sectors,
  value,
  onChange,
  isLoading = false,
}: SectorFilterProps) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={isLoading}
        className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm bg-white disabled:bg-gray-100 disabled:cursor-not-allowed appearance-none pr-8"
      >
        <option value="">All Sectors</option>
        {sectors.map((sector) => (
          <option key={sector.name} value={sector.name}>
            {sector.name} ({sector.stockCount})
          </option>
        ))}
      </select>
      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
        {isLoading ? (
          <svg
            className="animate-spin h-4 w-4 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
        ) : (
          <svg
            className="h-4 w-4 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        )}
      </div>
    </div>
  );
}

import { ComplianceStatus, Sector } from '@/types';
import SearchInput from './SearchInput';
import ComplianceFilter from './ComplianceFilter';
import SectorFilter from './SectorFilter';

interface SearchFilterProps {
  search: string;
  onSearchChange: (value: string) => void;
  compliance: ComplianceStatus | 'ALL';
  onComplianceChange: (value: ComplianceStatus | 'ALL') => void;
  sector: string;
  onSectorChange: (value: string) => void;
  sectors: Sector[];
  sectorsLoading?: boolean;
  onClearAll: () => void;
  hasActiveFilters: boolean;
}

export default function SearchFilter({
  search,
  onSearchChange,
  compliance,
  onComplianceChange,
  sector,
  onSectorChange,
  sectors,
  sectorsLoading = false,
  onClearAll,
  hasActiveFilters,
}: SearchFilterProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Search Input */}
        <div className="flex-1 min-w-0">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Search
          </label>
          <SearchInput
            value={search}
            onChange={onSearchChange}
            placeholder="Search by name or ticker..."
          />
        </div>

        {/* Sector Filter */}
        <div className="w-full lg:w-48">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Sector
          </label>
          <SectorFilter
            sectors={sectors}
            value={sector}
            onChange={onSectorChange}
            isLoading={sectorsLoading}
          />
        </div>
      </div>

      {/* Compliance Filter */}
      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Compliance Status
        </label>
        <div className="flex flex-wrap items-center gap-2">
          <ComplianceFilter value={compliance} onChange={onComplianceChange} />

          {hasActiveFilters && (
            <button
              onClick={onClearAll}
              className="ml-auto px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Clear All Filters
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

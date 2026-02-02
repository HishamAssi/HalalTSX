import { ComplianceStatus } from '@/types';

interface ComplianceFilterProps {
  value: ComplianceStatus | 'ALL';
  onChange: (value: ComplianceStatus | 'ALL') => void;
}

const options: { value: ComplianceStatus | 'ALL'; label: string; color: string }[] = [
  { value: 'ALL', label: 'All Stocks', color: 'bg-gray-100 text-gray-800 border-gray-300' },
  { value: 'COMPLIANT', label: 'Halal Only', color: 'bg-green-100 text-green-800 border-green-300' },
  { value: 'NON_COMPLIANT', label: 'Non-Halal', color: 'bg-red-100 text-red-800 border-red-300' },
  { value: 'UNABLE_TO_VERIFY', label: 'Unverified', color: 'bg-amber-100 text-amber-800 border-amber-300' },
];

export default function ComplianceFilter({ value, onChange }: ComplianceFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => onChange(option.value)}
          className={`px-3 py-1.5 text-sm font-medium rounded-full border transition-all ${
            value === option.value
              ? option.color + ' ring-2 ring-offset-1 ring-green-500'
              : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

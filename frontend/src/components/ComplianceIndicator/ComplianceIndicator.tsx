import { ComplianceStatus } from '@/types';

interface ComplianceIndicatorProps {
  status: ComplianceStatus;
  requiresPurification?: boolean;
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const statusConfig = {
  COMPLIANT: {
    bgColor: 'bg-green-100',
    textColor: 'text-green-800',
    borderColor: 'border-green-200',
    dotColor: 'bg-green-500',
    label: 'Halal',
  },
  NON_COMPLIANT: {
    bgColor: 'bg-red-100',
    textColor: 'text-red-800',
    borderColor: 'border-red-200',
    dotColor: 'bg-red-500',
    label: 'Not Halal',
  },
  UNABLE_TO_VERIFY: {
    bgColor: 'bg-amber-100',
    textColor: 'text-amber-800',
    borderColor: 'border-amber-200',
    dotColor: 'bg-amber-500',
    label: 'Unverified',
  },
};

const sizeConfig = {
  sm: {
    padding: 'px-2 py-0.5',
    text: 'text-xs',
    dot: 'w-1.5 h-1.5',
  },
  md: {
    padding: 'px-2.5 py-1',
    text: 'text-sm',
    dot: 'w-2 h-2',
  },
  lg: {
    padding: 'px-3 py-1.5',
    text: 'text-base',
    dot: 'w-2.5 h-2.5',
  },
};

export default function ComplianceIndicator({
  status,
  requiresPurification,
  showLabel = true,
  size = 'md',
}: ComplianceIndicatorProps) {
  const config = statusConfig[status];
  const sizeStyles = sizeConfig[size];

  return (
    <div className="flex items-center gap-2">
      <span
        className={`inline-flex items-center gap-1.5 ${sizeStyles.padding} rounded-full border ${config.bgColor} ${config.textColor} ${config.borderColor} font-medium ${sizeStyles.text}`}
      >
        <span className={`${sizeStyles.dot} rounded-full ${config.dotColor}`} />
        {showLabel && config.label}
      </span>
      {requiresPurification && status === 'COMPLIANT' && (
        <span
          className={`inline-flex items-center ${sizeStyles.padding} rounded-full bg-blue-100 text-blue-800 border border-blue-200 font-medium ${sizeStyles.text}`}
        >
          Purification Required
        </span>
      )}
    </div>
  );
}

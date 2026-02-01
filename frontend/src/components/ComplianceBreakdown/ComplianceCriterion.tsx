import { ComplianceCriterionDetail } from '@/types';

interface ComplianceCriterionProps {
  criterion: ComplianceCriterionDetail;
}

export default function ComplianceCriterion({ criterion }: ComplianceCriterionProps) {
  return (
    <div
      className={`p-4 rounded-lg border ${
        criterion.passed
          ? 'bg-green-50 border-green-200'
          : 'bg-red-50 border-red-200'
      }`}
    >
      <div className="flex items-start justify-between mb-2">
        <h4 className="font-semibold text-gray-900">{criterion.name}</h4>
        <span
          className={`px-2 py-0.5 text-xs font-medium rounded-full ${
            criterion.passed
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
          }`}
        >
          {criterion.passed ? 'PASS' : 'FAIL'}
        </span>
      </div>

      <p className="text-sm text-gray-600 mb-3">{criterion.description}</p>

      <div className="flex flex-wrap gap-4 text-sm">
        <div>
          <span className="text-gray-500">Threshold: </span>
          <span className="font-medium text-gray-900">{criterion.threshold}</span>
        </div>
        <div>
          <span className="text-gray-500">Current: </span>
          <span
            className={`font-medium ${
              criterion.passed ? 'text-green-700' : 'text-red-700'
            }`}
          >
            {criterion.currentValue}
          </span>
        </div>
      </div>

      {criterion.reason && (
        <p
          className={`mt-2 text-sm ${
            criterion.passed ? 'text-green-700' : 'text-red-700'
          }`}
        >
          {criterion.reason}
        </p>
      )}
    </div>
  );
}

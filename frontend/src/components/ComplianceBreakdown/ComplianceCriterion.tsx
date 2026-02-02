import { Link } from 'react-router-dom';
import { ComplianceCriterionDetail } from '@/types';

interface ComplianceCriterionProps {
  criterion: ComplianceCriterionDetail;
}

// Map criterion names to education page anchors
function getCriterionHelpLink(name: string): string | null {
  const nameNormalized = name.toLowerCase();
  if (nameNormalized.includes('business') || nameNormalized.includes('activity')) {
    return 'business-activity';
  }
  if (nameNormalized.includes('debt')) {
    return 'debt-ratio';
  }
  if (nameNormalized.includes('liquidity')) {
    return 'liquidity-ratio';
  }
  if (nameNormalized.includes('income')) {
    return 'income-ratio';
  }
  return null;
}

export default function ComplianceCriterion({ criterion }: ComplianceCriterionProps) {
  const helpLink = getCriterionHelpLink(criterion.name);

  return (
    <div
      className={`p-4 rounded-lg border ${
        criterion.passed
          ? 'bg-green-50 border-green-200'
          : 'bg-red-50 border-red-200'
      }`}
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2">
          <h4 className="font-semibold text-gray-900">{criterion.name}</h4>
          {helpLink && (
            <Link
              to={`/education#${helpLink}`}
              className="text-gray-400 hover:text-green-600 transition-colors"
              title="Learn more about this criterion"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </Link>
          )}
        </div>
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

import { ComplianceBreakdown as ComplianceBreakdownType, ComplianceStatus } from '@/types';
import ComplianceCriterion from './ComplianceCriterion';

interface ComplianceBreakdownProps {
  compliance: ComplianceBreakdownType;
  requiresPurification?: boolean;
  purificationPercentage?: number;
}

function getStatusDisplay(status: ComplianceStatus): { text: string; color: string } {
  switch (status) {
    case 'COMPLIANT':
      return { text: 'Halal Compliant', color: 'text-green-700 bg-green-100' };
    case 'NON_COMPLIANT':
      return { text: 'Not Halal Compliant', color: 'text-red-700 bg-red-100' };
    case 'UNABLE_TO_VERIFY':
      return { text: 'Unable to Verify', color: 'text-amber-700 bg-amber-100' };
    default:
      return { text: 'Unknown', color: 'text-gray-700 bg-gray-100' };
  }
}

export default function ComplianceBreakdown({
  compliance,
  requiresPurification,
  purificationPercentage,
}: ComplianceBreakdownProps) {
  const statusDisplay = getStatusDisplay(compliance.status);

  const passedCount = compliance.criteria.filter((c) => c.passed).length;
  const totalCount = compliance.criteria.length;

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 sm:mb-0">
          Halal Compliance Breakdown
        </h3>
        <div className="flex items-center gap-3">
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${statusDisplay.color}`}
          >
            {statusDisplay.text}
          </span>
          <span className="text-sm text-gray-500">
            {passedCount}/{totalCount} criteria passed
          </span>
        </div>
      </div>

      {requiresPurification && (
        <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <div className="flex items-start gap-3">
            <svg
              className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <div>
              <h4 className="font-semibold text-amber-800">
                Purification Required
              </h4>
              <p className="text-sm text-amber-700 mt-1">
                {purificationPercentage != null ? (
                  <>
                    This stock requires purification of{' '}
                    <span className="font-semibold">
                      {(purificationPercentage * 100).toFixed(2)}%
                    </span>{' '}
                    of any dividends or capital gains received.
                  </>
                ) : (
                  'This stock requires purification of dividends or capital gains received.'
                )}
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {compliance.criteria.map((criterion, index) => (
          <ComplianceCriterion key={index} criterion={criterion} />
        ))}
      </div>

      {compliance.screenedAt && (
        <p className="mt-4 text-xs text-gray-400">
          Last screened:{' '}
          {new Date(compliance.screenedAt).toLocaleString('en-CA', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          })}
        </p>
      )}

      <div className="mt-6 pt-4 border-t border-gray-100">
        <p className="text-xs text-gray-500">
          Compliance screening based on AAOIFI (Accounting and Auditing
          Organization for Islamic Financial Institutions) standards.{' '}
          <a href="/education" className="text-green-600 hover:underline">
            Learn more about the screening criteria
          </a>
        </p>
      </div>
    </div>
  );
}

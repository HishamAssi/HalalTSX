import { ScreeningCriterion } from '@/types';

interface CriterionExplanationProps {
  criterion: ScreeningCriterion;
  isExpanded?: boolean;
  onToggle?: () => void;
}

export default function CriterionExplanation({
  criterion,
  isExpanded = true,
  onToggle,
}: CriterionExplanationProps) {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Primary Screening':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Financial Ratio Screening':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Purification':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Primary Screening':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'Financial Ratio Screening':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
        );
      case 'Purification':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div
      id={criterion.id}
      className="bg-white rounded-lg border border-gray-200 overflow-hidden scroll-mt-20"
    >
      <button
        onClick={onToggle}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <span className={`flex items-center justify-center w-8 h-8 rounded-full ${getCategoryColor(criterion.category)}`}>
            {getCategoryIcon(criterion.category)}
          </span>
          <div className="text-left">
            <h3 className="text-lg font-semibold text-gray-900">{criterion.name}</h3>
            <span className={`inline-block mt-1 px-2 py-0.5 text-xs rounded-full ${getCategoryColor(criterion.category)}`}>
              {criterion.category}
            </span>
          </div>
        </div>
        <svg
          className={`w-5 h-5 text-gray-500 transform transition-transform ${isExpanded ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isExpanded && (
        <div className="px-6 pb-6 space-y-4">
          <div className="border-t border-gray-100 pt-4">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Description</h4>
            <p className="text-gray-600">{criterion.description}</p>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Threshold</h4>
            <p className="text-lg font-semibold text-green-700">{criterion.threshold}</p>
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2">Islamic Finance Rationale</h4>
            <p className="text-gray-600 leading-relaxed">{criterion.rationale}</p>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-500 pt-2 border-t border-gray-100">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <span>Source: {criterion.source}</span>
          </div>
        </div>
      )}
    </div>
  );
}

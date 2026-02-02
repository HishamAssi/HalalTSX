import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useEducation } from '@/hooks/useEducation';
import CriterionExplanation from '@/components/Education/CriterionExplanation';

export default function EducationPage() {
  const { data, isLoading, error } = useEducation();
  const location = useLocation();
  const [expandedCriteria, setExpandedCriteria] = useState<Set<string>>(new Set());

  // Handle hash navigation for deep linking to specific criteria
  useEffect(() => {
    if (location.hash && data?.criteria) {
      const criterionId = location.hash.slice(1);
      setExpandedCriteria(new Set([criterionId]));

      // Scroll to the criterion after a brief delay to ensure render
      setTimeout(() => {
        const element = document.getElementById(criterionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } else if (data?.criteria) {
      // Expand all by default if no hash
      setExpandedCriteria(new Set(data.criteria.map(c => c.id)));
    }
  }, [location.hash, data?.criteria]);

  const toggleCriterion = (criterionId: string) => {
    setExpandedCriteria(prev => {
      const next = new Set(prev);
      if (next.has(criterionId)) {
        next.delete(criterionId);
      } else {
        next.add(criterionId);
      }
      return next;
    });
  };

  const expandAll = () => {
    if (data?.criteria) {
      setExpandedCriteria(new Set(data.criteria.map(c => c.id)));
    }
  };

  const collapseAll = () => {
    setExpandedCriteria(new Set());
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-1/3" />
          <div className="h-4 bg-gray-200 rounded w-full" />
          <div className="h-4 bg-gray-200 rounded w-5/6" />
          <div className="space-y-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-32 bg-gray-200 rounded" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <svg className="w-12 h-12 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <h2 className="text-lg font-semibold text-red-800 mb-2">Unable to Load Educational Content</h2>
          <p className="text-red-600">Please try again later or contact support if the issue persists.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">{data.title}</h1>
        <p className="text-gray-600 leading-relaxed">{data.introduction}</p>
      </div>

      {/* Quick Navigation */}
      <div className="bg-gray-50 rounded-lg p-4 mb-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            <span className="text-sm text-gray-600">Jump to:</span>
            {data.criteria.map(criterion => (
              <a
                key={criterion.id}
                href={`#${criterion.id}`}
                className="text-sm text-green-600 hover:text-green-800 hover:underline"
                onClick={(e) => {
                  e.preventDefault();
                  setExpandedCriteria(prev => new Set([...prev, criterion.id]));
                  document.getElementById(criterion.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
              >
                {criterion.name}
              </a>
            ))}
          </div>
          <div className="flex gap-2">
            <button
              onClick={expandAll}
              className="text-sm text-gray-600 hover:text-gray-800"
            >
              Expand All
            </button>
            <span className="text-gray-300">|</span>
            <button
              onClick={collapseAll}
              className="text-sm text-gray-600 hover:text-gray-800"
            >
              Collapse All
            </button>
          </div>
        </div>
      </div>

      {/* Screening Criteria */}
      <div className="space-y-4 mb-8">
        {data.criteria
          .sort((a, b) => a.displayOrder - b.displayOrder)
          .map(criterion => (
            <CriterionExplanation
              key={criterion.id}
              criterion={criterion}
              isExpanded={expandedCriteria.has(criterion.id)}
              onToggle={() => toggleCriterion(criterion.id)}
            />
          ))}
      </div>

      {/* Additional Resources */}
      <div className="bg-blue-50 rounded-lg p-6 mb-8">
        <h2 className="text-lg font-semibold text-blue-900 mb-4 flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
          </svg>
          Additional Resources
        </h2>
        <ul className="space-y-2">
          {data.additionalResources.map((resource, index) => (
            <li key={index} className="flex items-start gap-2 text-blue-800">
              <svg className="w-4 h-4 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              <span>{resource}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Disclaimer */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
        <div className="flex items-start gap-3">
          <svg className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <div>
            <h3 className="text-sm font-semibold text-amber-800 mb-1">Disclaimer</h3>
            <p className="text-sm text-amber-700">{data.disclaimer}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

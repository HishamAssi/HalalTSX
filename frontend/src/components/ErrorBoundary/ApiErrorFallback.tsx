interface ApiErrorFallbackProps {
  error?: Error | null;
  onRetry?: () => void;
  message?: string;
}

export default function ApiErrorFallback({
  error,
  onRetry,
  message = 'Failed to load data',
}: ApiErrorFallbackProps) {
  return (
    <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
      <div className="flex items-start gap-3">
        <div className="text-amber-500 flex-shrink-0">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        <div className="flex-1">
          <h3 className="text-amber-800 font-medium">{message}</h3>
          {error && (
            <p className="text-amber-700 text-sm mt-1">{error.message}</p>
          )}
          <p className="text-amber-600 text-sm mt-2">
            Showing cached data. Some information may be outdated.
          </p>
          {onRetry && (
            <button
              onClick={onRetry}
              className="mt-3 text-sm text-amber-700 hover:text-amber-900 underline"
            >
              Try again
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

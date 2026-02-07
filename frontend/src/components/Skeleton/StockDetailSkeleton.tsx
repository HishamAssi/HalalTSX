export default function StockDetailSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="h-8 w-24 bg-gray-200 rounded" />
          <div className="h-5 w-48 bg-gray-200 rounded" />
        </div>
        <div className="h-8 w-32 bg-gray-200 rounded-full" />
      </div>

      {/* Price section */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-baseline gap-4">
          <div className="h-10 w-32 bg-gray-200 rounded" />
          <div className="h-6 w-24 bg-gray-200 rounded" />
        </div>
        <div className="h-4 w-40 bg-gray-200 rounded mt-2" />
      </div>

      {/* Chart placeholder */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="h-5 w-32 bg-gray-200 rounded mb-4" />
        <div className="h-64 bg-gray-100 rounded" />
      </div>

      {/* Compliance breakdown */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="h-6 w-48 bg-gray-200 rounded mb-4" />
        <div className="space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex justify-between items-center p-3 bg-gray-50 rounded">
              <div className="space-y-1">
                <div className="h-4 w-32 bg-gray-200 rounded" />
                <div className="h-3 w-24 bg-gray-200 rounded" />
              </div>
              <div className="h-6 w-16 bg-gray-200 rounded-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

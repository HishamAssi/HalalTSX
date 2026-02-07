export default function StockCardSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow p-4 animate-pulse">
      <div className="flex justify-between items-start mb-3">
        <div className="space-y-2">
          <div className="h-5 w-16 bg-gray-200 rounded" />
          <div className="h-4 w-32 bg-gray-200 rounded" />
        </div>
        <div className="h-6 w-24 bg-gray-200 rounded-full" />
      </div>
      <div className="flex justify-between items-end">
        <div className="space-y-1">
          <div className="h-6 w-20 bg-gray-200 rounded" />
          <div className="h-3 w-24 bg-gray-200 rounded" />
        </div>
        <div className="h-4 w-16 bg-gray-200 rounded" />
      </div>
    </div>
  );
}

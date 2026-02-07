import StockCardSkeleton from './StockCardSkeleton';

interface StockListSkeletonProps {
  count?: number;
}

export default function StockListSkeleton({ count = 6 }: StockListSkeletonProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: count }).map((_, index) => (
        <StockCardSkeleton key={index} />
      ))}
    </div>
  );
}

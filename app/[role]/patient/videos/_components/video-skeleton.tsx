import { Skeleton } from "@/components/ui/skeleton";

export function VideoSkeleton() {
  return (
    <div className="w-full animate-pulse">
      {/* Hero Skeleton */}
      <div className="w-full h-[400px] bg-gray-200 rounded-lg mb-8" />
      
      {/* Video Row Skeleton */}
      <div className="space-y-4">
        {/* Title Skeleton */}
        <div className="h-8 w-48 bg-gray-200 rounded" />
        
        {/* Video Cards Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex flex-col space-y-2">
              <div className="w-full h-48 bg-gray-200 rounded" />
              <div className="h-4 w-3/4 bg-gray-200 rounded" />
              <div className="h-4 w-1/2 bg-gray-200 rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 
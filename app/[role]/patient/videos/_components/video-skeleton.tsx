import { Skeleton } from "@/components/ui/skeleton";

export function VideoSkeleton() {
  return (
    <div className="w-full space-y-4 p-6">
      <Skeleton className="h-8 w-[250px]" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <Skeleton key={i} className="aspect-video" />
        ))}
      </div>
    </div>
  );
} 
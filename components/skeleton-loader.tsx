import { Skeleton } from "./ui/skeleton";

const SkeletonLoader = () => (
  <div className="animate-pulse flex space-x-4">
    <div className="flex-1 space-y-4 py-1">
      <Skeleton className="h-4 rounded w-3/4"></Skeleton>
      <Skeleton className="h-4  rounded"></Skeleton>
      <Skeleton className="h-4  rounded w-5/6"></Skeleton>
    </div>
  </div>
);

export default SkeletonLoader;

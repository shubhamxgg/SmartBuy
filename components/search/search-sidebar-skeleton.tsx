import { Skeleton } from "@/components/ui/skeleton";

const SearchProductListSkeleton = () => (
  <div className="col-span-1 md:col-span-3 grid xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 md:gap-5">
    {Array.from({ length: 8 }).map((_, index) => (
      <div key={index} className="flex flex-col w-full">
        <Skeleton className="h-48 w-full mb-4" />
        <Skeleton className="h-6 w-full mb-2" />
        <Skeleton className="h-4 w-full" />
      </div>
    ))}
  </div>
);

export default SearchProductListSkeleton;

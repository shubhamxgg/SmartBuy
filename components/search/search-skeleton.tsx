import { Skeleton } from "@/components/ui/skeleton";

const SearchSkeleton = () => (
  <div className="flex flex-col min-h-screen">
    <div className="relative flex items-center justify-start p-4 md:p-6 font-bold mt-3 mb-2 lg:mt-5 lg:mb-2 text-lg md:text-xl">
      <Skeleton className="h-6 w-1/4" />
    </div>

    <div className="hidden lg:block w-full p-4 mb-2">
      <div className="flex items-center justify-end gap-2">
        <Skeleton className="h-6 w-24" />
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-4 p-5">
      <div className="hidden md:block md:col-span-1">
        <Skeleton className="h-full w-full" />
      </div>

      <div className="col-span-1 md:col-span-3 grid xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 md:gap-5">
        <div className="flex flex-col">
          <Skeleton className="h-48 w-full mb-4" />
          <Skeleton className="h-6 w-3/4 mb-2" />
          <Skeleton className="h-4 w-1/2" />
        </div>
        <div className="flex flex-col">
          <Skeleton className="h-48 w-full mb-4" />
          <Skeleton className="h-6 w-3/4 mb-2" />
          <Skeleton className="h-4 w-1/2" />
        </div>
        <div className="flex flex-col">
          <Skeleton className="h-48 w-full mb-4" />
          <Skeleton className="h-6 w-3/4 mb-2" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      </div>
    </div>
  </div>
);

export default SearchSkeleton;
import { Skeleton } from "@/components/ui/skeleton";

const ItemSectionSkeleton = () => {
  return (
    <div className="flex flex-col pb-5 w-full">
      <div className="flex items-center justify-between px-2 py-4 border rounded-sm border-white/20">
        <Skeleton className="h-6 w-1/4" />
        <Skeleton className="h-6 w-1/4" />
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 w-full p-3 gap-4 border flex-1 mt-2 rounded-sm">
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
  );
};

export default ItemSectionSkeleton;

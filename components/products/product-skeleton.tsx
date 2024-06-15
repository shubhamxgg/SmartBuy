import { Skeleton } from "@/components/ui/skeleton";

const ProductSkeleton = () => {
  return (
    <div className="flex flex-col w-full">
      <div className="hidden sm:block p-5">
        <div className="flex items-center space-x-4">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-24" />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row p-2 md:p-5">
        <div className="w-full lg:w-1/2 flex flex-col border bg-card p-5 rounded-sm">
          <div className="w-full border rounded-sm max-w-xl mx-auto">
            <Skeleton className="w-full h-[500px] object-contain rounded-sm border shadow-lg bg-white/50" />
          </div>
          <div className="border flex gap-2 mt-2 p-2 rounded-sm">
            <Skeleton className="w-24 h-24 border rounded-sm" />
            <Skeleton className="w-24 h-24 border rounded-sm" />
            <Skeleton className="w-24 h-24 border rounded-sm" />
          </div>
        </div>
        <div className="w-full p-4 lg:w-1/2 mt-3 flex flex-col lg:ml-4 bg-card rounded-sm lg:mt-0 border">
          <Skeleton className="bg-neutral-500 max-w-[100px] p-2 rounded-md mb-4 mt-2 text-center h-8" />
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-6 w-1/2 mt-2" />
          <div className="flex flex-col gap-2 mt-2">
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-10 w-1/2" />
          </div>
          <div className="flex flex-col p-4 mt-5 border bg-card rounded-sm">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full mt-4" />
          </div>
          <div className="flex items-center justify-between p-5 border mt-2 rounded-sm">
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-4 w-1/3" />
          </div>
          <div className="flex items-center gap-2 w-full mt-4 py-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="py-2 flex items-center gap-2">
            <Skeleton className="h-5 w-5" />
            <Skeleton className="h-4 w-24" />
          </div>
          <Skeleton className="mt-10 mb-2 h-6 w-1/4" />
          <Skeleton className="w-full h-20" />
        </div>
      </div>

      <div className="py-5 md:py-10 flex flex-col lg:flex-row gap-5 p-2 md:p-4 rounded-sm">
        <div className="lg:w-1/3 w-full bg-card p-5 rounded-sm">
          <Skeleton className="mb-2 h-6 w-1/2" />
          <Skeleton className="mb-4 h-6 w-1/4" />
          <Skeleton className="mb-2 h-6 w-1/3" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full mt-2" />
          <Skeleton className="h-4 w-full mt-2" />
          <Skeleton className="h-4 w-full mt-2" />
        </div>
        <div className="lg:w-2/3 w-full bg-card p-5 rounded-sm">
          <Skeleton className="font-bold text-lg mb-4 h-6 w-1/4" />
          <Skeleton className="flex flex-col items-center justify-center w-full h-20" />
        </div>
      </div>
    </div>
  );
};

export default ProductSkeleton;

import { Skeleton } from "../ui/skeleton";

const ItemCategorySkeleton = () => {
  return (
    <div className="pb-5 pt-2 flex flex-col md:flex-row w-full gap-2">
      <div className="flex items-center justify-center py-2 border-[2px] flex-1 md:font-bold md:text-4xl md:px-6 md:py-0 rounded-sm">
        <Skeleton className="h-8 w-1/2" />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-2 gap-2">
        <Skeleton className="h-64 w-full" />
        <Skeleton className="h-64 w-full" />
      </div>
    </div>
  );
};

export default ItemCategorySkeleton;

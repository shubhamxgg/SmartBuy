import { Skeleton } from "../ui/skeleton";

export function CategoryListSkeleton() {
  return (
    <div className="flex space-x-4 overflow-x-auto pb-4">
      {[...Array(5)].map((_, i) => (
        <Skeleton key={i} className="w-[200px] h-[200px]" />
      ))}
    </div>
  );
}

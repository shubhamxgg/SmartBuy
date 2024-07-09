import { Skeleton } from "../ui/skeleton";

const OrdersSkeleton = () => {
  return (
    <div className="flex flex-col w-full p-4 min-h-screen">
      <div className="w-full max-w-5xl mx-auto my-8">
        <Skeleton className="h-8 w-1/3 mb-4" />
        {[...Array(3)].map((_, index) => (
          <div
            key={index}
            className="flex items-center p-4 border rounded-sm bg-card mb-4 shadow-md"
          >
            <Skeleton className="w-24 h-24 rounded-sm" />
            <div className="ml-4 flex-1 overflow-hidden">
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-1/2 mt-2" />
            </div>
            <div className="flex gap-2">
              <Skeleton className="h-10 w-10 rounded-full" />
              <Skeleton className="h-10 w-10 rounded-full" />
            </div>
          </div>
        ))}
        <Skeleton className="h-12 w-full mt-4" />
      </div>
    </div>
  );
};

export default OrdersSkeleton;

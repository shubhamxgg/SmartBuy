import React from "react";
import { Skeleton } from "../ui/skeleton";

const WishlistSkeleton = () => {
  return (
    <div className="p-4 flex flex-col items-center min-h-screen">
      <div className="w-full">
        <Skeleton className="h-8 w-1/3 mb-4" />
        {[...Array(3)].map((_, index) => (
          <div
            key={index}
            className="grid grid-cols-1 gap-2 sm:grid-cols-3 mb-4"
          >
            {[...Array(3)].map((_, idx) => (
              <div
                key={idx}
                className="flex items-center p-4 border rounded-sm bg-card shadow-md"
              >
                <Skeleton className="w-24 h-24 rounded-sm" />
                <div className="ml-4 flex-1 overflow-hidden">
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ))}
        <Skeleton className="h-12 w-full mt-4" />
      </div>
    </div>
  );
};

export default WishlistSkeleton;

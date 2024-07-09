"use client";

import React from "react";
import { useWishlist } from "@/hooks/use-wishlist";
import WishlistItem from "@/components/wishlist/wishlist-item";
import LoadMoreButton from "@/components/load-more-button";
import WishlistSkeleton from "@/components/wishlist/wishlist-skeleton";
import { Loader } from "lucide-react";

const WishlistPage = () => {
  const userId = 1;
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useWishlist(userId);

  if (status === "pending") return <WishlistSkeleton />;
  if (status === "error") return <p>Error: {error.message}</p>;
  const isEmpty = !data?.pages.some((page) => page.items.length > 0);

  return (
    <div className="p-2 flex flex-col items-center min-h-screen">
      <div className="w-full">
        <h1 className="text-2xl font-semibold mb-4">Your Wishlist</h1>
        {isEmpty ? (
          <p className="text-center text-2xl">Add item to WishList</p>
        ) : (
          <>
            {data?.pages.map((group, i) => (
              <div key={i} className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                {group.items.map((item: any) => (
                  <WishlistItem key={item.id} item={item} userId={userId} />
                ))}
              </div>
            ))}
          </>
        )}

        {hasNextPage ? (
          <LoadMoreButton
            onClick={() => fetchNextPage()}
            disabled={!hasNextPage || isFetchingNextPage}
            isLoading={isFetchingNextPage}
            hasNextPage={hasNextPage}
          />
        ) : null}
        {isFetching && !isFetchingNextPage && (
          <div className="mt-4">
            <Loader className="animate-spin" />
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistPage;

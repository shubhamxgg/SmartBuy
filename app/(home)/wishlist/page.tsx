"use client";

import { getWishlist } from "@/lib/actions/wishlist";
import { useInfiniteQuery } from "@tanstack/react-query";
import React from "react";

interface WishlistPageProps {
  userId: number;
}

const fetchWishlist = async ({
  userId,
  pageParam = 0,
}: {
  userId: number;
  pageParam: number;
}) => {
  const response = await getWishlist({ userId, skip: pageParam, take: 10 });
  return response;
};

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
  } = useInfiniteQuery({
    queryKey: ["wishlist", userId],
    queryFn: ({ pageParam = 0 }) => fetchWishlist({ userId, pageParam }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });

  if (status === "pending") return <p>Loading...</p>;
  if (status === "error") return <p>Error: {error.message}</p>;

  return (
    <>
      {data?.pages.map((group, i) => (
        <React.Fragment key={i}>
          {group.items.map((item: any) => (
            <p key={item.id}>{item.product.title}</p>
          ))}
        </React.Fragment>
      ))}
      <div>
        <button
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
        >
          {isFetchingNextPage
            ? "Loading more..."
            : hasNextPage
            ? "Load More"
            : "Nothing more to load"}
        </button>
      </div>
      <div>{isFetching && !isFetchingNextPage ? "Fetching..." : null}</div>
    </>
  );
};

export default WishlistPage;

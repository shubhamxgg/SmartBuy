"use client";

import { useFetchAllWishlist } from "@/hooks/use-fetch-wishlist";
import WishlistGrid from "./wishlist-grid";

interface WishlistContentProps {
  userId: number;
}

export default function WishlistContent({ userId }: WishlistContentProps) {
  const {
    data: wishlist,
    error,
    isLoading,
    status,
  } = useFetchAllWishlist({
    userId,
  });

  if (status === "error") return <h1>Error: {error.message}</h1>;
  if (isLoading) {
    return <div>Loadind...</div>;
  }
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Your Wishlist</h1>
      {wishlist?.items ? (
        <WishlistGrid items={wishlist.items} />
      ) : (
        <p>No items in your wishlist.</p>
      )}
    </div>
  );
}

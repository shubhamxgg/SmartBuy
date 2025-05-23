"use client";

import { useWishlist } from "@/hooks/use-wishlist";
import WishlistGrid from "./wishlist-grid";
import WishlistSkeleton from "./wishlist-skeleton";

export default function WishlistContent() {
  const { wishlist } = useWishlist();

  if (wishlist.status === "error")
    return <h1>Error: {wishlist.error.message}</h1>;
  if (wishlist.status === "pending") {
    return <WishlistSkeleton />;
  }
  return (
    <div className="space-y-6">
      {wishlist?.data?.items?.length ? (
        <WishlistGrid items={wishlist.data.items} />
      ) : (
        <p>No items in your wishlist.</p>
      )}
    </div>
  );
}

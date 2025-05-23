"use client";

import { useState } from "react";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { useUserAuth } from "@/hooks/use-auth";
import { useWishlist } from "@/hooks/use-wishlist";

interface WishlistButtonProps {
  productId: number;
  className?: string;
}

export function WishlistButton({ productId, className }: WishlistButtonProps) {
  const { isAuthenticated } = useUserAuth();
  const { wishlist, remove, add } = useWishlist();
  const [isHovered, setIsHovered] = useState(false);
  const isLiked = wishlist.data?.items?.some(
    (item) => item.productId === productId
  );

  const handleWishlistToggle = async () => {
    if (isLiked) {
      remove.mutate({ productId });
    } else {
      add.mutate({ productId });
    }
  };

  return (
    <button
      onClick={handleWishlistToggle}
      disabled={!isAuthenticated || !wishlist}
      className={cn(
        "transition-all duration-200 hover:scale-110 cursor-pointer",
        isLiked ? "text-red-500" : "text-gray-400",
        className
      )}
      aria-label={isLiked ? "Remove from wishlist" : "Add to wishlist"}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Heart
        className={cn(
          "h-6 w-6 transition-all duration-200 ",
          isLiked && "fill-red-500",
          isHovered && !isLiked && "fill-red-500"
        )}
      />
    </button>
  );
}

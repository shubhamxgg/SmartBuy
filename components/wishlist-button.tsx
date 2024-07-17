"use client";

import { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import {
  checkWishlistStatus,
  toggleWishlistItem,
} from "@/lib/actions/wishlist-btn";

import { useUserAuth } from "@/hooks/use-auth";

interface WishlistButtonProps {
  productId: number;
  className?: string;
}

export function WishlistButton({ productId, className }: WishlistButtonProps) {
  const { userId, isAuthenticated } = useUserAuth();
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated && userId) {
      checkWishlistStatus(userId, productId).then(setIsInWishlist);
    }
  }, [isAuthenticated, userId, productId]);

  const handleWishlistToggle = async () => {
    if (!isAuthenticated) {
      toast.error("Please log in to use the wishlist");
      return;
    }

    setIsLoading(true);
    try {
      const newStatus = await toggleWishlistItem(userId, productId);
      setIsInWishlist(newStatus);
      toast.success(
        newStatus ? "Added to wishlist!" : "Removed from wishlist!"
      );
    } catch (error) {
      toast.error("Failed to update wishlist");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      size="icon"
      variant="ghost"
      onClick={handleWishlistToggle}
      disabled={!isAuthenticated || isLoading}
      className={cn(
        "transition-all duration-200 hover:scale-110",
        isInWishlist ? "text-red-500" : "text-gray-400",
        className
      )}
      aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Heart
        className={cn(
          "h-6 w-6 transition-all duration-200",
          isInWishlist && "fill-current",
          isHovered && !isInWishlist && "text-red-500"
        )}
      />
    </Button>
  );
}

"use client";

import { createWishlist, removeItemFromWishlist } from "@/lib/actions/wishlist";
import { cn } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Heart } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

interface WishlistButtonProps {
  userId: number;
  productId: number;
  isWishList: boolean;
  className?: string;
}

const WishlistButton = ({
  isWishList,
  productId,
  userId,
  className,
}: WishlistButtonProps) => {
  const [isInWishlist, setIsInWishlist] = useState(isWishList);
  const queryClient = useQueryClient();

  const addMutation = useMutation({
    mutationFn: () => createWishlist({ productId, userId }),
    onSuccess: () => {
      setIsInWishlist(true);
      toast.success("Added to wishlist!");
      queryClient.invalidateQueries({ queryKey: ["wishlist", userId] });
    },
    onError: (error: Error) => {
      toast.error(`Error adding to wishlist: ${error.message}`);
    },
  });

  const removeMutation = useMutation({
    mutationFn: () => removeItemFromWishlist({ productId, userId }),
    onSuccess: () => {
      setIsInWishlist(false);
      toast.success("Removed from wishlist!");
      queryClient.invalidateQueries({ queryKey: ["wishlist", userId] });
    },
    onError: (error: Error) => {
      toast.error(`Error removing from wishlist: ${error.message}`);
    },
  });

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isInWishlist) {
      removeMutation.mutate();
    } else {
      addMutation.mutate();
    }
  };

  return (
    <Button
      size="icon"
      variant="ghost"
      onClick={handleWishlistToggle}
      disabled={addMutation.isPending || removeMutation.isPending}
      className={cn(
        "transition-colors duration-200",
        isInWishlist ? "text-primary" : "text-gray-400",
        className
      )}
      aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
    >
      <Heart
        className={cn(
          "h-6 w-6",
          isInWishlist && "fill-primary"
        )}
      />
    </Button>
  );
};

export default WishlistButton;
"use client";

import { createWishlist, removeItemFromWishlist } from "@/lib/actions/wishlist";
import { cn } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { HeartIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface WishlistButtonProps {
  userId: number;
  productId: number;
  isWishList: boolean;
  className?: string;
  title?: string;
}

const addToWishlist = async ({
  productId,
  userId,
}: {
  productId: number;
  userId: number;
}) => {
  const response = await createWishlist({ productId, userId });
  return response;
};

const removeFromWishlist = async ({
  productId,
  userId,
}: {
  productId: number;
  userId: number;
}) => {
  const response = await removeItemFromWishlist({ productId, userId });
  return response;
};

const WishlistButton = ({
  isWishList,
  productId,
  userId,
  className,
  title,
}: WishlistButtonProps) => {
  const [isInWishlist, setIsWishList] = useState(isWishList);

  const addMutation = useMutation({
    mutationFn: addToWishlist,
    onSuccess: () => {
      setIsWishList(true);
      toast.success("Added to wishlist !");
    },
    onError: (error: any) => {
      console.error("Error adding to wishlist:", error);
    },
  });

  const removeMutation = useMutation({
    mutationFn: removeFromWishlist,
    onSuccess: () => {
      setIsWishList(false);
      toast.success("Removed from wishlist !");
    },
    onError: (error: any) => {
      console.error("Error removing from wishlist:", error);
    },
  });

  const handleWishlistToggle = async (e: React.MouseEvent<SVGElement>) => {
    e.preventDefault();
    try {
      if (isInWishlist) {
        await removeMutation.mutateAsync({ productId, userId });
      } else {
        await addMutation.mutateAsync({ productId, userId });
      }
    } catch (error) {
      console.error("Error toggling wishlist:", error);
    }
  };

  return (
    <div className="flex items-center p-2">
      <HeartIcon
        className={cn(
          `h-6 w-6 mr-2`,
          isInWishlist && "fill-primary",
          className
        )}
        onClick={handleWishlistToggle}
      />
      <span>{title}</span>
    </div>
  );
};

export default WishlistButton;

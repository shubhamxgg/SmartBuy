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

  const handleWishlistToggle = async (e: any) => {
    e.preventDefault();
    if (isInWishlist) {
      removeMutation.mutate({ productId, userId });
    } else {
      addMutation.mutate({ productId, userId });
    }
  };

  return (
    <div>
      <HeartIcon
        className={cn(
          `w-6 h-6 absolute top-5 right-5 stroke-primary stroke-2 transition ease-in-out duration-300 hover:fill-primary hover:-translate-y-2`,
          isInWishlist && "fill-primary"
        )}
        onClick={handleWishlistToggle}
        
      />
    </div>
  );
};

export default WishlistButton;

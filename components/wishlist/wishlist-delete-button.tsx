"use client";
import { Button } from "../ui/button";
import { useUserAuth } from "@/hooks/use-auth";
import { Trash } from "lucide-react";
import { useRemoveWishlist } from "@/hooks/use-fetch-wishlist";

interface WishlistDeleteButtonProps {
  productId: number;
  className?: string;
}

const WishlistDeleteButton = ({
  productId,
  className,
}: WishlistDeleteButtonProps) => {
  const { userId } = useUserAuth();
  const { mutate: removeFromWishlist, isPending } = useRemoveWishlist();
  if (!userId) return <div>no userId found</div>;

  const handleRemove = () => {
    removeFromWishlist({ productId, userId });
  };

  return (
    <div className={className}>
      <Button
        onClick={handleRemove}
        variant="destructive"
        size="sm"
        disabled={isPending}
      >
        <Trash
          className={`${isPending ? "animate-pulse" : "hover:scale-105"}`}
        />
      </Button>
    </div>
  );
};

export default WishlistDeleteButton;

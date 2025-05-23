"use client";
import { Button } from "../ui/button";
import { useUserAuth } from "@/hooks/use-auth";
import { Trash } from "lucide-react";
import { useWishlist } from "@/hooks/use-wishlist";

interface WishlistDeleteButtonProps {
  productId: number;
  className?: string;
}

const WishlistDeleteButton = ({
  productId,
  className,
}: WishlistDeleteButtonProps) => {
  const { remove } = useWishlist();

  const handleRemove = () => {
    remove.mutate({ productId });
  };

  return (
    <div className={className}>
      <Button
        onClick={handleRemove}
        variant="destructive"
        size="sm"
        disabled={remove.isPending}
      >
        <Trash
          className={`${remove.isPending ? "animate-pulse bg-red-500" : "hover:scale-105"}`}
        />
      </Button>
    </div>
  );
};

export default WishlistDeleteButton;

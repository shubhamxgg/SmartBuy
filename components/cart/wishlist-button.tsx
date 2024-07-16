"use client";

import { Button } from "../ui/button";
import { Heart } from "lucide-react";
import { useUserAuth } from "@/hooks/use-auth";
import { useState } from "react";

interface WishlistButtonProps {
  productId: number;
}

export function WishlistButton({ productId }: WishlistButtonProps) {
  const { userId, showLoginToast } = useUserAuth();
  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleWishlistClick = async () => {
    if (!userId) {
      showLoginToast();
    } else {
      setIsWishlisted(!isWishlisted);
    }
  };

  return (
    <Button
      size="icon"
      variant="outline"
      onClick={handleWishlistClick}
      disabled={!userId}
    >
      <Heart className={isWishlisted ? "fill-current text-red-500" : ""} />
    </Button>
  );
}

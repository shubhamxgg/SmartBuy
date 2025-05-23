"use client";

import { Button } from "../ui/button";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { Product } from "@/type";
import { useTransition } from "react";

interface AddToCartButtonProps {
  product: Product;
}

export function AddToCartButton({ product }: AddToCartButtonProps) {
  const { addToCart } = useCart();
  const [isPending, startTransition] = useTransition();
  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    startTransition(() => {
      addToCart(product, 1);
    });
  };

  return (
    <Button
      variant="outline"
      onClick={handleClick}
      disabled={isPending}
      className="w-full bg-primary-foreground"
    >
      <ShoppingCart className="mr-2 h-4 w-4" />
      {isPending ? "Adding..." : "Add to Cart"}
    </Button>
  );
}

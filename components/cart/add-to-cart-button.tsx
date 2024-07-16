"use client";

import { Button } from "../ui/button";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/hooks/use-cart";

import { useState } from "react";
import { toast } from "sonner";
import { Product } from "@/type";

interface AddToCartButtonProps {
  product: Product;
}

export function AddToCartButton({ product }: AddToCartButtonProps) {
  const { addToCart } = useCart();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await addToCart(product, 1);
      toast.success("Added to cart!");
    } catch (error) {
      toast.error("Failed to add to cart");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant="outline"
      onClick={handleClick}
      disabled={isLoading}
      className="w-full bg-primary-foreground"
    >
      <ShoppingCart className="mr-2 h-4 w-4" />
      {isLoading ? "Adding..." : "Add to Cart"}
    </Button>
  );
}

import { toast } from "sonner";
import { Product } from "../type";
import useCartStore from "@/store/useCartStore";
import { useCallback, useState } from "react";

const useCart = (product: Product) => {
  const { addToCart } = useCartStore();
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const handleAddToCart = useCallback(async () => {
    setIsAddingToCart(true);
    try {
      await addToCart(product, 1);
      toast.success("Added to cart!");
    } catch (error) {
      toast.error("Failed to add to cart");
    } finally {
      setIsAddingToCart(false);
    }
  }, [addToCart, product]);

  return { handleAddToCart, isAddingToCart };
};

export default useCart;

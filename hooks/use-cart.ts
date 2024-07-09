import { toast } from "sonner";
import { Product } from "../type";
import useCartStore from "@/store/useCartStore";

const useCart = (product: Product) => {
  const { addToCart } = useCartStore();

  const handleAddToCart = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      await addToCart(product);
      toast.success("Product added to cart!");
    } catch (error) {
      toast.error("Failed to add product to cart.");
    }
  };

  return { handleAddToCart };
};

export default useCart;

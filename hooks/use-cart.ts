import useProductStore from "@/store/useProductStore";
import { toast } from "sonner";
import { Product } from "../lib/type";

const useCart = (product: Product) => {
  const { addToCart } = useProductStore();

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

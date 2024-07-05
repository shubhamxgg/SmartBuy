import useProductStore from "@/store/useProductStore";
import { toast } from "sonner";
import { Product } from "@prisma/client";

const useCart = () => {
  const { addToCart } = useProductStore();

  const handleAddToCart = async (product: any) => {
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

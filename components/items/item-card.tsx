import Image from "next/image";
import { Button } from "../ui/button";
import { HeartIcon, ShoppingCart } from "lucide-react";
import useProductStore from "@/store/useProducts";
import Link from "next/link";
import { toast } from "sonner";
import { Product } from "@/lib/type";

interface ItemCardProps {
  product: Product;
}

const ItemCard = ({ product }: ItemCardProps) => {
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

  return (
    <div className="relative group overflow-hidden max-w-5xl w-full bg-card p-4 rounded-sm min-h-[440px]">
      <Link href={`/items/${product.id}`}>
        <Image
          alt={"item-card"}
          className="object-contain w-full  max-h-[250px] h-[100%] border rounded-sm overflow-hidden  bg-white"
          height={300}
          width={300}
          src={product.imageUrl}
        />
        <div className="p-4">
          <h3 className="font-bold text-lg">{product.title}</h3>
          {/* <p className="text-sm text-gray-500 dark:text-gray-400 overflow-hidden text-pretty max-w-[80%]">
            {product.description}
          </p> */}
          <p className="text-red-300 mt-2">{product.category.name}</p>
          <div className="flex items-center justify-between mt-2">
            <span className="font-semibold text-lg">${product.price}</span>
            <div className="flex items-center gap-2">
              <Button
                size="default"
                variant="outline"
                onClick={handleAddToCart}
              >
                <ShoppingCart />
              </Button>

              <HeartIcon
                className="w-7 h-7 absolute top-4 right-4 fill-red-600"
                onClick={(e) => {
                  e.preventDefault();
                }}
              />
              <span className="sr-only">Add to Wishlist</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ItemCard;

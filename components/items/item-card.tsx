import Image from "next/image";
import { Button } from "../ui/button";
import { ShoppingCart } from "lucide-react";
import useProductStore from "@/store/useProductStore";
import Link from "next/link";
import { toast } from "sonner";

import WishlistButton from "../wishlist-button";
import { Product } from "@prisma/client";

interface ItemCardProps {
  product: any;
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
    <div className="relative group overflow-hidden w-full bg-card p-4 rounded-sm min-h-60">
      <Link href={`/items/${product.id}`} className="h-full">
        <div className="h-56">
          <Image
            alt={"item-card"}
            className="object-fill h-full w-full border rounded-sm overflow-hidden bg-white"
            height={300}
            width={300}
            src={product.imageUrl}
          />
        </div>
        <div className="p-2">
          <h3 className="font-bold text-lg text-nowrap text-ellipsis truncate hover:text-pretty cursor-pointer">
            {product.title}
          </h3>

          {product.featured && (
            <h1 className="p-2 rounded-sm w-fit mt-1 bg-red-500">Featured</h1>
          )}

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

              {/* <HeartIcon
                className="w-6 h-6 absolute top-5 right-5 stroke-red-500 stroke-2 transition ease-in-out duration-300 hover:fill-red-500 hover:-translate-y-2"
                onClick={(e) => {
                  e.preventDefault();
                }}
              /> */}
              <WishlistButton
                isWishList={false}
                productId={product.id}
                userId={1}
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

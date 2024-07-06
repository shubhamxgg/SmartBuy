import Image from "next/image";
import { Button } from "../ui/button";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import WishlistButton from "../wishlist-button";
import useCart from "@/hooks/use-cart";
import { Product } from "@/lib/type";

interface ItemCardProps {
  product: any;
}

const ItemCard = ({ product }: ItemCardProps) => {
  const { handleAddToCart } = useCart(product);

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

          {product.featured ? (
            <h1 className="p-2 rounded-sm w-fit mt-1 bg-red-500">Featured</h1>
          ) : null}

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

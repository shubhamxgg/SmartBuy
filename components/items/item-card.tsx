import Image from "next/image";
import { Button } from "../ui/button";
import { ShoppingCart, Heart } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardFooter } from "../ui/card";
import { useUserId } from "@/hooks/use-user-id";
import { formatCurrency } from "@/lib/utils";

import useCart from "@/hooks/use-cart";
import { Product } from "@/type";

interface ItemCardProps {
  product: Product;
}

const ItemCard = ({ product }: ItemCardProps) => {
  const { handleAddToCart, isAddingToCart } = useCart(product);
  const userId = useUserId();

  return (
    <Card className="group relative overflow-hidden rounded-lg shadow-md transition-all duration-300 hover:shadow-xl bg-card bg-opacity-60 flex flex-col ">
      {product.featured && (
        <div className="absolute top-2 left-2 z-10 bg-primary text-primary-foreground text-xs font-semibold px-2 py-1 rounded-full">
          Featured
        </div>
      )}
      <Link href={`/items/${product.id}`} className="flex flex-col">
        <div className="relative h-48 overflow-hidden bg-white">
          <Image
            alt={product.title}
            src={product.imageUrl}
            fill
            className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <CardContent className="p-4 flex-grow flex flex-col">
          <h3 className="font-semibold text-lg truncate group-hover:text-primary transition-colors">
            {product.title}
          </h3>
          <p className="text-muted-foreground text-sm mt-1 line-clamp-2 flex-grow">
            {product.description}
          </p>
          <div className="mt-2 flex items-center justify-between">
            <span className="text-lg font-bold text-primary">
              {formatCurrency(product.price)}
            </span>
            {product.price && (
              <span className="text-sm text-muted-foreground line-through">
                {formatCurrency(product.price)}
              </span>
            )}
          </div>
        </CardContent>
      </Link>
      <CardFooter className="p-4 pt-0 mt-auto">
        <div className="flex items-center justify-between w-full">
          <Button
            size="sm"
            variant="secondary"
            onClick={(e) => {
              e.preventDefault();
              handleAddToCart();
            }}
            disabled={isAddingToCart}
            className="flex-1 mr-2"
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            {isAddingToCart ? "Adding..." : "Add to Cart"}
          </Button>
          {userId && (
            <Button
              size="icon"
              variant="outline"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Heart className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default ItemCard;
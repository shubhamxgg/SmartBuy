import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter } from "../ui/card";
import { formatCurrency } from "@/lib/utils";
import { Product } from "@/type";
import { AddToCartButton } from "../cart/add-to-cart-button";

import { WishlistButton } from "../wishlist-button";

interface ProductCardProps {
  product: any;
}

export async function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="group relative overflow-hidden rounded-lg shadow-md transition-all duration-300 hover:shadow-xl bg-card bg-opacity-60 flex flex-col">
      <div className="absolute top-2 right-2 z-10">
        <WishlistButton productId={product.id} />
      </div>
      {product.featured && (
        <div className="absolute top-2 left-2 z-10 bg-primary text-primary-foreground text-xs font-semibold px-2 py-1 rounded-full">
          Featured
        </div>
      )}
      <Link href={`/product/${product.id}`} className="flex flex-col">
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
        <AddToCartButton product={product} />
      </CardFooter>
    </Card>
  );
}

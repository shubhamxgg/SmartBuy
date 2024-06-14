import Image from "next/image";
import { Button } from "../ui/button";
import { HeartIcon } from "lucide-react";
import useProductStore from "@/lib/store/use-products";
import Link from "next/link";

interface Category {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  seller: { id: number; user: { name: string } };
  status: string;
  featured: boolean;
  stock: { sku: string; quantity: number; lowStockThreshold: number };
  images: { id: number; url: string }[];
  reviews: { id: number; rating: number; comment: string }[];
  category: Category;
  brand : string
}

interface ItemCardProps {
  product: Product;
}

const ItemCard = ({ product }: ItemCardProps) => {
  const { addToCart } = useProductStore();

  return (
    <div className="relative group overflow-hidden w-full bg-card p-4 rounded-sm">
      <Link href={`/items/${product.id}`}>
        <Image
          alt={"item-card"}
          className="object-cover w-full aspect-square border rounded-sm overflow-hidden"
          height={300}
          width={300}
          src={"/user.jpg"}
        />
        <div className="p-4">
          <h3 className="font-bold text-lg">{product.title}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {product.description}
          </p>
          <div className="flex items-center justify-between mt-2">
            <span className="font-semibold text-lg">${product.price}</span>
            <div className="flex items-center gap-2">
              <Button
                size="default"
                variant="outline"
                onClick={() => addToCart(product)}
              >
                Add to Cart
              </Button>
              <Button size="icon" variant="ghost">
                <HeartIcon className="w-5 h-5" />
                <span className="sr-only">Add to Wishlist</span>
              </Button>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ItemCard;

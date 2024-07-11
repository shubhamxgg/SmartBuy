import React from "react";
import Image from "next/image";
import { Heart, Trash } from "lucide-react";
import { Product } from "@/type";
import { useRemoveWishlist } from "@/hooks/use-wishlist";

interface WishlistItemProps {
  item: {
    id: number;
    product: Product;
  };
  userId: number;
}

const WishlistItem = ({ item, userId }: WishlistItemProps) => {
  const { mutate: removeFromWishlist, isPending } = useRemoveWishlist();
  if (!userId) return <div>no userId foun</div>;
  const handleRemove = () => {
    removeFromWishlist({ productId: item.id, userId });
  };

  return (
    <div className="flex items-center p-4 border rounded-sm bg-card mb-4 shadow-md">
      <Image
        src={item.product.imageUrl}
        alt={item.product.title}
        width={100}
        height={100}
        className="rounded-sm"
      />
      <div className="ml-4 flex-1 overflow-hidden">
        <h3 className="font-semibold text-ellipsis overflow-hidden whitespace-nowrap text-md sm:text-lg">
          {item.product.title}
        </h3>
        <p className="text-sm">${item.product.price}</p>
      </div>
      <button onClick={handleRemove} disabled={isPending} className="ml-2">
        <Trash className="h-5 w-5 text-red-500 hover:fill-red-600 transition hover:-translate-y-2 ease-in-out" />
      </button>
    </div>
  );
};

export default WishlistItem;

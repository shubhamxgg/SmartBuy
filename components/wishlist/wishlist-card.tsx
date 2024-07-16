import React from "react";
import Image from "next/image";
import { Product } from "@/type";
import WishlistDeleteButton from "./wishlist-delete-button";
import { Button } from "../ui/button";

interface WishlistItemProps {
  item: {
    id: number;
    product: Product;
  };
}

const WishlistCard = ({ item }: WishlistItemProps) => {
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
      <WishlistDeleteButton productId={item.product.id}  />
    </div>
  );
};

export default WishlistCard;

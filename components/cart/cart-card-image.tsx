import React from "react";
import Image from "next/image";

interface CartItemImageProps {
  imageUrl: string;
  title: string;
}

const CartCardImage = ({ imageUrl, title }: CartItemImageProps) => {
  return (
    <div className="flex-shrink-0 w-20 h-20 bg-white rounded-md overflow-hidden mr-4">
      <Image
        src={imageUrl}
        alt={title}
        width={80}
        height={80}
        className="object-contain p-2 w-full h-full"
      />
    </div>
  );
};

export default CartCardImage;

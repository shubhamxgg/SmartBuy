"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

interface ItemCategoryCardProps {
  item: {
    name: string;
    image?: string;
  };
}

const ItemCategoryCard = ({ item }: ItemCategoryCardProps) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/search?categories=${item.name}`);
  };

  return (
    <div 
      className="group relative flex-shrink-0 w-48 h-64 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer bg-card"
      onClick={handleClick}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black opacity-70" />
      <Image
        src={`/images/category/${item.name}.jpg`}
        alt={item.name}
        fill
        className="object-cover bg-white transition-transform duration-300 group-hover:scale-110"
      />
      <div className="absolute inset-x-0 bottom-0 p-4 flex flex-col items-center text-center">
        <h3 className="text-white font-semibold text-lg mb-2 drop-shadow-md">
          {item.name}
        </h3>
        <Button 
          variant="secondary" 
          size="sm" 
          className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          Shop Now
        </Button>
      </div>
    </div>
  );
};

export default ItemCategoryCard;
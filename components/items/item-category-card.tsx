"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

interface ItemCategoryCardProps {
  item: any;
}

const ItemCategoryCard = ({ item }: ItemCategoryCardProps) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/search?categories=${item.name}`);
  };

  return (
    <div className="group relative flex-shrink-0 w-72 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-200 cursor-pointer">
      <div className="aspect-square w-full">
        <Image
          src={`/images/category/${item.name}.jpg`}
          alt={item.name}
          height={200}
          width={200}
          className="object-cover bg-white h-full w-full"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
        <Button className="w-full font-bold text-white" onClick={handleClick}>
          {item.name}
        </Button>
      </div>
    </div>
  );
};

export default ItemCategoryCard;

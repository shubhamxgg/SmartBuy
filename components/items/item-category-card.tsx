import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

interface ItemCategoryCardProps {
  item: {
    id: number;
    name: string;
  };
}

const ItemCategoryCard = ({ item }: ItemCategoryCardProps) => {
  const router = useRouter();
  const handleClick = () => {
    router.push(`/search?categories=${item.name}`);
  };
  return (
    <div className="flex-shrink-0 w-72 border rounded-sm hover:shadow-lg transition-shadow duration-200 bg-card snap-center snap-always cursor-pointer">
      <div className="p-5">
        <Image
          height={200}
          width={200}
          src={"/clothing.jpg"}
          alt="image-card"
          className="object-cover border border-red-100 aspect-square w-full overflow-hidden rounded-sm"
        />
      </div>

      <div className="flex items-center justify-center pb-4">
        <Button
          className="flex items-center justify-center font-bold md:px-5 text-lg px-10"
          onClick={handleClick}
        >
          {item.name}
        </Button>
      </div>
    </div>
  );
};

export default ItemCategoryCard;

import Image from "next/image";
import { Button } from "../ui/button";
import { HeartIcon } from "lucide-react";

const data = [{}];

const ItemCard = () => {
  return (
    <div className="">
      <div className="relative group overflow-hidden rounded-lg shadow-lg w-full bg-card">
        <Image
          alt={"item-card"}
          className="object-cover w-full aspect-square"
          height={300}
          width={300}
          src={"/user.jpg"}
        />
        <div className="bg-white p-4 dark:bg-gray-950">
          <h3 className="font-bold text-lg">Cozy Knit Sweater</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Soft and warm knit sweater
          </p>
          <div className="flex items-center justify-between">
            <span className="font-semibold text-lg">$49.99</span>
            <Button size="icon" variant="ghost">
              <HeartIcon className="w-5 h-5" />
              <span className="sr-only">Add to Wishlist</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;

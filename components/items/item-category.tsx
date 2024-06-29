import { useState, useEffect } from "react";
import Image from "next/image";
import { Skeleton } from "../ui/skeleton";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

const ItemCategory = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="pb-5 pt-2 flex flex-col md:flex-row w-full gap-2">
        <div className="flex items-center justify-center py-2 border-[2px] flex-1 md:font-bold md:text-4xl md:px-6 md:py-0 rounded-sm">
          <Skeleton className="h-8 w-1/2" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-2 gap-2">
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-64 w-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="pb-5 pt-2 flex flex-col md:flex-row w-full gap-2">
      <div className="flex items-center justify-center py-2 border-[2px] flex-1 md:font-bold md:text-4xl md:px-6 md:py-0 rounded-sm bg-card">
        <h1>{"Shop by category"}</h1>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-2 gap-2">
        <ItemCategoryCard image="/clothing.jpg" title="Fashion" />
        <ItemCategoryCard image="/mobile.png" title="Mobile" />
      </div>
    </div>
  );
};

interface ItemCategoryCardProps {
  title: string;
  image: string;
}

const ItemCategoryCard = ({ image, title }: ItemCategoryCardProps) => {
  const router = useRouter();
  return (
    <div className="w-full border rounded-sm hover:shadow-lg transition-shadow duration-200 bg-card">
      <div className="p-5">
        <Image
          height={200}
          width={200}
          src={image}
          alt="image-card"
          className="object-cover border border-red-100 aspect-square w-full overflow-hidden rounded-sm"
        />
      </div>
      {/* <h1 className="flex items-center justify-center pb-4 font-bold md:px-5 text-lg">
        {title}
      </h1> */}
      <div className="flex items-center justify-center pb-4">
        <Button
          className="flex items-center justify-center font-bold md:px-5 text-lg"
          onClick={() => {
            router.push(`/search?categories=${title}`);
          }}
        >
          {title}
        </Button>
      </div>
    </div>
  );
};

export default ItemCategory;

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";
import { MinusIcon, PlusIcon } from "lucide-react";

const ItemFeaturedBuy = () => {
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  if (loading) {
    return (
      <div className="border rounded-sm flex flex-col md:flex-row-reverse">
        <div className="p-5 w-full max-w-md mx-auto">
          <Skeleton className="h-64 w-full aspect-square mb-4" />
        </div>
        <div className="p-5 flex flex-col flex-1">
          <Skeleton className="h-8 w-3/4 mb-2" />
          <Skeleton className="h-6 w-1/4 mb-2" />
          <Skeleton className="h-5 w-1/2 mb-4" />
          <Skeleton className="h-10 w-full mb-2" />
          <Skeleton className="h-10 w-full mb-2" />
          <Skeleton className="h-10 w-full mb-2" />
        </div>
      </div>
    );
  }

  return (
    <div className="border rounded-sm flex flex-col md:flex-row-reverse gap- overflow-hidden">
      <div className="p-5 w-full max-w-md mx-auto bg-card">
        <Image
          height={200}
          width={200}
          src={"/user.jpg"}
          alt="image-card"
          className="object-cover border border-red-100 aspect-square w-full overflow-hidden rounded-sm"
        />
      </div>

      <div className="p-5 flex flex-col flex-1 bg-card ">
        <h1 className="pt-20 text-4xl font-semibold mb-1">
          Google Pixel 8 Pro
        </h1>
        <p className="mb-1 font-serif">$700</p>
        <div className="flex flex-col pt-2">
          <span>Select</span>
          <div>Pixel</div>
        </div>
        <div className="flex flex-col pt-2">
          <span>Quantity</span>
          <div className="flex items-center space-x-2">
            <Button onClick={() => handleQuantityChange(quantity - 1)}>
              <MinusIcon className="h-4 w-4" />
            </Button>
            <input
              type="text"
              value={quantity}
              onChange={(e) => handleQuantityChange(Number(e.target.value))}
              className="border rounded px-2 py-1 w-16 text-center"
              min="1"
            />
            <Button onClick={() => handleQuantityChange(quantity + 1)}>
              <PlusIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="pt-10 flex gap-2 w-full">
          <Button className="w-full" variant={"outline"}>
            Go to cart
          </Button>
          <Button className="w-full" variant={"outline"}>
            Buy now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ItemFeaturedBuy;

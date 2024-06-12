import Image from "next/image";
import { Button } from "../ui/button";

const ItemFeaturedBuy = () => {
  return (
    <div className="border rounded-sm flex flex-col md:flex-row-reverse">
      <div className="p-5 w-full max-w-md mx-auto">
        <Image
          height={200}
          width={200}
          src={"/user.jpg"}
          alt="image-card"
          className="object-cover border border-red-100 aspect-square w-full overflow-hidden"
        />
      </div>

      <div className="p-5 flex flex-col flex-1">
        <h1 className="pt-20 text-4xl font-semibold mb-1">
          Google Pixel 8 Pro
        </h1>
        <p className="mb-1 font-serif">$700</p>
        <div className="flex flex-col pt-2">
          <span>select</span>
          <div>Pixel</div>
        </div>
        <div className="flex flex-col pt-2">
          <span>Quantity</span>
          <input type="number" />
        </div>

        <div className="pt-10 flex gap-2 w-full">
          <Button className="w-full">Go to cart</Button>
          <Button className="w-full">Buy now</Button>
        </div>
      </div>
    </div>
  );
};

export default ItemFeaturedBuy;

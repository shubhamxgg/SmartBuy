import { Button } from "@/components/ui/button";
import { Product } from "@/type";
import { Heart } from "lucide-react";

interface ProductDetailsProps {
  product: Product;
}

const ProductDetails = ({ product }: ProductDetailsProps) => (
  <div className="w-full p-4 lg:w-1/2 mt-3 flex flex-col lg:ml-4 bg-card rounded-sm lg:mt-0 border">
    <div className="bg-neutral-500 w-fit p-2 rounded-md mb-4 mt-2 text-center">
      {product.status === "AVAILABLE" ? "Buy Now" : "Out of Stock"}
    </div>
    <h3 className="font-semibold text-lg mb-2">{product.title}</h3>
    <h1 className="font-semibold text-md mt-2">${product.price}</h1>
    <div className="flex flex-col gap-2 mt-2">
      <p className="text-sm">Select quantity</p>
      <div className="flex gap-2">
        <Button variant={"default"} size={"icon"}>
          +
        </Button>
        {"Numer"}
        <Button variant={"default"} size={"icon"}>
          -
        </Button>
      </div>
    </div>

    <div className="flex flex-col p-4 mt-5 border bg-card rounded-sm">
      <div className="flex items-center justify-between">
        <h4 className="text-sm lg:text-base">Free Delivery</h4>
        <p className="text-sm lg:text-base">Details</p>
      </div>
      <div className="mt-4 flex gap-2">
        Get <p className="text-red-500">SAMPLE</p>
      </div>
    </div>

    <div className="flex items-center justify-between p-5 border mt-2 rounded-sm">
      <h1>Secure</h1>
      <h1>Satisfaction</h1>
      <h1>Privacy</h1>
    </div>

    <div className="flex items-center gap-2 w-full mt-4 py-4">
      <Button className="w-full" variant={"outline"}>
        Add to cart
      </Button>
      <Button className="w-full" variant={"outline"}>
        Buy now
      </Button>
    </div>

    <div className="py-2 flex items-center gap-2">
      <Heart className="h-5 w-5" />
      <p className="underline underline-offset-3">Wishlist</p>
    </div>

    <h1 className="mt-10 mb-2 font-semibold text-lg">Product Details</h1>
    <p className="w-full text-balance leading-relaxed overflow-hidden">
      {product.description}
    </p>
  </div>
);

export default ProductDetails;

import { ShoppingCart } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";

export default function CartEmpty() {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center h-full">
      <ShoppingCart className="w-16 h-16 text-gray-400 mb-4" />
      <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
      <p className="text-gray-500 mb-6">
        Looks like you havent added any items to your cart yet.
      </p>
      <Link href="/">
        <Button variant="default" className="font-semibold">
          Start Shopping
        </Button>
      </Link>
    </div>
  );
}

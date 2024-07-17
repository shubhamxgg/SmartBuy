import { ShoppingCart } from "lucide-react";
import { Button } from "../ui/button";

interface CartButtonProps {
  itemCount: number;
}

const CartButton = ({ itemCount }: CartButtonProps) => (
  <Button variant="outline" size="sm" className="relative p-2">
    <ShoppingCart className="h-5 w-5" />
    {itemCount > 0 && (
      <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
        {itemCount}
      </span>
    )}
  </Button>
);

export default CartButton;
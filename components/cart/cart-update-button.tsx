import { ReactNode } from "react";
import { Button } from "../ui/button";

interface CartUpdateButtonProps {
  icon: ReactNode;
  onClick: () => void;
  className?: string;
}
const CartUpdateButton = ({
  icon,
  onClick,
  className,
}: CartUpdateButtonProps) => {
  return (
    <Button
      size={"icon"}
      variant={"outline"}
      className={`h-8 w-8 rounded-full ${className}`}
      onClick={onClick}
    >
      {icon}
    </Button>
  );
};

export default CartUpdateButton;

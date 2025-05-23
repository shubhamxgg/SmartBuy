import { ButtonHTMLAttributes, ReactNode } from "react";
import { Button, ButtonProps } from "../ui/button";

interface CartUpdateButtonProps extends ButtonProps {
  icon: ReactNode;
  className?: string;
}
const CartUpdateButton = ({
  icon,
  className,
  ...props
}: CartUpdateButtonProps) => {
  return (
    <Button
      size={"icon"}
      variant={"outline"}
      className={`h-8 w-8 rounded-full ${className}`}
      {...props}
    >
      {icon}
    </Button>
  );
};

export default CartUpdateButton;

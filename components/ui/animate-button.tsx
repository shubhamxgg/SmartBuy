import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface AnimatedButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  className: string;
  disabled: boolean;
}

const AnimatedButton = ({
  children,
  onClick,
  className,
  disabled,
}: AnimatedButtonProps) => {
  return (
    <motion.button
      onClick={onClick}
      className={className}
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.05 }}
      disabled={disabled}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {children}
    </motion.button>
  );
};

export default AnimatedButton;

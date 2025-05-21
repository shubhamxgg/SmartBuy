import { useState } from "react";

export default function useCartSheet() {
  const [isOpen, setIsOpen] = useState(false);
  
  return { isOpen, setIsOpen };
}

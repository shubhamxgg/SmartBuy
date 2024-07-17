// "use client";

// import { Button } from "../ui/button";
// import { ShoppingCart } from "lucide-react";
// import { CardFooter } from "../ui/card";


// import WishlistButton from "../wishlist-button";
// import { Product } from "@/type";

// interface ProductCardFooterProps {
//   product: Product;
//   userId: string | null;
// }

// export function ProductCardFooter({ product, userId }: ProductCardFooterProps) {
//   const { handleAddToCart, isAddingToCart } = useCart(product);

//   return (
//     <CardFooter className="p-4 pt-0 mt-auto">
//       <div className="flex items-center justify-between w-full">
//         <Button
//           size="sm"
//           variant="secondary"
//           onClick={(e) => {
//             e.preventDefault();
//             handleAddToCart();
//           }}
//           disabled={isAddingToCart}
//           className="flex-1 mr-2"
//         >
//           <ShoppingCart className="mr-2 h-4 w-4" />
//           {isAddingToCart ? "Adding to Cart..." : "Add to Cart"}
//         </Button>
//         {userId && (
//           <WishlistButton
//             userId={userId}
//             productId={product.id}
//             isWishList={false}
//           />
//         )}
//       </div>
//     </CardFooter>
//   );
// }

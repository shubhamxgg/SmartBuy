import { Button } from "@/components/ui/button";
import { Product } from "@/type";
import {
  Heart,
  Plus,
  Minus,
  Truck,
  ShieldCheck,
  Lock,
  Calendar,
  CheckCircle,
} from "lucide-react";

import { useUserAuth } from "@/hooks/use-auth";
import { useCart } from "@/hooks/use-cart";
import { WishlistButton } from "../home-layout/wishlist-button";

interface ProductDetailsProps {
  product: Product;
}

const ProductDetails = ({ product }: ProductDetailsProps) => {
  const { addToCart } = useCart();

  const { userId, isAuthenticated, showLoginToast } = useUserAuth();
  if (userId === undefined) {
    return <div>Please log in to add items to your wishlist.</div>;
  }
  return (
    <div className="w-full lg:w-1/2 p-8 lg:ml-4 bg-card rounded-xl border border-border shadow-sm">
      <div className="flex flex-col mb-8">
        <span
          className={`self-start px-3 py-1 rounded-full text-xs font-semibold mb-4 ${
            product.status === "AVAILABLE"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {product.status === "AVAILABLE" ? "In Stock" : "Out of Stock"}
        </span>
        <h2 className="text-3xl font-bold mb-2">{product.title}</h2>
        <div className="text-4xl font-bold text-primary">${product.price}</div>
      </div>

      <div className="mb-8">
        <label className="block text-sm font-medium mb-3">Quantity</label>
        <div className="flex items-center space-x-3 bg-background p-2 rounded-lg w-fit border border-border">
          <Button variant="ghost" size="icon" className="hover:bg-muted">
            <Minus className="h-4 w-4" />
          </Button>
          <span className="w-8 text-center font-medium">1</span>
          <Button variant="ghost" size="icon" className="hover:bg-muted">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="bg-background rounded-lg p-5 mb-8 border border-border">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <Truck className="h-5 w-5 mr-3 text-primary" />
            <span className="font-semibold">Free Delivery</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="text-primary hover:bg-muted"
          >
            Details
          </Button>
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <Calendar className="h-4 w-4 mr-3" />
          <span>Estimated delivery: 3-5 business days</span>
        </div>
      </div>

      <div className="flex gap-4 mb-6">
        <Button className="flex-1 bg-primary hover:bg-primary/90">
          Buy Now
        </Button>
        <Button
          className="flex-1"
          variant="outline"
          onClick={() => addToCart(product, 1)}
        >
          Add to Cart
        </Button>
      </div>

      <WishlistButton productId={product.id} />

      <div className="border-t border-border pt-6 mb-8">
        <h3 className="text-xl font-semibold mb-4">Product Details</h3>
        <p className="text-muted-foreground leading-relaxed mb-6">
          {product.description}
        </p>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center">
            <ShieldCheck className="h-5 w-5 mr-2 text-primary" />
            <span>Secure Transaction</span>
          </div>
          <div className="flex items-center">
            <Lock className="h-5 w-5 mr-2 text-primary" />
            <span>Privacy Protected</span>
          </div>
          <div className="flex items-center">
            <CheckCircle className="h-5 w-5 mr-2 text-primary" />
            <span>Quality Guaranteed</span>
          </div>
          <div className="flex items-center">
            <Heart className="h-5 w-5 mr-2 text-primary" />
            <span>Satisfaction Assured</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;

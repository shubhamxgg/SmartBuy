import { WishListItems } from "@/type";
import WishlistCard from "./wishlist-card";

interface WishlistGridProps {
  items: WishListItems[];
}

export default function WishlistGrid({ items }: WishlistGridProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <WishlistCard key={item.id} item={item} />
      ))}
    </div>
  );
}

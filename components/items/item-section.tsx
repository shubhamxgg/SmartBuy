import useProductStore from "@/lib/store/use-products";
import ItemCard from "./item-card";
import ItemList from "./item-list";
import { Loader } from "lucide-react";
import ItemSectionSkeleton from "./item-section-skeleton";

interface ItemSectonProps {
  title: string;
}

const ItemSection = ({ title }: ItemSectonProps) => {
  const { filterProductsByCategory, isLoading } = useProductStore();
  const data = filterProductsByCategory(title).slice(0, 3);
  if (isLoading) {
    return <ItemSectionSkeleton />;
  }
  return (
    <div className="flex flex-col pb-5 w-full">
      <div className="flex items-center justify-between px-2 py-4 border rounded-sm border-white/20">
        <h1>{title}</h1>
        <span>View all product</span>
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 w-full p-3 gap-4 border flex-1 mt-2 rounded-sm">
        {data.map((product) => (
          <ItemCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ItemSection;

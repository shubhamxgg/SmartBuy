'use'
import { Skeleton } from "../ui/skeleton";
import ItemCategoryCard from "./item-category-card";
import useCategories from "@/hooks/use-categories";
import ItemCategorySkeleton from "./item-category-skeleton";

const ItemCategory = () => {
  const { data, isLoading, error } = useCategories();

  if (isLoading) {
    return <ItemCategorySkeleton />;
  }

  if (error) {
    return <div className="text-red-500">Failed to load categories.</div>;
  }

  return (
    <div className="pb-5 pt-2 flex flex-col md:flex-row w-full gap-2">
      <div className="flex items-center justify-center py-2 border-[2px] flex-1 md:font-bold md:text-4xl md:px-6 md:py-0 rounded-sm bg-card">
        <h1>{"Shop by category"}</h1>
      </div>
      <div className="flex gap-2 overflow-x-auto scroll-auto snap-x snap-proximity">
        {data?.map((item) => (
          <ItemCategoryCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default ItemCategory;

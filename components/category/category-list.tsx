import { Category } from "@/type";
import { CategoryCard } from "./category-card";

interface CategoryListProps {
  categories: Category[];
}

export function CategoryList({ categories }: CategoryListProps) {
  return (
    <div className="flex overflow-x-auto pb-4 -mx-4 px-4 space-x-4 ">
      {categories.map((category) => (
        <CategoryCard key={category.id} category={category} />
      ))}
    </div>
  );
}

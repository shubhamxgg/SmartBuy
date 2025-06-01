import { CategoryList } from "./category-list";
import { Button } from "@/components/ui/button";
import { getCategories } from "@/lib/api/categories";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

async function Category() {
  const categories = await getCategories();

  return (
    <section
      className="py-6 space-y-4 mb-5 border rounded-lg bg-card"
      aria-labelledby="category-heading"
    >
      <div className="flex items-center justify-between px-6 pb-4 border-b">
        <h2 id="category-heading" className="text-2xl font-bold">
          Shop by Category
        </h2>
        <Link href="/products" passHref>
          <Button
            variant="ghost"
            className="text-primary hover:text-primary/80 flex items-center text-sm font-medium"
          >
            View All
            <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </Link>
      </div>
      <div className="px-6 overflow-hidden">
        <CategoryList categories={categories} />
      </div>
    </section>
  );
}

export default Category;

import { getProductByCategory } from "@/lib/actions/category";
import { ProductGrid } from "./product-grid";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

interface ProductSectionProps {
  categoryName: string;
}

export async function ProductSection({ categoryName }: ProductSectionProps) {
  const categoryData = await getProductByCategory({ categoryName });

  if (
    !categoryData ||
    categoryData.length === 0 ||
    categoryData[0].products.length === 0
  ) {
    return (
      <div className="text-center text-gray-500 my-8">
        No products found for this category.
      </div>
    );
  }

  const { id: categoryId, products } = categoryData[0];

  return (
    <section className="mb-12">
      <div className="flex flex-row items-center justify-between mb-6 pb-4 border-b">
        <h2 className="text-xl sm:text-3xl font-bold text-gray-800 sm:mb-0">
          <span className="bg-clip-text text-primary">{categoryName}</span>
        </h2>
        <Button variant="outline" asChild className="group">
          <a
            href={`/search?category=${categoryId}`}
            className="flex items-center"
          >
            View All Products
            <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
        </Button>
      </div>
      <ProductGrid products={products} />
    </section>
  );
}

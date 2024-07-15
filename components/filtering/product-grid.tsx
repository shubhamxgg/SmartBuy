'use client'
import { Product } from "@/type";
import dynamic from 'next/dynamic';
import { Skeleton } from "@/components/ui/skeleton";

const ItemCard = dynamic(() => import("../items/item-card"), {
  loading: () => <ItemCardSkeleton />,
});

interface ProductGridProps {
  products: Product[];
}

function ItemCardSkeleton() {
  return (
    <div className="space-y-3">
      <Skeleton className="h-48 w-full" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
    </div>
  );
}

function ProductGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
      {[...Array(6)].map((_, i) => (
        <ItemCardSkeleton key={i} />
      ))}
    </div>
  );
}

const ProductGrid = ({ products }: ProductGridProps) => {
  if (!products || products.length === 0) {
    return <ProductGridSkeleton />;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
      {products.map((product) => (
        <ItemCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
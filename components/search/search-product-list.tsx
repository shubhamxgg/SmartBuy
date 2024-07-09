import ItemCard from "@/components/items/item-card";
import { Product } from "@/type";

interface ProductListProps {
  products: Product[];
}

const SearchProductList = ({ products }: ProductListProps) => (
  <div className="col-span-1 md:col-span-3 grid xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 md:gap-5">
    {products.map((product) => (
      <ItemCard key={product.id} product={product} />
    ))}
  </div>
);

export default SearchProductList;

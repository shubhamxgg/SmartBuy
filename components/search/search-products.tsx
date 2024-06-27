import SearchProductList from "./search-product-list";
import SearchProductListSkeleton from "./search-sidebar-skeleton";

const SearchProduct = ({ loading, products }: any) => {
  if (loading) return <SearchProductListSkeleton />;
  return <SearchProductList products={products} />;
};

export default SearchProduct;

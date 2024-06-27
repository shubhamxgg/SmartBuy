import { getFilteredProducts } from "@/lib/actions/get-filter-product";
import { useQuery } from "@tanstack/react-query";

const fetchProducts = async (filters: any) => {
  const data = await getFilteredProducts(filters);
  return data.products;
};

const useProducts = (filters: any) => {
  return useQuery({
    queryKey: ["products", filters],
    queryFn: () => fetchProducts(filters),
    refetchOnWindowFocus : false
  });

};

export default useProducts;

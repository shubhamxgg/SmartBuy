import { getProductById } from "@/lib/actions/product";
import { useQuery } from "@tanstack/react-query";

const useItemData = (id: number) => {
  return useQuery({
    queryKey: ["products", id],
    queryFn: () => getProductById(id),
    refetchOnWindowFocus: false,
  });
};

export default useItemData;

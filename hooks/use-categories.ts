import { getCategories } from "@/lib/actions/category";
import { useQuery } from "@tanstack/react-query";

const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => await getCategories(),
    refetchOnWindowFocus: false,
  });
};

export default useCategories;

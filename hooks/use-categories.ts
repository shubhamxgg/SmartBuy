import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useCategoryStore from "@/store/useCategoryStore";

const useCategories = () => {
  const queryClient = useQueryClient();
  const { categories, isLoading, error, fetchCategories, addCategory } =
    useCategoryStore();

  useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,

    enabled: categories.length === 0 && !isLoading && !error,
  });

  const addCategoryMutation = useMutation({
    mutationFn: addCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });

  return {
    categories,
    isLoading,
    error,

    addCategory: addCategoryMutation.mutate,
    isAddingCategory: addCategoryMutation.isPending,
    addCategoryError: addCategoryMutation.error,
  };
};

export default useCategories;

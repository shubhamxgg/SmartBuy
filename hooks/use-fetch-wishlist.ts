import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchAllWishlist, removeFromWishlist } from "@/lib/actions/wishlist";
import { toast } from "sonner";

const fetchWishlist = async ({ userId }: { userId: number }) => {
  const response = await fetchAllWishlist({ userId });
  return response;
};

const removeItem = async ({
  userId,
  productId,
}: {
  userId: number;
  productId: number;
}) => {
  const response = await removeFromWishlist({ userId, productId });
  return response;
};

export const useFetchAllWishlist = ({ userId }: { userId: number }) => {
  return useQuery({
    queryKey: ["wishlist1", userId],
    queryFn: () => fetchWishlist({ userId }),
    enabled: Boolean(userId),
    refetchOnWindowFocus: false,
  });
};

export const useRemoveWishlist = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      productId,
      userId,
    }: {
      productId: number;
      userId: number;
    }) => removeItem({ productId, userId }),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["wishlist1"] });
      const previousWishlist = queryClient.getQueryData(["wishlist1"]);
      queryClient.setQueryData(["wishlist1"], (old: any) => {
        return old ? old.filter((item: any) => item.id !== item.productId) : [];
      });

      return { previousWishlist };
    },

    onError: () => {
      toast.error("Failed to remove from wishlist.");
    },
    onSuccess: () => {
      toast.success("Removed from wishlist!");
    },
    onSettled: (data, error, variables, context) => {
      queryClient.invalidateQueries({ queryKey: ["wishlist1"] });
    },
  });
};

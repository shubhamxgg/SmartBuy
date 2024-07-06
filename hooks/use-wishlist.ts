import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { getWishlist, removeItemFromWishlist } from "@/lib/actions/wishlist";
import { toast } from "sonner";

const fetchWishlist = async ({
  userId,
  pageParam = 0,
}: {
  userId: number;
  pageParam: number;
}) => {
  const response = await getWishlist({ userId, skip: pageParam, take: 10 });
  return response;
};

const removeWishlistItem = async ({
  userId,
  productId,
}: {
  userId: number;
  productId: number;
}) => {
  const response = await removeItemFromWishlist({ productId, userId });
  return response;
};

export const useWishlist = (userId: number) => {
  return useInfiniteQuery({
    queryKey: ["wishlist", userId],
    queryFn: ({ pageParam = 0 }) => fetchWishlist({ userId, pageParam }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
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
    }) => removeWishlistItem({ productId, userId }),
    onSuccess: () => {
      toast.success("Removed from wishlist !");
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
    },
    onError: () => {
      toast.error("Failed to remove from wishlist.");
    },
  });
};

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createWishlist,
  fetchAllWishlist,
  removeFromWishlist,
} from "@/lib/actions/wishlist";

import { useUserAuth } from "./use-auth";

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

export const useWishlist = () => {
  const { userId } = useUserAuth();
  const queryClient = useQueryClient();
  const wishlist = useQuery({
    queryKey: ["wishlist"],
    queryFn: () => fetchWishlist({ userId: userId as number }),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  const removeWishlist = useMutation({
    mutationFn: ({ productId }: { productId: number }) =>
      removeItem({ productId, userId: userId as number }),

    onMutate: async ({ productId }) => {
      await queryClient.cancelQueries({ queryKey: ["wishlist"] });

      const previousWishlist = queryClient.getQueryData(["wishlist"]);

      queryClient.setQueryData(["wishlist"], (old: any) => {
        old?.items?.filter((item: any) => item.product.id != productId);
        return old;
      });

      return { previousWishlist };
    },

    onError: (error, variables, context) => {
      queryClient.setQueryData(["wishlist"], context?.previousWishlist);
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
    },
  });

  const addToWishList = useMutation({
    mutationFn: ({ productId }: { productId: number }) =>
      createWishlist({ productId, userId: userId as number }),

    onMutate: async ({ productId }) => {
      await queryClient.cancelQueries({ queryKey: ["wishlist"] });
      const previousWishlist = queryClient.getQueryData(["wishlist"]);

      const tempItem = {
        id: `temp-${Date.now()}`,
        productId,
        product: {
          id: productId,
          title: "Loading...",
          price: 0,
          imageUrl: "",
          description: "",
          createdAt: new Date(),
          updatedAt: new Date(),
          featured: false,
          sellerId: 0,
          status: "AVAILABLE",
        },
        wishlistId: 0,
      };

      queryClient.setQueryData(["wishlist"], (old: any) => {
        return {
          ...old,
          items: [...old?.items, tempItem],
        };
      });

      return { previousWishlist };
    },

    onError: (error, variables, context) => {
      queryClient.setQueryData(["wishlist"], context?.previousWishlist);
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
    },
  });

  return {
    wishlist,
    remove: removeWishlist,
    add: addToWishList,
  };
};

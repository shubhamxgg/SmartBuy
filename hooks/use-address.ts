import { useCallback } from "react";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { Address } from "@/type";
import { deleteAddress, getUserAddresses } from "@/lib/actions/address";
import { toast } from "sonner";

export const useAddresses = (userId: number) => {
  const queryClient = useQueryClient();

  const {
    data: addresses = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["addresses", userId],
    queryFn: () => getUserAddresses(userId),
  });

  const invalidateAddresses = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: ["addresses", userId] });
  }, [queryClient, userId]);

  const deleteMutation = useMutation({
    mutationFn: (addressId: number) => deleteAddress(addressId, userId),
    onMutate: async (addressId) => {
      await queryClient.cancelQueries({ queryKey: ["addresses", userId] });

      const previousAddresses = queryClient.getQueryData<Address[]>([
        "addresses",
        userId,
      ]);
      queryClient.setQueryData<Address[]>(["addresses", userId], (old) =>
        old ? old.filter((address) => address.id !== addressId) : []
      );
      return { previousAddresses };
    },
    onError: (err, newTodo, context) => {
      queryClient.setQueryData(
        ["addresses", userId],
        context?.previousAddresses
      );
      toast.error("Failed to delete address. Please try again.");
    },
    onSettled: () => {
      invalidateAddresses();
    },
  });

  const handleDeleteAddress = useCallback(
    (addressId: number) => {
      deleteMutation.mutate(addressId);
    },
    [deleteMutation]
  );

  return {
    addresses,
    isLoading,
    error,
    invalidateAddresses,
    deleteAddress: handleDeleteAddress,
    isDeletingAddress: deleteMutation.isPending,
  };
};

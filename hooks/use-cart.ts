import useCartStore from "@/store/useCartStore";
import { Product } from "@/type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createCartItem,
  getCartItem,
  removeCartItem,
  updateCartItem,
} from "@/lib/actions/cart";
import { useUserAuth } from "./use-auth";

export const useCart = () => {
  const { cart, setCart, addToCart, removeFromCart, updateCartItemQuantity } =
    useCartStore();
  const { userId } = useUserAuth();

  const cartData = useQuery({
    queryKey: ["cart", userId],
    queryFn: async () => {
      const data = await getCartItem({ userId: userId as number });
      return data;
    },
    enabled: !!userId,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const addToCartMutation = useMutation({
    mutationFn: async ({
      product,
      quantity,
    }: {
      product: Product;
      quantity: number;
    }) => {
      await createCartItem({
        productId: product.id,
        quantity: quantity || 1,
        userId: userId as number,
      });
    },
  });

  const removeFromCartMutation = useMutation({
    mutationFn: async (id: number) => {
      await removeCartItem({ productId: id, userId: userId as number });
    },
  });

  const updateCartItemMutation = useMutation({
    mutationFn: async ({
      userId,
      productId,
      quantity,
    }: {
      userId: number;
      productId: number;
      quantity: number;
    }) => {
      await updateCartItem({ userId, productId, quantity });
    },
  });

  const handleAddToCart = (product: Product, quantity: number) => {
    addToCart(product, quantity);
    if (userId) {
      addToCartMutation.mutate({ product, quantity });
    }
  };
  const handleRemoveFromCart = (id: number) => {
    removeFromCart(id);
    if (userId) {
      removeFromCartMutation.mutate(id);
    }
  };
  const handleUpdateQuantity = (id: number, quantity: number) => {
    updateCartItemQuantity(id, quantity);
    if (userId) {
      updateCartItemMutation.mutate({ userId: userId as number, productId: id, quantity });
    }
  };

  const mergeCart = () => {
    const serverCart = cartData.data;
    const localCart = cart;
    const mergedItems = [...serverCart.items];

    localCart.items.forEach((item) => {
      const exist = mergedItems.find((i) => i.productId === item.productId);
      if (exist) {
        exist.quantity += item.quantity;
      } else {
        mergedItems.push(item);
      }
    });

    setCart({ cartId: serverCart.cartId, items: mergedItems });
  };

  return {
    cart,
    cartData,
    setCart,
    addToCart: handleAddToCart,
    removeFromCart: handleRemoveFromCart,
    updateQuantity: handleUpdateQuantity,
    mergeCart,
  };
};

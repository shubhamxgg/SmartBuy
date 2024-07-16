import { useCallback } from 'react';
import useCartStore from '@/store/useCartStore';
import { Product } from '@/type';


export const useCart = () => {
  const { addToCart, removeFromCart, updateCartItemQuantity, cart, isLoading, error } = useCartStore();

  const handleAddToCart = useCallback(async (product: Product, quantity: number = 1) => {
    await addToCart(product, quantity);
  }, [addToCart]);

  const handleRemoveFromCart = useCallback(async (productId: number) => {
    await removeFromCart(productId);
  }, [removeFromCart]);

  const handleUpdateQuantity = useCallback(async (productId: number, quantity: number) => {
    await updateCartItemQuantity(productId, quantity);
  }, [updateCartItemQuantity]);

  return {
    cart,
    isLoading,
    error,
    addToCart: handleAddToCart,
    removeFromCart: handleRemoveFromCart,
    updateQuantity: handleUpdateQuantity,
  };
};
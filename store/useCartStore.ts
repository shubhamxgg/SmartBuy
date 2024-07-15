import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Product } from "../type";
import {
  clearCartItem,
  createCartItem,
  getCartItem,
  removeCartItem,
  updateCartItem,
} from "@/lib/actions/cart";

interface CartItem {
  id: number;
  productId: number;
  quantity: number;
  product: Product;
}

interface Cart {
  cartId: number | null;
  items: CartItem[];
}

interface CartStore {
  cart: Cart;
  userId: number | null;
  isLoading: boolean;
  error: string | null;
  fetchCart: (userId: number | null) => Promise<void>;
  addToCart: (product: Product, quantity: number) => Promise<void>;
  removeFromCart: (productId: number) => Promise<void>;
  updateCartItemQuantity: (productId: number, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  mergeLocalCartWithServerCart: (userId: number | null) => Promise<void>;
}

const useCartStore = create(
  persist<CartStore>(
    (set, get) => ({
      cart: { cartId: null, items: [] },
      userId: null,
      isLoading: false,
      error: null,

      fetchCart: async (userId: number | null) => {
        if (!userId) {
          set({ cart: { cartId: null, items: [] }, userId: null, isLoading: false });
          return;
        }
        set({ isLoading: true, error: null });
        try {
          const cartData = await getCartItem({ userId });
          set({ cart: cartData, userId, isLoading: false });
        } catch (error: any) {
          set({ error: error.message, isLoading: false });
        }
      },

      addToCart: async (product: Product, quantity: number) => {
        const { userId, cart  } = get();
        const newItem: CartItem = {
          id: Date.now(),
          productId: product.id,
          quantity: quantity || 1, 
          product: { ...product },
        };

        if (userId) {
          try {
            await createCartItem({ productId: product.id, quantity: quantity || 1, userId });
            set({ cart: { ...cart, items: [...cart.items, newItem] } });
          } catch (error: any) {
            set({ error: error.message });
          }
        } else {
          set({ cart: { ...cart, items: [...cart.items, newItem] } });
        }
      },

      removeFromCart: async (productId: number) => {
        const { userId, cart } = get();
        if (userId) {
          try {
            await removeCartItem({ userId, productId });
            set({ cart: { ...cart, items: cart.items.filter(item => item.productId !== productId) } });
          } catch (error: any) {
            set({ error: error.message });
          }
        } else {
          set({ cart: { ...cart, items: cart.items.filter(item => item.productId !== productId) } });
        }
      },

      updateCartItemQuantity: async (productId: number, quantity: number) => {
        const { userId, cart } = get();
        if (userId) {
          try {
            await updateCartItem({ userId, productId, quantity });
            set({
              cart: {
                ...cart,
                items: cart.items.map(item =>
                  item.productId === productId ? { ...item, quantity } : item
                ),
              },
            });
          } catch (error: any) {
            set({ error: error.message });
          }
        } else {
          set({
            cart: {
              ...cart,
              items: cart.items.map(item =>
                item.productId === productId ? { ...item, quantity } : item
              ),
            },
          });
        }
      },

      clearCart: async () => {
        const { userId, cart } = get();
        if (userId && cart.cartId) {
          try {
            await clearCartItem({ cartId: cart.cartId, userId });
            set({ cart: { cartId: null, items: [] } });
          } catch (error: any) {
            set({ error: error.message });
          }
        } else {
          set({ cart: { cartId: null, items: [] } });
        }
      },

      mergeLocalCartWithServerCart: async (userId: number | null) => {
        if (!userId) {
          return;
        }
        const { cart } = get();
        set({ isLoading: true, error: null });
        try {
          const serverCart = await getCartItem({ userId });
          for (const item of cart.items) {
            const serverItem = serverCart.items.find((si: { productId: number }) => si.productId === item.productId);
            if (serverItem) {
              await updateCartItem({
                userId,
                productId: item.productId,
                quantity: item.quantity + serverItem.quantity,
              });
            } else {
              await createCartItem({
                productId: item.productId,
                quantity: item.quantity,
                userId,
              });
            }
          }

          const updatedCart = await getCartItem({ userId });
          set({ cart: updatedCart, userId, isLoading: false });
        } catch (error: any) {
          set({ error: error.message, isLoading: false });
        }
      },
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useCartStore;
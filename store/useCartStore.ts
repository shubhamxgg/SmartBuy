import { create } from "zustand";
import { CartItems, Product } from "../type";
import {
  clearCartItem,
  createCartItem,
  getCartItem,
  removeCartItem,
  updateCartItem,
} from "@/lib/actions/cart";

interface CartStore {
  cart: CartItems[];
  cartId: number;
  userId: number | null;
  isLoading: boolean;
  error: string | null;
  fetchCart: (userId: number) => Promise<void>;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateCartItemQuantity: (productId: number, quantity: number) => void;
  clearCart: (cartId: number) => void;
}

const useCartStore = create<CartStore>((set, get) => ({
  cart: [],
  cartId: 0,
  userId: null,
  isLoading: false,
  error: null,

  fetchCart: async (userId: number) => {
    set({ isLoading: true, error: null, userId });
    try {
      const { cartId, items } = await getCartItem({ userId });
      set({ cartId, cart: items, isLoading: false });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },

  addToCart: async (product: Product) => {
    const { cart, userId } = get();
    if (userId === null) {
      set({ error: "User Id is not set" });
      return;
    }
    const existingItem = cart.find((item) => item.productId === product.id);
    if (existingItem) {
      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity + 1,
        userId,
      };
      await updateCartItem(updatedItem);
      set({
        cart: cart.map((item) =>
          item.productId === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      });
    } else {
      const newItem = await createCartItem({
        productId: product.id,
        quantity: 1,
        userId,
      });
      const newCartItem: CartItems = {
        id: newItem.id,
        cartId: newItem.cartId,
        userId: userId,
        productId: newItem.productId,
        quantity: newItem.quantity,
        product: { ...product, quantity: 1 },
      };
      set({ cart: [...cart, newCartItem] });
    }
  },

  removeFromCart: async (productId: number) => {
    const { cart, userId } = get();
    if (userId === null) {
      set({ error: "User ID is not set" });
      return;
    }
    try {
      await removeCartItem({ productId, userId });
      set({ cart: cart.filter((item) => item.productId !== productId) });
    } catch (error: any) {
      set({ error: error.message });
    }
  },

  updateCartItemQuantity: async (productId: number, quantity: number) => {
    const { userId, cart } = get();
    if (userId === null) {
      set({ error: "User Id is not set" });
      return;
    }
    try {
      await updateCartItem({ productId, quantity, userId });
      set({
        cart: cart.map((item) =>
          item.productId === productId ? { ...item, quantity } : item
        ),
      });
    } catch (error: any) {
      set({ error: error.message });
    }
  },

  clearCart: async (cartId: number) => {
    const { userId } = get();
    if (userId === null) {
      set({ error: "User Id is not set" });
      return;
    }
    try {
      await clearCartItem({ cartId, userId });
      set({ cart: [] });
    } catch (error: any) {
      set({ error: error.message });
    }
    set({ cart: [] });
  },
}));

export default useCartStore;

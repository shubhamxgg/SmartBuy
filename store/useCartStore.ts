import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Product } from "../type";

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
  setCart: (cart: Cart) => void;
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: number) => void;
  updateCartItemQuantity: (
    productId: number,
    quantity: number
  ) => Promise<void>;
  clearCart: () => void;
}

const useCartStore = create(
  persist<CartStore>(
    (set, get) => ({
      cart: { cartId: null, items: [] },
      userId: null,
      isLoading: false,
      error: null,

      setCart: (cart: Cart) => {
        set({ cart });
      },

      addToCart: (product: Product, quantity: number) => {
        const { cart } = get();
        const validQuantity = Number(quantity) > 0 ? Number(quantity) : 1;

        const existingItem = cart.items.find(
          (item) => item.productId === product.id
        );

        if (existingItem) {
          set({
            cart: {
              ...cart,
              items: cart.items.map((item) =>
                item.productId === product.id
                  ? { ...item, quantity: item.quantity + validQuantity }
                  : item
              ),
            },
          });
        } else {
          const newItem: CartItem = {
            id: Date.now(),
            productId: product.id,
            quantity: validQuantity,
            product: { ...product },
          };

          set({ cart: { ...cart, items: [...cart.items, newItem] } });
        }
      },

      removeFromCart: async (productId: number) => {
        const { cart } = get();

        set({
          cart: {
            ...cart,
            items: cart.items.filter((item) => item.productId !== productId),
          },
        });
      },

      updateCartItemQuantity: async (productId: number, quantity: number) => {
        const { cart } = get();

        const validQuantity = quantity > 0 ? quantity : 1;

        set({
          cart: {
            ...cart,
            items: cart.items.map((item) =>
              item.productId === productId
                ? { ...item, quantity: validQuantity }
                : item
            ),
          },
        });
      },

      clearCart: async () => {
        set({ cart: { cartId: null, items: [] } });
      },
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useCartStore;

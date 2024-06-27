import { create } from "zustand";
import { getProducts } from "../lib/actions/get-products";
import { CartItem, Filter, Product } from "../lib/type";

interface ProductStore {
  products: Product[];
  filteredProducts: Product[];
  categories: string[];
  cart: CartItem[];
  isLoading: boolean;
  error: string | null;
  fetchProducts: () => Promise<void>;
  filterProductsByCategory: (categoryName: string) => Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateCartItemQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  setFilter: (filter: Filter) => void;
  resetFilter: () => void;
  setSort: (sortCriteria: string) => void;
}

const SORT_CRITERIA = {
  FEATURED: "Featured",
  DISCOUNT: "Discount",
  PRICE_LOW_TO_HIGH: "Price low to high",
  PRICE_HIGH_TO_LOW: "Price high to low",
  OUT_OF_STOCK: "OUT_OF_STOCK",
};

const filterProducts = (products: Product[], filter: Filter): Product[] => {
  let filtered = products;

  if (filter.categories && filter.categories.length > 0) {
    filtered = filtered.filter((product) =>
      filter.categories!.includes(product.category.name)
    );
  }

  // if (filter.brands && filter.brands.length > 0) {
  //   filtered = filtered.filter((product) =>
  //     filter.brands!.includes(product.brand)
  //   );
  // }

  if (filter.priceRange) {
    filtered = filtered.filter(
      (product) =>
        product.price >= filter.priceRange![0] &&
        product.price <= filter.priceRange![1]
    );
  }

  if (filter.searchTerm) {
    const searchTerm = filter.searchTerm.toLowerCase();
    filtered = filtered.filter((product) =>
      product.title.toLowerCase().includes(searchTerm)
    );
  }
  return filtered;
};

const sortProducts = (products: Product[], sortCriteria: string): Product[] => {
  let sortedProducts = [...products];

  switch (sortCriteria) {
    case SORT_CRITERIA.FEATURED:
      sortedProducts.sort((a, b) => Number(b.featured) - Number(a.featured));
      break;
    case SORT_CRITERIA.PRICE_LOW_TO_HIGH:
      sortedProducts.sort((a, b) => a.price - b.price);
      break;
    case SORT_CRITERIA.PRICE_HIGH_TO_LOW:
      sortedProducts.sort((a, b) => b.price - a.price);
      break;
    case SORT_CRITERIA.DISCOUNT:
      sortedProducts.sort((a, b) => {
        if (a.status === "OUT_OF_STOCK" && b.status !== "OUT_OF_STOCK")
          return 1;
        if (a.status !== "OUT_OF_STOCK" && b.status === "OUT_OF_STOCK")
          return -1;
        return 0;
      });

      break;
    default:
      break;
  }

  return sortedProducts;
};

const useProductStore = create<ProductStore>((set, get) => ({
  products: [],
  categories: [],
  filteredProducts: [],
  cart: [],
  isLoading: false,
  error: null,

  fetchProducts: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await getProducts();
      const categories = Array.from(
        new Set(response.map((product) => product.category.name))
      );
      set({
        products: response,
        categories,
        filteredProducts: response,
        isLoading: false,
      });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },

  setFilter: (filter: Filter) => {
    const { products } = get();
    const filtered = filterProducts(products, filter);
    set({ filteredProducts: filtered });
  },

  resetFilter: () => {
    const { products } = get();
    set({ filteredProducts: products });
  },

  filterProductsByCategory: (categoryName: string) => {
    const { products } = get();
    return products.filter((product) => product.category.name === categoryName);
  },

  setSort: (sortCriteria: string) => {
    const { filteredProducts } = get();
    const sortedProducts = sortProducts(filteredProducts, sortCriteria);
    set({ filteredProducts: sortedProducts });
  },

  addToCart: (product: Product) => {
    const { cart } = get();
    const existingItem = cart.find((item) => item.id === product.id);
    if (existingItem) {
      set({
        cart: cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      });
    } else {
      set({ cart: [...cart, { ...product, quantity: 1 }] });
    }
  },

  removeFromCart: (productId: number) => {
    const { cart } = get();
    set({ cart: cart.filter((item) => item.id !== productId) });
  },

  updateCartItemQuantity: (productId: number, quantity: number) => {
    const { cart } = get();
    set({
      cart: cart.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      ),
    });
  },

  clearCart: () => {
    set({ cart: [] });
  },
}));

export default useProductStore;

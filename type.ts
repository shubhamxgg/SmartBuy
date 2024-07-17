export enum ProductStatus {
  AVAILABLE,
  OUT_OF_STOCK,
  DISCONTINUED,
}

export interface Category {
  id: number;
  name: string;
  imageUrl?: string | null;
}

export interface NewProduct{
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  imageUrl: string;
  description: string;
  features: string[];
  category: string;
  rating: number;
}

export interface Product {
  quantity?: number;
  id: number;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  seller?: { id: number; user: { name: string } };
  status: any;
  featured: boolean;
  stock?: { sku: string; quantity: number; lowStockThreshold: number } | null;
  images?: { id: number; url: string }[];
  reviews?: { id: number; rating: number; comment: string }[];
  category?: Category;
}

export interface Filter {
  categories?: string[];
  brands?: string[];
  rating?: number[];
  priceRange?: [number, number];
  searchTerm?: string;
}

export interface FilterState {
  category: string | null;
  priceMin: number | null;
  priceMax: number | null;
  page: number;
}

export interface CartItems {
  id: number;

  productId: number;
  quantity: number;
  product: Product;
}

export interface WishList {
  userId: number;
  items: WishListItems[];
}

export interface WishListItems {
  id: number;
  wishlistId: number;
  productId: number;
  product: Product;
}

export interface Address {
  id: number;
  userId: number;
  street: string;
  state: string;
  city: string;
  zipCode: string;
  country: string;
}

export interface FormState {
  success: boolean;
  message: string;
  address?: Address;
  errors?: {
    userId?: string[];
    street?: string[];
    city?: string[];
    state?: string[];
    zipCode?: string[];
    country?: string[];
  };
}

export interface OrderItem {
  productId: number;
  quantity: number;
  price: number;
}

export type OrderStatus = "PENDING" | "COMPLETED" | "CANCELLED" | "REFUNDED";
export type PaymentStatus = "PENDING" | "COMPLETED" | "FAILED" | "REFUNDED";
export type ShippingStatus = "PENDING" | "SHIPPED" | "DELIVERED" | "RETURNED";

export interface Address {
  id: number;
  userId: number;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Order {
  createdAt: string | number | Date;
  id: number;
  userId: number;
  image: string;
  items: OrderItem[];
  totalAmount: number;
  status: ShippingStatus;
  paymentStatus: PaymentStatus;
  shippingStatus: ShippingStatus;
  // shippingAddress?: Address;
}

export enum ProductStatus {
  AVAILABLE,
  OUT_OF_STOCK,
  DISCONTINUED,
}

export interface Category {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  seller: { id: number; user: { name: string } };
  status: string;
  featured: boolean;
  stock?: { sku: string; quantity: number; lowStockThreshold: number } | null;
  images: { id: number; url: string }[];
  reviews: { id: number; rating: number; comment: string }[];
  category: Category;
}

export interface CartItem extends Product {
  quantity: number;
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

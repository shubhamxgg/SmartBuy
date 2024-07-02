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
  quantity?: string | number | readonly string[] | undefined;
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

// export interface ProductType {
//   id: number;
//   title: string;
//   description: string;
//   price: number;
//   imageUrl: string;
//   categoryId: number;
//   sellerId: number;
//   status: ProductStatus;
//   featured: boolean;
//   createdAt: Date;
//   updatedAt: Date;
// }
// [];

// export interface Products {
//   products: {
//     id: number;
//     title: string;
//     description: string;
//     price: number;
//     imageUrl: string;
//     categoryId: number;
//     sellerId: number;
//     status: ProductStatus;
//     featured: boolean;
//     createdAt: Date;
//     updatedAt: Date;
//   };
// }
// [];

export interface CartItems {
  id: number;
  cartId: number;
  productId: number;
  quantity: number;
  product: Product;
}

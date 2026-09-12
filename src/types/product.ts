// src/types/product.ts

// Product ki image ka structure
export interface ProductImage {
  id: string;
  url: string;
  altText: string;
}

// Product ki review ka structure
export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number; // 1 se 5 tak
  comment: string;
  createdAt: string;
}

// Main Product ka structure
export interface Product {
  id: string;
  title: string;
  slug: string; // URL ke liye (e.g., 'blue-t-shirt')
  description: string;
  price: number;
  compareAtPrice?: number; // Purani price (discount dikhane ke liye)
  images: ProductImage[];
  category: string;
  tags: string[];
  rating: number;
  reviewCount: number;
  stock: number;
  reviews: Review[];
  createdAt: string;
  updatedAt: string;
}
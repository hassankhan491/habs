// src/types/cart.ts
import { Product } from './product';

// Cart ke andar mojood har item ka structure
export interface CartItem {
  product: Product;
  quantity: number;
  size?: string; // Perfume ki size (e.g., '50ml', '100ml')
}

// Poori Cart ka structure
export interface Cart {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
}
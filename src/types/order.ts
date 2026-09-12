// src/types/order.ts
import { Address } from './user';

// Order ki status (Order kahan tak pohancha hai)
export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

// Order ke andar mojood har item ka structure
export interface OrderItem {
  productId: string;
  title: string;
  quantity: number;
  price: number;
  size?: string; // Perfume ki size (e.g., '50ml')
}

// Main Order ka structure
export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  shippingAddress: Address;
  totalAmount: number;
  status: OrderStatus;
  createdAt: string;
}

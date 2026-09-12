// src/data/products.ts
import { Product } from '@/types';

export const products: Product[] = [
  {
    id: '1',
    title: 'Midnight Oud',
    slug: 'midnight-oud',
    description: 'A rich and mysterious fragrance with deep woody and amber notes.',
    price: 120,
    compareAtPrice: 150,
    images: [
      { id: 'img1', url: '/images/perfume1.jpg', altText: 'Midnight Oud Perfume Bottle' }
    ],
    category: 'Oud',
    tags: ['Woody', 'Evening', 'Luxury', 'Long-lasting'],
    rating: 4.8,
    reviewCount: 120,
    stock: 50,
    reviews: [], 
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Ocean Breeze',
    slug: 'ocean-breeze',
    description: 'Fresh and aquatic scent perfect for daily wear and summer days.',
    price: 85,
    images: [
      { id: 'img2', url: '/images/perfume2.jpg', altText: 'Ocean Breeze Perfume Bottle' }
    ],
    category: 'Fresh',
    tags: ['Aquatic', 'Daily', 'Summer', 'Citrus'],
    rating: 4.5,
    reviewCount: 85,
    stock: 100,
    reviews: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '3',
    title: 'Rose Velvet',
    slug: 'rose-velvet',
    description: 'An elegant floral perfume with a touch of vanilla and musk.',
    price: 95,
    images: [
      { id: 'img3', url: '/images/perfume3.jpg', altText: 'Rose Velvet Perfume Bottle' }
    ],
    category: 'Floral',
    tags: ['Floral', 'Romantic', 'Vanilla', 'Soft'],
    rating: 4.7,
    reviewCount: 200,
    stock: 30,
    reviews: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
];
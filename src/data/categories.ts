// src/data/categories.ts
import { Category } from '@/types';

export const categories: Category[] = [
  {
    id: 'cat1',
    name: 'Oud & Woody',
    slug: 'oud-woody',
    description: 'Deep, rich, and mysterious fragrances perfect for evening wear.',
    image: '/images/cat-oud.jpg',
    productCount: 15,
  },
  {
    id: 'cat2',
    name: 'Fresh & Aquatic',
    slug: 'fresh-aquatic',
    description: 'Light, clean, and refreshing scents for daily use.',
    image: '/images/cat-fresh.jpg',
    productCount: 22,
  },
  {
    id: 'cat3',
    name: 'Floral & Romantic',
    slug: 'floral-romantic',
    description: 'Elegant and sweet floral blends for a touch of elegance.',
    image: '/images/cat-floral.jpg',
    productCount: 18,
  },
  {
    id: 'cat4',
    name: 'Citrus & Zesty',
    slug: 'citrus-zesty',
    description: 'Energetic and uplifting citrus notes to brighten your day.',
    image: '/images/cat-citrus.jpg',
    productCount: 12,
  }
];
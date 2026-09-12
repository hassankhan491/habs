// src/types/category.ts

export interface Category {
  id: string;
  name: string;
  slug: string; // URL ke liye (e.g., 'shirts')
  description?: string;
  image?: string;
  productCount: number;
  parentId?: string; // Agar sub-category ho (e.g., Men > Shirts)
}
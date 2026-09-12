// src/types/user.ts

// User ka Address
export interface Address {
  id: string;
  fullName: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone: string;
  isDefault: boolean; // Kya yeh default address hai?
}

// Main User (Customer ya Admin)
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'customer' | 'admin';
  addresses: Address[];
  createdAt: string;
}
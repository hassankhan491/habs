// src/components/ui/Badge.tsx
import React from 'react';

// Badge ki properties
interface BadgeProps {
  children: React.ReactNode; // Badge ke andar likha hua text (e.g., "Sale")
  variant?: 'default' | 'sale' | 'new' | 'outOfStock'; // Badge ki color type
  className?: string; // Extra styling
}

export default function Badge({ 
  children, 
  variant = 'default', 
  className = '' 
}: BadgeProps) {
  
  // Alag alag colors har variant ke liye
  const variants = {
    default: "bg-gray-100 text-gray-800", // Normal grey badge
    sale: "bg-red-100 text-red-800", // Red for Sale/Discount
    new: "bg-green-100 text-green-800", // Green for New Arrival
    outOfStock: "bg-gray-200 text-gray-500 line-through" // Greyed out for Out of Stock
  };

  return (
    <span 
      className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
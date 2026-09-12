// src/components/ui/Button.tsx
import React from 'react';

// Button ki properties (props) ka structure
interface ButtonProps {
  children: React.ReactNode; // Button ke andar likha hua text ya icon
  variant?: 'primary' | 'secondary' | 'outline'; // Button ki style
  className?: string; // Agar extra Tailwind class lagani ho
  onClick?: () => void; // Click karne par kya hoga
  type?: 'button' | 'submit' | 'reset'; // Form ke liye
}

export default function Button({ 
  children, 
  variant = 'primary', 
  className = '', 
  onClick,
  type = 'button'
}: ButtonProps) {
  
  // Button ki basic styling
  const baseStyles = "px-6 py-3 rounded-lg font-medium transition-all duration-300 cursor-pointer disabled:opacity-50";
  
  // Alag alag styles (Luxury theme ke hisaab se)
  const variants = {
    primary: "bg-black text-white hover:bg-gray-800", // Black button (Add to Cart)
    secondary: "bg-gray-200 text-black hover:bg-gray-300", // Light grey button
    outline: "border-2 border-black text-black hover:bg-black hover:text-white" // Transparent with border
  };

  return (
    <button 
      type={type}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}
// src/components/ui/Card.tsx
import React from 'react';

// Card ki properties
interface CardProps {
  children: React.ReactNode; // Card ke andar mojood content (image, text, etc.)
  className?: string; // Extra styling
  hoverEffect?: boolean; // Kya mouse le jane par card thoda upar uthe aur shadow aaye?
}

export default function Card({ 
  children, 
  className = '', 
  hoverEffect = false 
}: CardProps) {
  return (
    <div 
      className={`bg-white rounded-xl border border-gray-100 p-4 ${
        hoverEffect ? 'transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
}
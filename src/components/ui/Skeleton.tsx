// src/components/ui/Skeleton.tsx
import React from 'react';

// Skeleton ki properties
interface SkeletonProps {
  width?: string; // Width (e.g., '100%', '50px')
  height?: string; // Height (e.g., '200px', '20px')
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full'; // Corners ki shape
  className?: string; // Extra styling
}

export default function Skeleton({ 
  width = '100%', 
  height = '20px', 
  rounded = 'md', 
  className = '' 
}: SkeletonProps) {
  
  // Rounded corners ki styling
  const roundedStyles = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    full: 'rounded-full'
  };

  return (
    <div 
      className={`bg-gray-200 animate-pulse ${roundedStyles[rounded]} ${className}`}
      style={{ width, height }}
    />
  );
}
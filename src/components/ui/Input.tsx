// src/components/ui/Input.tsx
import React from 'react';

// Input ki properties (props) ka structure
interface InputProps {
  label?: string; // Input ke upar likha hua naam (e.g., "Email")
  type?: string; // text, email, password, etc.
  placeholder?: string; // Khali box mein likha hua hint
  className?: string; // Extra styling
  error?: string; // Agar koi galti ho (jaise galat email)
  [key: string]: unknown; // Baaki saari normal input properties
}

export default function Input({ 
  label, 
  type = 'text', 
  placeholder, 
  className = '', 
  error,
  ...props 
}: InputProps) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        className={`w-full px-4 py-3 rounded-lg border ${
          error ? 'border-red-500' : 'border-gray-300 focus:border-black'
        } outline-none transition-all duration-200 bg-white ${className}`}
        {...props}
      />
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
}
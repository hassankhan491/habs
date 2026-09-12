// src/components/ui/Select.tsx
import React from 'react';

// Select ki properties
interface SelectProps {
  label?: string; // Dropdown ke upar likha hua naam (e.g., "Size")
  options: { value: string; label: string }[]; // Dropdown ke andar options
  placeholder?: string; // Pehla default text
  className?: string; // Extra styling
  error?: string; // Agar koi galti ho
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  value?: string;
}

export default function Select({ 
  label, 
  options, 
  placeholder = 'Select an option', 
  className = '', 
  error,
  onChange,
  value
}: SelectProps) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <select
        value={value}
        onChange={onChange}
        className={`w-full px-4 py-3 rounded-lg border ${
          error ? 'border-red-500' : 'border-gray-300 focus:border-black'
        } outline-none transition-all duration-200 bg-white appearance-none cursor-pointer ${className}`}
      >
        <option value="" disabled>{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
}
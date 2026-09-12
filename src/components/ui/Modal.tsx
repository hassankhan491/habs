// src/components/ui/Modal.tsx
import React from 'react';

// Modal ki properties
interface ModalProps {
  isOpen: boolean; // Kya modal khula hai ya band?
  onClose: () => void; // Band karne ka function
  title?: string; // Modal ka title
  children: React.ReactNode; // Modal ke andar ka content
}

export default function Modal({ isOpen, onClose, title, children }: ModalProps) {
  // Agar modal band hai, toh kuch render mat karo
  if (!isOpen) return null;

  return (
    // Puri screen par kala aur halka transparent background
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      
      {/* Asal Modal Box */}
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 relative">
        
        {/* Close Button (X) */}
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-gray-500 hover:text-black text-2xl leading-none cursor-pointer"
        >
          &times;
        </button>

        {/* Title */}
        {title && <h2 className="text-2xl font-bold mb-4 pr-6">{title}</h2>}

        {/* Content */}
        <div className="pr-2">
          {children}
        </div>
      </div>
    </div>
  );
}
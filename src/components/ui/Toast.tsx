// src/components/ui/Toast.tsx
import React, { useEffect } from 'react';

// Toast ki properties
interface ToastProps {
  message: string; // Notification ka message
  type?: 'success' | 'error' | 'info'; // Message ki type
  onClose: () => void; // Band karne ka function
  duration?: number; // Kitni der baad khud band ho jaye (milliseconds mein)
}

export default function Toast({ 
  message, 
  type = 'success', 
  onClose, 
  duration = 3000 
}: ToastProps) {
  
  // Automatic timer jo toast ko kuch der baad band kar dega
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    
    return () => clearTimeout(timer); // Cleanup timer
  }, [onClose, duration]);

  // Har type ke liye alag background color
  const bgColors = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    info: 'bg-blue-500',
  };

  return (
    <div className={`fixed bottom-5 right-5 z-50 ${bgColors[type]} text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-3 transition-all duration-300`}>
      <span className="font-medium">{message}</span>
      <button 
        onClick={onClose} 
        className="text-white hover:text-gray-200 cursor-pointer text-xl font-bold leading-none"
      >
        &times;
      </button>
    </div>
  );
}
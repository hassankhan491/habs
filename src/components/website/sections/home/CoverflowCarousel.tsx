"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

// Shoe product data for e-commerce
const products = [
  {
    id: 1,
    brand: "NIKE",
    name: "Air Max 270 React",
    price: 149.99,
    originalPrice: 199.99,
    rating: 4.5,
    reviews: 128,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=900&fit=crop",
  },
  {
    id: 2,
    brand: "ADIDAS",
    name: "Ultraboost 22",
    price: 179.99,
    originalPrice: null,
    rating: 4.8,
    reviews: 256,
    image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=600&h=900&fit=crop",
  },
  {
    id: 3,
    brand: "PUMA",
    name: "RS-X³ Puzzle",
    price: 109.99,
    originalPrice: 139.99,
    rating: 4.3,
    reviews: 89,
    image: "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=600&h=900&fit=crop",
  },
  {
    id: 4,
    brand: "NEW BALANCE",
    name: "990v5 Made in USA",
    price: 184.99,
    originalPrice: null,
    rating: 4.9,
    reviews: 342,
    image: "https://images.unsplash.com/photo-1539185441755-769473a23570?w=600&h=900&fit=crop",
  },
  {
    id: 5,
    brand: "JORDAN",
    name: "Air Jordan 1 Retro High",
    price: 169.99,
    originalPrice: 219.99,
    rating: 4.7,
    reviews: 512,
    image: "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=600&h=900&fit=crop",
  },
  {
    id: 6,
    brand: "CONVERSE",
    name: "Chuck Taylor All Star",
    price: 64.99,
    originalPrice: null,
    rating: 4.6,
    reviews: 1024,
    image: "https://images.unsplash.com/photo-1607522370275-f14206abe5d3?w=600&h=900&fit=crop",
  },
  {
    id: 7,
    brand: "VANS",
    name: "Old Skool Classic",
    price: 69.99,
    originalPrice: 89.99,
    rating: 4.4,
    reviews: 678,
    image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=600&h=900&fit=crop",
  },
  {
    id: 8,
    brand: "REEBOK",
    name: "Club C 85 Vintage",
    price: 74.99,
    originalPrice: null,
    rating: 4.5,
    reviews: 234,
    image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&h=900&fit=crop",
  },
];

export default function CoverflowCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const next = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % products.length);
  }, []);

  const prev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  // Auto-play
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      next();
    }, 3500);

    return () => clearInterval(interval);
  }, [isAutoPlaying, next]);

  // Pause on hover
  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  return (
    <div 
      className="relative w-full min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center overflow-hidden py-20"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Section Header */}
      <div className="absolute top-12 left-0 right-0 text-center z-40">
        <p className="text-sm font-semibold text-gray-400 uppercase tracking-[0.3em] mb-2">
          New Arrivals
        </p>
        <h2 className="text-4xl md:text-5xl font-bold text-white">
          Featured Collection
        </h2>
      </div>

      {/* 3D Perspective Container */}
      <div className="relative w-full max-w-7xl h-[650px] flex items-center justify-center">
        <div 
          className="relative w-full h-full"
          style={{ perspective: "1500px" }}
        >
          {products.map((product, index) => {
            let offset = index - currentIndex;
            const totalProducts = products.length;

            // Handle wrapping
            if (offset > totalProducts / 2) offset -= totalProducts;
            if (offset < -totalProducts / 2) offset += totalProducts;

            const isCenter = offset === 0;
            const rotation = offset * 22;
            const translateX = offset * 280;
            const translateZ = isCenter ? 0 : -250 - Math.abs(offset) * 60;
            const scale = isCenter ? 1 : 0.72;
            const opacity = isCenter ? 1 : 0.5;
            const zIndex = isCenter ? 50 : 50 - Math.abs(offset);

            const discount = product.originalPrice
              ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
              : 0;

            return (
              <motion.div
                key={product.id}
                className="absolute left-1/2 top-1/2 cursor-pointer"
                style={{
                  transformStyle: "preserve-3d",
                  zIndex,
                }}
                initial={{
                  x: "-50%",
                  y: "-50%",
                  translateX: `${translateX}px`,
                  rotateY: `${rotation}deg`,
                  translateZ: `${translateZ}px`,
                  scale,
                  opacity,
                }}
                animate={{
                  x: "-50%",
                  y: "-50%",
                  translateX: `${translateX}px`,
                  rotateY: `${rotation}deg`,
                  translateZ: `${translateZ}px`,
                  scale,
                  opacity,
                }}
                transition={{
                  duration: 0.7,
                  ease: [0.23, 1, 0.32, 1],
                }}
                whileHover={{
                  scale: scale * 1.05,
                  transition: { duration: 0.3 },
                }}
                onClick={() => goToSlide(index)}
              >
                {/* Product Card */}
                <div className="relative w-72 h-[480px] rounded-[2rem] overflow-hidden shadow-[0_18px_40px_rgba(0,0,0,0.18)] bg-white">
                  {/* Shoe Image */}
                  <div className="relative w-full h-full">
                    <Image
                      src={product.image}
                      alt={`${product.brand} ${product.name}`}
                      fill
                      className="object-cover"
                      draggable={false}
                      priority={isCenter}
                    />
                  </div>

                  {/* Black Gradient Overlay - softened for a premium feel */}
                  <div className="absolute inset-x-0 bottom-0 h-[52%] bg-gradient-to-t from-black/65 via-black/25 to-transparent pointer-events-none" />

                  {/* Discount Badge */}
                  {discount > 0 && (
                    <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg z-10">
                      -{discount}% OFF
                    </div>
                  )}

                  {/* Wishlist Button */}
                  <button className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white hover:text-red-500 transition-all duration-300 shadow-lg z-10 opacity-0 group-hover:opacity-100">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                  </button>

                  {/* Product Info - Overlay Section (from middle down) */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white z-10">
                    {/* Brand */}
                    <p className="text-[9px] font-bold text-gray-300 uppercase tracking-[0.18em] mb-1">
                      {product.brand}
                    </p>

                    {/* Product Name */}
                    <h3 className="text-sm font-bold mb-1.5 line-clamp-1">
                      {product.name}
                    </h3>

                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-2.5 h-2.5 ${
                              i < Math.floor(product.rating)
                                ? "text-yellow-400"
                                : "text-gray-500"
                            }`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="text-[10px] text-gray-300">
                        {product.rating} ({product.reviews})
                      </span>
                    </div>

                    {/* Price */}
                    <div className="flex items-center gap-2 mb-2.5">
                      <span className="text-base font-bold">${product.price.toFixed(2)}</span>
                      {product.originalPrice && (
                        <span className="text-[10px] text-gray-400 line-through">
                          ${product.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>

                    {/* Add to Cart Button */}
                    <button className="w-full py-2 rounded-xl bg-white text-black font-semibold text-xs hover:bg-gray-200 transition-all duration-300 transform hover:scale-[1.01] active:scale-[0.98] shadow-lg">
                      Add to Cart
                    </button>
                  </div>

                  {/* Border */}
                  <div className="absolute inset-0 rounded-[2rem] border-2 border-white/10 pointer-events-none z-20" />
                </div>

                {/* Shadow beneath card */}
                <div 
                  className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-3/4 h-10 bg-black/40 blur-2xl rounded-full"
                  style={{
                    transform: `translateX(-50%) ${isCenter ? 'scale(1)' : 'scale(0.5)'}`,
                    opacity: isCenter ? 0.7 : 0.2,
                  }}
                />
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 flex items-center gap-6 z-50">
        {/* Previous Button */}
        <motion.button
          onClick={prev}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 shadow-xl"
          aria-label="Previous slide"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </motion.button>

        {/* Dots Indicator */}
        <div className="flex gap-2">
          {products.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => goToSlide(index)}
              whileHover={{ scale: 1.3 }}
              whileTap={{ scale: 0.9 }}
              className={`h-2 rounded-full transition-all duration-500 ${
                index === currentIndex
                  ? "w-8 bg-white"
                  : "w-2 bg-white/30 hover:bg-white/50"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Next Button */}
        <motion.button
          onClick={next}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 shadow-xl"
          aria-label="Next slide"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </motion.button>
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/5">
        <motion.div
          className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
          initial={{ width: "0%" }}
          animate={{ width: `${((currentIndex + 1) / products.length) * 100}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      {/* Keyboard Navigation */}
      <KeyboardNavigation onNext={next} onPrev={prev} />
    </div>
  );
}

// Keyboard navigation component
function KeyboardNavigation({ onNext, onPrev }: { onNext: () => void; onPrev: () => void }) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onNext, onPrev]);

  return null;
}
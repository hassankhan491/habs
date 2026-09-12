'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface FullScreenMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuSections = [
  {
    title: 'Shop',
    links: [
      { name: 'All Perfumes', href: '/products' },
      { name: 'New Arrivals', href: '/products?filter=new' },
      { name: 'Best Sellers', href: '/products?filter=bestsellers' },
      { name: 'Limited Edition', href: '/products?filter=limited' },
    ],
  },
  {
    title: 'Categories',
    links: [
      { name: 'Oud & Woody', href: '/categories/oud-woody' },
      { name: 'Fresh & Aquatic', href: '/categories/fresh-aquatic' },
      { name: 'Floral & Romantic', href: '/categories/floral-romantic' },
      { name: 'Citrus & Zesty', href: '/categories/citrus-zesty' },
    ],
  },
  {
    title: 'Collections',
    links: [
      { name: 'Signature Scents', href: '/collections/signature' },
      { name: 'Evening Elegance', href: '/collections/evening' },
      { name: 'Daily Fresh', href: '/collections/daily' },
      { name: 'Gift Sets', href: '/collections/gifts' },
    ],
  },
  {
    title: 'About',
    links: [
      { name: 'Our Story', href: '/about' },
      { name: 'Craftsmanship', href: '/about/craftsmanship' },
      { name: 'Ingredients', href: '/about/ingredients' },
      { name: 'Contact', href: '/contact' },
    ],
  },
];

const menuImages = [
  {
    src: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=600&h=900&fit=crop',
    caption: 'The Creative Process: Oud Royale',
  },
  {
    src: 'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=600&h=900&fit=crop',
    caption: 'New: Amber Essence',
  },
];

const CloseIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const SearchIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="1.5" />
    <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export default function FullScreenMenu({ isOpen, onClose }: FullScreenMenuProps) {
  const router = useRouter();

  // ✅ FIX 1: Delay scroll unlock to prevent layout shift during navigation
  useEffect(() => {
    if (isOpen) {
      // Lock scroll and compensate for scrollbar width to prevent horizontal jump
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      // Wait for the 700ms slide-up animation to finish before re-enabling scroll
      const timer = setTimeout(() => {
        document.body.style.overflow = '';
        document.body.style.paddingRight = '';
      }, 700); 
      
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // ✅ Escape key to close
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  // ✅ FIX 2: Clean navigation handler
  const handleNavigate = (href: string) => {
    onClose(); // Start closing animation immediately
    // Let Next.js <Link> handle the actual navigation, 
    // but we ensure the menu state is updated first to prevent UI blocking
  };

  return (
    <div
      className={`fixed inset-0 z-[60] transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] ${
        isOpen ? 'translate-y-0 pointer-events-auto' : '-translate-y-full pointer-events-none'
      }`}
      aria-hidden={!isOpen}
    >
      <div className="h-full flex flex-col bg-[#0f0a08] overflow-y-auto">
        
        {/* Top Bar */}
        <div className="relative flex items-center justify-between px-6 lg:px-12 py-6 shrink-0">
          <button
            onClick={onClose}
            className="flex items-center gap-3 text-[#f5f0eb] text-xs tracking-[0.25em] uppercase hover:opacity-70 transition-opacity"
          >
            <CloseIcon />
            Close
          </button>

          <Link
            href="/"
            onClick={onClose}
            style={{ fontFamily: 'var(--font-decorative)' }}
            className="absolute left-1/2 -translate-x-1/2 text-3xl text-[#f5f0eb] hover:opacity-80 transition-opacity"
          >
            SHAWQ
          </Link>

          <div className="flex items-center gap-6 text-[#f5f0eb]">
            <button aria-label="Search" className="hover:opacity-70 transition-opacity">
              <SearchIcon />
            </button>
            <Link
              href="/cart"
              onClick={onClose}
              className="text-xs tracking-[0.25em] uppercase hover:opacity-70 transition-opacity"
            >
              Cart
            </Link>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 px-6 lg:px-12 pb-12 pt-8 grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-12 lg:gap-20">
          
          {/* Link Columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 lg:gap-16 max-w-3xl content-start">
            {menuSections.map((section, sIndex) => (
              <div key={section.title}>
                <h3
                  className={`text-xs tracking-[0.3em] uppercase text-[#f5f0eb] mb-6 transition-all duration-500 ${
                    isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}
                  style={{ transitionDelay: isOpen ? `${150 + sIndex * 80}ms` : '0ms' }}
                >
                  {section.title}
                </h3>
                <ul className="space-y-3">
                  {section.links.map((link, i) => (
                    <li
                      key={link.name}
                      className={`transition-all duration-500 ${
                        isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                      }`}
                      style={{ transitionDelay: isOpen ? `${200 + sIndex * 80 + i * 50}ms` : '0ms' }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => handleNavigate(link.href)}
                        className="text-xs tracking-[0.2em] uppercase text-[#c9a962]/80 hover:text-[#f5f0eb] transition-colors inline-block"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Right Images */}
          <div className="hidden lg:flex gap-5">
            {menuImages.map((img, i) => (
              <div
                key={img.caption}
                className={`w-[280px] xl:w-[320px] shrink-0 transition-all duration-700 ${
                  isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: isOpen ? `${450 + i * 150}ms` : '0ms' }}
              >
                <p className="text-[10px] tracking-[0.25em] uppercase text-[#f5f0eb]/70 mb-3">
                  {img.caption}
                </p>
                <div className="h-[420px] xl:h-[480px] overflow-hidden bg-[#1a1512]">
                  <img
                    src={img.src}
                    alt={img.caption}
                    loading="lazy"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const drops = [
  {
    id: 1,
    name: 'Midnight Runner',
    price: '$185',
    tag: 'New Arrival',
    image: '/images/shoe-1.jpg', // Replace with your actual images
    color: 'bg-zinc-900'
  },
  {
    id: 2,
    name: 'Gold Standard',
    price: '$220',
    tag: 'Best Seller',
    image: '/images/shoe-banner.jpg', // Your hero shoe
    color: 'bg-neutral-900'
  },
  {
    id: 3,
    name: 'Urban Stride',
    price: '$165',
    tag: 'Limited',
    image: '/images/shoe-3.jpg',
    color: 'bg-stone-900'
  },
  {
    id: 4,
    name: 'Velocity Pro',
    price: '$195',
    tag: 'Performance',
    image: '/images/shoe-4.jpg',
    color: 'bg-gray-900'
  }
];

export default function FeaturedDrops() {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <section className="py-32 bg-[#0f0f0f] overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12 mb-16 flex items-end justify-between">
        <div>
          <span className="text-[#c9a962] text-sm font-medium tracking-widest uppercase mb-4 block">
            Latest Releases
          </span>
          <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
            THE VAULT
          </h2>
        </div>
        <Link 
          href="/shop" 
          className="hidden md:flex items-center gap-2 text-white border-b border-white/30 pb-1 hover:border-[#c9a962] hover:text-[#c9a962] transition-colors"
        >
          View All Drops <span className="text-lg">→</span>
        </Link>
      </div>

      {/* Horizontal Scroll Container */}
      <div 
        ref={scrollRef}
        className="flex gap-8 overflow-x-auto pb-12 px-6 lg:px-12 scrollbar-hide snap-x snap-mandatory cursor-grab active:cursor-grabbing"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {drops.map((drop) => (
          <div 
            key={drop.id}
            className="group relative min-w-[300px] md:min-w-[400px] h-[500px] md:h-[600px] snap-center rounded-3xl overflow-hidden transition-transform duration-500 hover:scale-[1.02]"
          >
            {/* Background Color Block */}
            <div className={`absolute inset-0 ${drop.color} transition-colors duration-500 group-hover:bg-[#1a1a1a]`} />
            
            {/* Drop Number Watermark */}
            <div className="absolute top-8 left-8 text-8xl font-black text-white/5 select-none z-10">
              0{drop.id}
            </div>

            {/* Tag */}
            <div className="absolute top-8 right-8 z-20">
              <span className="px-4 py-2 bg-white/10 backdrop-blur-md border border-white/10 rounded-full text-xs font-medium text-white uppercase tracking-wider">
                {drop.tag}
              </span>
            </div>

            {/* Shoe Image */}
            <div className="absolute inset-0 flex items-center justify-center p-12 z-10">
              <Image
                src={drop.image}
                alt={drop.name}
                width={600}
                height={600}
                className="w-full h-full object-contain drop-shadow-2xl transition-transform duration-700 group-hover:scale-110 group-hover:-rotate-6"
              />
            </div>

            {/* Info Overlay (Slides up on hover) */}
            <div className="absolute bottom-0 left-0 right-0 p-8 z-20 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
              <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                <h3 className="text-2xl font-bold text-white mb-2">{drop.name}</h3>
                <div className="flex items-center justify-between">
                  <span className="text-[#c9a962] font-medium text-lg">{drop.price}</span>
                  <button className="px-6 py-2 bg-white text-black text-sm font-semibold rounded-full hover:bg-[#c9a962] transition-colors">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
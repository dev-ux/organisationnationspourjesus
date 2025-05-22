"use client";

import Image from "next/image";
import { Button } from "@material-tailwind/react";
import Carousel from '@/components/carousel';

const images = [
  'image/onj5.jpg',
  'image/onj6.jpg',
  'image/onj7.jpg',
  'image/onj8.jpg',
];

export default function Hero() {
  return (
    <div className="relative min-h-screen w-full" style={{ backgroundImage: `url('/image/hero/home1.jpg')` }}>
      <div className="absolute inset-0">
        <Carousel images={images} />
      </div>
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="relative">
        <div className="container mx-auto px-8 py-32">
          <div className="max-w-4xl">
            <h1 className="text-4xl font-bold text-white mb-6">
              Eglise des Disciples Accomplis <br /> EDA
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Rejoignez notre communauté de disciples dévoués, où la foi et
              l'accomplissement spirituel sont notre priorité.
            </p>
            <div className="flex flex-col gap-4 md:flex-row">
              <button className="flex items-center gap-2 px-6 py-3 bg-white text-gray-900 rounded-lg hover:bg-gray-100 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
                App Store
              </button>
              <button className="flex items-center gap-2 px-6 py-3 bg-white text-gray-900 rounded-lg hover:bg-gray-100 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11V7a5 5 0 0110 0v4" />
                </svg>
                Play Store
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

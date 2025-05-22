"use client";

import Image from "next/image";
import { Button } from "@material-tailwind/react";
import Carousel from '@/components/carousel';

const blogImages = [
  'image/blog/hero1.jpg',
  'image/blog/hero2.jpg',
  'image/blog/hero3.jpg',
];

export default function BlogHero() {
  return (
    <div className="relative min-h-screen w-full" style={{ backgroundImage: `url('/image/blog/hero1.jpg')` }}>
      <div className="absolute inset-0">
        <Carousel images={blogImages} />
      </div>
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="relative">
        <div className="container mx-auto px-8 py-32">
          <div className="max-w-4xl">
            <h1 className="text-4xl font-bold text-white mb-6">
              Actualités et Événements
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Restez informé de toutes nos activités, campagnes et événements importants
            </p>
            <div className="flex flex-col gap-4 md:flex-row">
              <button
                className="flex items-center gap-2 px-6 py-3 bg-white text-gray-900 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <span className="mr-2">Rejoignez-nous</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

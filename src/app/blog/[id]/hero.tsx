"use client";

import React from "react";
import Image from "next/image";
import { BlogPost } from '@/types/blog';

interface BlogDetailHeroProps {
  post: BlogPost;
}

export default function BlogDetailHero({ post }: BlogDetailHeroProps) {
  const mainImage = post.images[0];

  return (
    <div className="relative h-[60vh] sm:h-[70vh] lg:h-[80vh] min-h-[400px]">
      <Image
        src={mainImage}
        alt={post.titre}
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70" />
      <div className="absolute inset-0 flex flex-col justify-center items-center text-white px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">{post.titre}</h1>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-sm sm:text-base lg:text-lg">
            <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
              {new Date(post.date).toLocaleDateString('fr-FR', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              })}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

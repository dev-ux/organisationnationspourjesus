"use client";

import React from "react";
import Image from "next/image";
import { BlogPost } from '@/data/blog-data';

interface BlogDetailHeroProps {
  post: BlogPost;
}

export default function BlogDetailHero({ post }: BlogDetailHeroProps) {
  const mainImage = post.images[0];

  return (
    <div className="relative h-[400px]">
      <Image
        src={mainImage}
        alt={post.titre}
        fill
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-75" />
      <div className="absolute inset-0 flex flex-col justify-center items-center text-white">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">{post.titre}</h1>
        <p className="text-xl">{post.date}</p>
      </div>
    </div>
  );
}

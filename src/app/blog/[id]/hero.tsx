"use client";

import Image from "next/image";
import { BlogPost } from '@/data/blog-data';

interface BlogDetailHeroProps {
  actualite: BlogPost;
}

export default function BlogDetailHero({ actualite }: BlogDetailHeroProps) {
  const mainImage = actualite.images[0]; // Utilisation de la première image comme image principale

  return (
    <div className="relative h-[400px]">
      <Image
        src={mainImage}
        alt={actualite.titre}
        fill
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-75" />
      <div className="absolute inset-0 flex flex-col justify-center items-center text-white">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">{actualite.titre}</h1>
        <p className="text-xl">{actualite.date}</p>
      </div>
    </div>
  );
}

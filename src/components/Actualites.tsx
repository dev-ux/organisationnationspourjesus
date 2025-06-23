"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { blogPosts, BlogPost } from '@/data/blog-data';

interface Actualite {
  id: string;
  titre: string;
  date: string;
  description: string;
  images: string[];
  contenu: string;
}

export default function Actualites({ nbActualites = 3 }: { nbActualites?: number }) {
  const actualites = blogPosts.slice(0, nbActualites);

  if (actualites.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Aucune actualité disponible.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {actualites.map((actualite) => (
        <Link
          key={actualite.id}
          href={`/blog/${actualite.id}`}
          className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
        >
          <div className="relative h-48">
            <Image
              src={actualite.images[0]}
              alt={actualite.titre}
              fill
              className="object-cover"
            />
          </div>
          <div className="p-6">
            <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
              {actualite.titre}
            </h3>
            <p className="mt-2 text-gray-600">
              {actualite.description}
            </p>
            <p className="mt-2 text-sm text-gray-500">
              {actualite.date}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}

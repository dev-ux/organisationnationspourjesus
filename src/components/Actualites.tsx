"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { actualites } from '@/data/actualites';

interface Actualite {
  id: number;
  titre: string;
  date: string;
  description: string;
  image: string;
  contenu: string;
}

export default function Actualites({ nbActualites = 3 }: { nbActualites?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {actualites.slice(0, nbActualites).map((actualite: Actualite) => (
        <div key={actualite.id} className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="relative h-48">
            <Image
              src={actualite.image}
              alt={actualite.titre}
              fill
              className="object-cover"
            />
          </div>
          <div className="p-4">
            <h3 className="text-xl font-semibold mb-2">{actualite.titre}</h3>
            <p className="text-gray-600 mb-2">{new Date(actualite.date).toLocaleDateString('fr-FR')}</p>
            <p className="text-gray-600 mb-4">{actualite.description}</p>
            <Link href={`/blog/${actualite.id}`} className="inline-block text-blue-600 hover:text-blue-800">
              En savoir plus
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}

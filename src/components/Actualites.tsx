"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { BlogPost } from '@/types/blog';

export default function Actualites({ nbActualites = 3 }: { nbActualites?: number }) {
  const [actualites, setActualites] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActualites = async () => {
      try {
        const response = await fetch('/api/news');
        
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des actualités');
        }
        
        const data = await response.json();
        
        if (data.error) {
          throw new Error(data.error);
        }
        
        // Convertir les données de l'API en format Actualite
        const newsData = data.data?.news || [];
        const formattedActualites = newsData.map((news: any) => ({
          id: news.id.toString(),
          titre: news.titre,
          date: news.date,
          description: news.description,
          image: news.image,
          contenu: news.contenu,
          images: [news.image]
        }));
        
        setActualites(formattedActualites);
      } catch (error) {
        console.error('Erreur lors du chargement des actualités:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchActualites();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Chargement des actualités...</p>
      </div>
    );
  }

  if (actualites.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Aucune actualité disponible.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {actualites.slice(0, nbActualites).map((actualite) => (
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

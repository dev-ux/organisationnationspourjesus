'use client'

import Gallery from '@/components/Gallery';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Header from '@/components/header';

interface Image {
  id: number;
  url: string;
  title: string;
  description: string;
}

export default function GalleryPage() {
  const [images, setImages] = useState<Image[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Récupérer les images depuis l'API
    const fetchImages = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/upload');
        const data = await response.json();
        setImages(data);
      } catch (error) {
        console.error('Error fetching images:', error);
        // En cas d'erreur, on affiche quand même les images par défaut
        const defaultImages = [
          {
            id: 1,
            url: '/image/onj1.jpg',
            title: 'Activité Missionnaire',
            description: 'Une journée de mission dans la communauté'
          },
          {
            id: 2,
            url: '/image/onj2.jpg',
            title: 'Formation Biblique',
            description: 'Séance de formation biblique'
          },
          {
            id: 3,
            url: '/image/onj3.jpg',
            title: 'Célébration',
            description: 'Moment de louange et de célébration'
          },
          {
            id: 4,
            url: '/image/onj4.jpg',
            title: 'Service Communautaire',
            description: 'Service rendu à la communauté'
          }
        ];
        setImages(defaultImages);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Notre Galerie</h1>
        <div className="text-center mb-8">
          {/* <Link
            href="/addpicture"
            className="inline-block bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Ajouter des images
          </Link> */}
        </div>

        {/* Galerie */}
        <Gallery images={images}  />
      </div>
    </div>
  );
}

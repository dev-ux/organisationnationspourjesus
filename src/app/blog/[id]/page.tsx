"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import BlogDetailHero from './hero';
import { BlogPost } from '@/types/blog';

export default function BlogPostPage({
  params,
}: {
  params: { id: string };
}) {
  const [actualite, setActualite] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchActualite = async () => {
      try {
        const response = await fetch('/api/news');
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des actualités');
        }
        
        const data = await response.json();
        
        if (data.error) {
          throw new Error(data.error);
        }
        
        const newsPost = data.data?.news?.find((news: any) => news.id.toString() === params.id);
        
        if (newsPost) {
          setActualite({
            id: newsPost.id.toString(),
            titre: newsPost.titre,
            date: newsPost.date,
            images: [newsPost.image],
            description: newsPost.description,
            contenu: newsPost.contenu
          });
        } else {
          setError('Article non trouvé');
        }
      } catch (error) {
        console.error('Erreur lors du chargement de l\'actualité:', error);
        setError('Impossible de charger l\'article');
      } finally {
        setLoading(false);
      }
    };

    fetchActualite();
  }, [params.id]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <p className="text-center text-gray-600">Chargement de l'article...</p>
      </div>
    );
  }

  if (error || !actualite) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Article non trouvé</h1>
          <p className="text-gray-600 mb-8">
            {error || 'L\'article que vous recherchez n\'existe pas ou a été supprimé.'}
          </p>
          <button
            onClick={() => router.push('/blog')}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Retour aux actualités
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <BlogDetailHero post={actualite} />
      
      <div className="max-w-4xl mx-auto">
        <div className="prose prose-lg max-w-none">
          <p className="text-gray-600 mb-8">{actualite.description}</p>
          <div dangerouslySetInnerHTML={{ __html: actualite.contenu }} />
        </div>
      </div>
    </div>
  );
}

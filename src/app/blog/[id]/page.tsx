"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import BlogDetailHero from './hero';
import { BlogPost } from '@/types/blog';

export default function BlogPostPage({
  params,
}: {
  params: { id: string };
}) {
  const [actualite, setActualite] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActualite = async () => {
      try {
        const response = await fetch('/api/news');
        const data = await response.json();
        const newsPost = data.news.find((news: any) => news.id.toString() === params.id);
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
          notFound();
        }
      } catch (error) {
        console.error('Erreur lors du chargement de l\'actualité:', error);
        notFound();
      } finally {
        setLoading(false);
      }
    };

    fetchActualite();
  }, [params.id]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <p className="text-center text-gray-600">Chargement de l\'article...</p>
      </div>
    );
  }

  if (!actualite) {
    return notFound();
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

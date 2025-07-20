"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { BlogPost } from "@/types/blog";

export default function BlogSection() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/news');
        const data = await response.json();
        const formattedPosts = data.news.map((news: any) => ({
          id: news.id.toString(),
          title: news.titre,
          date: news.date,
          images: [news.image],
          excerpt: news.description,
          content: news.contenu
        }));
        setPosts(formattedPosts);
      } catch (error) {
        console.error('Erreur lors du chargement des actualités:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center">
            <p className="text-gray-600">Chargement des actualités...</p>
          </div>
        </div>
      </div>
    );
  }

  // Trier les posts par date (du plus récent au plus ancien) et prendre les 3 premiers
  const latestPosts = posts
    .sort((a: BlogPost, b: BlogPost) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Actualités
          </h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            Suivez nos dernières actualités et activités
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <div className="grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
            {latestPosts.map((post) => (
              <div key={post.id} className="flex flex-col h-full relative overflow-hidden rounded-2xl bg-white p-6 sm:p-8">
                <div className="absolute inset-0 -m-1 bg-gradient-to-r from-gray-900/50 to-gray-800/50 rounded-2xl blur-3xl" />
                <div className="relative flex flex-col h-full">
                  {post.images && (
                    <div className="w-full h-48 relative rounded-lg overflow-hidden">
                      <Image
                        src={post.images[0] || '/images/placeholder-news.jpg'}
                        alt={post.titre || 'Image d\'actualité'}
                        fill
                        className="object-cover"
                        priority
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                  )}
                  <div className="flex-grow flex flex-col">
                    <div className="flex-grow">
                      <p className="mt-2 text-sm leading-6 text-gray-600">
                        {post.description}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold leading-8 tracking-tight text-gray-900 mt-4">
                        {post.titre}
                      </h3>
                      <div className="mt-2 text-xs text-gray-500">
                        {new Date(post.date).toLocaleDateString('fr-FR', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric'
                        })}
                      </div>
                      <div className="mt-4">
                        <Link
                          href={`/blog/${post.id}`}
                          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          Voir plus →
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Bouton pour voir toutes les actualités */}
          <div className="mt-8 text-center">
            <Link
              href="/blog"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Voir toutes les actualités
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
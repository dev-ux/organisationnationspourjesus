"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { BlogPost } from "@/types/blog";

interface BlogSectionProps {
  initialPosts: BlogPost[];
}

export default function BlogSectionClient({ initialPosts }: BlogSectionProps) {
  const [posts, setPosts] = useState<BlogPost[]>(initialPosts);
  const [currentIndex, setCurrentIndex] = useState(0);
  const loading = posts.length === 0;

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === latestPosts.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? latestPosts.length - 1 : prevIndex - 1
    );
  };

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
    <div className="py-16 sm:py-24 lg:hidden">
      <div className="px-6">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Actualités
          </h2>
          <p className="mt-2 text-sm leading-6 text-gray-600">
            Suivez nos dernières actualités et activités
          </p>
        </div>
        
        <div className="relative">
          <div className="overflow-hidden rounded-2xl">
            <div 
              className="flex transition-transform duration-300 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {latestPosts.map((post) => (
                <div key={post.id} className="w-full flex-shrink-0 px-2">
                  <div className="relative overflow-hidden rounded-2xl bg-white p-6">
                    <div className="absolute inset-0 -m-1 bg-gradient-to-r from-gray-900/50 to-gray-800/50 rounded-2xl blur-3xl" />
                    <div className="relative">
                      {post.images && (
                        <div className="w-full h-48 relative rounded-lg overflow-hidden mb-4">
                          <Image
                            src={post.images[0] || '/images/placeholder-news.jpg'}
                            alt={post.titre || 'Image d\'actualité'}
                            fill
                            className="object-cover"
                            priority
                            sizes="100vw"
                          />
                        </div>
                      )}
                      <h3 className="text-base font-semibold leading-7 tracking-tight text-gray-900 mb-2">
                        {post.titre}
                      </h3>
                      <p className="text-xs leading-5 text-gray-600 mb-3">
                        {post.description}
                      </p>
                      <div className="text-xs text-gray-500 mb-4">
                        {new Date(post.date).toLocaleDateString('fr-FR', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric'
                        })}
                      </div>
                      <Link
                        href={`/blog/${post.id}`}
                        className="inline-flex items-center px-3 py-2 border border-transparent text-xs font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Voir plus →
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-lg hover:bg-white transition-colors"
            aria-label="Précédent"
          >
            <svg className="w-5 h-5 text-gray-800" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-lg hover:bg-white transition-colors"
            aria-label="Suivant"
          >
            <svg className="w-5 h-5 text-gray-800" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
        
        <div className="flex justify-center mt-6 space-x-2">
          {latestPosts.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentIndex ? 'bg-indigo-600' : 'bg-gray-300'
              }`}
              aria-label={`Aller à la slide ${index + 1}`}
            />
          ))}
        </div>
        
        <div className="mt-8 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Voir toutes les actualités
          </Link>
        </div>
      </div>
    </div>
  );
}
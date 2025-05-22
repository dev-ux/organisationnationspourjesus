"use client";

import React from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { useState } from "react";

interface BlogPost {
  id: string;
  title: string;
  date: string;
  images: string[];
  excerpt: string;
  content: string;
}

const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "GRANDE CAMPAGNE D'ÉVANGÉLISATION",
    date: "22 Mai 2025",
    images: [
      "/image/blog/campagne1.jpg",
      "/image/blog/campagne2.jpg",
      "/image/blog/campagne3.jpg"
    ],
    excerpt: "ACTIONS SOCIALES - Des canaux de Réveil... C'est ce que nous avons été sur le terrain, hier mercredi.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
  },
  {
    id: "2",
    title: "INFORMATIONS IMPORTANTES",
    date: "17 Mai 2025",
    images: [
      "/image/blog/info1.jpg",
      "/image/blog/info2.jpg",
      "/image/blog/info3.jpg"
    ],
    excerpt: "Programme prophétique de réveil et d'évangélisation en cours.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
  },
  {
    id: "3",
    title: "CAMPAGNE DE RÉVEIL",
    date: "15 Mai 2025",
    images: [
      "/image/blog/revival1.jpg",
      "/image/blog/revival2.jpg",
      "/image/blog/revival3.jpg"
    ],
    excerpt: "Campagne de réveil en cours avec des actions sociales et évangélisation.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
  },
  {
    id: "4",
    title: "GRANDE CAMPAGNE D'ÉVANGÉLISATION",
    date: "10 Mai 2025",
    images: [
      "/image/blog/evan1.jpg",
      "/image/blog/evan2.jpg",
      "/image/blog/evan3.jpg"
    ],
    excerpt: "Campagne d'évangélisation et d'actions sociales en cours.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
  },
  {
    id: "5",
    title: "FORMATION SPIRITUELLE",
    date: "5 Mai 2025",
    images: [
      "/image/blog/formation1.jpg",
      "/image/blog/formation2.jpg",
      "/image/blog/formation3.jpg"
    ],
    excerpt: "Sessions de formation spirituelle pour les disciples.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
  },
  {
    id: "6",
    title: "RÉUNIONS DE PRIÈRE",
    date: "1 Mai 2025",
    images: [
      "/image/blog/priere1.jpg",
      "/image/blog/priere2.jpg",
      "/image/blog/priere3.jpg"
    ],
    excerpt: "Réunions de prière et intercession pour la communauté.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
  }
];

export default function BlogDetail({ params }: { params: { id: string } }) {
  const post = blogPosts.find(post => post.id === params.id);

  if (!post) {
    notFound();
  }

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      (prevIndex + 1) % post.images.length
    );
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      (prevIndex - 1 + post.images.length) % post.images.length
    );
  };

  return (
    <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="mt-10">
          <div className="relative overflow-hidden rounded-2xl bg-white p-8 sm:p-10">
            <div className="absolute inset-0 -m-1 bg-gradient-to-r from-gray-900/50 to-gray-800/50 rounded-2xl blur-3xl" />
            <div className="relative">
              <div className="aspect-w-16 aspect-h-9 mb-8">
                <div className="relative">
                  <Image
                    src={post.images[currentImageIndex]}
                    alt={post.title}
                    fill
                    className="object-cover rounded-lg"
                    priority
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-between p-4">
                    <button
                      onClick={handlePrevImage}
                      className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
                    >
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <button
                      onClick={handleNextImage}
                      className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
                    >
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                  {post.title}
                </h1>
                <div className="mt-2 text-sm text-gray-500">
                  {new Date(post.date).toLocaleDateString('fr-FR', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
                </div>
              </div>
              <div className="mt-6 prose prose-indigo prose-lg text-gray-500 mx-auto">
                <div dangerouslySetInnerHTML={{ __html: post.content }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

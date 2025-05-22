"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

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

export default function BlogSection() {
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
            {blogPosts.map((post) => (
              <div key={post.title} className="flex flex-col h-full relative overflow-hidden rounded-2xl bg-white p-6 sm:p-8">
                <div className="absolute inset-0 -m-1 bg-gradient-to-r from-gray-900/50 to-gray-800/50 rounded-2xl blur-3xl" />
                <div className="relative flex flex-col h-full">
                  {post.images && (
                    <div className="w-full h-48 relative rounded-lg overflow-hidden">
                      <Image
                        src={post.images[0]}
                        alt={post.title}
                        fill
                        className="object-cover"
                        priority
                      />
                    </div>
                  )}
                  <div className="flex-grow flex flex-col">
                    <div className="flex-grow">
                      <p className="mt-2 text-sm leading-6 text-gray-600">
                        {post.excerpt}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold leading-8 tracking-tight text-gray-900 mt-4">
                        {post.title}
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
        </div>
      </div>
    </div>
  );
}
"use client";

import React from "react";
import Image from "next/image";
import { notFound } from "next/navigation";

interface BlogPost {
  id: string;
  title: string;
  date: string;
  image: string;
  excerpt: string;
  content: string;
}

const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "GRANDE CAMPAGNE D'ÉVANGÉLISATION",
    date: "22 Mai 2025",
    image: "/image/blog/campagne.jpg",
    excerpt: "ACTIONS SOCIALES - Des canaux de Réveil... C'est ce que nous avons été sur le terrain, hier mercredi.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
  },
  {
    id: "2",
    title: "INFORMATIONS IMPORTANTES",
    date: "17 Mai 2025",
    image: "/image/blog/information.jpg",
    excerpt: "Programme prophétique de réveil et d'évangélisation en cours.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
  },
  {
    id: "3",
    title: "CAMPAGNE DE RÉVEIL",
    date: "15 Mai 2025",
    image: "/image/blog/revival.jpg",
    excerpt: "Campagne de réveil en cours avec des actions sociales et évangélisation.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
  },
  {
    id: "4",
    title: "GRANDE CAMPAGNE D'ÉVANGÉLISATION",
    date: "10 Mai 2025",
    image: "/image/blog/evangelisation.jpg",
    excerpt: "Campagne d'évangélisation et d'actions sociales en cours.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
  },
  {
    id: "5",
    title: "FORMATION SPIRITUELLE",
    date: "5 Mai 2025",
    image: "/image/blog/formation.jpg",
    excerpt: "Sessions de formation spirituelle pour les disciples.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
  },
  {
    id: "6",
    title: "RÉUNIONS DE PRIÈRE",
    date: "1 Mai 2025",
    image: "/image/blog/priere.jpg",
    excerpt: "Réunions de prière et intercession pour la communauté.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
  }
];

export default function BlogDetail({ params }: { params: { id: string } }) {
  const post = blogPosts.find(post => post.id === params.id);

  if (!post) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <div className="mt-10">
          <div className="relative overflow-hidden rounded-2xl bg-white p-8 sm:p-10">
            <div className="absolute inset-0 -m-1 bg-gradient-to-r from-gray-900/50 to-gray-800/50 rounded-2xl blur-3xl" />
            <div className="relative">
              <div className="aspect-w-16 aspect-h-9 mb-4">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover rounded-lg"
                  priority
                />
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

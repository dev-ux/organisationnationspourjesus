"use client";

import React from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import Link from "next/link";
import BlogDetailHero from './[id]/hero';

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
  // Add other blog posts...
];

export default function BlogDetail({ params }: { params: { id: string } }) {
  const post = blogPosts.find(post => post.id === params.id);

  if (!post) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-7xl px-6">
      <BlogDetailHero post={post} />
      <div className="mx-auto max-w-2xl">
        <div className="relative">
          <div className="absolute inset-0 -m-1 bg-gradient-to-r from-gray-900/50 to-gray-800/50 rounded-2xl blur-3xl" />
          <div className="relative bg-white p-8 sm:p-10 rounded-2xl shadow-xl">
            <div className="space-y-8">
              {/* Header */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
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
                  <Link
                    href="/blog"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <span className="mr-2">Retour</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                  </Link>
                </div>
                <div className="aspect-w-16 aspect-h-9 relative rounded-lg overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                    priority
                  />
                </div>
              </div>

              {/* Content */}
              <div className="prose prose-indigo prose-lg text-gray-700 max-w-none">
                <div dangerouslySetInnerHTML={{ __html: post.content }} />
              </div>

              {/* Share Section */}
              <div className="border-t border-gray-200 pt-8">
                <h3 className="text-lg font-semibold mb-4">Partager cet article</h3>
                <div className="flex gap-4">
                  <button
                    onClick={() => {
                      const url = window.location.href;
                      window.open(`https://facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`);
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                    </svg>
                    Facebook
                  </button>
                  <button
                    onClick={() => {
                      const url = window.location.href;
                      window.open(`https://twitter.com/share?url=${encodeURIComponent(url)}`);
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-400 text-white rounded-lg hover:bg-blue-500 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                    </svg>
                    Twitter
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

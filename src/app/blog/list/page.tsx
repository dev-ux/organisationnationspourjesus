"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { blogPosts, BlogPost } from '@/data/blog-data';

export default function BlogListPage() {
  return (
    <div className="min-h-screen bg-white">
      <main className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8">Actualités</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.id}`}
              className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="relative h-48">
                <Image
                  src={post.images[0]}
                  alt={post.titre}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                  {post.titre}
                </h3>
                <p className="mt-2 text-gray-600">
                  {post.description}
                </p>
                <p className="mt-2 text-sm text-gray-500">
                  {post.date}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}

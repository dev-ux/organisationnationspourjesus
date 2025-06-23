"use client";

import React from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import BlogDetailHero from './hero';
import { blogPosts, BlogPost } from '@/data/blog-data';

export default function BlogPostPage({
  params,
}: {
  params: { id: string };
}) {
  const actualite = blogPosts.find((post: BlogPost) => post.id === params.id);

  if (!actualite) {
    return notFound();
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <BlogDetailHero actualite={actualite} />
      
      <div className="max-w-4xl mx-auto">
        <div className="prose prose-lg max-w-none">
          <p className="text-gray-600 mb-8">{actualite.description}</p>
          <div dangerouslySetInnerHTML={{ __html: actualite.contenu }} />
        </div>
      </div>
    </div>
  );
}

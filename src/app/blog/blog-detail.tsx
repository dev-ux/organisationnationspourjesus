"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import Link from "next/link";
import BlogDetailHero from './[id]/hero';

import { BlogPost } from '@/types/blog';

export default function BlogDetail({ params }: { params: { id: string } }) {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch('/api/news');
        const data = await response.json();
        const newsPost = data.news.find((news: any) => news.id.toString() === params.id);
        if (newsPost) {
          setPost({
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

    fetchPost();
  }, [params.id]);

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-12">
        <p className="text-center text-gray-600">Chargement de l\'article...</p>
      </div>
    );
  }

  if (!post) {
    notFound();
  }

  if (!post) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-7xl px-6">
      <BlogDetailHero post={post} />
      <div className="mx-auto max-w-2xl">
        <div className="relative">
          <div className="absolute inset-0 -m-1 bg-gradient-to-r from-gray-900/50 to-gray-800/50 rounded-2xl blur-3xl" />
          <div className="relative bg-white p-6 rounded-2xl">
            <div className="space-y-6">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold text-gray-900">{post.titre}</h2>
                <p className="text-gray-500">{post.date}</p>
              </div>
              <div className="space-y-4">
                <p className="text-gray-600">{post.contenu}</p>
              </div>
              <div className="flex justify-end">
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
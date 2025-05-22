"use client";

import React from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { actualites } from '@/data/actualites';

interface Actualite {
  id: number;
  titre: string;
  date: string;
  description: string;
  image: string;
  contenu: string;
}

export default function BlogPostPage({
  params,
}: {
  params: { id: string };
}) {
  const actualite = actualites.find((post) => post.id === parseInt(params.id));

  if (!actualite) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">{actualite.titre}</h1>
        <p className="text-gray-600 mb-8">{new Date(actualite.date).toLocaleDateString('fr-FR')}</p>

        <div className="relative mb-8">
          <Image
            src={actualite.image}
            alt={actualite.titre}
            width={800}
            height={400}
            className="rounded-lg"
          />
        </div>

        <div className="prose max-w-none">
          <p>{actualite.description}</p>
          <div className="mt-8">
            <p>{actualite.contenu}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

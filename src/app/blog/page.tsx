"use client";

import React from 'react';
import Header from '@/components/header';
import Footer from '@/components/footer';
import Actualites from '@/components/Actualites';

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8">Actualités</h1>
        <Actualites nbActualites={5} />
      </main>
      <Footer />
    </div>
  );
}

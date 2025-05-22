import React from 'react';
import { type ReactNode } from 'react';
import Header from '@/components/header';
import Footer from '@/components/footer';
import AccueilHero from './hero';
import Actualites from '@/components/Actualites';
import Link from 'next/link';

export default function AccueilPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <AccueilHero />
      <main className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8">Bienvenue à l'Eglise des Disciples Accomplis</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Notre Mission</h2>
            <p className="text-gray-600">
              Nous sommes une communauté chrétienne dédiée à l'enseignement biblique, au service et à la prière.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Nos Valeurs</h2>
            <ul className="list-disc pl-5 text-gray-600">
              <li>Foi active</li>
              <li>Communauté</li>
              <li>Service</li>
              <li>Prière</li>
            </ul>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Prochaines Activités</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium">Culte du Dimanche</h3>
                <p className="text-sm text-gray-600">10h00 - 12h00</p>
              </div>
              <div>
                <h3 className="font-medium">Groupe de Prière</h3>
                <p className="text-sm text-gray-600">19h00 - 21h00</p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12">
          <h2 className="text-3xl font-bold mb-8">Actualités Récents</h2>
          <Actualites />
          <div className="text-center mt-8">
            <Link href="/blog" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200">
              Voir plus
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

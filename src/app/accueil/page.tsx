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
        <div className="mt-12 bg-blue-50 rounded-lg p-6">
          <h2 className="text-3xl font-bold mb-8">Lives Zoom</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold">Mercredi</h3>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">18h30 GMT</span>
              </div>
              <p className="text-gray-600 mb-4">Rejoignez-nous chaque mercredi pour nos sessions en direct via Zoom. code: 036406</p>
              <a href="https://us06web.zoom.us/j/83141293151?pwd=uBPM4nmzmWTlbuaMpyHscQ8Ur87QmC.1" 
              target="_blank" rel="noopener noreferrer" className="bg-blue-600 text-white px-4
               py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200">
                Rejoindre le Live
              </a>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold">Dimanche</h3>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">17h00 GMT</span>
              </div>
              <p className="text-gray-600 mb-4">Participez à nos cultes dominicaux en direct depuis votre domicile. code: 941892</p>
              <a href="https://us06web.zoom.us/u/kdGKBzwtZV " target="_blank" rel="noopener noreferrer" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200">
                Rejoindre le Live
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

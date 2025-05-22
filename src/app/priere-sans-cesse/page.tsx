"use client";

import React from 'react';
import Header from '@/components/header';
import Footer from '@/components/footer';
import PriereSansCesseHero from './hero';

export default function PriereSansCessePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <PriereSansCesseHero />
      <main className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8">Prière sans Cesse</h1>
      <div className="bg-white rounded-lg shadow-md p-8 mb-8">
        <h2 className="text-2xl font-semibold mb-4">Notre Engagement</h2>
        <p className="text-gray-600 mb-6">
          Nous croyons en la puissance de la prière continue et nous offrons des opportunités pour prier ensemble.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Groupe de Prière</h3>
            <p className="text-gray-600">Tous les jours à 19h00</p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Prière Intercession</h3>
            <p className="text-gray-600">Dimanche à 14h00</p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Temps de Jeûne</h3>
            <p className="text-gray-600">Premier vendredi du mois</p>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-4">Comment Participer</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-medium">Rejoignez-nous</h3>
            <p className="text-sm text-gray-600">
              Venez nous rejoindre pour nos sessions de prière en personne.
            </p>
          </div>
          <div>
            <h3 className="font-medium">En ligne</h3>
            <p className="text-sm text-gray-600">
              Participez à nos sessions de prière en ligne via notre plateforme.
            </p>
          </div>
        </div>
      </div>
      </main>
      <Footer />
    </div>
  );
}

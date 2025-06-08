"use client";

import React from 'react';
import Header from '@/components/header';
import Footer from '@/components/footer';
import SamediMiraclesHero from './hero';

export default function SamediDesMiraclesPage() {
  return (
    <div className="min-h-screen bg-white">
      <SamediMiraclesHero />
      <main className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8">Samedi des Miracles</h1>
      <div className="bg-white rounded-lg shadow-md p-8 mb-8">
        <h2 className="text-2xl font-semibold mb-4">Programme Spécial</h2>
        <p className="text-gray-600 mb-6">
          Chaque samedi, nous organisons une session spéciale de prière et d'intercession pour les miracles.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">14h00 - 16h00</h3>
            <p className="text-gray-600">Session de Prière</p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">16h00 - 18h00</h3>
            <p className="text-gray-600">Intercession</p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">18h00 - 20h00</h3>
            <p className="text-gray-600">Temps de Miracles</p>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-4">Comment Participer</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-medium">Prérequis</h3>
            <ul className="list-disc pl-5 text-gray-600">
              <li>Foi en Dieu</li>
              <li>Esprit ouvert</li>
              <li>Participation active</li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium">Inscription</h3>
            <p className="text-sm text-gray-600">
              Contactez-nous pour vous inscrire à la session.
            </p>
          </div>
        </div>
      </div>
      </main>
    </div>
  );
}

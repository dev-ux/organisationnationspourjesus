import React from 'react';
import Header from '@/components/header';
import Footer from '@/components/footer';
import AcademieHero from './hero';

export default function AcademiePage() {
  return (
    <div className="min-h-screen bg-white">
      <AcademieHero />
      <main className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8">L'Académie</h1>
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Programme d'Enseignement</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-semibold mb-2">Cours Biblique</h3>
              <p className="text-gray-600">
                Des cours approfondis sur la Bible et les enseignements chrétiens.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Formation des Leaders</h3>
              <p className="text-gray-600">
                Programme de développement des leaders pour servir dans l'église.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Études Bibliques</h3>
              <p className="text-gray-600">
                Groupes d'études bibliques pour approfondir votre connaissance.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Ministère Jeunesse</h3>
              <p className="text-gray-600">
                Programme spécial pour les jeunes et leur développement spirituel.
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4">Prochaines Sessions</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium">Session Biblique</h3>
              <p className="text-sm text-gray-600">Mercredi 15h00 - 17h00</p>
            </div>
            <div>
              <h3 className="font-medium">Formation des Leaders</h3>
              <p className="text-sm text-gray-600">Vendredi 19h00 - 21h00</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

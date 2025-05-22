import React from 'react';

export default function OffrandesPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8">Offrandes</h1>
      <div className="bg-white rounded-lg shadow-md p-8 mb-8">
        <h2 className="text-2xl font-semibold mb-4">Donner avec Joie</h2>
        <p className="text-gray-600 mb-6">
          Votre générosité nous aide à continuer notre mission de service et d'évangélisation.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Don en ligne</h3>
            <p className="text-gray-600">
              Faites un don sécurisé via notre plateforme de paiement.
            </p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Chèque</h3>
            <p className="text-gray-600">
              Envoyez votre chèque à notre adresse postale.
            </p>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-4">Types d'Offrandes</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-medium">Offrandes régulières</h3>
            <p className="text-sm text-gray-600">
              Don mensuel ou hebdomadaire pour le soutien de l'église.
            </p>
          </div>
          <div>
            <h3 className="font-medium">Offrandes spéciales</h3>
            <p className="text-sm text-gray-600">
              Don pour des projets spécifiques ou des missions.
            </p>
          </div>
          <div>
            <h3 className="font-medium">Dons en nature</h3>
            <p className="text-sm text-gray-600">
              Don de biens ou services pour l'église.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

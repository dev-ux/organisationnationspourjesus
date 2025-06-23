"use client";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-red-600 mb-4">Erreur 404</h1>
        <p className="text-xl text-gray-600 mb-8">Cette page n'existe pas</p>
        <a
          href="/"
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Retour à l'accueil
        </a>
      </div>
    </div>
  );
}

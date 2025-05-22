"use client";

import { useState, useEffect } from 'react';
import { useLocalStorage } from 'usehooks-ts';

interface FirstVisitModalProps {
  videoUrls: string[];
}

export default function FirstVisitModal({ videoUrls }: FirstVisitModalProps) {
  const [showModal, setShowModal] = useState(false);
  const [hasVisited, setHasVisited] = useLocalStorage('hasVisited', false);
  
  // Obtenir l'index de la vidéo du jour
  const today = new Date();
  const startOfYear = new Date(today.getFullYear(), 0, 0);
  const diff = today.getTime() - startOfYear.getTime();
  const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));
  const videoIndex = dayOfYear % videoUrls.length;
  const videoUrl = videoUrls[videoIndex];

  useEffect(() => {
    if (!hasVisited) {
      setShowModal(true);
      setHasVisited(true);
    }
  }, [hasVisited, setHasVisited]);

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-4xl p-6 relative">
        <button
          onClick={() => setShowModal(false)}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <h2 className="text-2xl font-bold mb-4 text-center">Bienvenue !</h2>
        <div className="aspect-video">
          <iframe
            src={`https://www.facebook.com/plugins/video.php?href=${videoUrl}&show_text=0&width=560`}
            width="560"
            height="315"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full rounded-lg"
          />
        </div>
        
        <div className="mt-4 text-center">
          <p className="text-gray-600">
            Découvrez notre prédication du jour !
          </p>
        </div>
      </div>
    </div>
  );
}

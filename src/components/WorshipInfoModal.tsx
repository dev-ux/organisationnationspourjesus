'use client';

import { useEffect, useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

export default function WorshipInfoModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [showVideo, setShowVideo] = useState(true);
  const [showInfo, setShowInfo] = useState(false);

  useEffect(() => {
    // Afficher le modal après 5 secondes
    const timer = setTimeout(() => {
      setIsOpen(true);
      // Après 5 secondes, cacher la vidéo et afficher les infos
      const infoTimer = setTimeout(() => {
        setShowVideo(false);
        setShowInfo(true);
      }, 30000);
      
      return () => clearTimeout(infoTimer);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl">
        <div className="relative">
          {/* En-tête avec image */}
          <div className="relative h-48 w-full overflow-hidden">
            <img
              src="/images/church-opening.jpg"
              alt="Temple YAHWEH SABAOTH"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <h2 className="absolute bottom-0 left-0 right-0 p-6 text-2xl font-bold text-white text-center">
              Bienvenue au Temple YAHWEH SABAOTH
            </h2>
          </div>
          
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 bg-white/80 hover:bg-white rounded-full p-1.5 shadow-md z-10 transition-colors"
            aria-label="Fermer"
          >
            <XMarkIcon className="h-6 w-6 text-gray-700" />
          </button>
          
          {showVideo && (
            <div className="w-full bg-black">
              <div className="relative" style={{ paddingBottom: '56.25%' }}> {/* 16:9 Aspect Ratio */}
                <iframe
                  src="https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2F61577717287026%2Fvideos%2F1150005916961223%2F&show_text=false&t=0&autoplay=true"
                  className="absolute top-0 left-0 w-full h-full"
                  style={{ border: 'none', overflow: 'hidden' }}
                  scrolling="no"
                  allowFullScreen={true}
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                ></iframe>
              </div>
            </div>
          )}
          
          {showInfo && (
            <div className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                Horaires des Cultes
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8 mb-6">
                <div className="bg-blue-50 p-6 rounded-xl">
                  <h3 className="text-lg font-semibold text-blue-800 mb-3 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Horaires
                  </h3>
                  <div className="space-y-2">
                    <p className="text-blue-900 font-medium">Culte Dominical</p>
                    <p className="text-blue-800">Tous les dimanches</p>
                    <p className="text-blue-700 font-semibold text-lg">15h00 - 19h00</p>
                  </div>
                </div>
                
                <div className="bg-green-50 p-6 rounded-xl">
                  <h3 className="text-lg font-semibold text-green-800 mb-3 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Lieu
                  </h3>
                  <div className="space-y-2">
                    <p className="text-green-900 font-medium">Temple "YAHWEH SABAOTH"</p>
                    <p className="text-green-800">Abobo Belle Ville</p>
                    <p className="text-green-700">Vers L'École Primaire Sainte Marie</p>
                    <p className="text-sm text-green-600">À 500 mètres du Commissariat du 40ème Arrondissement</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex flex-col sm:flex-row justify-center gap-4">
                <a
                  href="https://www.facebook.com/profile.php?id=61577717287026"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                  Savoir plus
                </a>
                <button
                  onClick={() => setIsOpen(false)}
                  className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Fermer
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

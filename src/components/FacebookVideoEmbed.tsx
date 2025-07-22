'use client';

import React, { useEffect } from 'react';

export default function FacebookVideoEmbed() {
  useEffect(() => {
    // Charger le SDK Facebook de manière asynchrone
    const loadFacebookSDK = () => {
      if (window.FB) return;
      
      const script = document.createElement('script');
      script.src = 'https://connect.facebook.net/fr_FR/sdk.js#xfbml=1&version=v18.0';
      script.async = true;
      script.defer = true;
      script.crossOrigin = 'anonymous';
      script.nonce = 'facebook-sdk';
      document.body.appendChild(script);
    };

    loadFacebookSDK();
  }, []);

  return (
    <section className="py-6 md:py-8 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">Notre Dernière Vidéo</h2>
          <p className="mt-2 text-lg text-gray-600">Découvrez nos derniers moments de culte</p>
        </div>
        
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            {/* Conteneur vidéo avec ratio plus compact */}
            <div className="w-full lg:w-2/3 bg-black">
              <div className="relative pt-[38%]"> {/* Ratio encore plus compact */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div 
                    className="fb-video w-full h-60"
                    data-href="https://www.facebook.com/61577717287026/videos/1150005916961223" 
                    data-width="auto"
                    data-show-text="false"
                    data-allowfullscreen="true"
                    data-autoplay="false"
                  ></div>
                </div>
              </div>
            </div>
            
            {/* Description à côté de la vidéo */}
            <div className="w-full lg:w-1/3 p-4 flex flex-col justify-center">
              <div className="mb-4">
                <h3 className="text-xl font-bold text-gray-900">Culte du Dimanche</h3>
                <p className="mt-2 text-sm text-gray-600">
                  Revivez nos moments de louange et d'enseignement biblique.
                </p>
              </div>
              
              <div className="mt-auto">
                <a 
                  href="https://www.facebook.com/61577717287026/videos/1150005916961223" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                  Voir sur Facebook
                </a>
                
                <p className="mt-4 text-sm text-gray-500">
                  Abonnez-vous à notre page pour ne manquer aucun de nos cultes en direct.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

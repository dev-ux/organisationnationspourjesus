'use client';

import Image from 'next/image';

export default function AppBanner() {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex-1 text-white">
            <h2 className="text-3xl font-bold mb-4">
              Téléchargez Notre Application Mobile
            </h2>
            <p className="text-lg mb-6 text-white/90">
              Restez connecté avec notre communauté. Accédez aux prédications, 
              événements et actualités de l'église directement sur votre téléphone.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="flex items-center gap-2 px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
                App Store
              </button>
              <button className="flex items-center gap-2 px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3 20.5v-17c0-.83.67-1.5 1.5-1.5h17c.83 0 1.5.67 1.5 1.5v17c0 .83-.67 1.5-1.5 1.5h-17c-.83 0-1.5-.67-1.5-1.5zm9.5-1.5h8.5v-17h-8.5v17zm-1-17h-8.5v17h8.5v-17z"/>
                </svg>
                Play Store
              </button>
            </div>
          </div>
          <div className="flex-1 flex justify-center">
            <div className="relative">
              <Image
                src="/images/onjapp.png"
                alt="Application mobile de l'église"
                width={600}
                height={1200}
                className="w-full h-auto max-h-[400px] sm:max-h-[500px] md:max-h-[600px] object-contain"
              />
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

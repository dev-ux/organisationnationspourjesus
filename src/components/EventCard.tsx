'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';

interface EventCardProps {
  title: string;
  description: string;
  eventDate: Date;
  facebookLink?: string;
  isPastEvent?: boolean;
}

export default function EventCard({ title, description, eventDate, isPastEvent = false, facebookLink = 'https://www.facebook.com/profile.php?id=61577717287026' }: EventCardProps) {
  const [timeRemaining, setTimeRemaining] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeRemaining = () => {
      const now = new Date();
      const difference = eventDate.getTime() - now.getTime();

      if (difference <= 0) {
        setTimeRemaining({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0
        });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeRemaining({ days, hours, minutes, seconds });
    };

    calculateTimeRemaining();
    const timer = setInterval(calculateTimeRemaining, 1000);

    return () => clearInterval(timer);
  }, [eventDate]);

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
      <div className="relative h-64">
        <Image
          src="/images/church-opening.jpg"
          alt={`Événement : ${title}`}
          fill
          className="object-cover"
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
          <p className="text-white text-sm opacity-90">{new Date(eventDate).toLocaleDateString('fr-FR', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })}</p>
        </div>
      </div>
      <div className="p-8">
        <div className="text-center mb-8 space-y-8">
          {/* Section Informations de culte */}
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 text-left">
            <h4 className="text-xl font-semibold text-blue-800 mb-4 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Horaires des Cultes
            </h4>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="font-medium text-blue-900">Culte Dominical</p>
                <p className="text-blue-800">Tous les dimanches</p>
                <p className="text-blue-700 font-semibold">15h00 - 19h00</p>
              </div>
              <div>
                <p className="font-medium text-blue-900">Lieu</p>
                <p className="text-blue-800">Temple "YAHWEH SABAOTH"</p>
                <p className="text-blue-700">Abobo Belle Ville</p>
                <p className="text-sm text-blue-600 mt-1">Vers L'École Primaire Sainte Marie, à 500 mètres du Commissariat du 40ème Arrondissement</p>
              </div>
            </div>
          </div>

         
        </div>
        <p className="text-gray-700 leading-relaxed mb-8">{description}</p>
        <div className="flex justify-center">
          <a 
            href={facebookLink} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors inline-flex items-center gap-2"
          >
            En savoir plus
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}

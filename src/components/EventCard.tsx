'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';

interface EventCardProps {
  title: string;
  description: string;
  eventDate: Date;
  facebookLink?: string;
}

export default function EventCard({ title, description, eventDate, facebookLink = 'https://www.facebook.com/profile.php?id=61577717287026' }: EventCardProps) {
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
          src="images/church-opening.jpg"
          alt={title}
          fill
          className="object-cover"
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
        <div className="text-center mb-8">
          <h4 className="text-xl font-semibold text-gray-700 mb-4">Compte à rebours</h4>
          <div className="flex justify-center gap-6">
            <div className="text-center">
              <div className="bg-blue-100 rounded-lg p-4 text-3xl font-bold text-blue-600">
                {timeRemaining.days}
              </div>
              <p className="text-sm text-gray-600">Jours</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 rounded-lg p-4 text-3xl font-bold text-blue-600">
                {timeRemaining.hours}
              </div>
              <p className="text-sm text-gray-600">Heures</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 rounded-lg p-4 text-3xl font-bold text-blue-600">
                {timeRemaining.minutes}
              </div>
              <p className="text-sm text-gray-600">Minutes</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 rounded-lg p-4 text-3xl font-bold text-blue-600">
                {timeRemaining.seconds}
              </div>
              <p className="text-sm text-gray-600">Secondes</p>
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
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}

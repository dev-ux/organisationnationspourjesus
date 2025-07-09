"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

interface PastorMessage {
  title: string;
  content: string;
  image: string;
}

const PastorMessage = () => {
  const [message, setMessage] = useState<PastorMessage | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const defaultMessage: PastorMessage = {
    title: "Un Message de notre Pasteur",
    content: "Chers frères et sœurs, que la paix de Dieu soit avec vous.\nNous sommes ici pour vous accueillir et vous accompagner dans votre parcours spirituel. Notre mission est de vous aider à grandir dans votre foi et à vivre selon les enseignements de notre Seigneur Jésus-Christ.\n\nRejoignez-nous pour partager des moments de prière, d'enseignement biblique et de communion fraternelle. Nous sommes là pour vous soutenir et vous guider dans votre cheminement spirituel.",
    image: '/image/past.jpg'
  };

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch('/api/pastor-message');
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération du message');
        }
        const data = await response.json();
        setMessage(data);
      } catch (error) {
        console.error('Erreur lors de la récupération du message:', error);
        setError(error instanceof Error ? error.message : 'Une erreur est survenue');
        setMessage(defaultMessage);
      } finally {
        setLoading(false);
      }
    };
    fetchMessage();
  }, []);

  if (loading) {
    return (
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <div className="animate-pulse">
              <div className="h-40 w-full bg-gray-200 rounded-lg mb-8"></div>
              <div className="h-6 w-1/2 bg-gray-200 rounded mb-4"></div>
              <div className="h-4 w-3/4 bg-gray-200 rounded mb-4"></div>
              <div className="h-4 w-1/3 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-4">
              Message du Pasteur
            </h2>
            <p className="text-red-500">{error}</p>
          </div>
        </div>
      </section>
    );
  }

  const currentMessage = message || defaultMessage;

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Image section */}
            <div className="relative h-[400px] md:h-[500px]">
              <Image
                src={message?.image || '/image/past.jpg'}
alt="Message du Pasteur"
                fill
                className="object-cover rounded-lg"
                priority
              />
            </div>

            {/* Content section */}
            <div className="space-y-6">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                {message?.title || defaultMessage.title}
              </h2>
              <div className="text-xl text-gray-600 leading-relaxed">
                {message?.content?.split('\n').map((paragraph, index) => (
                  <p key={index} className="mb-4">
                    {paragraph}
                  </p>
                )) || defaultMessage.content.split('\n').map((paragraph, index) => (
                  <p key={index} className="mb-4">
                    {paragraph}
                  </p>
                ))}
              </div>
              <div className="pt-8">
    
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PastorMessage;

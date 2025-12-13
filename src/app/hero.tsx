"use client";

import Image from "next/image";
import { Button } from "@material-tailwind/react";
import Carousel from '@/components/carousel';

const slides = [
  {
    image: '/image/onj5.jpg',
    title: 'Eglise des Disciples Accomplis',
    description: 'Rejoignez notre communauté de disciples dévoués, où la foi et l\'accomplissement spirituel sont notre priorité.'
  },
  {
    image: '/image/onj6.jpg',
    title: 'Servir et Aimer',
    description: 'Notre mission est de servir notre communauté avec amour et dévouement, en suivant les enseignements de Christ.'
  },
  {
    image: '/image/onj7.jpg',
    title: 'Croissance Spirituelle',
    description: 'Découvrez notre programme d\'enseignement biblique et rejoignez-nous dans notre parcours spirituel.'
  },
  {
    image: '/image/onj8.jpg',
    title: 'Communauté Active',
    description: 'Participez à nos activités régulières et faites partie d\'une communauté engagée et dynamique.'
  },
  {
    image: '/image/onjapp.jpg',
    title: '',
    description: ''
  }
];

export default function Hero() {
  return (
    <div className="relative min-h-[60vh] sm:min-h-[70vh] lg:min-h-screen w-full" style={{ backgroundImage: `url('/image/hero/home1.jpg')` }}>
      <div className="absolute inset-0">
        <Carousel
          images={slides.map(slide => slide.image)}
          texts={slides.map(slide => ({
            title: slide.title,
            description: slide.description
          }))}
          noBlurImages={['/image/onjapp.jpg']}
        />
      </div>
      <div className="absolute inset-0 bg-black/10"></div>
    </div>
  );
}

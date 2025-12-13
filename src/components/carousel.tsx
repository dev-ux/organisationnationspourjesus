import React, { useState, useEffect } from 'react';
import Image from 'next/image';

interface CarouselProps {
  images: string[];
  texts?: Array<{
    title: string;
    description: string;
  }>;
  interval?: number;
  noBlurImages?: string[];
};

export default function Carousel({ images, texts, interval = 5000, noBlurImages = [] }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, interval);

    return () => clearInterval(timer);
  }, [interval, images.length]);

  return (
    <div className="relative w-full h-full">
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-500 ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Image
            src={image}
            alt={`Slide ${index + 1}`}
            width={1920}
            height={1080}
            className={`object-cover w-full h-full ${noBlurImages.includes(image) ? '' : 'blur-lg'}`}
            priority={index === 0}
          />
          <div className="absolute inset-0 bg-black/50"></div>
          {texts && (
            <div className="absolute inset-0 flex flex-col justify-center items-center text-white h-full px-8">
              <h1 className="text-7xl font-bold mb-4">{texts[index].title}</h1>
              <p className="text-xl text-white/90 mb-8 max-w-2xl text-center">{texts[index].description}</p>
            </div>
          )}
        </div>
      ))}
      
      {/* Navigation dots */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentIndex ? 'bg-white' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

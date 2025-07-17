'use client'

import Image from 'next/image';
import { useState } from 'react';

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  fallbackSrc?: string;
  className?: string;
}

export default function ImageWithFallback({
  src,
  alt,
  width,
  height,
  fallbackSrc = '/images/default-image.jpg',
  className = '',
}: ImageWithFallbackProps) {
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    // Évite boucle infinie si fallback échoue aussi
    if (!hasError) {
      setHasError(true);
    }
  };

  return (
    <Image
      key={hasError ? 'fallback' : 'main'} // Forcer un rerender
      src={hasError ? fallbackSrc : src}
      alt={alt}
      width={width}
      height={height}
      onError={handleError}
      className={`object-cover w-full h-full ${className}`}
    />
  );
}

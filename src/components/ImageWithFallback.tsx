'use client'

import Image from 'next/image';
import { useState } from 'react';

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  fallbackSrc?: string;
}

export default function ImageWithFallback({
  src,
  alt,
  width,
  height,
  fallbackSrc = '/fallback-image.png',
}: ImageWithFallbackProps) {
  const [hasError, setHasError] = useState(false);

  return (
    <div className="relative w-full h-full">
      <Image
        src={hasError ? fallbackSrc : src}
        alt={alt}
        width={width}
        height={height}
        onError={() => setHasError(true)}
        className="object-cover w-full h-full"
      />
    </div>
  );
}

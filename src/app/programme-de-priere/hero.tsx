"use client";

import Image from "next/image";

export default function PriereSansCesseHero() {
  return (
    <div className="relative h-[800px] w-full">
      <div className="absolute inset-0">
        <Image
          src="/image/onj1.jpg"
          alt="Programme de prière"
          fill
          className="object-cover filter blur-lg"
          priority
        />
      </div>
      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <h1 className="text-4xl font-bold text-white text-center">
          Programme de prière
        </h1>
      </div>
    </div>
  );
}

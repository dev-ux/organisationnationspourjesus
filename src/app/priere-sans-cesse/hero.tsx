"use client";

import Image from "next/image";

export default function PriereSansCesseHero() {
  return (
    <div className="relative h-[400px] w-full">
      <div className="absolute inset-0">
        <Image
          src="/image/onj7.jpg"
          alt="Prière sans Cesse"
          fill
          className="object-cover"
          priority
        />
      </div>
      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <h1 className="text-4xl font-bold text-white text-center">
          Prière sans Cesse
        </h1>
      </div>
    </div>
  );
}

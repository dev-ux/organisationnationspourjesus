"use client";

import Image from "next/image";

export default function OffrandesHero() {
  return (
    <div className="relative h-[800px] w-full">
      <div className="absolute inset-0">
        <Image
          src="/image/don.jpg"
          alt="Offrandes"
          fill
          className="object-cover blur-lg"
          priority
        />
      </div>
      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <h1 className="text-4xl font-bold text-white text-center">
          Offrandes
        </h1>
      </div>
    </div>
  );
}

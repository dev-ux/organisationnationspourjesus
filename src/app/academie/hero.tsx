"use client";

import Image from "next/image";

export default function AcademieHero() {
  return (
    <div className="relative h-[400px] w-full">
      <div className="absolute inset-0">
        <Image
          src="/image/onj3.jpg"
          alt="Académie des Disciples Accomplis"
          fill
          className="object-cover"
          priority
        />
      </div>
      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <h1 className="text-4xl font-bold text-white text-center">
          L'Académie des Disciples Accomplis
        </h1>
      </div>
    </div>
  );
}

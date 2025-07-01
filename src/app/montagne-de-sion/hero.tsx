"use client";

import Image from "next/image";
import React from "react";

export default function MontagneDeSionHero() {
  return (
    <div className="relative h-[800px] w-full">
      <div className="absolute inset-0">
        <Image
          src="/image/onj6.jpg"
          alt="Montagne de Sion"
          fill
          className="object-cover filter blur-lg"
          priority
        />
      </div>
      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <h1 className="text-4xl font-bold text-white text-center">
          Montagne de Sion
        </h1>
      </div>
    </div>
  );
}

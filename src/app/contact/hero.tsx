"use client";

import Image from "next/image";

export default function ContactHero() {
  return (
    <div className="relative h-[400px] w-full">
      <div className="absolute inset-0">
        <Image
          src="/image/onj9.jpg"
          alt="Contact"
          fill
          className="object-cover"
          priority
        />
      </div>
      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <h1 className="text-4xl font-bold text-white text-center">
          Contact
        </h1>
      </div>
    </div>
  );
}

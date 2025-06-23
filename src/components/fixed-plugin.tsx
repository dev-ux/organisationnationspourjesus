"use client";
import Image from "next/image";


export function FixedPlugin() {
  return (
    <a href="https://www.organisationnationspourjesus.com" target="_blank" rel="noopener noreferrer">
      <button
        className="!fixed bottom-4 right-4 flex gap-1 pl-2 items-center border border-blue-gray-50 bg-white text-gray-900 hover:bg-gray-50 transition-colors"
      >
        <Image
          width={128}
          height={128}
          className="w-5 h-5"
          alt="Organisation Nations pour Jésus"
          src="/favicon.png"
        />
        <span>Organisation Nations pour Jésus</span>
      </button>
    </a>
  );
}

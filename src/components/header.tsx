import React from 'react';
import { Navbar } from './navbar';
import Image from 'next/image';

export default function Header() {
  return (
    <header className="sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <a href="/" className="block">
          <Image 
            src="/logos/logo.jpg" 
            alt="Logo EDA" 
            className="h-16 w-auto rounded-full"
            width={64}
            height={64}
            priority
          />
        </a>
      </div>
      <Navbar />
    </header>
  );
}

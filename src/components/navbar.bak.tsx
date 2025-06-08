"use client";

import React, { useState, useEffect } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

interface NavItemProps {
  children: React.ReactNode;
  href?: string;
}

function NavItem({ children, href }: NavItemProps) {
  return (
    <li>
      <a href={href || "#"} className="hover:opacity-75 transition">
        {children}
      </a>
    </li>
  );
}

export function Navbar() {
  const [isScrolling, setIsScrolling] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setIsScrolling(true);
    } else {
      setIsScrolling(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    document.body.style.overflow = isOpen ? 'auto' : 'hidden';
  };

  const closeMenu = () => {
    setIsOpen(false);
    document.body.style.overflow = 'auto';
  };

  return (
    <nav className={`fixed top-0 z-50 w-full transition-all duration-300 ${
      isScrolling
        ? "bg-white/95 shadow-lg backdrop-blur-sm"
        : "bg-transparent"
    }`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <div className="flex items-center gap-4">
          <h1 className={`text-xl font-bold ${isScrolling ? 'text-gray-900' : 'text-white'} ml-2`}>
            <a href="/" className="block">
              <img 
                src="/logos/logo.jpg" 
                alt="Logo EDA" 
                className="h-16 w-auto rounded-full"
              />
            </a>
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={toggleMenu}
            className={`p-2 rounded-lg lg:hidden ${isScrolling ? 'text-gray-700' : 'text-white'}`}
            aria-label="Menu"
          >
            {isOpen ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <Bars3Icon className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Menu mobile */}
      <div className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={toggleMenu} />
      
      <div className={`fixed right-0 top-0 h-full w-full max-w-sm bg-white shadow-lg transform transition-transform duration-300 z-50 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-bold">Menu</h2>
            <button onClick={toggleMenu} className="p-2">
              <XMarkIcon className="h-6 w-6 text-gray-600" />
            </button>
          </div>
          <ul className="space-y-4">
            <li><a href="/accueil" className="block py-2" onClick={closeMenu}>Accueil</a></li>
            <li><a href="/academie" className="block py-2" onClick={closeMenu}>Académie</a></li>
            <li><a href="/samedi-des-miracles" className="block py-2" onClick={closeMenu}>Samedi des Miracles</a></li>
            <li><a href="/priere-sans-cesse" className="block py-2" onClick={closeMenu}>Prière sans cesse</a></li>
            <li><a href="/offrandes" className="block py-2" onClick={closeMenu}>Offrandes</a></li>
          </ul>
          <button
            onClick={() => {
              closeMenu();
              // Ajouter ici la logique de navigation vers la page d'inscription
            }}
            className="w-full bg-blue-600 text-white py-3 rounded-lg mt-8 hover:bg-blue-700 transition"
          >
            Inscription
          </button>
        </div>
      </div>
    </nav>
  );
}

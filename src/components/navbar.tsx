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
    // Empêche le défilement de la page lorsque le menu est ouvert
    document.body.style.overflow = isOpen ? 'auto' : 'hidden';
  };

  // Ferme le menu lorsqu'on clique sur un lien
  const closeMenu = () => {
    setIsOpen(false);
    document.body.style.overflow = 'auto';
  };

  return (
    <nav
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        isScrolling
          ? "bg-white/95 shadow-lg backdrop-blur-sm"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
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
        </div>
        <div className="flex items-center gap-8">
          <ul
            className={`hidden items-center gap-8 lg:flex ${
              isScrolling ? "text-gray-900" : "text-white"
            } font-medium`}
          >
            <NavItem href="/accueil">Accueil</NavItem>
            <NavItem href="/academie">Académie</NavItem>
            <NavItem href="/samedi-des-miracles">Samedi des Miracles</NavItem>
            <NavItem href="/priere-sans-cesse">Prière sans cesse</NavItem>
            <NavItem href="/offrandes">Offrandes</NavItem>
          </ul>
          <div className="hidden gap-2 lg:flex lg:items-center">
            <button
              className={`p-2 rounded-lg ${isScrolling ? 'text-gray-700' : 'text-white'}`}
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
              </svg>
            </button>
            <button
              className={`p-2 rounded-lg ${isScrolling ? 'text-gray-700' : 'text-white'}`}
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
              </svg>
            </button>
            <button
              className={`p-2 rounded-lg ${isScrolling ? 'text-gray-700' : 'text-white'}`}
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM13.5 10.007a4.486 4.486 0 00-3.741 0A4.5 4.5 0 0113.5 2.25a4.5 4.5 0 014.5 4.5c0 1.74-.867 3.27-2.25 4.256.04.047.078.096.114.148.302.444.453 1.155.337 1.75c-.14.735-.694 1.27-1.405 1.27-.886 0-1.64-.627-1.787-1.45a4.5 4.5 0 01-.25-1.265.75.75 0 10-.5-.832 4.5 4.5 0 01-.2-1.265c.14-.736.694-1.27 1.405-1.27.884 0 1.64.627 1.785 1.45a.75.75 0 00.248.525v.025a4.501 4.501 0 01-2.04 1.43c-.48.035-.965.114-1.424.29a4.5 4.5 0 01-1.45-1.81c.534.02.995.315 1.357.62.45.384.616.988.526 1.57l-.02.216a.75.75 0 00.57 1.022c1.12.312 1.933 1.16 1.933 2.428 0 1.74-1.36 3.27-3.12 3.895a4.49 4.49 0 01-1.95-.44 4.49 4.49 0 01-.6 2.996v.05c0 2.076 1.267 3.89 3.04 3.89 3.314 0 5.23-2.904 5.23-6.69 0-3.023-1.95-5.72-5.003-6.64z" clipRule="evenodd" />
              </svg>
            </button>
            <button
              className={`text-sm font-medium ${isScrolling ? 'text-gray-700' : 'text-white'} hidden lg:inline-block`}
            >
              Connexion
            </button>
            <button
              className={`bg-blue-600 text-white px-4 py-2 rounded-lg hidden lg:inline-block ${isScrolling ? 'hover:bg-blue-700' : ''}`}
            >
              Inscription
            </button>
          </div>
        </div>
      </div>

      {/* Menu mobile */}
      <div 
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} 
        onClick={toggleMenu}
      ></div>
      
      <div 
        className={`fixed right-0 top-0 h-full w-full max-w-sm bg-white shadow-lg transform transition-transform duration-300 z-50 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
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
"use client"

import React from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Collapse } from "@material-tailwind/react";

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
  const [isScrolling, setIsScrolling] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolling(true);
      } else {
        setIsScrolling(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleOpen = () => setOpen(!open);

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
            onClick={handleOpen}
            className={`p-2 rounded-lg ${isScrolling ? 'text-gray-700' : 'text-white'}`}
          >
            {open ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <Bars3Icon className="h-6 w-6" />
            )}
          </button>
          <div className="flex items-center gap-4">
            <img 
              src="/image/logos/logo.jpg" 
              alt="Logo EDA" 
              className="h-10 w-auto"
            />
            <h1 className={`text-xl font-bold ${isScrolling ? 'text-gray-900' : 'text-white'} ml-2`}>
            <NavItem href="/">EDA</NavItem>
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
              <i className="fa-brands fa-twitter text-base" />
            </button>
            <button
              className={`p-2 rounded-lg ${isScrolling ? 'text-gray-700' : 'text-white'}`}
            >
              <i className="fa-brands fa-facebook-f text-base" />
            </button>
            <button
              className={`p-2 rounded-lg ${isScrolling ? 'text-gray-700' : 'text-white'}`}
            >
              <i className="fa-brands fa-instagram text-base" />
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
      <Collapse open={open}>
        <ul className="mt-8 flex flex-col gap-8 lg:hidden">
          <NavItem>Accueil</NavItem>
          <NavItem>Académie</NavItem>
          <NavItem>Samedi des Miracles</NavItem>
          <NavItem>Prière sans cesse</NavItem>
          <NavItem>Offrandes</NavItem>
          <button
            className={`w-full bg-blue-600 text-white py-2 rounded-lg ${isScrolling ? 'hover:bg-blue-700' : ''}`}
          >
            Inscription
          </button>
        </ul>
      </Collapse>
    </nav>
  );
}

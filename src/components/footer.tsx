"use client";
import React from "react";


export function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 text-gray-900">Eglise des Disciples Accomplis</h3>
            <p className="text-gray-600 mb-4">
              Une communauté chrétienne dédiée à l'enseignement biblique et au service.
            </p>
            <div className="flex gap-4">
              <a href="https://www.facebook.com/nationspourjesus" className="text-gray-600 hover:text-blue-600">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-gray-600 hover:text-blue-600">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </a>
              <a href="#" className="text-gray-600 hover:text-blue-600">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM13.5 10.007a4.486 4.486 0 00-3.741 0A4.5 4.5 0 0113.5 2.25a4.5 4.5 0 014.5 4.5c0 1.74-.867 3.27-2.25 4.256.04.047.078.096.114.148.302.444.453 1.155.337 1.75c-.14.735-.694 1.27-1.405 1.27-.886 0-1.64-.627-1.787-1.45a4.5 4.5 0 01-.25-1.265.75.75 0 10-.5-.832 4.5 4.5 0 01-.2-1.265c.14-.736.694-1.27 1.405-1.27.884 0 1.64.627 1.785 1.45a.75.75 0 00.248.525v.025a4.501 4.501 0 01-2.04 1.43c-.48.035-.965.114-1.424.29a4.5 4.5 0 01-1.45-1.81c.534.02.995.315 1.357.62.45.384.616.988.526 1.57l-.02.216a.75.75 0 00.57 1.022c1.12.312 1.933 1.16 1.933 2.428 0 1.74-1.36 3.27-3.12 3.895a4.49 4.49 0 01-1.95-.44 4.49 4.49 0 01-.6 2.996v.05c0 2.076 1.267 3.89 3.04 3.89 3.314 0 5.23-2.904 5.23-6.69 0-3.023-1.95-5.72-5.003-6.64z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="https://www.youtube.com/results?search_query=pasteur+hermann+tano" className="text-gray-600 hover:text-blue-600">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                </svg>
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4 text-gray-900">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <a href="/accueil" className="text-gray-600 hover:text-blue-600 transition-colors duration-200">Accueil</a>
              </li>
              <li>
                <a href="/academie" className="text-gray-600 hover:text-blue-600">Académie</a>
              </li>
              <li>
                <a href="/samedi-des-miracles" className="text-gray-600 hover:text-blue-600">Samedi des Miracles</a>
              </li>
              <li>
                <a href="/priere-sans-cesse" className="text-gray-600 hover:text-blue-600">Prière sans Cesse</a>
              </li>
              <li>
                <a href="/blog" className="text-gray-600 hover:text-blue-600">Actualités</a>
              </li>
              <li>
                <a href="/offrandes" className="text-gray-600 hover:text-blue-600">Offrandes</a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4 text-gray-900">Contact</h3>
            <ul className="space-y-2">
              <li>
                <a href="tel:+33123456789" className="text-gray-600 hover:text-blue-600 transition-colors duration-200 flex items-center">
                  <i className="fa-solid fa-phone me-2" />+33 1 23 45 67 89
                </a>
              </li>
              <li>
                <a href="mailto:contact@eglisedsa.fr" className="text-gray-600 hover:text-blue-600 transition-colors duration-200 flex items-center">
                  <i className="fa-solid fa-envelope me-2" />contact@eglisedsa.fr
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-200">
                  <i className="fa-solid fa-location-dot me-2" />Cocody boulevard latrille, Abidjan Côte d'Ivoire
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4 text-gray-900">Horaires</h3>
            <ul className="space-y-2">
              <li>
                <p className="text-gray-600">
                  <i className="fa-solid fa-clock me-2" />Culte du Dimanche : 10h00 - 12h00
                </p>
              </li>
              <li>
                <p className="text-gray-600">
                  <i className="fa-solid fa-clock me-2" />Groupe de Prière : 19h00 - 21h00
                </p>
              </li>
              <li>
                <p className="text-gray-600">
                  <i className="fa-solid fa-clock me-2" />Samedi des Miracles : 14h00 - 20h00
                </p>
              </li>
            </ul>
          </div>
        </div>
        <div className="pt-12 border-t border-gray-200">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-600">
              &copy; {new Date().getFullYear()} Eglise des Disciples Accomplis. Tous droits réservés.
            </p>
            <div className="flex gap-4">
              <a href="/mentions-legales" className="text-gray-600 hover:text-blue-600 transition-colors duration-200 text-sm">Mentions légales</a>
              <a href="/politique-confidentialite" className="text-gray-600 hover:text-blue-600">Politique de confidentialité</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

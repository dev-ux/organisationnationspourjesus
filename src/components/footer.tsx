"use client";
import React from "react";

export function Footer() {
  return (
    <footer className="bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Eglise des Disciples Accomplis</h3>
            <p className="text-gray-600 mb-4">
              Une communauté chrétienne dédiée à l'enseignement biblique et au service.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-600 hover:text-blue-600">
                <i className="fa-brands fa-facebook-f text-xl" />
              </a>
              <a href="#" className="text-gray-600 hover:text-blue-600">
                <i className="fa-brands fa-twitter text-xl" />
              </a>
              <a href="#" className="text-gray-600 hover:text-blue-600">
                <i className="fa-brands fa-instagram text-xl" />
              </a>
              <a href="#" className="text-gray-600 hover:text-blue-600">
                <i className="fa-brands fa-youtube text-xl" />
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <a href="/accueil" className="text-gray-600 hover:text-blue-600">Accueil</a>
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
                <a href="/offrandes" className="text-gray-600 hover:text-blue-600">Offrandes</a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li>
                <a href="tel:+33123456789" className="text-gray-600 hover:text-blue-600">
                  <i className="fa-solid fa-phone me-2" />+33 1 23 45 67 89
                </a>
              </li>
              <li>
                <a href="mailto:contact@eglisedsa.fr" className="text-gray-600 hover:text-blue-600">
                  <i className="fa-solid fa-envelope me-2" />contact@eglisedsa.fr
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-blue-600">
                  <i className="fa-solid fa-location-dot me-2" />123 Rue de l'Église, 75000 Paris
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Horaires</h3>
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
        <div className="pt-12 border-t border-gray-100">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-600">
              &copy; {new Date().getFullYear()} Eglise des Disciples Accomplis. Tous droits réservés.
            </p>
            <div className="flex gap-4">
              <a href="/mentions-legales" className="text-gray-600 hover:text-blue-600">Mentions légales</a>
              <a href="/politique-confidentialite" className="text-gray-600 hover:text-blue-600">Politique de confidentialité</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

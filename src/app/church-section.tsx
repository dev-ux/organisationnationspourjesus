"use client";

import React from "react";
import Image from "next/image";

export default function ChurchSection() {
  return (
    <div className="bg-gray-50 py-16 sm:py-24 lg:hidden">
      <div className="px-6">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Notre Communauté Spirituelle
          </h2>
          <p className="mt-2 text-sm leading-6 text-gray-600">
            Rejoignez notre communauté dévouée et expérimentez la transformation spirituelle.
          </p>
        </div>
        
        <div className="overflow-x-auto">
          <div className="flex gap-4 pb-4" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            <style jsx>{`
              div::-webkit-scrollbar {
                display: none;
              }
            `}</style>
            
            {/* Card 1 - Célébrations */}
            <div className="flex-shrink-0 w-80">
              <div className="relative overflow-hidden rounded-2xl bg-white p-6 h-full">
                <div className="absolute inset-0 -m-1 bg-gradient-to-r from-indigo-900/50 to-indigo-800/50 rounded-2xl blur-3xl" />
                <div className="relative">
                  <div className="flex items-center gap-x-3 mb-6">
                    <div className="flex-none rounded-lg bg-indigo-100 p-2">
                      <svg className="h-5 w-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="text-base font-semibold leading-7 tracking-tight text-gray-900">
                      Horaires des Cultes
                    </h3>
                  </div>
                  <div className="space-y-3">
                    <div className="bg-indigo-50 p-3 rounded-lg">
                      <p className="font-medium text-indigo-900 text-sm">Culte Dominical</p>
                      <p className="text-xs text-indigo-800">Tous les dimanches</p>
                      <p className="text-xs text-indigo-700">15h00 - 19h00</p>
                    </div>
                    <div className="mt-3">
                      <p className="font-medium text-gray-900 text-sm">Lieu</p>
                      <p className="text-xs text-gray-700">Temple "YAHWEH SABAOTH"</p>
                      <p className="text-xs text-gray-600">Abobo Belle Ville</p>
                      <p className="text-xs text-gray-500 mt-1">Vers L'École Primaire Sainte Marie, à 500 mètres du Commissariat du 40ème Arrondissement</p>
                    </div>
                    <div className="mt-3">
                      <button className="inline-flex items-center justify-center rounded-md bg-indigo-600 px-3 py-2 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                        <svg className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        Voir sur la carte
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="flex-shrink-0 w-80">
              <div className="relative overflow-hidden rounded-2xl bg-white p-6 h-full">
                <div className="absolute inset-0 -m-1 bg-gradient-to-r from-gray-900/50 to-gray-800/50 rounded-2xl blur-3xl" />
                <div className="relative">
                  <div className="flex items-center gap-x-3 mb-6">
                    <div className="flex-none rounded-lg bg-indigo-50 p-2">
                      <svg className="h-5 w-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a4.125 4.125 0 00-7.5-0v2.625c0 .621.504 1.125 1.125 1.125h2.25a2.25 2.25 0 002.25-2.25V8.25m-9 4.5h7.5M7.5 21h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25z" />
                      </svg>
                    </div>
                    <h3 className="text-base font-semibold leading-7 tracking-tight text-gray-900">
                      Formation Spirituelle
                    </h3>
                  </div>
                  <p className="text-xs leading-5 text-gray-600">
                    Découvrez nos programmes de formation spirituelle conçus pour approfondir votre compréhension de la foi.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="flex-shrink-0 w-80">
              <div className="relative overflow-hidden rounded-2xl bg-white p-6 h-full">
                <div className="absolute inset-0 -m-1 bg-gradient-to-r from-gray-900/50 to-gray-800/50 rounded-2xl blur-3xl" />
                <div className="relative">
                  <div className="flex items-center gap-x-3 mb-6">
                    <div className="flex-none rounded-lg bg-indigo-50 p-2">
                      <svg className="h-5 w-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                      </svg>
                    </div>
                    <h3 className="text-base font-semibold leading-7 tracking-tight text-gray-900">
                      Service Communautaire
                    </h3>
                  </div>
                  <p className="text-xs leading-5 text-gray-600">
                    Engagez-vous dans notre service communautaire et contribuez à la transformation de votre quartier.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

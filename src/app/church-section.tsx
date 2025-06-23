"use client";

import React from "react";
import Image from "next/image";

export default function ChurchSection() {
  return (
    <div className="bg-gray-50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Notre Communauté Spirituelle
          </h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            Rejoignez notre communauté dévouée et expérimentez la transformation spirituelle.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <div className="grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
            {/* Image */}
            <div className="relative aspect-[7/5] rounded-2xl bg-gray-900 overflow-hidden">
              <Image
                src="/image/onj3.jpg"
                alt="Eglise des Disciples Accomplis"
                fill
                className="object-cover"
                priority
              />
            </div>
            
            {/* Card 1 */}
            <div className="relative overflow-hidden rounded-2xl bg-white p-8 sm:p-10">
              <div className="absolute inset-0 -m-1 bg-gradient-to-r from-gray-900/50 to-gray-800/50 rounded-2xl blur-3xl" />
              <div className="relative">
                <div className="flex items-center gap-x-4 mb-8">
                  <div className="flex-none rounded-lg bg-indigo-50 p-3">
                    <svg className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold leading-8 tracking-tight text-gray-900">
                    Célébrations
                  </h3>
                </div>
                <p className="text-sm leading-6 text-gray-600">
                  Participez à nos célébrations hebdomadaires et spéciales pour nourrir votre foi et votre communauté spirituelle.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="relative overflow-hidden rounded-2xl bg-white p-8 sm:p-10">
              <div className="absolute inset-0 -m-1 bg-gradient-to-r from-gray-900/50 to-gray-800/50 rounded-2xl blur-3xl" />
              <div className="relative">
                <div className="flex items-center gap-x-4 mb-8">
                  <div className="flex-none rounded-lg bg-indigo-50 p-3">
                    <svg className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a4.125 4.125 0 00-7.5-0v2.625c0 .621.504 1.125 1.125 1.125h2.25a2.25 2.25 0 002.25-2.25V8.25m-9 4.5h7.5M7.5 21h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold leading-8 tracking-tight text-gray-900">
                    Formation Spirituelle
                  </h3>
                </div>
                <p className="text-sm leading-6 text-gray-600">
                  Découvrez nos programmes de formation spirituelle conçus pour approfondir votre compréhension de la foi.
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="relative overflow-hidden rounded-2xl bg-white p-8 sm:p-10">
              <div className="absolute inset-0 -m-1 bg-gradient-to-r from-gray-900/50 to-gray-800/50 rounded-2xl blur-3xl" />
              <div className="relative">
                <div className="flex items-center gap-x-4 mb-8">
                  <div className="flex-none rounded-lg bg-indigo-50 p-3">
                    <svg className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold leading-8 tracking-tight text-gray-900">
                    Service Communautaire
                  </h3>
                </div>
                <p className="text-sm leading-6 text-gray-600">
                  Engagez-vous dans notre service communautaire et contribuez à la transformation de votre quartier.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import React from "react";
import Image from "next/image";

const departments = [
  {
    title: "Service Médiatique",
    description: "Gestion des médias et communication de l'église",
    icon: "tv",
    image: "/image/mediatic.jpg"
  },
  {
    title: "Service d'Intercession",
    description: "Présidence des prières et intercession pour la communauté",
    icon: "prayer",
    image: "/image/intercession.jpg"
  },
  {
    title: "Service d'Ordre",
    description: "Maintien de l'ordre et sécurité lors des célébrations",
    icon: "security",
    image: "/image/order.jpg"
  },
  {
    title: "Service Protocole",
    description: "Organisation des événements et cérémonies officielles",
    icon: "protocol",
    image: "/image/protocol.jpg"
  },
  {
    title: "Collège des Diacres",
    description: "Assistance spirituelle et administrative",
    icon: "deacons",
    image: "/image/deacons.jpg"
  },
  {
    title: "Collège des Pasteurs",
    description: "Direction spirituelle et enseignement",
    icon: "pastors",
    image: "/image/pastors.jpg"
  }
];

export default function Departments() {
  return (
    <div className="py-16 sm:py-24 lg:hidden">
      <div className="px-6">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Nos Départements
          </h2>
          <p className="mt-2 text-sm leading-6 text-gray-600">
            Découvrez les différents services qui font fonctionner notre église
          </p>
        </div>
        
        <div className="overflow-x-auto">
          <div className="flex gap-4 pb-4" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            <style jsx>{`
              div::-webkit-scrollbar {
                display: none;
              }
            `}</style>
            {departments.map((department) => (
              <div key={department.title} className="flex-shrink-0 w-80">
                <div className="relative overflow-hidden rounded-2xl bg-white p-6 h-full">
                  <div className="absolute inset-0 -m-1 bg-gradient-to-r from-gray-900/50 to-gray-800/50 rounded-2xl blur-3xl" />
                  <div className="relative">
                    <div className="flex items-center gap-x-3 mb-6">
                      <div className="flex-none rounded-lg bg-indigo-50 p-2">
                        <svg className="h-5 w-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <h3 className="text-base font-semibold leading-7 tracking-tight text-gray-900">
                        {department.title}
                      </h3>
                    </div>
                    <p className="text-xs leading-5 text-gray-600 mb-4">
                      {department.description}
                    </p>
                    <div>
                      <Image
                        src={department.image}
                        alt={department.title}
                        width={280}
                        height={180}
                        className="object-cover rounded-lg w-full"
                        priority
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

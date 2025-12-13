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

export default function DepartmentsDesktop() {
  return (
    <div className="py-24 sm:py-32 hidden lg:block">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Nos Départements
          </h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            Découvrez les différents services qui font fonctionner notre église
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <div className="grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
            {departments.map((department) => (
              <div key={department.title} className="relative overflow-hidden rounded-2xl bg-white p-8 sm:p-10">
                <div className="absolute inset-0 -m-1 bg-gradient-to-r from-gray-900/50 to-gray-800/50 rounded-2xl blur-3xl" />
                <div className="relative">
                  <div className="flex items-center gap-x-4 mb-8">
                    <div className="flex-none rounded-lg bg-indigo-50 p-3">
                      <svg className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold leading-8 tracking-tight text-gray-900">
                      {department.title}
                    </h3>
                  </div>
                  <p className="text-sm leading-6 text-gray-600">
                    {department.description}
                  </p>
                  <div className="mt-6">
                    <Image
                      src={department.image}
                      alt={department.title}
                      width={300}
                      height={200}
                      className="object-cover rounded-lg"
                      priority
                    />
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

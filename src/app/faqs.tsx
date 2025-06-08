"use client";

import React from "react";

const FAQS = [
  {
    title: "Quand sont les cultes principaux ?",
    desc: "Les cultes principaux ont lieu tous les dimanches à 10h30.",
  },
  {
    title: "Comment rejoindre un ministère ?",
    desc: "Contactez notre responsable des ministères pour plus d'informations.",
  },
  {
    title: "Y a-t-il des groupes de prière ?",
    desc: "Oui, nous organisons des groupes de prière réguliers.",
  },
  {
    title: "Comment participer aux études bibliques ?",
    desc: "Les études bibliques sont ouvertes à tous les membres.",
  }
];

export function Faqs() {
  return (
    <section className="px-8 py-20">
      <div className="container max-w-6xl mx-auto">
       

        <div className="grid gap-20 md:grid-cols-1 lg:grid-cols-3">
          {FAQS.map((item) => (
            <div key={item.title} className="bg-white rounded-lg shadow-sm p-6">
              <h4 className="text-xl font-semibold text-blue-gray-900 mb-2">
                {item.title}
              </h4>
              <p className="text-gray-500">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Faqs;

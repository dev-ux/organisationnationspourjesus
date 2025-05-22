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
  },
  {
    title: "How can I upgrade my account to paid?",
    desc: "To upgrade your account, log in and navigate to the [Upgrade Account] section in your dashboard. Follow the prompts to select your preferred plan.",
  },
  {
    title: "What if I need help or have technical issues?",
    desc: "Our dedicated support team is here to assist you. Reach out via [mention preferred support channels, e.g., live chat, email, or phone], and we'll get back to you promptly.",
  },
];

export function Faqs() {
  return (
    <section className="px-8 py-20">
      <div className="container max-w-6xl mx-auto">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-blue-gray-900 mb-4">
            Frequently asked questions
          </h1>
          <p className="mx-auto mb-24 text-gray-500 lg:w-3/5">
            A lot of people don't appreciate the moment until it's
            passed. I'm not trying my hardest, and I'm not trying to
            do
          </p>
        </div>

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

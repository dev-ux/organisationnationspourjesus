"use client";

import React from "react";
import { Card, CardBody, Avatar } from "@material-tailwind/react";
import { UserIcon } from "@heroicons/react/24/solid";
import TestimonialCard from "../components/testimonial-card";


const TESTIMONIALS = [
  {
    feedback:
      "L'EDA a transformé ma vie spirituelle. Les enseignements approfondis et la communauté de soutien m'ont aidé à grandir dans ma foi.",
    client: "Marie Dupont",
    title: "Membre depuis 5 ans",
    img: "/image/avatar1.jpg",
  },
  {
    feedback:
      "Les ministères de l'EDA ont touché profondément ma famille. Nous avons trouvé un véritable refuge spirituel ici.",
    client: "Jean Martin",
    title: "Chef de famille",
    img: "/image/avatar2.jpg",
  },
  {
    feedback:
      "Les jeunes de l'EDA sont inspirants. Le programme de jeunesse offre un excellent cadre pour grandir dans la foi.",
    client: "Sophie Bernard",
    title: "Jeune adulte",
    img: "/image/avatar3.jpg",
  },
];

export function Testimonials() {
  return (
    <section className="px-10 !py-20">
      <div className="container mx-auto">
        <div className="mb-20 flex w-full flex-col items-center">
          <div className="mb-10 flex h-12 w-12 items-center justify-center rounded-lg bg-gray-900 text-white ">
            <UserIcon className="h-6 w-6" />
          </div>
          <h2 className="text-blue-gray-900 mb-2">
            What Clients Say
          </h2>
          <p className="mb-10 max-w-3xl text-center text-gray-600">
            Discover what our valued clients have to say about their experiences
            with our services. We take pride in delivering exceptional results
            and fostering lasting partnerships.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-3 lg:px-20">
          {TESTIMONIALS.map((props, key) => (
            <TestimonialCard key={key} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
export default Testimonials;

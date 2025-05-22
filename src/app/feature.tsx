"use client";

import React from "react";

import {
  CursorArrowRaysIcon,
  HeartIcon,
  LightBulbIcon,
  LockClosedIcon,
} from "@heroicons/react/24/solid";

import FeatureCard from "../components/feature-card";

const FEATURES = [
  {
    icon: HeartIcon,
    title: "Communauté Chrétienne",
    children:
      "Une communauté de croyants engagés qui s'entraident et se soutiennent mutuellement dans leur foi.",
  },
  {
    icon: LockClosedIcon,
    title: "Enseignement Biblique",
    children:
      "Des études bibliques approfondies et des enseignements spirituels réguliers pour nourrir votre foi.",
  },
  {
    icon: LightBulbIcon,
    title: "Ministères Actifs",
    children:
      "Des ministères variés qui touchent toutes les facettes de la vie chrétienne et servent la communauté.",
  },
  {
    icon: CursorArrowRaysIcon,
    title: "Jeunesse et Famille",
    children:
      "Des programmes spécifiques pour les enfants, les jeunes et les familles pour grandir ensemble dans la foi.",
  },
];

export function Features() {
  return (
    <section className="py-28 px-4">
      <div className="container mx-auto mb-20 text-center">
        <h2 className="text-blue-gray-900 mb-2 font-bold uppercase">
          Features
        </h2>
        <h1 className="text-blue-gray-900 mb-4">
          Why Choose Us
        </h1>
        <p className="mx-auto w-full px-4 text-gray-500 lg:w-11/12 lg:px-8 text-lg leading-relaxed">
          Access your learning materials on the go. Whether you&apos;re
          commuting, waiting for a friend, or just have a few minutes to spare,
          our app fits seamlessly into your busy life.
        </p>
      </div>
      <div className="container mx-auto grid max-w-6xl grid-cols-1 gap-4 gap-y-12 md:grid-cols-2">
        {FEATURES.map((props, idx) => (
          <FeatureCard key={idx} {...props} />
        ))}
      </div>
    </section>
  );
}
export default Features;

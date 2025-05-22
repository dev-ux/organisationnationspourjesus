"use client";

import Image from "next/image";
import { Button } from "@material-tailwind/react";
import React from 'react';
import Carousel from '@/components/carousel';

const images = [
  '/image/eglise.jpg',
  '/image/culte.jpg',
  '/image/priere.jpg',
  '/image/communaute.jpg'
];

function Hero() {
  return (
    <div className="relative min-h-screen w-full">
      <Carousel images={images} />
      <div className="absolute inset-0 bg-black/30"></div>
      <div className="relative">
        <header className="grid !min-h-[49rem] bg-gray-900 px-8">
          <div className="container mx-auto mt-32 grid h-full w-full grid-cols-1 place-items-center lg:mt-14 lg:grid-cols-2">
            <div className="col-span-1">
              <h1 className="text-white mb-4">
                Eglise des Disciples Accomplis <br /> EDA
              </h1>
              <p className="text-white mb-7 md:pr-16 xl:pr-28">
                Rejoignez notre communauté de disciples dévoués, où la foi et
                l'accomplissement spirituel sont notre priorité.
              </p>
              <h6 className="text-white mb-4">
                Découvrez notre communauté
              </h6>
              <div className="flex flex-col gap-2 md:mb-2 md:w-10/12 md:flex-row">
                <button
                  className="flex items-center justify-center gap-3 px-6 py-3 bg-white rounded-lg text-gray-900 hover:bg-gray-100 transition-colors"
            <p className="text-white mb-7 md:pr-16 xl:pr-28">
              Rejoignez notre communauté de disciples dévoués, où la foi et
              l'accomplissement spirituel sont notre priorité.
            </p>
            <h6 className="text-white mb-4">
              Découvrez notre communauté
            </h6>
            <div className="flex flex-col gap-2 md:mb-2 md:w-10/12 md:flex-row">
              <button
                className="flex items-center justify-center gap-3 px-6 py-3 bg-white rounded-lg text-gray-900 hover:bg-gray-100 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
                App Store
              </button>
              <button
                className="flex items-center justify-center gap-3 px-6 py-3 bg-white rounded-lg text-gray-900 hover:bg-gray-100 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                Play Store
              </button>
            </div>
          </div>
          <Image
            width={470}
            height={576}
            src="/image/iphones.png"
            alt="team work"
            className="col-span-1 my-20 h-full max-h-[30rem] -translate-y-32 md:max-h-[36rem] lg:my-0 lg:ml-auto lg:max-h-[40rem] lg:translate-y-0"
          />
        </div>
      </header>
      <div className="mx-8 lg:mx-16 -mt-24 rounded-xl bg-white p-5 md:p-14 shadow-md">
        <div>
          <h2 className="text-blue-gray-700 text-2xl font-bold mb-3">
            Learning App
          </h2>
          <p className="text-gray-500 font-normal lg:w-5/12">
            Download our app to dive into a vast library of courses, tutorials,
            and study materials on a wide range of subjects - from programming
            and language learning to personal development and beyond
          </p>
        </div>
      </div>
    </div>
  );
}
export default Hero;

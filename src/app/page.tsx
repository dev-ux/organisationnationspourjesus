'use client';

// components
import { Navbar, Footer } from "@/components";
import { ClientFirstVisitModal } from "./client-components";
import EventCard from "@/components/EventCard";
import dynamic from 'next/dynamic';

// Import dynamique pour éviter les problèmes de SSR avec les modaux
const WorshipInfoModal = dynamic(
  () => import('@/components/WorshipInfoModal'),
  { ssr: false }
);

// sections
import Hero from "./hero";
import VideoIntro from "./video-intro";
import Feature from "./feature";
import ChurchSection from "./church-section";
import Testimonials from "./testimonials";
import Faqs from "./faqs";
import Departments from "./departments";
import BlogSection from "./blog-section";
import { ClientPastorMessage } from "./client-components";
import FacebookVideoEmbed from "@/components/FacebookVideoEmbed";

export default function Campaign() {
  return (
    <>
      <ClientFirstVisitModal />
      <WorshipInfoModal />
      <Navbar />

      <Navbar />

      <Hero />
      <ClientPastorMessage />

      {/* Événement - Ouverture de l'église */}
      <div className="max-w-4xl mx-auto my-8">
       
      </div>

      <VideoIntro />
      <Feature />
      <FacebookVideoEmbed />
      <ChurchSection />
      {/* <Testimonials /> */}
      <Departments />
      <BlogSection />
      <Faqs />

    </>
  );
}

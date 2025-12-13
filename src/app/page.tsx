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

// Import dynamique pour le composant serveur
const BlogSectionServer = dynamic(
  () => import('@/components/server/BlogSectionServer'),
  { ssr: true, loading: () => <div className="py-24 text-center">Chargement des actualités...</div> }
);

const BlogSectionDesktopServer = dynamic(
  () => import('@/components/server/BlogSectionDesktopServer'),
  { ssr: true, loading: () => <div className="py-24 text-center">Chargement des actualités...</div> }
);

// sections
import Hero from "./hero";
import VideoIntro from "./video-intro";
import Feature from "./feature";
import ChurchSection from "./church-section";
import ChurchSectionDesktop from "./church-section-desktop";
// import Testimonials from "./testimonials";
import Faqs from "./faqs";
import Departments from "./departments";
import DepartmentsDesktop from "./departments-desktop";
import { ClientPastorMessage } from "./client-components";
import AppBanner from "@/components/AppBanner";

export default function Campaign() {
  return (
    <>
      <ClientFirstVisitModal />
      <Navbar />
      <Navbar />
      <Hero />
      <ClientPastorMessage />
      <VideoIntro />
      <Feature />
      <ChurchSection />
      <ChurchSectionDesktop />
      {/* <Testimonials />  */}
      <Departments />
      <DepartmentsDesktop />
      <BlogSectionServer />
      <BlogSectionDesktopServer />
      <AppBanner />
      <Faqs />
    </>
  );
}

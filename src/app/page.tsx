'use client';

// components
import { Navbar, Footer } from "@/components";
import { ClientFirstVisitModal } from "./client-components";
import EventCard from "@/components/EventCard";

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

export default function Campaign() {
  return (
    <>
      <ClientFirstVisitModal />
      <Navbar />

      <Navbar />

      <Hero />
      <ClientPastorMessage />

      {/* Nouvel événement - Ouverture de l'église */}
      <div className="max-w-4xl mx-auto my-8">
        <EventCard
          title="Ouverture de l'Église Prophétique l'Armée Divine"
          description="Nous sommes heureux de vous inviter à l'inauguration de notre nouvelle église. Une cérémonie spéciale qui marquera le début d'une nouvelle ère de louange et de prière."
          imageUrl="/images/church-opening.jpg"
          eventDate={new Date('2025-07-20T15:00:00')}
        />
      </div>

      <VideoIntro />
      <Feature />
      <ChurchSection />
      {/* <Testimonials /> */}
      <Departments />
      <BlogSection />
      <Faqs />

    </>
  );
}

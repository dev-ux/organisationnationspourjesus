// components
import { Navbar, Footer } from "@/components";
import { ClientFirstVisitModal } from "./client-components";

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
      <VideoIntro />
      <Feature />
      <ChurchSection />
      {/* <Testimonials /> */}
      <Faqs />
      <Departments />
      <BlogSection />
    </>
  );
}

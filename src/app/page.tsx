// components
import { Navbar, Footer } from "@/components";

// sections
import Hero from "./hero";
import VideoIntro from "./video-intro";
import Feature from "./feature";
import ChurchSection from "./church-section";
import Testimonials from "./testimonials";
import Faqs from "./faqs";
import Departments from "./departments";
import BlogSection from "./blog-section";

export default function Campaign() {
  return (
    <>
      <Navbar />
      <VideoIntro />
      <Feature />
      <ChurchSection />
      <Testimonials />
      <Departments />
      <BlogSection />
      <Faqs />
    </>
  );
}

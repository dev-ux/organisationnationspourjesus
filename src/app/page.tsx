// components
import { Navbar, Footer } from "@/components";
import FirstVisitModal from "@/components/FirstVisitModal";

// sections
import Hero from "./hero";
import VideoIntro from "./video-intro";
import Feature from "./feature";
import ChurchSection from "./church-section";
import Testimonials from "./testimonials";
import Faqs from "./faqs";
import Departments from "./departments";
import BlogSection from "./blog-section";
import PastorMessage from "@/components/pastor-message";

export default function Campaign() {
  return (
    <>
      <FirstVisitModal videoUrls={[
        "https://www.facebook.com/pasteurhermanntano/videos/651434039959985",
        "https://www.facebook.com/pasteurhermanntano/videos/725174849362205",
        "https://www.facebook.com/pasteurhermanntano/videos/670268458970941",
        "https://www.facebook.com/pasteurhermanntano/videos/725174849362205",
        "https://www.facebook.com/pasteurhermanntano/videos/651434039959985",
        "https://www.facebook.com/pasteurhermanntano/videos/670268458970941",
        "https://www.facebook.com/pasteurhermanntano/videos/725174849362205"
      ]} />
      <Navbar />

      <Hero />
      <PastorMessage />
      <VideoIntro />
      <Feature />
      <ChurchSection />
      <Departments />
      <BlogSection />
      <Faqs />
    </>
  );
}

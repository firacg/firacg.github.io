import { useEffect } from "react";
import { useLocation } from "@tanstack/react-router";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import BeforeAfter from "@/components/BeforeAfter";
import BestWorks from "@/components/BestWorks";
import Gallery from "@/components/Gallery";
import CVTimeline from "@/components/CVTimeline";
import SocialContact from "@/components/SocialContact";

const IndexPage = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      document.querySelector(`#${location.hash}`)?.scrollIntoView({ behavior: "smooth" });
    }
  }, [location.hash]);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navigation />
      <section id="home">
        <Hero />
      </section>
      <section id="process">
        <BeforeAfter />
      </section>
      <section id="featured">
        <BestWorks />
      </section>
      <section id="gallery">
        <Gallery />
      </section>
      <section id="timeline">
        <CVTimeline />
      </section>
      <section id="contact">
        <SocialContact />
      </section>
    </div>
  );
};

export default IndexPage;

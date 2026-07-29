import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { profile } from "@/data/profile";
import avatar from "@/assets/avatar.jpg";
import heroArt from "@/assets/before-after.jpg";

const scrollTo = (href: string) => {
  document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
};

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Hero art — the one slow cinematic motion on the whole site */}
      <div className="absolute inset-0">
        <img
          src={heroArt}
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover opacity-30 [animation:hero-zoom_18s_ease-in-out_infinite_alternate]"
        />
        <div className="absolute inset-0 bg-background/70" />
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <div className="animate-fade-up">
          <img
            src={avatar}
            alt={profile.name}
            className="w-24 h-24 rounded-full object-cover mx-auto mb-6 border border-border"
          />
          <h1 className="font-display text-5xl md:text-7xl font-extrabold uppercase tracking-tight mb-6 text-foreground">
            {profile.name}
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-2 max-w-2xl mx-auto">
            {profile.pitch}
          </p>
          <p className="text-base text-muted-foreground/80 mb-8">
            {profile.title} · {profile.location}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button variant="magical" size="lg" onClick={() => scrollTo("#gallery")}>
              View Portfolio
            </Button>
            <Button variant="mystic" size="lg" onClick={() => scrollTo("#contact")}>
              Commission Work
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronDown className="w-8 h-8 text-primary" />
      </div>
    </section>
  );
};

export default Hero;

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { profile } from "@/data/profile";
import avatar from "@/assets/avatar.jpg";

const scrollTo = (href: string) => {
  document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
};

interface Particle {
  left: number;
  top: number;
  delay: number;
  duration: number;
}

const Hero = () => {
  // Generated client-side only (post-mount) so SSR and the first client
  // render match exactly — random values in render would otherwise cause a
  // React hydration mismatch.
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    setParticles(
      Array.from({ length: 20 }, () => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        delay: Math.random() * 6,
        duration: 4 + Math.random() * 4,
      })),
    );
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-mystical opacity-80"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.1),transparent_70%)]"></div>

      {/* Floating magical particles */}
      <div className="absolute inset-0 overflow-hidden">
        {particles.map((particle, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-primary rounded-full animate-float opacity-30"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              animationDelay: `${particle.delay}s`,
              animationDuration: `${particle.duration}s`,
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <div className="animate-fade-up">
          <img
            src={avatar}
            alt={profile.name}
            className="w-24 h-24 rounded-full object-cover mx-auto mb-6 border-2 border-primary shadow-magical"
          />
          <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-magical bg-clip-text text-transparent">
            {profile.name}
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-2 max-w-2xl mx-auto">
            {profile.pitch}
          </p>
          <p className="text-base text-muted-foreground/80 mb-8">
            {profile.title} · {profile.location}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              variant="magical"
              size="lg"
              className="animate-magical-glow"
              onClick={() => scrollTo("#gallery")}
            >
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

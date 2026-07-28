import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFeaturedWorks } from "@/hooks/useWorks";

const BestWorks = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { works: bestWorks, isLoading } = useFeaturedWorks();

  if (isLoading || bestWorks.length === 0) {
    return null;
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % bestWorks.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + bestWorks.length) % bestWorks.length);
  };

  return (
    <section className="py-20 px-6 bg-gradient-shadow">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">Featured Work</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A curated selection from Plarium's Throne: Kingdom at War and Vikings: War of Clans,
            plus personal work
          </p>
        </div>

        <div className="relative">
          {/* Main carousel */}
          <div className="relative overflow-hidden rounded-2xl border border-border shadow-deep">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {bestWorks.map((work, index) => (
                <div key={work.id} className="w-full flex-shrink-0">
                  <div className="relative aspect-[16/9] md:aspect-[21/9] bg-card">
                    <img src={work.image} alt={work.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                    {/* Content overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                      <div className="max-w-4xl">
                        <span className="inline-block px-3 py-1 bg-primary/20 text-primary text-sm font-medium rounded-full mb-4 border border-primary/30">
                          {work.project}
                        </span>
                        <h3 className="text-3xl md:text-5xl font-bold mb-4 text-white capitalize">
                          {work.title}
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation buttons */}
          <Button
            variant="mystic"
            size="icon"
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 opacity-80 hover:opacity-100"
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>
          <Button
            variant="mystic"
            size="icon"
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 opacity-80 hover:opacity-100"
          >
            <ChevronRight className="w-6 h-6" />
          </Button>

          {/* Dots indicator */}
          <div className="flex justify-center space-x-3 mt-6">
            {bestWorks.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? "bg-primary shadow-magical scale-125"
                    : "bg-muted hover:bg-primary/50"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BestWorks;

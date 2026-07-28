import { useState } from "react";
import beforeAfterImage from "@/assets/before-after.jpg";

const BeforeAfter = () => {
  const [sliderPosition, setSliderPosition] = useState(50);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSliderPosition(Number(e.target.value));
  };

  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">Creative Process</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            From rough sketch to finished illustration
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="relative overflow-hidden rounded-lg border border-border shadow-deep">
            {/* Image container */}
            <div className="relative aspect-[2/1] bg-card">
              <img
                src={beforeAfterImage}
                alt="Artwork transformation"
                className="w-full h-full object-cover"
              />

              {/* Slider overlay */}
              <div
                className="absolute top-0 right-0 bottom-0 bg-black/20 transition-all duration-150"
                style={{ width: `${100 - sliderPosition}%` }}
              />

              {/* Slider line */}
              <div
                className="absolute top-0 bottom-0 w-1 bg-primary shadow-magical transition-all duration-150 z-10"
                style={{ left: `${sliderPosition}%` }}
              >
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-primary rounded-full shadow-magical border-2 border-primary-foreground flex items-center justify-center">
                  <div className="w-3 h-3 bg-primary-foreground rounded-full"></div>
                </div>
              </div>
            </div>

            {/* Labels */}
            <div className="absolute top-4 left-4 bg-card/80 backdrop-blur-sm px-3 py-1 rounded-md border border-border">
              <span className="text-sm font-medium">Before</span>
            </div>
            <div className="absolute top-4 right-4 bg-card/80 backdrop-blur-sm px-3 py-1 rounded-md border border-border">
              <span className="text-sm font-medium">After</span>
            </div>
          </div>

          {/* Slider control */}
          <div className="mt-6">
            <input
              type="range"
              min="0"
              max="100"
              value={sliderPosition}
              onChange={handleSliderChange}
              className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer slider"
              style={{
                background: `linear-gradient(to right, hsl(var(--primary)) 0%, hsl(var(--primary)) ${sliderPosition}%, hsl(var(--secondary)) ${sliderPosition}%, hsl(var(--secondary)) 100%)`,
              }}
            />
          </div>
        </div>
      </div>

      <style>
        {`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: hsl(var(--primary));
          box-shadow: 0 0 10px hsl(var(--primary) / 0.5);
          cursor: pointer;
          border: 2px solid hsl(var(--primary-foreground));
        }
        
        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: hsl(var(--primary));
          box-shadow: 0 0 10px hsl(var(--primary) / 0.5);
          cursor: pointer;
          border: 2px solid hsl(var(--primary-foreground));
        }
        `}
      </style>
    </section>
  );
};

export default BeforeAfter;

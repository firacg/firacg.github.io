import { Calendar, MapPin, Award } from "lucide-react";
import { experience } from "@/data/profile";

const CVTimeline = () => {
  return (
    <section className="py-20 px-6 bg-gradient-shadow">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">Experience</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Game art, character design and concept development for game dev studios
          </p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-transparent"></div>

          {/* Timeline items */}
          <div className="space-y-12">
            {experience.map((item, index) => (
              <div key={index} className="relative flex items-start group">
                {/* Timeline dot */}
                <div
                  className={`relative z-10 flex items-center justify-center w-16 h-16 rounded-full border-4 border-primary shadow-magical ${
                    item.type === "work" ? "bg-primary" : "bg-mystical-purple"
                  } group-hover:scale-110 transition-transform duration-300`}
                >
                  <div className="text-primary-foreground">
                    {item.type === "work" ? (
                      <Award className="w-5 h-5" />
                    ) : (
                      <Calendar className="w-5 h-5" />
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="ml-8 flex-1">
                  <div className="bg-card border border-border rounded-xl p-6 shadow-deep hover:shadow-magical transition-all duration-300 group-hover:scale-[1.02]">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                      <div>
                        <h3 className="text-xl font-bold text-foreground">{item.title}</h3>
                        <p className="text-primary font-semibold">{item.company}</p>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-2 md:mt-0">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {item.year}
                        </div>
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          {item.location}
                        </div>
                      </div>
                    </div>
                    {item.description && (
                      <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CVTimeline;

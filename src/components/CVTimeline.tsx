import { Calendar, MapPin, Award } from "lucide-react";
import { experience, profile } from "@/data/profile";
import aboutPhoto from "@/assets/about-photo.jpg";

const CVTimeline = () => {
  return (
    <section className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        {/* About */}
        <div className="mb-16 flex flex-col sm:flex-row items-center sm:items-start gap-6 rounded-xl border border-border bg-card p-6 sm:p-8">
          <img
            src={aboutPhoto}
            alt={profile.fullName}
            className="w-24 h-24 rounded-full object-cover border border-border flex-shrink-0"
          />
          <div className="text-center sm:text-left">
            <h3 className="font-display text-lg font-extrabold uppercase tracking-tight text-foreground mb-1">
              {profile.fullName}
            </h3>
            <p className="text-sm text-primary mb-3">
              {profile.title} · {profile.location}
            </p>
            <p className="text-muted-foreground leading-relaxed">{profile.bio}</p>
          </div>
        </div>

        <div className="text-center mb-12">
          <h2 className="font-display text-4xl md:text-5xl font-extrabold uppercase tracking-tight mb-4 text-foreground">
            Experience
          </h2>
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
                  className={`relative z-10 flex items-center justify-center w-16 h-16 rounded-full border-4 ${
                    item.type === "work"
                      ? "border-primary bg-primary"
                      : "border-border bg-secondary"
                  } group-hover:scale-110 transition-transform duration-300`}
                >
                  <div
                    className={item.type === "work" ? "text-primary-foreground" : "text-foreground"}
                  >
                    {item.type === "work" ? (
                      <Award className="w-5 h-5" />
                    ) : (
                      <Calendar className="w-5 h-5" />
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="ml-8 flex-1">
                  <div className="bg-card border border-border rounded-xl p-6 hover:border-primary transition-all duration-300 group-hover:scale-[1.02]">
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

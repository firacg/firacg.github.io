import {
  Mail,
  MapPin,
  Instagram,
  Linkedin,
  ExternalLink,
  Palette,
  Image,
  Rss,
  Send,
  Coffee,
  CreditCard,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { profile, social, payments, commissionInfo } from "@/data/profile";
import CommissionForm from "@/components/CommissionForm";

const contactInfo = [
  {
    icon: <Mail className="w-5 h-5" />,
    label: "Email",
    value: profile.email,
    href: `mailto:${profile.email}`,
  },
  {
    icon: <MapPin className="w-5 h-5" />,
    label: "Location",
    value: profile.location,
    href: null,
  },
  {
    icon: <Clock className="w-5 h-5" />,
    label: "Response hours",
    value: commissionInfo.responseHours,
    href: null,
  },
];

const socialLinks = [
  {
    icon: <Instagram className="w-6 h-6" />,
    name: "Instagram",
    handle: "@fira_cg",
    href: social.instagram,
    color: "hover:text-pink-400",
  },
  {
    icon: <Palette className="w-6 h-6" />,
    name: "ArtStation",
    handle: "maboroshi94",
    href: social.artstation,
    color: "hover:text-blue-400",
  },
  {
    icon: <Image className="w-6 h-6" />,
    name: "Behance",
    handle: "maboroshi94",
    href: social.behance,
    color: "hover:text-blue-500",
  },
  {
    icon: <Linkedin className="w-6 h-6" />,
    name: "LinkedIn",
    handle: "in/firacg",
    href: social.linkedin,
    color: "hover:text-blue-500",
  },
  {
    icon: <Rss className="w-6 h-6" />,
    name: "Tumblr",
    handle: "firacgart",
    href: social.tumblr,
    color: "hover:text-indigo-400",
  },
  {
    icon: <Send className="w-6 h-6" />,
    name: "Telegram",
    handle: "firacg",
    href: social.telegram,
    color: "hover:text-sky-400",
  },
];

const SocialContact = () => {
  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-display text-4xl md:text-5xl font-extrabold uppercase tracking-tight mb-4 text-foreground">
            Get in Touch
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Open for commissions — characters, locations, props and items for game dev teams.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <h3 className="text-2xl font-bold text-foreground mb-6">Get in Touch</h3>
            <div className="space-y-6">
              {contactInfo.map((contact, index) => (
                <div key={index} className="group">
                  {contact.href ? (
                    <a
                      href={contact.href}
                      className="flex items-center space-x-4 p-4 rounded-lg border border-border hover:border-primary transition-all duration-300"
                    >
                      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                        {contact.icon}
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">{contact.label}</p>
                        <p className="font-semibold text-foreground group-hover:text-primary transition-colors">
                          {contact.value}
                        </p>
                      </div>
                      <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary ml-auto" />
                    </a>
                  ) : (
                    <div className="flex items-center space-x-4 p-4 rounded-lg border border-border">
                      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary">
                        {contact.icon}
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">{contact.label}</p>
                        <p className="font-semibold text-foreground">{contact.value}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Social Media */}
          <div className="space-y-8">
            <h3 className="text-2xl font-bold text-foreground mb-6">Follow the Journey</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {socialLinks.map((platform, index) => (
                <a
                  key={index}
                  href={platform.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-6 rounded-lg border border-border hover:border-primary transition-all duration-300 hover:scale-[1.02]"
                >
                  <div className="flex items-center space-x-4">
                    <div
                      className={`text-muted-foreground transition-colors duration-300 ${platform.color}`}
                    >
                      {platform.icon}
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{platform.name}</p>
                      <p className="text-sm text-muted-foreground">{platform.handle}</p>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Commissions */}
        <div className="mt-16 grid md:grid-cols-2 gap-8">
          <div className="p-6 rounded-xl bg-card border border-border">
            <h3 className="text-xl font-bold text-foreground mb-4">How commissions work</h3>
            <ol className="space-y-2 mb-4">
              {commissionInfo.process.map((step, i) => (
                <li key={i} className="flex items-start text-muted-foreground">
                  <span className="text-primary font-semibold mr-3">{i + 1}.</span>
                  {step}
                </li>
              ))}
            </ol>
            <p className="text-sm text-muted-foreground mb-1">{commissionInfo.prepayment}</p>
            <p className="text-sm text-muted-foreground">
              Not taking on: {commissionInfo.restrictions.join(", ")}
            </p>
          </div>

          <div className="p-6 rounded-xl bg-card border border-primary flex flex-col">
            <h3 className="font-display text-xl font-extrabold uppercase tracking-tight text-primary mb-2">
              Request a commission
            </h3>
            <p className="text-muted-foreground mb-4 text-sm">
              Pricing is discussed individually after a brief.
            </p>
            <CommissionForm />
            <div className="flex flex-col sm:flex-row gap-4 mt-6 pt-6 border-t border-border">
              <a href={payments.kofi} target="_blank" rel="noopener noreferrer" className="flex-1">
                <Button variant="gold" size="lg" className="w-full">
                  <Coffee className="w-5 h-5 mr-2" />
                  Ko-fi
                </Button>
              </a>
              <a
                href={payments.paypal}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1"
              >
                <Button variant="mystic" size="lg" className="w-full">
                  <CreditCard className="w-5 h-5 mr-2" />
                  PayPal
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialContact;

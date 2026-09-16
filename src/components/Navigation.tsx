import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const navItems = [
  { name: "Line art", href: "#lineart" },
  { name: "Plarium", href: "#plarium" },
  { name: "CV", href: "/downloads/Fira-CG-CV.pdf", download: true },
  { name: "Sketchbook", href: "#sketchbook" },
];

const Navigation = ({ onContactClick }: { onContactClick: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    setIsOpen(false);
    if (location.pathname !== "/") {
      navigate({ to: "/", hash: href.slice(1) });
      return;
    }
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  const handleLogoClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    setIsOpen(false);
    if (location.pathname === "/") {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/85 backdrop-blur-md border-b border-border" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="/" className="site-mark" aria-label="FIRA CG — back to top" onClick={handleLogoClick}>
            FIRA<span>CG</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8 nav-links">
            {navItems.map((item) =>
              item.download ? (
                <a key={item.name} href={item.href} download>
                  {item.name}
                </a>
              ) : (
                <button key={item.name} onClick={() => scrollToSection(item.href)}>
                  {item.name}
                </button>
              ),
            )}
          </div>
          <button className="nav-contact hidden md:inline-flex" onClick={onContactClick}>
            Let’s talk
          </button>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden"
            aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div
            className="md:hidden bg-card/95 backdrop-blur-md border border-border rounded-lg mt-2"
            id="mobile-navigation"
          >
            <div className="px-4 pt-2 pb-4 space-y-2">
              {navItems.map((item) =>
                item.download ? (
                  <a
                    key={item.name}
                    href={item.href}
                    download
                    onClick={() => setIsOpen(false)}
                    className="block w-full text-left px-4 py-2 text-foreground hover:text-primary hover:bg-primary/10 rounded-md transition-all duration-300"
                  >
                    {item.name}
                  </a>
                ) : (
                  <button
                    key={item.name}
                    onClick={() => scrollToSection(item.href)}
                    className="block w-full text-left px-4 py-2 text-foreground hover:text-primary hover:bg-primary/10 rounded-md transition-all duration-300"
                  >
                    {item.name}
                  </button>
                ),
              )}
              <button
                onClick={() => {
                  setIsOpen(false);
                  onContactClick();
                }}
                className="nav-contact mt-2 w-full justify-center"
              >
                Let’s talk
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;

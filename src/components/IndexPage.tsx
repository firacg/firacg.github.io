import { useEffect, useRef, useState } from "react";
import { useLocation } from "@tanstack/react-router";
import Navigation from "@/components/Navigation";
import PortfolioShowcase from "@/components/PortfolioShowcase";

const IndexPage = () => {
  const location = useLocation();
  const handledInitialNavigation = useRef(false);
  const [contactOpen, setContactOpen] = useState(false);

  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    if (!handledInitialNavigation.current) {
      handledInitialNavigation.current = true;
      const navigation = performance.getEntriesByType("navigation")[0] as
        PerformanceNavigationTiming | undefined;
      const isReload = navigation?.type === "reload";

      if (isReload) {
        history.replaceState(history.state, "", location.pathname + location.searchStr);
        window.scrollTo({ top: 0, left: 0, behavior: "auto" });
        requestAnimationFrame(() => window.scrollTo({ top: 0, left: 0, behavior: "auto" }));
        return;
      }
    }

    if (location.hash) {
      document.getElementById(location.hash)?.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }
  }, [location.hash, location.pathname, location.searchStr]);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navigation onContactClick={() => setContactOpen(true)} />
      <PortfolioShowcase nyanchiOpen={contactOpen} setNyanchiOpen={setContactOpen} />
    </div>
  );
};

export default IndexPage;

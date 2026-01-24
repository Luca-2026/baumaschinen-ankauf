import { Link } from "react-router-dom";
import { MapPin } from "lucide-react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

const localPages = [
  { city: "Düsseldorf", path: "/bagger-verkaufen-duesseldorf" },
  { city: "Köln", path: "/bagger-verkaufen-koeln" },
  { city: "Dortmund", path: "/bagger-verkaufen-dortmund" },
  { city: "Essen", path: "/bagger-verkaufen-essen" },
  { city: "Duisburg", path: "/bagger-verkaufen-duisburg" },
  { city: "Bochum", path: "/bagger-verkaufen-bochum" },
  { city: "Wuppertal", path: "/bagger-verkaufen-wuppertal" },
  { city: "Münster", path: "/bagger-verkaufen-muenster" },
  { city: "Bielefeld", path: "/bagger-verkaufen-bielefeld" },
  { city: "Gelsenkirchen", path: "/bagger-verkaufen-gelsenkirchen" },
  { city: "Krefeld", path: "/bagger-verkaufen-krefeld" },
  { city: "Bonn", path: "/bagger-verkaufen-bonn" },
  { city: "Mülheim", path: "/bagger-verkaufen-muelheim" },
  { city: "Oberhausen", path: "/bagger-verkaufen-oberhausen" },
  { city: "Mönchengladbach", path: "/bagger-verkaufen-moenchengladbach" },
  { city: "Aachen", path: "/bagger-verkaufen-aachen" },
];

export function LocalSEOLinks() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container">
        <AnimatedSection>
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
              Baumaschinen Ankauf in NRW
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Wir kaufen Ihre Baumaschinen in ganz Nordrhein-Westfalen. 
              Finden Sie Ihren nächsten Standort für den Bagger-Ankauf.
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <div className="flex flex-wrap justify-center gap-3">
            {localPages.map((page) => (
              <Link
                key={page.path}
                to={page.path}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-background border border-border rounded-full text-sm font-medium text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors"
              >
                <MapPin className="h-3.5 w-3.5" />
                {page.city}
              </Link>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

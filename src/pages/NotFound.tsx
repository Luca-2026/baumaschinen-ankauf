import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { SEOHead } from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Home, Search, ArrowRight } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <Layout>
      <SEOHead
        title="Seite nicht gefunden (404)"
        description="Die angeforderte Seite wurde nicht gefunden. Finden Sie hier schnell zurück zu unseren Baumaschinen-Ankauf Services."
        noIndex={true}
      />
      <section className="py-20 md:py-32">
        <div className="container text-center max-w-2xl mx-auto">
          <h1 className="text-7xl md:text-9xl font-bold text-primary/20 mb-4">404</h1>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            Seite nicht gefunden
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Die angeforderte Seite existiert leider nicht oder wurde verschoben. 
            Nutzen Sie die folgenden Links, um zurück zu unseren Services zu gelangen.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link to="/">
                <Home className="mr-2 h-5 w-5" />
                Zur Startseite
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/ankauf">
                <Search className="mr-2 h-5 w-5" />
                Baumaschine bewerten
              </Link>
            </Button>
          </div>
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <Link to="/baumaschinen-verkaufen" className="p-3 rounded-lg border hover:bg-muted transition-colors text-foreground">
              Baumaschinen verkaufen
            </Link>
            <Link to="/gebrauchtmaschinen" className="p-3 rounded-lg border hover:bg-muted transition-colors text-foreground">
              Gebrauchtmaschinen
            </Link>
            <Link to="/ratgeber" className="p-3 rounded-lg border hover:bg-muted transition-colors text-foreground">
              Ratgeber
            </Link>
            <Link to="/kontakt" className="p-3 rounded-lg border hover:bg-muted transition-colors text-foreground">
              Kontakt
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default NotFound;

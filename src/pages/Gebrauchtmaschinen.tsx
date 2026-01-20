import { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { MachineIcon } from "@/components/ui/MachineIcon";
import { 
  Calendar, 
  Gauge, 
  MapPin, 
  Phone,
  Mail,
  ArrowRight
} from "lucide-react";
import { Link } from "react-router-dom";

interface Machine {
  id: string;
  title: string;
  manufacturer_name: string;
  model_name: string | null;
  category: "bagger" | "arbeitsbuehne";
  year_built: number;
  operating_hours: number | null;
  price: number;
  condition: string;
  location_name: string | null;
  images: string[] | null;
  is_featured: boolean | null;
  is_sold: boolean | null;
  description: string | null;
}

const conditionLabels: Record<string, string> = {
  sehr_gut: "Sehr gut",
  gut: "Gut",
  ok: "Akzeptabel",
  reparaturbeduerftig: "Reparaturbedürftig"
};

export default function Gebrauchtmaschinen() {
  const [machines, setMachines] = useState<Machine[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "bagger" | "arbeitsbuehne">("all");

  useEffect(() => {
    async function fetchMachines() {
      const { data, error } = await supabase
        .from("machines")
        .select("*")
        .eq("is_published", true)
        .eq("is_sold", false)
        .order("is_featured", { ascending: false })
        .order("created_at", { ascending: false });

      if (!error && data) {
        setMachines(data as Machine[]);
      }
      setLoading(false);
    }

    fetchMachines();
  }, []);

  const filteredMachines = filter === "all" 
    ? machines 
    : machines.filter(m => m.category === filter);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("de-DE", {
      style: "currency",
      currency: "EUR",
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 via-background to-accent/5 py-16 md:py-20">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold tracking-tight text-headline md:text-5xl mb-6">
              Geprüfte Gebrauchtmaschinen
            </h1>
            <p className="text-xl text-muted-foreground">
              Hochwertige Bagger und Arbeitsbühnen aus unserem Bestand – 
              alle technisch geprüft und sofort einsatzbereit.
            </p>
          </div>
        </div>
      </section>

      {/* Filter & Machines */}
      <section className="py-16">
        <div className="container">
          {/* Filter Tabs */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex rounded-lg border bg-white p-1 shadow-sm">
              <button
                onClick={() => setFilter("all")}
                className={`px-6 py-3 rounded-md text-sm font-medium transition-all ${
                  filter === "all"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Alle Maschinen
              </button>
              <button
                onClick={() => setFilter("bagger")}
                className={`flex items-center gap-2 px-6 py-3 rounded-md text-sm font-medium transition-all ${
                  filter === "bagger"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <MachineIcon type="bagger" size="sm" />
                Bagger
              </button>
              <button
                onClick={() => setFilter("arbeitsbuehne")}
                className={`flex items-center gap-2 px-6 py-3 rounded-md text-sm font-medium transition-all ${
                  filter === "arbeitsbuehne"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <MachineIcon type="arbeitsbuehne" size="sm" />
                Arbeitsbühnen
              </button>
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="text-center py-12">
              <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4" />
              <p className="text-muted-foreground">Maschinen werden geladen...</p>
            </div>
          )}

          {/* Empty State */}
          {!loading && filteredMachines.length === 0 && (
            <div className="text-center py-16 bg-muted rounded-2xl">
              <MachineIcon type="bagger" size="2xl" className="mx-auto mb-4 opacity-30" />
              <h3 className="text-xl font-semibold text-headline mb-2">
                Aktuell keine Maschinen verfügbar
              </h3>
              <p className="text-muted-foreground mb-6">
                Schauen Sie bald wieder vorbei oder kontaktieren Sie uns für individuelle Anfragen.
              </p>
              <Button asChild>
                <Link to="/kontakt">Kontakt aufnehmen</Link>
              </Button>
            </div>
          )}

          {/* Machines Grid */}
          {!loading && filteredMachines.length > 0 && (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredMachines.map((machine) => (
                <div
                  key={machine.id}
                  className="group rounded-2xl border bg-card overflow-hidden shadow-sm hover:shadow-lg transition-all"
                >
                  {/* Image */}
                  <div className="relative aspect-[4/3] bg-muted">
                    {machine.images && machine.images.length > 0 ? (
                      <img
                        src={machine.images[0]}
                        alt={machine.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <MachineIcon 
                          type={machine.category} 
                          size="2xl" 
                          className="opacity-20" 
                        />
                      </div>
                    )}
                    {machine.is_featured && (
                      <Badge className="absolute top-3 left-3 bg-accent text-accent-foreground">
                        Empfohlen
                      </Badge>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <h3 className="text-lg font-semibold text-headline line-clamp-2">
                        {machine.title}
                      </h3>
                    </div>

                    <p className="text-sm text-muted-foreground mb-4">
                      {machine.manufacturer_name} {machine.model_name}
                    </p>

                    {/* Specs */}
                    <div className="flex flex-wrap gap-3 mb-4 text-sm">
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>{machine.year_built}</span>
                      </div>
                      {machine.operating_hours && (
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Gauge className="h-4 w-4" />
                          <span>{machine.operating_hours.toLocaleString("de-DE")} Bh</span>
                        </div>
                      )}
                      {machine.location_name && (
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <MapPin className="h-4 w-4" />
                          <span>{machine.location_name}</span>
                        </div>
                      )}
                    </div>

                    <Badge variant="outline" className="mb-4">
                      {conditionLabels[machine.condition] || machine.condition}
                    </Badge>

                    {/* Price & CTA */}
                    <div className="flex items-center justify-between pt-4 border-t">
                      <div>
                        <p className="text-2xl font-bold text-primary">
                          {formatPrice(machine.price)}
                        </p>
                        <p className="text-xs text-muted-foreground">zzgl. MwSt.</p>
                      </div>
                      <Button asChild size="sm">
                        <Link to="/kontakt">
                          Anfragen
                          <ArrowRight className="ml-1 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl text-white">
              Sie suchen eine bestimmte Maschine?
            </h2>
            <p className="mt-6 text-lg text-primary-foreground/80">
              Kontaktieren Sie uns! Wir helfen Ihnen gerne, die passende Baumaschine zu finden.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold text-lg h-14 px-8"
              >
                <a href="tel:+492151XXXXXX">
                  <Phone className="mr-2 h-5 w-5" />
                  Jetzt anrufen
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-2 border-white bg-transparent text-white hover:bg-white hover:text-primary h-14 px-8 font-semibold"
              >
                <a href="mailto:info@slt-baumaschinen.de">
                  <Mail className="mr-2 h-5 w-5" />
                  E-Mail schreiben
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

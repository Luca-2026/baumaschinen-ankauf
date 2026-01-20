import { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { MachineIcon } from "@/components/ui/MachineIcon";
import { MachineImageSlider } from "@/components/machines/MachineImageSlider";
import { MachineDetailModal } from "@/components/machines/MachineDetailModal";
import { 
  Calendar, 
  Gauge, 
  MapPin, 
  Phone,
  Mail,
  ArrowRight,
  Expand
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
  weight_kg: number | null;
  price: number;
  condition: string;
  location_name: string | null;
  images: string[] | null;
  is_featured: boolean | null;
  is_sold: boolean | null;
  description: string | null;
  features: string[] | null;
  financing_available: boolean | null;
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
  const [selectedMachine, setSelectedMachine] = useState<Machine | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
        // Parse features if it's a string
        const parsedData = data.map(m => ({
          ...m,
          features: typeof m.features === 'string' ? JSON.parse(m.features) : m.features
        }));
        setMachines(parsedData as Machine[]);
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

  const openMachineDetail = (machine: Machine) => {
    setSelectedMachine(machine);
    setIsModalOpen(true);
  };

  const closeMachineDetail = () => {
    setIsModalOpen(false);
    setSelectedMachine(null);
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
            <div className="inline-flex rounded-xl border bg-white p-1.5 shadow-sm gap-1">
              <button
                onClick={() => setFilter("all")}
                className={`px-8 py-4 rounded-lg text-base font-medium transition-all ${
                  filter === "all"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                Alle Maschinen
              </button>
              <button
                onClick={() => setFilter("bagger")}
                className={`flex items-center gap-3 px-8 py-4 rounded-lg text-base font-medium transition-all ${
                  filter === "bagger"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                <MachineIcon type="bagger" size="lg" />
                Bagger
              </button>
              <button
                onClick={() => setFilter("arbeitsbuehne")}
                className={`flex items-center gap-3 px-8 py-4 rounded-lg text-base font-medium transition-all ${
                  filter === "arbeitsbuehne"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                <MachineIcon type="arbeitsbuehne" size="lg" />
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
                  className="group rounded-2xl border bg-card overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer"
                  onClick={() => openMachineDetail(machine)}
                >
                  {/* Image Slider */}
                  <div className="relative">
                    <MachineImageSlider
                      images={machine.images}
                      title={machine.title}
                      category={machine.category}
                      autoPlay={true}
                      autoPlayInterval={5000}
                    />
                    {machine.is_featured && (
                      <Badge className="absolute top-3 left-3 bg-accent text-accent-foreground z-10">
                        Empfohlen
                      </Badge>
                    )}
                    {/* Expand hint */}
                    <div className="absolute bottom-3 right-3 bg-black/50 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                      <Expand className="h-3 w-3" />
                      Details ansehen
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <h3 className="text-lg font-semibold text-headline line-clamp-2 group-hover:text-primary transition-colors">
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
                        <p className="text-xs text-muted-foreground">inkl. MwSt.</p>
                      </div>
                      <Button 
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          openMachineDetail(machine);
                        }}
                      >
                        Details
                        <ArrowRight className="ml-1 h-4 w-4" />
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
                <a href="tel:+4921514179904">
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
                <a href="mailto:info@wirkaufendeinebaumaschinen.de">
                  <Mail className="mr-2 h-5 w-5" />
                  E-Mail schreiben
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Machine Detail Modal */}
      <MachineDetailModal
        machine={selectedMachine}
        isOpen={isModalOpen}
        onClose={closeMachineDetail}
      />
    </Layout>
  );
}

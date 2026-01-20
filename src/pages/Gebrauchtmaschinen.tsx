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
  Expand,
  ShieldCheck
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
      <section className="bg-gradient-to-br from-primary/5 via-background to-accent/5 py-10 sm:py-16 md:py-20">
        <div className="container px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-headline mb-4 sm:mb-6">
              Geprüfte Gebrauchtmaschinen
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground mb-4 sm:mb-6 px-2">
              Hochwertige Bagger und Arbeitsbühnen aus unserem Bestand – 
              alle technisch geprüft und sofort einsatzbereit.
            </p>
            <div className="inline-flex items-center gap-2 bg-success text-white font-semibold px-3 sm:px-4 py-2 rounded-full shadow-lg text-sm sm:text-base">
              <ShieldCheck className="h-4 w-4 sm:h-5 sm:w-5" />
              <span>1 Jahr Gewährleistung auf alle Maschinen</span>
            </div>
          </div>
        </div>
      </section>

      {/* Filter & Machines */}
      <section className="py-8 sm:py-12 md:py-16">
        <div className="container px-4 sm:px-6">
          {/* Filter Tabs */}
          <div className="flex justify-center mb-6 sm:mb-8 md:mb-12">
            <div className="inline-flex rounded-xl border bg-white p-1 sm:p-1.5 shadow-sm gap-0.5 sm:gap-1 w-full sm:w-auto overflow-x-auto">
              <button
                onClick={() => setFilter("all")}
                className={`flex-1 sm:flex-initial px-3 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 rounded-lg text-xs sm:text-sm md:text-base font-medium transition-all whitespace-nowrap ${
                  filter === "all"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                Alle Maschinen
              </button>
              <button
                onClick={() => setFilter("bagger")}
                className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 sm:gap-2 md:gap-3 px-3 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 rounded-lg text-xs sm:text-sm md:text-base font-medium transition-all whitespace-nowrap ${
                  filter === "bagger"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                <MachineIcon type="bagger" size="md" className="hidden sm:block" />
                <MachineIcon type="bagger" size="sm" className="sm:hidden" />
                Bagger
              </button>
              <button
                onClick={() => setFilter("arbeitsbuehne")}
                className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 sm:gap-2 md:gap-3 px-3 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 rounded-lg text-xs sm:text-sm md:text-base font-medium transition-all whitespace-nowrap ${
                  filter === "arbeitsbuehne"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                <MachineIcon type="arbeitsbuehne" size="md" className="hidden sm:block" />
                <MachineIcon type="arbeitsbuehne" size="sm" className="sm:hidden" />
                <span className="hidden sm:inline">Arbeitsbühnen</span>
                <span className="sm:hidden">Bühnen</span>
              </button>
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="text-center py-8 sm:py-12">
              <div className="animate-spin h-6 w-6 sm:h-8 sm:w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-3 sm:mb-4" />
              <p className="text-sm sm:text-base text-muted-foreground">Maschinen werden geladen...</p>
            </div>
          )}

          {/* Empty State */}
          {!loading && filteredMachines.length === 0 && (
            <div className="text-center py-10 sm:py-16 bg-muted rounded-xl sm:rounded-2xl px-4">
              <MachineIcon type="bagger" size="xl" className="mx-auto mb-3 sm:mb-4 opacity-30" />
              <h3 className="text-lg sm:text-xl font-semibold text-headline mb-2">
                Aktuell keine Maschinen verfügbar
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6">
                Schauen Sie bald wieder vorbei oder kontaktieren Sie uns für individuelle Anfragen.
              </p>
              <Button asChild size="sm" className="sm:text-base">
                <Link to="/kontakt">Kontakt aufnehmen</Link>
              </Button>
            </div>
          )}

          {/* Machines Grid */}
          {!loading && filteredMachines.length > 0 && (
            <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {filteredMachines.map((machine) => (
                <div
                  key={machine.id}
                  className="group rounded-xl sm:rounded-2xl border bg-card overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer"
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
                      <Badge className="absolute top-2 sm:top-3 left-2 sm:left-3 bg-accent text-accent-foreground z-10 text-xs">
                        Empfohlen
                      </Badge>
                    )}
                    {/* Expand hint */}
                    <div className="absolute bottom-2 sm:bottom-3 right-2 sm:right-3 bg-black/50 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                      <Expand className="h-3 w-3" />
                      <span className="hidden sm:inline">Details ansehen</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4 sm:p-6">
                    <div className="flex items-start justify-between gap-2 mb-2 sm:mb-3">
                      <h3 className="text-base sm:text-lg font-semibold text-headline line-clamp-2 group-hover:text-primary transition-colors">
                        {machine.title}
                      </h3>
                    </div>

                    <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4">
                      {machine.manufacturer_name} {machine.model_name}
                    </p>

                    {/* Specs */}
                    <div className="flex flex-wrap gap-2 sm:gap-3 mb-3 sm:mb-4 text-xs sm:text-sm">
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Calendar className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                        <span>{machine.year_built}</span>
                      </div>
                      {machine.operating_hours && (
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Gauge className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                          <span>{machine.operating_hours.toLocaleString("de-DE")} Bh</span>
                        </div>
                      )}
                      {machine.location_name && (
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <MapPin className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                          <span>{machine.location_name}</span>
                        </div>
                      )}
                    </div>

                    <Badge variant="outline" className="mb-3 sm:mb-4 text-xs">
                      {conditionLabels[machine.condition] || machine.condition}
                    </Badge>

                    {/* Price & CTA */}
                    <div className="flex items-center justify-between pt-3 sm:pt-4 border-t">
                      <div>
                        <p className="text-xl sm:text-2xl font-bold text-primary">
                          {formatPrice(machine.price)}
                        </p>
                        <p className="text-xs text-muted-foreground">inkl. MwSt.</p>
                      </div>
                      <Button 
                        size="sm"
                        className="text-xs sm:text-sm h-8 sm:h-9 px-3 sm:px-4"
                        onClick={(e) => {
                          e.stopPropagation();
                          openMachineDetail(machine);
                        }}
                      >
                        Details
                        <ArrowRight className="ml-1 h-3.5 w-3.5 sm:h-4 sm:w-4" />
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
      <section className="py-10 sm:py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white">
              Sie suchen eine bestimmte Maschine?
            </h2>
            <p className="mt-4 sm:mt-6 text-base sm:text-lg text-primary-foreground/80">
              Kontaktieren Sie uns! Wir helfen Ihnen gerne, die passende Baumaschine zu finden.
            </p>
            <div className="mt-6 sm:mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold text-base sm:text-lg h-12 sm:h-14 px-6 sm:px-8 w-full sm:w-auto"
              >
                <a href="tel:+4921514179904">
                  <Phone className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                  Jetzt anrufen
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-2 border-white bg-transparent text-white hover:bg-white hover:text-primary h-12 sm:h-14 px-6 sm:px-8 font-semibold w-full sm:w-auto"
              >
                <a href="mailto:info@wirkaufendeinebaumaschinen.de">
                  <Mail className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
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

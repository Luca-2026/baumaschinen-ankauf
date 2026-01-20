import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, BadgeCheck, CreditCard, Calendar, Gauge } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MachineIcon } from "@/components/ui/MachineIcon";
import { MachineImageSlider } from "@/components/machines/MachineImageSlider";
import { supabase } from "@/integrations/supabase/client";

interface Machine {
  id: string;
  title: string;
  manufacturer_name: string;
  model_name: string | null;
  category: "bagger" | "arbeitsbuehne";
  year_built: number;
  operating_hours: number | null;
  price: number;
  images: string[] | null;
  financing_available: boolean | null;
}

export function UsedMachinesTeaser() {
  const [machines, setMachines] = useState<Machine[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMachines() {
      const { data, error } = await supabase
        .from("machines")
        .select("id, title, manufacturer_name, model_name, category, year_built, operating_hours, price, images, financing_available")
        .eq("is_published", true)
        .eq("is_sold", false)
        .order("is_featured", { ascending: false })
        .order("created_at", { ascending: false })
        .limit(6);

      if (!error && data) {
        setMachines(data as Machine[]);
      }
      setLoading(false);
    }

    fetchMachines();
  }, []);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("de-DE", {
      style: "currency",
      currency: "EUR",
      maximumFractionDigits: 0
    }).format(price);
  };

  // Don't render if no machines
  if (!loading && machines.length === 0) {
    return null;
  }

  return (
    <section className="py-16 md:py-24">
      <div className="container">
        <SectionHeading
          title="Gebrauchtmaschinen-Angebote"
          subtitle="Geprüfte Qualität zu fairen Preisen – alle Maschinen sind vor Übergabe vollständig gewartet."
        />

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4" />
            <p className="text-muted-foreground">Maschinen werden geladen...</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {machines.map((machine) => (
              <Link
                key={machine.id}
                to="/gebrauchtmaschinen"
                className="group rounded-xl border bg-card overflow-hidden transition-all hover:shadow-lg hover:border-primary/30"
              >
                {/* Image */}
                <div className="aspect-[4/3] bg-muted relative overflow-hidden">
                  {machine.images && machine.images.length > 0 ? (
                    <img
                      src={machine.images[0]}
                      alt={machine.title}
                      className="w-full h-full object-cover transition-transform group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-muted to-muted/50">
                      <MachineIcon type={machine.category} size="xl" className="opacity-30" />
                    </div>
                  )}
                  {machine.financing_available && (
                    <div className="absolute top-3 right-3 flex items-center gap-1 bg-accent text-accent-foreground text-xs font-medium px-2 py-1 rounded-full">
                      <CreditCard className="h-3 w-3" />
                      Finanzierung möglich
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded">
                      {machine.category === "bagger" ? "Bagger" : "Arbeitsbühne"}
                    </span>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <BadgeCheck className="h-3 w-3 text-success" />
                      Geprüft
                    </div>
                  </div>
                  <h3 className="font-semibold text-headline text-lg mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    {machine.title}
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" />
                      Bj. {machine.year_built}
                    </span>
                    {machine.operating_hours && (
                      <span className="flex items-center gap-1">
                        <Gauge className="h-3.5 w-3.5" />
                        {machine.operating_hours.toLocaleString("de-DE")} Bh
                      </span>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-bold text-primary">
                        {formatPrice(machine.price)}
                      </span>
                      <span className="block text-xs text-muted-foreground">inkl. MwSt.</span>
                    </div>
                    <span className="text-sm text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                      Details
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* CTA */}
        <div className="mt-12 text-center">
          <Button asChild size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/5">
            <Link to="/gebrauchtmaschinen">
              Alle Gebrauchtmaschinen ansehen
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

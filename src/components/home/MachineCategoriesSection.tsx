import { useState } from "react";
import { Check } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MachineIcon } from "@/components/ui/MachineIcon";
import { cn } from "@/lib/utils";

const categories = {
  bagger: {
    title: "Bagger",
    types: [
      "Minibagger (bis 6t)",
      "Midibagger (6-15t)",
      "Kettenbagger",
      "Mobilbagger",
      "Kurzheckbagger",
      "Raupenbagger",
    ],
    criteria: [
      "Baujahr ab 2000",
      "Betriebsstunden dokumentiert",
      "Funktionstüchtiger Zustand",
      "CE-Kennzeichnung vorhanden",
      "Wartungshistorie verfügbar (optimal)",
    ],
  },
  arbeitsbuehnen: {
    title: "Arbeitsbühnen",
    types: [
      "Scherenarbeitsbühnen",
      "Gelenkteleskopbühnen",
      "Teleskoparbeitsbühnen",
      "Mastbühnen",
      "Raupenarbeitsbühnen",
      "LKW-Arbeitsbühnen",
    ],
    criteria: [
      "Baujahr ab 2005",
      "Arbeitshöhe dokumentiert",
      "Funktionstüchtiger Zustand",
      "UVV-Prüfung aktuell",
      "Batteriezustand bekannt (bei E-Antrieb)",
    ],
  },
};

export function MachineCategoriesSection() {
  const [activeTab, setActiveTab] = useState<"bagger" | "arbeitsbuehnen">("bagger");
  const activeCategory = categories[activeTab];

  return (
    <section className="py-16 md:py-24">
      <div className="container">
        <SectionHeading
          title="Welche Maschinen kaufen wir an?"
          subtitle="Wir kaufen Bagger und Arbeitsbühnen führender Hersteller – auch ältere Modelle und Maschinen mit höheren Betriebsstunden."
        />

        {/* Tabs */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex rounded-lg border bg-muted p-1">
            <button
              onClick={() => setActiveTab("bagger")}
              className={cn(
                "flex items-center gap-2 px-6 py-3 rounded-md text-sm font-medium transition-all duration-300",
                activeTab === "bagger"
                  ? "bg-card text-headline shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <MachineIcon type="bagger" size="sm" />
              Bagger
            </button>
            <button
              onClick={() => setActiveTab("arbeitsbuehnen")}
              className={cn(
                "flex items-center gap-2 px-6 py-3 rounded-md text-sm font-medium transition-all duration-300",
                activeTab === "arbeitsbuehnen"
                  ? "bg-card text-headline shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <MachineIcon type="arbeitsbuehne" size="sm" />
              Arbeitsbühnen
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Types */}
          <div className="rounded-2xl border bg-card p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <MachineIcon type={activeTab === "bagger" ? "bagger" : "arbeitsbuehne"} size="md" />
              </div>
              <h3 className="text-xl font-semibold text-headline">
                {activeCategory.title} Typen
              </h3>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {activeCategory.types.map((type) => (
                <div
                  key={type}
                  className="flex items-center gap-2 rounded-lg bg-muted px-4 py-3"
                >
                  <Check className="h-4 w-4 text-success shrink-0" />
                  <span className="text-sm font-medium">{type}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Criteria */}
          <div className="rounded-2xl border bg-card p-8">
            <h3 className="text-xl font-semibold text-headline mb-6">
              Ideale Ankaufkriterien
            </h3>
            <ul className="space-y-4">
              {activeCategory.criteria.map((criterion) => (
                <li key={criterion} className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/10">
                    <Check className="h-3 w-3 text-accent" />
                  </div>
                  <span className="text-muted-foreground">{criterion}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-muted-foreground bg-muted rounded-lg p-4">
              <strong>Hinweis:</strong> Auch wenn nicht alle Kriterien erfüllt sind, können wir Ihre Maschine oft ankaufen. Starten Sie einfach den Ankauf-Check!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
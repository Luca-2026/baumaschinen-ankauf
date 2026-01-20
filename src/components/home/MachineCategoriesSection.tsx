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
    <section className="py-10 sm:py-16 md:py-24">
      <div className="container px-4 sm:px-6">
        <SectionHeading
          title="Welche Maschinen kaufen wir an?"
          subtitle="Wir kaufen Bagger und Arbeitsbühnen führender Hersteller – auch ältere Modelle und Maschinen mit höheren Betriebsstunden."
        />

        {/* Tabs */}
        <div className="flex justify-center mb-8 sm:mb-12">
          <div className="inline-flex rounded-lg border bg-white p-1 shadow-sm w-full sm:w-auto">
            <button
              onClick={() => setActiveTab("bagger")}
              className={cn(
                "flex items-center justify-center gap-2 sm:gap-3 px-4 sm:px-6 py-2.5 sm:py-3 rounded-md text-sm font-medium transition-all duration-300 flex-1 sm:flex-initial",
                activeTab === "bagger"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              )}
            >
              <MachineIcon type="bagger" size="lg" />
              <span>Bagger</span>
            </button>
            <button
              onClick={() => setActiveTab("arbeitsbuehnen")}
              className={cn(
                "flex items-center justify-center gap-2 sm:gap-3 px-4 sm:px-6 py-2.5 sm:py-3 rounded-md text-sm font-medium transition-all duration-300 flex-1 sm:flex-initial",
                activeTab === "arbeitsbuehnen"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              )}
            >
              <MachineIcon type="arbeitsbuehne" size="lg" />
              <span className="hidden sm:inline">Arbeitsbühnen</span>
              <span className="sm:hidden">Bühnen</span>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="grid gap-6 lg:gap-8 lg:grid-cols-2">
          {/* Types */}
          <div className="rounded-xl sm:rounded-2xl border bg-card p-5 sm:p-8">
            <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
              <MachineIcon type={activeTab === "bagger" ? "bagger" : "arbeitsbuehne"} size="lg" />
              <h3 className="text-lg sm:text-xl font-semibold text-headline">
                {activeCategory.title} Typen
              </h3>
            </div>
            <div className="grid gap-2 sm:gap-3 grid-cols-1 sm:grid-cols-2">
              {activeCategory.types.map((type) => (
                <div
                  key={type}
                  className="flex items-center gap-2 rounded-lg bg-muted px-3 sm:px-4 py-2 sm:py-3"
                >
                  <Check className="h-4 w-4 text-success shrink-0" />
                  <span className="text-xs sm:text-sm font-medium">{type}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Criteria */}
          <div className="rounded-xl sm:rounded-2xl border bg-card p-5 sm:p-8">
            <h3 className="text-lg sm:text-xl font-semibold text-headline mb-4 sm:mb-6">
              Ideale Ankaufkriterien
            </h3>
            <ul className="space-y-3 sm:space-y-4">
              {activeCategory.criteria.map((criterion) => (
                <li key={criterion} className="flex items-start gap-2 sm:gap-3">
                  <div className="mt-0.5 flex h-4 w-4 sm:h-5 sm:w-5 shrink-0 items-center justify-center rounded-full bg-accent/10">
                    <Check className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-accent" />
                  </div>
                  <span className="text-sm sm:text-base text-muted-foreground">{criterion}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 sm:mt-6 text-xs sm:text-sm text-muted-foreground bg-muted rounded-lg p-3 sm:p-4">
              <strong>Hinweis:</strong> Auch wenn nicht alle Kriterien erfüllt sind, können wir Ihre Maschine oft ankaufen. Starten Sie einfach den Ankauf-Check!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
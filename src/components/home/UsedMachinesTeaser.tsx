import { Link } from "react-router-dom";
import { ArrowRight, BadgeCheck, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/SectionHeading";

// Placeholder machine data
const featuredMachines = [
  {
    id: "1",
    title: "Liebherr A918 Compact",
    category: "Mobilbagger",
    year: 2019,
    hours: 4200,
    price: 89500,
    image: "/placeholder.svg",
    financing: true,
  },
  {
    id: "2",
    title: "CAT 308E2 CR",
    category: "Kettenbagger",
    year: 2020,
    hours: 3100,
    price: 72000,
    image: "/placeholder.svg",
    financing: true,
  },
  {
    id: "3",
    title: "Genie GS-2632",
    category: "Scherenarbeitsbühne",
    year: 2018,
    hours: 890,
    price: 14500,
    image: "/placeholder.svg",
    financing: false,
  },
  {
    id: "4",
    title: "JLG 660SJ",
    category: "Teleskoparbeitsbühne",
    year: 2017,
    hours: 2400,
    price: 45000,
    image: "/placeholder.svg",
    financing: true,
  },
  {
    id: "5",
    title: "Kubota KX080-4",
    category: "Midibagger",
    year: 2021,
    hours: 1800,
    price: 68000,
    image: "/placeholder.svg",
    financing: true,
  },
  {
    id: "6",
    title: "Haulotte HA16 RTJ Pro",
    category: "Gelenkteleskopbühne",
    year: 2019,
    hours: 1200,
    price: 38000,
    image: "/placeholder.svg",
    financing: true,
  },
];

export function UsedMachinesTeaser() {
  return (
    <section className="py-16 md:py-24">
      <div className="container">
        <SectionHeading
          title="Gebrauchtmaschinen-Angebote"
          subtitle="Geprüfte Qualität zu fairen Preisen – alle Maschinen sind vor Übergabe vollständig gewartet."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredMachines.map((machine) => (
            <Link
              key={machine.id}
              to={`/gebrauchtmaschinen/${machine.id}`}
              className="group rounded-xl border bg-card overflow-hidden transition-all hover:shadow-lg hover:border-primary/30"
            >
              {/* Image */}
              <div className="aspect-[4/3] bg-muted relative overflow-hidden">
                <img
                  src={machine.image}
                  alt={machine.title}
                  className="w-full h-full object-cover transition-transform group-hover:scale-105"
                />
                {machine.financing && (
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
                    {machine.category}
                  </span>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <BadgeCheck className="h-3 w-3 text-success" />
                    Geprüft
                  </div>
                </div>
                <h3 className="font-semibold text-headline text-lg mb-2 group-hover:text-primary transition-colors">
                  {machine.title}
                </h3>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                  <span>Bj. {machine.year}</span>
                  <span>{machine.hours.toLocaleString("de-DE")} Std.</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-headline">
                    € {machine.price.toLocaleString("de-DE")}
                  </span>
                  <span className="text-sm text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                    Details
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

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

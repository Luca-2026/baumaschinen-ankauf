import { Link } from "react-router-dom";
import { 
  MapPin, 
  Clock, 
  Shield, 
  Building2,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { TrustBadge } from "@/components/ui/TrustBadge";
import { MachineIcon } from "@/components/ui/MachineIcon";

const trustItems = [
  { icon: MapPin, title: "NRW – 3 Standorte" },
  { icon: Clock, title: "Bewertung in < 2 Min" },
  { icon: Shield, title: "Unverbindlich & kostenlos" },
  { icon: Building2, title: "B2B & Privat" },
];

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/5 py-16 md:py-24">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwMDUwN0QiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
      
      <div className="container relative">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          {/* Left Column - Content */}
          <div className="max-w-xl animate-fade-in">
            <h1 className="text-4xl font-bold tracking-tight text-headline md:text-5xl lg:text-6xl">
              Baumaschinen verkaufen war noch nie so einfach
              <span className="block text-primary mt-2">
                In wenigen Schritten zum Ankaufspreis
              </span>
            </h1>
            <p className="mt-6 text-xl text-muted-foreground">
              Bagger & Arbeitsbühnen. Schnell. Transparent. Unverbindlich.
            </p>

            {/* Trust Badges */}
            <div className="mt-8 grid grid-cols-2 gap-4">
              {trustItems.map((item, index) => (
                <div 
                  key={item.title}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <TrustBadge
                    icon={item.icon}
                    title={item.title}
                    variant="compact"
                  />
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4 animate-fade-in" style={{ animationDelay: '400ms' }}>
              <Button
                asChild
                size="lg"
                className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold text-lg h-14 px-8 hover-scale"
              >
                <Link to="/ankauf">
                  Jetzt Ankaufpreis starten
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-2 border-primary bg-white text-primary hover:bg-primary hover:text-primary-foreground h-14 px-8 font-semibold"
              >
                <Link to="/so-funktionierts">So funktioniert's</Link>
              </Button>
            </div>
          </div>

          {/* Right Column - Quick Start Cards */}
          <div className="flex flex-col gap-4">
            <p className="text-center text-sm font-medium text-muted-foreground mb-2 animate-fade-in">
              Was möchten Sie verkaufen?
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <Link
                to="/ankauf?kategorie=bagger"
                className="group relative flex flex-col items-center gap-4 rounded-2xl border-2 border-border bg-card p-8 shadow-sm transition-all duration-300 hover:border-primary hover:shadow-xl hover:-translate-y-1 animate-fade-in"
                style={{ animationDelay: '200ms' }}
              >
                <div className="transition-all duration-300 group-hover:scale-110">
                  <MachineIcon type="bagger" size="2xl" />
                </div>
                <span className="text-xl font-semibold text-headline">Bagger</span>
                <span className="text-sm text-muted-foreground text-center">
                  Mini, Midi, Ketten, Mobil & mehr
                </span>
                <ArrowRight className="absolute right-4 top-4 h-5 w-5 text-muted-foreground opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:text-primary group-hover:translate-x-1" />
              </Link>

              <Link
                to="/ankauf?kategorie=arbeitsbuehne"
                className="group relative flex flex-col items-center gap-4 rounded-2xl border-2 border-border bg-card p-8 shadow-sm transition-all duration-300 hover:border-primary hover:shadow-xl hover:-translate-y-1 animate-fade-in"
                style={{ animationDelay: '300ms' }}
              >
                <div className="transition-all duration-300 group-hover:scale-110">
                  <MachineIcon type="arbeitsbuehne" size="2xl" />
                </div>
                <span className="text-xl font-semibold text-headline">Arbeitsbühne</span>
                <span className="text-sm text-muted-foreground text-center">
                  Schere, Gelenk, Teleskop & mehr
                </span>
                <ArrowRight className="absolute right-4 top-4 h-5 w-5 text-muted-foreground opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:text-primary group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
import { Link } from "react-router-dom";
import { MapPin, Clock, Shield, Building2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TrustBadge } from "@/components/ui/TrustBadge";
import { MachineIcon } from "@/components/ui/MachineIcon";
const trustItems = [{
  icon: MapPin,
  title: "NRW – 3 Standorte"
}, {
  icon: Clock,
  title: "Bewertung in < 2 Min"
}, {
  icon: Shield,
  title: "Unverbindlich & kostenlos"
}, {
  icon: Building2,
  title: "B2B & Privat"
}];
export function HeroSection() {
  return <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/5 py-16 md:py-24">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwMDUwN0QiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
      
      <div className="container relative">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          {/* Left Column - Content */}
          <div className="max-w-xl animate-fade-in">
            <h1 className="text-4xl font-bold tracking-tight text-headline md:text-5xl lg:text-6xl">
              Baumaschinen verkaufen war noch nie so einfach!
            </h1>
            
            {/* Subline Benefits */}
            <div className="mt-6 flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-accent/20">
                  <span className="text-accent font-bold text-sm">✓</span>
                </div>
                <span className="text-lg text-muted-foreground">Wie viel ist deine Maschine wert?</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-accent/20">
                  <span className="text-accent font-bold text-sm">✓</span>
                </div>
                <span className="text-lg text-muted-foreground">100% kostenlose Bewertung</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-accent/20">
                  <span className="text-accent font-bold text-sm">✓</span>
                </div>
                <span className="text-lg text-muted-foreground">Schnell und einfach</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-accent/20">
                  <span className="text-accent font-bold text-sm">✓</span>
                </div>
                <span className="text-lg text-muted-foreground">Verkaufspreis direkt online erhalten</span>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="mt-8 grid grid-cols-2 gap-4">
              {trustItems.map((item, index) => <div key={item.title} className="animate-fade-in" style={{
              animationDelay: `${index * 100}ms`
            }}>
                  <TrustBadge icon={item.icon} title={item.title} variant="compact" />
                </div>)}
            </div>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4 animate-fade-in" style={{
            animationDelay: '400ms'
          }}>
              <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold text-lg h-14 px-8 hover-scale">
                <Link to="/ankauf">
                  Jetzt Ankaufpreis starten
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-2 border-primary bg-white text-primary hover:bg-primary hover:text-primary-foreground h-14 px-8 font-semibold">
                <Link to="/so-funktionierts">So funktioniert's</Link>
              </Button>
            </div>
          </div>

          {/* Right Column - Quick Start Cards */}
          <div className="flex flex-col gap-6">
            <div className="text-center animate-fade-in">
              <h2 className="text-2xl font-bold text-headline mb-2">Was möchten Sie verkaufen?</h2>
              <p className="text-muted-foreground">Wählen Sie Ihre Maschinenkategorie</p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              <Link to="/ankauf?kategorie=bagger" className="group relative flex flex-col items-center gap-6 rounded-3xl border-2 border-border bg-card p-10 shadow-lg transition-all duration-300 hover:border-primary hover:shadow-2xl hover:-translate-y-2 animate-fade-in" style={{
              animationDelay: '200ms'
            }}>
                <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-primary/10 transition-all duration-300 group-hover:scale-110 group-hover:bg-primary/20">
                  <MachineIcon type="bagger" size="2xl" />
                </div>
                <div className="text-center">
                  <span className="text-2xl font-bold text-headline block mb-2">Bagger</span>
                  <span className="text-base text-muted-foreground">
                    Mini, Midi, Ketten, Mobil & mehr
                  </span>
                </div>
                <div className="flex items-center gap-2 text-primary font-semibold opacity-0 transition-all duration-300 group-hover:opacity-100">
                  <span>Jetzt bewerten</span>
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>

              <Link to="/ankauf?kategorie=arbeitsbuehne" className="group relative flex flex-col items-center gap-6 rounded-3xl border-2 border-border bg-card p-10 shadow-lg transition-all duration-300 hover:border-primary hover:shadow-2xl hover:-translate-y-2 animate-fade-in" style={{
              animationDelay: '300ms'
            }}>
                <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-primary/10 transition-all duration-300 group-hover:scale-110 group-hover:bg-primary/20">
                  <MachineIcon type="arbeitsbuehne" size="2xl" />
                </div>
                <div className="text-center">
                  <span className="text-2xl font-bold text-headline block mb-2">Arbeitsbühne</span>
                  <span className="text-base text-muted-foreground">
                    Schere, Gelenk, Teleskop & mehr
                  </span>
                </div>
                <div className="flex items-center gap-2 text-primary font-semibold opacity-0 transition-all duration-300 group-hover:opacity-100">
                  <span>Jetzt bewerten</span>
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>;
}
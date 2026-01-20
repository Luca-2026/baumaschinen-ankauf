import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, Clock, Shield, Building2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TrustBadge } from "@/components/ui/TrustBadge";
import { MachineIcon } from "@/components/ui/MachineIcon";

const trustItems = [
  { icon: MapPin, title: "NRW – 3 Standorte" },
  { icon: Clock, title: "Bewertung in < 2 Min" },
  { icon: Shield, title: "Unverbindlich & kostenlos" },
  { icon: Building2, title: "B2B & Privat" },
];

const benefits = [
  "Wie viel ist deine Maschine wert?",
  "100% kostenlose Bewertung",
  "Schnell und einfach",
  "Verkaufspreis direkt online erhalten",
];

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/5 py-16 md:py-24">
      {/* Animated Background Pattern */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwMDUwN0QiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')]" 
      />
      
      <div className="container relative">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, staggerChildren: 0.1 }}
            className="max-w-xl"
          >
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-4xl font-bold tracking-tight text-headline md:text-5xl lg:text-6xl"
            >
              Baumaschinen verkaufen war noch nie so einfach!
            </motion.h1>
            
            {/* Subline Benefits */}
            <div className="mt-6 flex flex-col gap-3">
              {benefits.map((benefit, index) => (
                <motion.div 
                  key={benefit}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1, ease: "easeOut" }}
                  className="flex items-center gap-3"
                >
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.4 + index * 0.1, type: "spring", stiffness: 300 }}
                    className="flex h-6 w-6 items-center justify-center rounded-full bg-accent/20"
                  >
                    <span className="text-accent font-bold text-sm">✓</span>
                  </motion.div>
                  <span className="text-lg text-muted-foreground">{benefit}</span>
                </motion.div>
              ))}
            </div>

            {/* Trust Badges */}
            <div className="mt-8 grid grid-cols-2 gap-4">
              {trustItems.map((item, index) => (
                <motion.div 
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1, ease: "easeOut" }}
                  whileHover={{ scale: 1.05 }}
                >
                  <TrustBadge icon={item.icon} title={item.title} variant="compact" />
                </motion.div>
              ))}
            </div>

            {/* CTA Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8, ease: "easeOut" }}
              className="mt-8 flex flex-col sm:flex-row gap-4"
            >
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold text-lg h-14 px-8 w-full sm:w-auto">
                  <Link to="/ankauf">
                    Jetzt Ankaufpreis starten
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button asChild variant="outline" size="lg" className="border-2 border-primary bg-white text-primary hover:bg-primary hover:text-primary-foreground h-14 px-8 font-semibold w-full sm:w-auto">
                  <Link to="/so-funktionierts">So funktioniert's</Link>
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right Column - Quick Start Cards */}
          <div className="flex flex-col gap-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5, ease: "easeOut" }}
              className="text-center"
            >
              <h2 className="text-2xl font-bold text-headline mb-2">Was möchten Sie verkaufen?</h2>
              <p className="text-muted-foreground">Wählen Sie Ihre Maschinenkategorie</p>
            </motion.div>
            
            <div className="grid gap-6 sm:grid-cols-2">
              {/* Bagger Card */}
              <motion.div
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
                whileHover={{ 
                  scale: 1.03, 
                  y: -8,
                  boxShadow: "0 25px 50px -12px rgb(0 0 0 / 0.25)",
                }}
              >
                <Link 
                  to="/ankauf?kategorie=bagger" 
                  className="group relative flex flex-col items-center gap-6 rounded-3xl border-2 border-border bg-card p-10 shadow-lg transition-colors hover:border-primary"
                >
                  <motion.div 
                    className="flex h-24 w-24 items-center justify-center rounded-2xl bg-primary/10 transition-colors group-hover:bg-primary/20"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <MachineIcon type="bagger" size="2xl" />
                  </motion.div>
                  <div className="text-center">
                    <span className="text-2xl font-bold text-headline block mb-2">Bagger</span>
                    <span className="text-base text-muted-foreground">
                      Mini, Midi, Ketten, Mobil & mehr
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-primary font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                    <span>Jetzt bewerten</span>
                    <ArrowRight className="h-5 w-5" />
                  </div>
                </Link>
              </motion.div>

              {/* Arbeitsbühne Card */}
              <motion.div
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.55, duration: 0.6, ease: "easeOut" }}
                whileHover={{ 
                  scale: 1.03, 
                  y: -8,
                  boxShadow: "0 25px 50px -12px rgb(0 0 0 / 0.25)",
                }}
              >
                <Link 
                  to="/ankauf?kategorie=arbeitsbuehne" 
                  className="group relative flex flex-col items-center gap-6 rounded-3xl border-2 border-border bg-card p-10 shadow-lg transition-colors hover:border-primary"
                >
                  <motion.div 
                    className="flex h-24 w-24 items-center justify-center rounded-2xl bg-primary/10 transition-colors group-hover:bg-primary/20"
                    whileHover={{ scale: 1.1, rotate: -5 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <MachineIcon type="arbeitsbuehne" size="2xl" />
                  </motion.div>
                  <div className="text-center">
                    <span className="text-2xl font-bold text-headline block mb-2">Arbeitsbühne</span>
                    <span className="text-base text-muted-foreground">
                      Schere, Gelenk, Teleskop & mehr
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-primary font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                    <span>Jetzt bewerten</span>
                    <ArrowRight className="h-5 w-5" />
                  </div>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

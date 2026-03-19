import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { SEOHead, SEO_CONFIG } from "@/components/SEOHead";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { 
  ClipboardList, 
  Calculator, 
  Handshake, 
  Truck,
  ArrowRight,
  ArrowDown,
  CheckCircle2,
  Sparkles
} from "lucide-react";

const steps = [
  {
    icon: ClipboardList,
    title: "Daten eingeben",
    description: "Geben Sie die wichtigsten Informationen zu Ihrer Maschine ein – Kategorie, Hersteller, Modell, Baujahr und Zustand.",
    details: [
      "Nur 2-3 Minuten Zeitaufwand",
      "Keine Registrierung erforderlich",
      "Optional: Fotos hochladen"
    ],
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-blue-500/10",
  },
  {
    icon: Calculator,
    title: "Preisspanne erhalten",
    description: "Basierend auf aktuellen Marktdaten berechnen wir sofort eine realistische Preisspanne für Ihre Maschine.",
    details: [
      "Transparente Marktpreise",
      "Unverbindliche Schätzung",
      "Sofortige Rückmeldung"
    ],
    color: "from-violet-500 to-purple-500",
    bgColor: "bg-violet-500/10",
  },
  {
    icon: Handshake,
    title: "Angebot erhalten",
    description: "Unser Expertenteam prüft Ihre Angaben und erstellt Ihnen innerhalb von 24-48 Stunden ein verbindliches Kaufangebot.",
    details: [
      "Persönliche Beratung",
      "Faire Konditionen",
      "Kein Verhandlungsstress"
    ],
    color: "from-amber-500 to-orange-500",
    bgColor: "bg-amber-500/10",
  },
  {
    icon: Truck,
    title: "Abholung & Zahlung",
    description: "Bei Einigung organisieren wir die Abholung Ihrer Maschine und zahlen den vereinbarten Betrag umgehend aus.",
    details: [
      "Kostenlose Abholung in NRW",
      "Schnelle Abwicklung",
      "Sichere Zahlung"
    ],
    color: "from-emerald-500 to-green-500",
    bgColor: "bg-emerald-500/10",
  }
];

function StepCard({ step, index }: { step: typeof steps[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div ref={ref} className="relative">
      {/* Connector arrow */}
      {index < steps.length - 1 && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.6, duration: 0.4, type: "spring" }}
          className="absolute left-1/2 -translate-x-1/2 -bottom-8 z-10 hidden md:flex items-center justify-center"
        >
          <div className="h-10 w-10 rounded-full bg-card border-2 border-border shadow-md flex items-center justify-center">
            <ArrowDown className="h-5 w-5 text-muted-foreground" />
          </div>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 60, scale: 0.95 }}
        animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
        transition={{
          duration: 0.6,
          delay: 0.1,
          ease: [0.21, 1.02, 0.73, 1],
        }}
        className="relative group"
      >
        <div className="relative overflow-hidden rounded-2xl border border-border bg-card shadow-sm hover:shadow-xl transition-shadow duration-500">
          {/* Gradient top bar */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.5, ease: "easeOut" }}
            className={`h-1.5 bg-gradient-to-r ${step.color} origin-left`}
          />

          <div className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start">
              {/* Step number + Icon */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={isInView ? { scale: 1, rotate: 0 } : {}}
                transition={{
                  delay: 0.2,
                  duration: 0.5,
                  type: "spring",
                  stiffness: 200,
                }}
                className="relative shrink-0"
              >
                {/* Number badge */}
                <div className="absolute -top-2 -right-2 z-10 h-7 w-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold shadow-lg">
                  {index + 1}
                </div>
                <div className={`h-16 w-16 md:h-20 md:w-20 rounded-2xl ${step.bgColor} flex items-center justify-center`}>
                  <step.icon className="h-8 w-8 md:h-10 md:w-10 text-primary" />
                </div>
              </motion.div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <motion.h3
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3, duration: 0.4 }}
                  className="text-xl md:text-2xl font-bold text-headline mb-2"
                >
                  {step.title}
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.4, duration: 0.4 }}
                  className="text-muted-foreground mb-5 leading-relaxed"
                >
                  {step.description}
                </motion.p>

                {/* Details with staggered animation */}
                <div className="space-y-2.5">
                  {step.details.map((detail, i) => (
                    <motion.div
                      key={detail}
                      initial={{ opacity: 0, x: -15 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.45 + i * 0.1, duration: 0.35 }}
                      className="flex items-center gap-2.5"
                    >
                      <CheckCircle2 className="h-4.5 w-4.5 text-success shrink-0" />
                      <span className="text-sm text-foreground">{detail}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function SoFunktionierts() {
  return (
    <Layout>
      <SEOHead {...SEO_CONFIG.soFunktionierts} />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/5 py-16 md:py-24">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwMDUwN0QiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
        <div className="container relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.21, 1.02, 0.73, 1] }}
            className="max-w-3xl mx-auto text-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5, type: "spring" }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm mb-6"
            >
              <Sparkles className="h-4 w-4" />
              In nur 4 Schritten
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="text-3xl sm:text-4xl font-bold tracking-tight text-headline md:text-5xl lg:text-6xl mb-6"
            >
              So einfach verkaufen Sie
              <br />
              <span className="text-primary">Ihre Baumaschine</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.5 }}
              className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
            >
              Von der Bewertung bis zur Auszahlung – schnell, transparent und ohne versteckte Kosten.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="mt-8"
            >
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold text-lg h-14 px-8">
                  <Link to="/ankauf">
                    Jetzt starten
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-16 md:py-24 bg-background-muted">
        <div className="container">
          <div className="max-w-3xl mx-auto space-y-14 md:space-y-16">
            {steps.map((step, index) => (
              <StepCard key={step.title} step={step} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground overflow-hidden">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="max-w-3xl mx-auto text-center"
          >
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="text-2xl sm:text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl text-white"
            >
              Bereit, Ihre Baumaschine zu verkaufen?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="mt-6 text-lg text-primary-foreground/80"
            >
              Starten Sie jetzt den kostenlosen Ankauf-Check und erhalten Sie in weniger als 2 Minuten einen unverbindlichen Referenzpreis.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <Button
                  asChild
                  size="lg"
                  className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold text-lg h-14 px-8 w-full sm:w-auto"
                >
                  <Link to="/ankauf">
                    Jetzt Ankaufpreis erhalten
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-2 border-white bg-transparent text-white hover:bg-white hover:text-primary h-14 px-8 font-semibold w-full sm:w-auto"
                >
                  <Link to="/kontakt">Kontakt aufnehmen</Link>
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}

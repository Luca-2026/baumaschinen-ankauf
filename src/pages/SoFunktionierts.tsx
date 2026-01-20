import { Layout } from "@/components/layout/Layout";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  ClipboardList, 
  Calculator, 
  Handshake, 
  Truck,
  ArrowRight,
  CheckCircle2
} from "lucide-react";

const steps = [
  {
    icon: ClipboardList,
    title: "1. Daten eingeben",
    description: "Geben Sie die wichtigsten Informationen zu Ihrer Maschine ein – Kategorie, Hersteller, Modell, Baujahr und Zustand.",
    details: [
      "Nur 2-3 Minuten Zeitaufwand",
      "Keine Registrierung erforderlich",
      "Optional: Fotos hochladen"
    ]
  },
  {
    icon: Calculator,
    title: "2. Preisspanne erhalten",
    description: "Basierend auf aktuellen Marktdaten berechnen wir sofort eine realistische Preisspanne für Ihre Maschine.",
    details: [
      "Transparente Marktpreise",
      "Unverbindliche Schätzung",
      "Sofortige Rückmeldung"
    ]
  },
  {
    icon: Handshake,
    title: "3. Angebot erhalten",
    description: "Unser Expertenteam prüft Ihre Angaben und erstellt Ihnen innerhalb von 24-48 Stunden ein verbindliches Kaufangebot.",
    details: [
      "Persönliche Beratung",
      "Faire Konditionen",
      "Kein Verhandlungsstress"
    ]
  },
  {
    icon: Truck,
    title: "4. Abholung & Zahlung",
    description: "Bei Einigung organisieren wir die Abholung Ihrer Maschine und zahlen den vereinbarten Betrag umgehend aus.",
    details: [
      "Kostenlose Abholung in NRW",
      "Schnelle Abwicklung",
      "Sichere Zahlung"
    ]
  }
];

export default function SoFunktionierts() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 via-background to-accent/5 py-16 md:py-24">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold tracking-tight text-headline md:text-5xl mb-6">
              So einfach verkaufen Sie Ihre Baumaschine
            </h1>
            <p className="text-xl text-muted-foreground">
              In nur 4 Schritten von der Bewertung bis zur Auszahlung – 
              schnell, transparent und ohne versteckte Kosten.
            </p>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-12">
              {steps.map((step, index) => (
                <div 
                  key={step.title}
                  className="relative flex gap-6 md:gap-8"
                >
                  {/* Connector Line */}
                  {index < steps.length - 1 && (
                    <div className="absolute left-8 top-20 w-0.5 h-full bg-border -z-10 hidden md:block" />
                  )}
                  
                  {/* Icon */}
                  <div className="flex-shrink-0">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg">
                      <step.icon className="h-8 w-8" />
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 pb-8">
                    <h3 className="text-2xl font-bold text-headline mb-3">
                      {step.title}
                    </h3>
                    <p className="text-lg text-muted-foreground mb-4">
                      {step.description}
                    </p>
                    <ul className="space-y-2">
                      {step.details.map((detail) => (
                        <li key={detail} className="flex items-center gap-2">
                          <CheckCircle2 className="h-5 w-5 text-success flex-shrink-0" />
                          <span className="text-foreground">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">
              Bereit Ihre Maschine zu verkaufen?
            </h2>
            <p className="text-xl opacity-90 mb-8">
              Starten Sie jetzt den kostenlosen Ankauf-Check und erhalten Sie 
              in wenigen Minuten eine erste Preiseinschätzung.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold text-lg h-14 px-8"
            >
              <Link to="/ankauf">
                Jetzt Ankaufpreis erhalten
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}

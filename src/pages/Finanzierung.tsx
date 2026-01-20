import { Layout } from "@/components/layout/Layout";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Calculator, 
  Percent, 
  Clock, 
  Shield,
  CheckCircle2,
  ArrowRight,
  Phone,
  Mail
} from "lucide-react";

const benefits = [
  {
    icon: Percent,
    title: "Attraktive Konditionen",
    description: "Flexible Laufzeiten und wettbewerbsfähige Zinssätze durch unsere Finanzierungspartner."
  },
  {
    icon: Clock,
    title: "Schnelle Abwicklung",
    description: "Finanzierungszusage in der Regel innerhalb von 48 Stunden nach Antragsstellung."
  },
  {
    icon: Calculator,
    title: "Individuelle Raten",
    description: "Wir passen die monatlichen Raten an Ihre betrieblichen Anforderungen an."
  },
  {
    icon: Shield,
    title: "Volle Transparenz",
    description: "Keine versteckten Kosten – alle Konditionen werden offen kommuniziert."
  }
];

const options = [
  {
    title: "Leasing",
    description: "Die Maschine bleibt im Eigentum der Leasinggesellschaft. Sie zahlen monatliche Raten und können am Ende kaufen oder zurückgeben.",
    features: [
      "Geringe monatliche Belastung",
      "Steuerliche Vorteile",
      "Am Ende: Kauf, Rückgabe oder Verlängerung",
      "Ideal für regelmäßige Erneuerung"
    ]
  },
  {
    title: "Mietkauf",
    description: "Sie werden mit der letzten Rate automatisch Eigentümer der Maschine. Die Maschine wird sofort aktiviert.",
    features: [
      "Eigentum nach Ablauf garantiert",
      "Maschine als Anlagevermögen",
      "Feste kalkulierbare Raten",
      "Ideal für langfristige Nutzung"
    ]
  },
  {
    title: "Kredit",
    description: "Klassische Finanzierung über einen Ratenkredit. Sie werden sofort Eigentümer der Maschine.",
    features: [
      "Sofortiges Eigentum",
      "Volle Abschreibungsmöglichkeit",
      "Flexible Laufzeiten",
      "Sondertilgungen möglich"
    ]
  }
];

export default function Finanzierung() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 via-background to-accent/5 py-16 md:py-24">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold tracking-tight text-headline md:text-5xl mb-6">
              Flexible Finanzierung für Ihre Baumaschine
            </h1>
            <p className="text-xl text-muted-foreground">
              Leasing, Mietkauf oder Kredit – wir finden gemeinsam mit Ihnen 
              die passende Finanzierungslösung.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 md:py-24">
        <div className="container">
          <SectionHeading
            title="Ihre Vorteile bei uns"
            subtitle="Wir arbeiten mit renommierten Finanzierungspartnern zusammen, um Ihnen die besten Konditionen zu bieten."
          />

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="rounded-2xl border bg-card p-6 text-center"
              >
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
                  <benefit.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-headline mb-2">
                  {benefit.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Financing Options */}
      <section className="py-16 md:py-24 bg-muted">
        <div className="container">
          <SectionHeading
            title="Unsere Finanzierungsoptionen"
            subtitle="Wählen Sie die Variante, die am besten zu Ihrem Unternehmen passt."
          />

          <div className="grid gap-8 lg:grid-cols-3">
            {options.map((option) => (
              <div
                key={option.title}
                className="rounded-2xl border bg-card p-8 shadow-sm hover:shadow-lg transition-shadow"
              >
                <h3 className="text-2xl font-bold text-headline mb-4">
                  {option.title}
                </h3>
                <p className="text-muted-foreground mb-6">
                  {option.description}
                </p>
                <ul className="space-y-3">
                  {option.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 md:py-24">
        <div className="container">
          <SectionHeading
            title="So funktioniert's"
            subtitle="In nur wenigen Schritten zur Finanzierung Ihrer Wunschmaschine."
          />

          <div className="max-w-3xl mx-auto">
            <div className="space-y-8">
              {[
                { step: "1", title: "Maschine auswählen", desc: "Wählen Sie aus unserem Bestand oder nennen Sie uns Ihren Wunsch." },
                { step: "2", title: "Finanzierung anfragen", desc: "Wir erstellen Ihnen unverbindlich verschiedene Finanzierungsangebote." },
                { step: "3", title: "Angebot prüfen", desc: "Vergleichen Sie in Ruhe und wählen Sie die beste Option." },
                { step: "4", title: "Vertrag abschließen", desc: "Schnelle Abwicklung – oft innerhalb von 48 Stunden." }
              ].map((item, index) => (
                <div key={item.step} className="flex gap-6 items-start">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold">
                    {item.step}
                  </div>
                  <div className="flex-1 pt-2">
                    <h3 className="text-xl font-semibold text-headline mb-1">{item.title}</h3>
                    <p className="text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl text-white">
              Interesse an einer Finanzierung?
            </h2>
            <p className="mt-6 text-lg text-primary-foreground/80">
              Kontaktieren Sie uns für ein unverbindliches Angebot – wir beraten Sie gerne persönlich.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold text-lg h-14 px-8"
              >
              <a href="tel:+4921514179904">
                  <Phone className="mr-2 h-5 w-5" />
                  Jetzt anrufen
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-2 border-white bg-transparent text-white hover:bg-white hover:text-primary h-14 px-8 font-semibold"
              >
                <Link to="/kontakt">
                  <Mail className="mr-2 h-5 w-5" />
                  Kontakt aufnehmen
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

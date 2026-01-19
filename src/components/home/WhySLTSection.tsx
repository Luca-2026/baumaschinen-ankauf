import { MapPin, Clock, BadgeCheck, Handshake, ExternalLink } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TrustBadge } from "@/components/ui/TrustBadge";

const reasons = [
  {
    icon: MapPin,
    title: "NRW-Präsenz",
    description: "3 Standorte in Krefeld, Bonn und Mülheim – wir sind immer in Ihrer Nähe.",
  },
  {
    icon: Clock,
    title: "Schnelle Rückmeldung",
    description: "Innerhalb von 24 Stunden erhalten Sie eine erste Einschätzung zu Ihrer Maschine.",
  },
  {
    icon: BadgeCheck,
    title: "Faire Preislogik",
    description: "Nachvollziehbare Bewertung basierend auf Marktwerten und Maschinenzustand.",
  },
  {
    icon: Handshake,
    title: "Professionelle Abwicklung",
    description: "Von der Bewertung bis zur Abholung – alles aus einer Hand.",
  },
];

export function WhySLTSection() {
  return (
    <section className="py-16 md:py-24 bg-background-muted">
      <div className="container">
        <SectionHeading
          title="Warum SLT?"
          subtitle="Als Teil der SLT Technology Group verbinden wir lokale Präsenz mit Branchenexpertise."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((reason) => (
            <div
              key={reason.title}
              className="rounded-xl border bg-card p-6 transition-shadow hover:shadow-md"
            >
              <TrustBadge
                icon={reason.icon}
                title={reason.title}
                description={reason.description}
              />
            </div>
          ))}
        </div>

        {/* Inzahlungnahme Hinweis */}
        <div className="mt-12 rounded-2xl border-2 border-accent/30 bg-accent/5 p-8 text-center">
          <h3 className="text-xl font-semibold text-headline mb-3">
            Interesse an einer Neumaschine?
          </h3>
          <p className="text-muted-foreground mb-4 max-w-2xl mx-auto">
            Nutzen Sie Ihre Gebrauchtmaschine als Inzahlungnahme beim Kauf einer neuen Zoomlion-Maschine. 
            Wir beraten Sie gerne zu den Möglichkeiten.
          </p>
          <a
            href="https://www.zoomlion-nrw.de"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-primary font-medium hover:text-primary/80 transition-colors"
          >
            Zoomlion NRW besuchen
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}

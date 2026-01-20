import { motion } from "framer-motion";
import { BadgeCheck, Clock, Truck, FileCheck, ExternalLink } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TrustBadge } from "@/components/ui/TrustBadge";

const reasons = [
  {
    icon: BadgeCheck,
    title: "Faire & professionelle Online-Bewertung",
    description: "Bei uns erhältst du einen fairen Preis – auch ohne Experte zu sein!",
  },
  {
    icon: Clock,
    title: "Maschinenverkauf innerhalb von 24 Stunden",
    description: "Verkaufe deine Maschine innerhalb eines einzigen Tages – stressfrei und ganz ohne Verhandeln!",
  },
  {
    icon: Truck,
    title: "Kostenlose Abholung in ganz NRW",
    description: "Wir holen deine Maschine kostenlos ab – bequem und unkompliziert.",
  },
  {
    icon: FileCheck,
    title: "Wir übernehmen den Papierkram",
    description: "Von der Bewertung bis zur Abwicklung – alles aus einer Hand, komplett stressfrei.",
  },
];

export function WhySLTSection() {
  return (
    <section className="py-16 md:py-24 bg-background-muted overflow-hidden">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <SectionHeading
            title="Warum bei wirkaufendeinebaumaschinen.de verkaufen?"
            subtitle="4 Gründe, warum du an uns verkaufen solltest"
          />
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((reason, index) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
              whileHover={{ y: -8, boxShadow: "0 20px 40px -12px rgb(0 0 0 / 0.15)" }}
              className="rounded-xl border bg-card p-6 transition-shadow"
            >
              <TrustBadge
                icon={reason.icon}
                title={reason.title}
                description={reason.description}
              />
            </motion.div>
          ))}
        </div>

        {/* Inzahlungnahme Hinweis */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          className="mt-12 rounded-2xl border-2 border-accent/30 bg-accent/5 p-8 text-center"
        >
          <h3 className="text-xl font-semibold text-headline mb-3">
            Interesse an einer Neumaschine?
          </h3>
          <p className="text-muted-foreground mb-4 max-w-2xl mx-auto">
            Nutzen Sie Ihre Gebrauchtmaschine als Inzahlungnahme beim Kauf einer neuen Zoomlion-Maschine. 
            Wir beraten Sie gerne zu den Möglichkeiten.
          </p>
          <motion.a
            href="https://www.zoomlion-nrw.de"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-primary font-medium hover:text-primary/80 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            Zoomlion NRW besuchen
            <ExternalLink className="h-4 w-4" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}

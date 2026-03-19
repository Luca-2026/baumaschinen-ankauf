import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { SEOHead } from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { MachineIcon } from "@/components/ui/MachineIcon";
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  Shield,
  Truck,
  FileText,
  Phone,
  Star,
  HelpCircle,
  MapPin,
  Wrench,
  TrendingUp,
} from "lucide-react";
import { useEffect } from "react";

const machineTypes = [
  { name: "Minibagger", weight: "0,8 – 10 t", examples: "Cat 301.7, Kubota KX057, Takeuchi TB260" },
  { name: "Kettenbagger", weight: "10 – 90 t", examples: "Cat 320, Komatsu PC210, Volvo EC220" },
  { name: "Mobilbagger", weight: "10 – 25 t", examples: "Liebherr A918, Cat M318, Doosan DX170W" },
  { name: "Radlader", weight: "1 – 30 t", examples: "Cat 950, Volvo L90, Liebherr L550" },
  { name: "Scherenarbeitsbühne", height: "6 – 18 m", examples: "JLG 2630ES, Genie GS-2646, Haulotte Compact 12" },
  { name: "Teleskoparbeitsbühne", height: "12 – 58 m", examples: "JLG 860SJ, Genie S-65, Haulotte H28TJ+" },
  { name: "Gelenkteleskopbühne", height: "12 – 45 m", examples: "JLG 450AJ, Genie Z-60, Niftylift HR21" },
  { name: "LKW-Arbeitsbühne", height: "15 – 100 m", examples: "Palfinger, Ruthmann, Bronto Skylift" },
];

const advantages = [
  { icon: TrendingUp, title: "Faire Marktpreise", desc: "Bewertung basiert auf aktuellen Marktdaten – Sie erhalten einen realistischen, fairen Preis." },
  { icon: Clock, title: "Schnelle Abwicklung", desc: "Vom ersten Kontakt bis zur Auszahlung vergehen oft nur 24–48 Stunden." },
  { icon: Truck, title: "Kostenlose Abholung", desc: "Wir holen Ihre Baumaschine in ganz NRW kostenlos bei Ihnen ab." },
  { icon: FileText, title: "Komplette Abwicklung", desc: "Ummeldung, Dokumentation, Transport – wir kümmern uns um alles." },
  { icon: Shield, title: "Seriöser Partner", desc: "SLT Technology Group mit 3 Standorten in NRW – persönlich und zuverlässig." },
  { icon: Star, title: "Auch defekte Maschinen", desc: "Wir kaufen auch reparaturbedürftige Baumaschinen und Unfallmaschinen an." },
];

const steps = [
  { num: "1", title: "Daten eingeben", desc: "Füllen Sie unser Online-Formular in nur 2 Minuten aus. Fotos und Maschinendaten genügen." },
  { num: "2", title: "Preisangebot erhalten", desc: "Sie erhalten sofort einen unverbindlichen Referenzpreis basierend auf aktuellen Marktdaten." },
  { num: "3", title: "Verbindliches Angebot", desc: "Unser Experten-Team prüft die Angaben und erstellt Ihnen ein verbindliches Kaufangebot." },
  { num: "4", title: "Abholung & Zahlung", desc: "Bei Einigung holen wir die Maschine kostenlos ab. Die Zahlung erfolgt sofort bei Übergabe." },
];

const faqItems = [
  {
    q: "Welche Baumaschinen kann ich verkaufen?",
    a: "Wir kaufen alle gängigen Baumaschinen: Bagger (Minibagger, Kettenbagger, Mobilbagger), Radlader, Arbeitsbühnen (Schere, Teleskop, Gelenk), sowie weitere Baugeräte. Auch defekte oder ältere Maschinen sind willkommen.",
  },
  {
    q: "Wie wird der Ankaufpreis für meine Baumaschine berechnet?",
    a: "Der Preis basiert auf aktuellen Marktdaten, Zustand, Baujahr, Betriebsstunden und Ausstattung Ihrer Maschine. Sie erhalten zunächst einen Referenzpreis online und danach ein verbindliches Angebot von unserem Expertenteam.",
  },
  {
    q: "Ist der Baumaschinen-Ankauf wirklich kostenlos?",
    a: "Ja, der gesamte Prozess ist für Sie kostenlos: Die Bewertung, das Angebot und die Abholung in NRW – es entstehen keinerlei Kosten oder Verpflichtungen für Sie.",
  },
  {
    q: "Wie schnell kann ich meine Baumaschine verkaufen?",
    a: "In der Regel dauert der gesamte Prozess 24–48 Stunden. Vom Online-Formular bis zur Auszahlung kann alles sehr schnell gehen, da wir die Abwicklung komplett übernehmen.",
  },
  {
    q: "Kaufen Sie auch Baumaschinen mit Schäden oder hohen Betriebsstunden?",
    a: "Ja, wir kaufen auch reparaturbedürftige Maschinen, Unfallmaschinen und Geräte mit hoher Laufleistung an. Der Zustand wird bei der Preisfindung natürlich berücksichtigt.",
  },
  {
    q: "In welcher Region kaufen Sie Baumaschinen an?",
    a: "Unser Schwerpunkt liegt in NRW mit Standorten in Krefeld, Bonn und Mülheim an der Ruhr. Kostenlose Abholung bieten wir in ganz Nordrhein-Westfalen an. Bei größeren Maschinen kommen wir auch bundesweit.",
  },
];

export default function BaumaschinenVerkaufen() {
  useEffect(() => {
    const schema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqItems.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    };
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify(schema);
    document.head.appendChild(script);
    return () => { document.head.removeChild(script); };
  }, []);

  return (
    <Layout>
      <SEOHead
        title="Baumaschinen verkaufen | Ankauf von Bagger & Arbeitsbühne in NRW"
        description="Baumaschinen verkaufen – schnell, fair und kostenlos! ✓ Bagger ✓ Arbeitsbühnen ✓ Radlader ✓ Kostenlose Bewertung ✓ Abholung in NRW ✓ Sofortige Zahlung. Jetzt Ankaufpreis erhalten!"
        keywords="Baumaschinen verkaufen, Baumaschinen Ankauf, Baumaschine verkaufen, Ankauf Baumaschinen, Bagger verkaufen, Arbeitsbühne verkaufen, gebrauchte Baumaschinen verkaufen, Baugeräte verkaufen, Maschinen Ankauf NRW, Baumaschinen Ankauf in der Nähe"
        canonicalPath="/baumaschinen-verkaufen"
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary to-primary/90 text-primary-foreground py-16 md:py-24">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
        <div className="container relative px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Baumaschinen verkaufen –{" "}
              <span className="text-accent">schnell, fair & kostenlos</span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-primary-foreground/85 max-w-3xl mx-auto">
              Sie möchten Ihre Baumaschine verkaufen? Wir kaufen Bagger, Arbeitsbühnen, Radlader und weitere Baugeräte in ganz NRW. 
              Kostenlose Bewertung in 2 Minuten – faire Preise – sofortige Zahlung.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold text-lg h-14 px-8">
                  <Link to="/ankauf">
                    Jetzt Baumaschine bewerten
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                <Button asChild variant="outline" size="lg" className="border-2 border-white bg-transparent text-white hover:bg-white hover:text-primary h-14 px-8 font-semibold">
                  <a href="tel:+4921514179904">
                    <Phone className="mr-2 h-5 w-5" />
                    02151 417 990 4
                  </a>
                </Button>
              </motion.div>
            </div>
            <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm">
              {["100% kostenlos", "Bewertung in 2 Min", "Abholung in NRW", "Sofortige Zahlung"].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-accent" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Intro Text - SEO Content */}
      <section className="py-12 md:py-16 bg-background">
        <div className="container px-4 sm:px-6">
          <AnimatedSection className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-headline mb-6">
              Baumaschinen verkaufen: So einfach geht's
            </h2>
            <div className="prose prose-lg text-muted-foreground max-w-none space-y-4">
              <p>
                <strong>Baumaschinen verkaufen</strong> muss nicht kompliziert sein. Ob Sie einen <strong>Bagger verkaufen</strong>, eine <strong>Arbeitsbühne verkaufen</strong> oder einen <strong>Radlader</strong> loswerden möchten – bei <strong>wirkaufendeinebaumaschinen.de</strong> erhalten Sie in wenigen Minuten eine kostenlose und unverbindliche Bewertung Ihrer Maschine.
              </p>
              <p>
                Als Spezialist für den <strong>Baumaschinen Ankauf in NRW</strong> bieten wir Ihnen einen transparenten, schnellen und fairen Verkaufsprozess. 
                Mit drei Standorten in <strong>Krefeld, Bonn und Mülheim an der Ruhr</strong> sind wir Ihr regionaler Partner für den Verkauf gebrauchter Baumaschinen.
              </p>
              <p>
                Egal ob Ihre Maschine in einwandfreiem Zustand ist oder <strong>Reparaturbedarf</strong> hat – wir erstellen Ihnen ein faires Angebot. 
                Auch <strong>ältere Baumaschinen</strong> und Geräte mit hohen Betriebsstunden kaufen wir gerne an.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Machine Types */}
      <section className="py-12 md:py-16 bg-background-muted">
        <div className="container px-4 sm:px-6">
          <AnimatedSection>
            <h2 className="text-2xl md:text-3xl font-bold text-headline text-center mb-4">
              Diese Baumaschinen kaufen wir an
            </h2>
            <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
              Von Minibaggern bis Teleskoparbeitsbühnen – wir kaufen alle gängigen Baumaschinen und Baugeräte an.
            </p>
          </AnimatedSection>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
            {machineTypes.map((machine, index) => (
              <AnimatedSection key={machine.name} delay={index * 0.05}>
                <div className="bg-card rounded-xl p-5 shadow-sm border border-border hover:border-primary/30 hover:shadow-md transition-all h-full">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Wrench className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="font-semibold text-headline">{machine.name}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">
                    {machine.weight ? `Gewicht: ${machine.weight}` : `Arbeitshöhe: ${machine.height}`}
                  </p>
                  <p className="text-xs text-muted-foreground/70">z.B. {machine.examples}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
          <AnimatedSection className="text-center mt-8">
            <p className="text-muted-foreground mb-4">Ihre Maschine ist nicht dabei? Kein Problem – kontaktieren Sie uns!</p>
            <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
              <Link to="/kontakt">Anfrage stellen</Link>
            </Button>
          </AnimatedSection>
        </div>
      </section>

      {/* Advantages */}
      <section className="py-12 md:py-16 bg-background">
        <div className="container px-4 sm:px-6">
          <AnimatedSection>
            <h2 className="text-2xl md:text-3xl font-bold text-headline text-center mb-4">
              Warum Baumaschinen bei uns verkaufen?
            </h2>
            <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
              Wir machen den Baumaschinen-Verkauf so einfach wie möglich – ohne versteckte Kosten oder Verpflichtungen.
            </p>
          </AnimatedSection>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
            {advantages.map((item, index) => (
              <AnimatedSection key={item.title} delay={index * 0.07}>
                <div className="flex gap-4 p-5 rounded-xl bg-card shadow-sm border border-border h-full">
                  <div className="h-12 w-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                    <item.icon className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-headline mb-1">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-12 md:py-16 bg-background-muted">
        <div className="container px-4 sm:px-6">
          <AnimatedSection>
            <h2 className="text-2xl md:text-3xl font-bold text-headline text-center mb-4">
              Baumaschine verkaufen in 4 Schritten
            </h2>
            <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
              Von der Bewertung bis zur Auszahlung – der gesamte Verkaufsprozess dauert oft nur 24 Stunden.
            </p>
          </AnimatedSection>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 max-w-5xl mx-auto">
            {steps.map((step, index) => (
              <AnimatedSection key={step.num} delay={index * 0.1}>
                <div className="relative bg-card rounded-xl p-6 shadow-sm border border-border text-center h-full">
                  <div className="h-12 w-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold mx-auto mb-4">
                    {step.num}
                  </div>
                  <h3 className="font-semibold text-headline mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Deep SEO Content */}
      <section className="py-12 md:py-16 bg-background">
        <div className="container px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <AnimatedSection>
              <h2 className="text-2xl md:text-3xl font-bold text-headline mb-6">
                Baumaschinen verkaufen: Was Sie wissen sollten
              </h2>
            </AnimatedSection>

            <div className="space-y-8">
              <AnimatedSection>
                <h3 className="text-xl font-semibold text-headline mb-3">
                  Was beeinflusst den Wert Ihrer Baumaschine?
                </h3>
                <div className="prose text-muted-foreground max-w-none">
                  <p>
                    Der Ankaufpreis einer Baumaschine hängt von verschiedenen Faktoren ab. Die wichtigsten Kriterien für die Bewertung sind:
                  </p>
                  <ul className="space-y-2 mt-3">
                    <li><strong>Baujahr und Betriebsstunden:</strong> Neuere Maschinen mit wenigen Betriebsstunden erzielen höhere Preise. Die Betriebsstunden sind bei Baumaschinen ein wichtigerer Indikator als bei PKWs der Kilometerstand.</li>
                    <li><strong>Zustand und Wartung:</strong> Regelmäßig gewartete Maschinen mit Serviceheft sind deutlich wertvoller. Ein gepflegtes Erscheinungsbild und funktionierendes Zubehör steigern den Wert.</li>
                    <li><strong>Hersteller und Modell:</strong> Marken wie Caterpillar, Komatsu, Liebherr, Volvo, JLG oder Genie haben generell einen höheren Wiederverkaufswert.</li>
                    <li><strong>Ausstattung:</strong> Zusatzausstattung wie Schnellwechsler, GPS-System, Klimaanlage oder spezielle Anbaugeräte können den Wert steigern.</li>
                    <li><strong>CE-Kennzeichnung und UVV:</strong> Gültige Prüfzertifikate erhöhen den Marktwert Ihrer Maschine erheblich.</li>
                  </ul>
                </div>
              </AnimatedSection>

              <AnimatedSection>
                <h3 className="text-xl font-semibold text-headline mb-3">
                  Baumaschinen privat verkaufen vs. an Händler verkaufen
                </h3>
                <div className="prose text-muted-foreground max-w-none">
                  <p>
                    Beim <strong>privaten Verkauf</strong> über Plattformen wie Mascus, MachineryTrader oder eBay Kleinanzeigen können Sie unter Umständen einen höheren Preis erzielen. Allerdings müssen Sie mit langen Wartezeiten, unseriösen Anfragen und dem Aufwand für Inserate, Besichtigungen und Verhandlungen rechnen.
                  </p>
                  <p>
                    Der <strong>Verkauf an einen Fachhändler</strong> wie wirkaufendeinebaumaschinen.de bietet dagegen entscheidende Vorteile:
                  </p>
                  <ul className="space-y-1 mt-2">
                    <li>Sofortige, verbindliche Angebote ohne wochenlange Wartezeit</li>
                    <li>Keine Kosten für Inserate oder Standgebühren</li>
                    <li>Professionelle und rechtssichere Abwicklung</li>
                    <li>Kostenlose Abholung – kein Transportrisiko für Sie</li>
                    <li>Sofortige Zahlung bei Übergabe</li>
                  </ul>
                </div>
              </AnimatedSection>

              <AnimatedSection>
                <h3 className="text-xl font-semibold text-headline mb-3">
                  Tipps für einen höheren Verkaufspreis
                </h3>
                <div className="prose text-muted-foreground max-w-none">
                  <ol className="space-y-2 mt-2">
                    <li><strong>Reinigung:</strong> Eine saubere Maschine wirkt gepflegt und erzielt bessere Preise.</li>
                    <li><strong>Dokumentation:</strong> Halten Sie Serviceheft, UVV-Prüfbericht und CE-Zertifikat bereit.</li>
                    <li><strong>Gute Fotos:</strong> Fotografieren Sie die Maschine von allen Seiten, auch den Innenraum und eventuelle Schäden.</li>
                    <li><strong>Ehrliche Angaben:</strong> Transparenz über Schäden oder Mängel beschleunigt den Verkaufsprozess.</li>
                    <li><strong>Timing:</strong> Im Frühjahr und Sommer ist die Nachfrage nach Baumaschinen typischerweise höher.</li>
                  </ol>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 md:py-16 bg-background-muted">
        <div className="container px-4 sm:px-6">
          <AnimatedSection>
            <h2 className="text-2xl md:text-3xl font-bold text-headline text-center mb-10">
              Häufige Fragen zum Baumaschinen-Verkauf
            </h2>
          </AnimatedSection>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqItems.map((item, index) => (
              <AnimatedSection key={index} delay={index * 0.05}>
                <details className="group bg-card rounded-xl border border-border shadow-sm">
                  <summary className="flex items-start gap-3 p-5 cursor-pointer list-none font-semibold text-headline hover:text-primary transition-colors">
                    <HelpCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span>{item.q}</span>
                  </summary>
                  <div className="px-5 pb-5 pl-13 text-sm text-muted-foreground leading-relaxed">
                    {item.a}
                  </div>
                </details>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Regional Coverage */}
      <section className="py-12 md:py-16 bg-background">
        <div className="container px-4 sm:px-6">
          <AnimatedSection>
            <h2 className="text-2xl md:text-3xl font-bold text-headline text-center mb-4">
              Baumaschinen Ankauf in ganz NRW
            </h2>
            <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
              Mit drei Standorten in Nordrhein-Westfalen sind wir schnell bei Ihnen. Kostenlose Abholung in allen Regionen.
            </p>
          </AnimatedSection>
          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {[
              { city: "Düsseldorf", path: "/bagger-verkaufen-duesseldorf" },
              { city: "Köln", path: "/bagger-verkaufen-koeln" },
              { city: "Dortmund", path: "/bagger-verkaufen-dortmund" },
              { city: "Essen", path: "/bagger-verkaufen-essen" },
              { city: "Duisburg", path: "/bagger-verkaufen-duisburg" },
              { city: "Bochum", path: "/bagger-verkaufen-bochum" },
              { city: "Wuppertal", path: "/bagger-verkaufen-wuppertal" },
              { city: "Münster", path: "/bagger-verkaufen-muenster" },
              { city: "Bielefeld", path: "/bagger-verkaufen-bielefeld" },
              { city: "Bonn", path: "/bagger-verkaufen-bonn" },
              { city: "Krefeld", path: "/bagger-verkaufen-krefeld" },
              { city: "Gelsenkirchen", path: "/bagger-verkaufen-gelsenkirchen" },
              { city: "Mülheim", path: "/bagger-verkaufen-muelheim" },
              { city: "Oberhausen", path: "/bagger-verkaufen-oberhausen" },
              { city: "Mönchengladbach", path: "/bagger-verkaufen-moenchengladbach" },
              { city: "Aachen", path: "/bagger-verkaufen-aachen" },
            ].map((item) => (
              <Link
                key={item.city}
                to={item.path}
                className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-primary/5 border border-primary/15 text-sm text-headline hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <MapPin className="h-3.5 w-3.5" />
                {item.city}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container px-4 sm:px-6">
          <AnimatedSection className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white">
              Jetzt Baumaschine verkaufen!
            </h2>
            <p className="mt-4 text-lg text-primary-foreground/80">
              Starten Sie den kostenlosen Ankauf-Check und erhalten Sie in 2 Minuten Ihren unverbindlichen Referenzpreis.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold text-lg h-14 px-8">
                  <Link to="/ankauf">
                    Kostenlos bewerten lassen
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </motion.div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </Layout>
  );
}

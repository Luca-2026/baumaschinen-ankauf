import { Layout } from "@/components/layout/Layout";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Link } from "react-router-dom";
import { ArrowRight, HelpCircle, Phone } from "lucide-react";

const faqCategories = [
  {
    title: "Ankauf & Verkauf",
    questions: [
      {
        question: "Welche Maschinen kaufen Sie an?",
        answer: "Wir kaufen Bagger (Mini-, Midi-, Ketten-, Mobilbagger) und Arbeitsbühnen (Scheren-, Gelenk-, Teleskopbühnen, LKW-Arbeitsbühnen) an. Die Maschinen sollten idealerweise ab Baujahr 2000 (Bagger) bzw. 2005 (Arbeitsbühnen) sein und sich in einem funktionstüchtigen Zustand befinden. Auch ältere Modelle oder Maschinen mit höheren Betriebsstunden können wir oft ankaufen – fragen Sie einfach an!"
      },
      {
        question: "Wie erhalte ich ein Angebot für meine Maschine?",
        answer: "Starten Sie einfach unseren kostenlosen Ankauf-Check auf der Website. In nur 2-3 Minuten geben Sie die wichtigsten Daten Ihrer Maschine ein und erhalten sofort eine erste Preiseinschätzung. Anschließend prüft unser Expertenteam Ihre Angaben und erstellt Ihnen innerhalb von 24-48 Stunden ein verbindliches Angebot."
      },
      {
        question: "Ist die Preiseinschätzung verbindlich?",
        answer: "Die erste Preiseinschätzung basiert auf aktuellen Marktdaten und Ihren Angaben. Das finale verbindliche Angebot erhalten Sie nach Prüfung durch unser Expertenteam. Bei Vor-Ort-Besichtigung kann der Preis je nach tatsächlichem Zustand angepasst werden."
      },
      {
        question: "Muss meine Maschine fahrtüchtig sein?",
        answer: "Nein, wir kaufen auch nicht fahrbereite Maschinen an. Allerdings kann sich der Zustand auf den Ankaufspreis auswirken. Bitte geben Sie im Ankauf-Check möglichst genaue Informationen zum Zustand an."
      }
    ]
  },
  {
    title: "Abwicklung & Zahlung",
    questions: [
      {
        question: "Wie läuft die Abholung ab?",
        answer: "Nach Vertragsabschluss organisieren wir die Abholung Ihrer Maschine. In NRW ist die Abholung für Sie kostenlos. Wir kümmern uns um Transport und Logistik – Sie müssen nichts weiter veranlassen."
      },
      {
        question: "Wann erhalte ich mein Geld?",
        answer: "Die Zahlung erfolgt in der Regel innerhalb von 1-3 Werktagen nach Abholung und finaler Prüfung der Maschine. Bei Barzahlung vor Ort ist auch eine sofortige Auszahlung möglich."
      },
      {
        question: "Welche Zahlungsmethoden bieten Sie an?",
        answer: "Wir zahlen per Überweisung auf Ihr Geschäftskonto. Bei kleineren Beträgen ist auch Barzahlung bei Abholung möglich. Alle Zahlungen werden ordnungsgemäß dokumentiert."
      },
      {
        question: "Muss ich die Maschine vorher abmelden?",
        answer: "Falls Ihre Maschine zugelassen ist, kümmern wir uns gerne um die Abmeldung. Besprechen Sie dies einfach mit unserem Team bei der Angebotsannahme."
      }
    ]
  },
  {
    title: "Gebrauchtmaschinen & Finanzierung",
    questions: [
      {
        question: "Bieten Sie auch Maschinen zum Kauf an?",
        answer: "Ja! In unserem Bestand finden Sie geprüfte Gebrauchtmaschinen – Bagger und Arbeitsbühnen verschiedener Hersteller. Alle Maschinen werden vor dem Verkauf technisch geprüft."
      },
      {
        question: "Kann ich eine Maschine finanzieren?",
        answer: "Selbstverständlich! Wir bieten verschiedene Finanzierungsoptionen an: Leasing, Mietkauf oder klassische Finanzierung. Unser Team berät Sie gerne zu den Möglichkeiten."
      },
      {
        question: "Gibt es Garantie auf Gebrauchtmaschinen?",
        answer: "Je nach Maschine und Zustand bieten wir unterschiedliche Garantieoptionen an. Details besprechen wir gerne im persönlichen Gespräch."
      }
    ]
  },
  {
    title: "Allgemeine Fragen",
    questions: [
      {
        question: "Wo sind Ihre Standorte?",
        answer: "Wir haben drei Standorte in NRW: Krefeld (Hauptsitz), Bonn und Mülheim an der Ruhr. Von dort aus bedienen wir ganz Nordrhein-Westfalen und darüber hinaus."
      },
      {
        question: "Arbeiten Sie auch mit Unternehmen zusammen?",
        answer: "Ja, wir arbeiten sowohl mit Privatpersonen als auch mit Unternehmen zusammen. Für gewerbliche Kunden bieten wir spezielle Konditionen und schnelle Abwicklung."
      },
      {
        question: "Wie kann ich Sie erreichen?",
        answer: "Sie erreichen uns telefonisch, per E-Mail oder über unser Kontaktformular. Unsere Bürozeiten sind Montag bis Freitag von 08:00 bis 17:00 Uhr."
      }
    ]
  }
];

export default function FAQ() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 via-background to-accent/5 py-16 md:py-24">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-6">
              <HelpCircle className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-headline md:text-5xl mb-6">
              Häufig gestellte Fragen
            </h1>
            <p className="text-xl text-muted-foreground">
              Hier finden Sie Antworten auf die wichtigsten Fragen rund um 
              Ankauf, Verkauf und Finanzierung von Baumaschinen.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            {faqCategories.map((category, categoryIndex) => (
              <div key={category.title} className="mb-12 last:mb-0">
                <h2 className="text-2xl font-bold text-headline mb-6">
                  {category.title}
                </h2>
                <Accordion type="single" collapsible className="space-y-4">
                  {category.questions.map((faq, index) => (
                    <AccordionItem
                      key={index}
                      value={`${categoryIndex}-${index}`}
                      className="rounded-lg border bg-card px-6"
                    >
                      <AccordionTrigger className="text-left font-semibold hover:no-underline py-5">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground pb-5">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl text-white">
              Noch Fragen?
            </h2>
            <p className="mt-6 text-lg text-primary-foreground/80">
              Unser Team steht Ihnen gerne für weitere Fragen zur Verfügung.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold text-lg h-14 px-8"
              >
                <Link to="/kontakt">
                  Kontakt aufnehmen
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-2 border-white bg-transparent text-white hover:bg-white hover:text-primary h-14 px-8 font-semibold"
              >
                <a href="tel:+492151XXXXXX">
                  <Phone className="mr-2 h-5 w-5" />
                  Anrufen
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

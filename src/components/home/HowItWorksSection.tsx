import { 
  FileText, 
  Calculator, 
  CalendarCheck, 
  ClipboardCheck, 
  Banknote 
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StepCard } from "@/components/ui/StepCard";

const steps = [
  {
    step: 1,
    icon: FileText,
    title: "Daten eingeben",
    description: "Geben Sie die wichtigsten Daten zu Ihrer Baumaschine ein – in nur 2 Minuten.",
  },
  {
    step: 2,
    icon: Calculator,
    title: "Referenzpreis erhalten",
    description: "Sie erhalten sofort einen unverbindlichen Referenzpreis als Orientierung.",
  },
  {
    step: 3,
    icon: CalendarCheck,
    title: "Termin vereinbaren",
    description: "Wählen Sie einen passenden Termin zur Besichtigung – bei Ihnen oder an unserem Standort.",
  },
  {
    step: 4,
    icon: ClipboardCheck,
    title: "Prüfung & Angebot",
    description: "Wir prüfen Ihre Maschine und erstellen ein verbindliches Ankaufangebot.",
  },
  {
    step: 5,
    icon: Banknote,
    title: "Auszahlung",
    description: "Nach Einigung erfolgt die schnelle Auszahlung und Abholung der Maschine.",
  },
];

export function HowItWorksSection() {
  return (
    <section className="py-16 md:py-24 bg-background-muted">
      <div className="container">
        <SectionHeading
          title="So funktioniert's"
          subtitle="In 5 einfachen Schritten vom Angebot zur Auszahlung – transparent und unkompliziert."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {steps.map((step, index) => (
            <div key={step.step} className="relative">
              <StepCard
                step={step.step}
                icon={step.icon}
                title={step.title}
                description={step.description}
              />
              {/* Connector Line (hidden on last item and mobile) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-border" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

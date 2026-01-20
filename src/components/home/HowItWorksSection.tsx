import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  FileText, 
  Calculator, 
  CalendarCheck, 
  ClipboardCheck, 
  Banknote,
  ChevronRight
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

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

interface AnimatedStepCardProps {
  step: number;
  icon: LucideIcon;
  title: string;
  description: string;
  isActive: boolean;
  isPast: boolean;
  index: number;
}

function AnimatedStepCard({ step, icon: Icon, title, description, isActive, isPast, index }: AnimatedStepCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.05, ease: "easeOut" }}
      whileHover={{ y: -8 }}
      className={cn(
        "relative flex flex-col items-center text-center p-4 sm:p-6 rounded-xl transition-all duration-300",
        isActive
          ? "bg-card shadow-xl border-2 border-accent sm:scale-105"
          : isPast
          ? "bg-card/80 shadow-sm border border-success/30"
          : "bg-card shadow-sm border border-border hover:shadow-md"
      )}
    >
      {/* Step Number */}
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 + index * 0.05, type: "spring", stiffness: 300 }}
        className={cn(
          "absolute -top-2.5 sm:-top-3 left-1/2 -translate-x-1/2 flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded-full text-xs font-bold transition-all duration-300",
          isActive
            ? "bg-accent text-accent-foreground sm:scale-125 shadow-lg"
            : isPast
            ? "bg-success text-white"
            : "bg-primary text-primary-foreground"
        )}
      >
        {isPast ? "✓" : step}
      </motion.div>

      {/* Icon */}
      <motion.div
        animate={isActive ? { scale: [1, 1.1, 1] } : {}}
        transition={{ repeat: isActive ? Infinity : 0, duration: 2 }}
        className={cn(
          "mb-3 sm:mb-4 flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center rounded-full transition-all duration-500",
          isActive 
            ? "bg-accent/20" 
            : isPast 
            ? "bg-success/10" 
            : "bg-primary/10"
        )}
      >
        <Icon
          className={cn(
            "h-6 w-6 sm:h-8 sm:w-8 transition-all duration-300",
            isActive 
              ? "text-accent" 
              : isPast 
              ? "text-success" 
              : "text-primary"
          )}
        />
      </motion.div>

      {/* Content */}
      <h3 className={cn(
        "mb-1 sm:mb-2 font-semibold text-sm sm:text-base transition-colors duration-300",
        isActive ? "text-accent" : "text-headline"
      )}>
        {title}
      </h3>
      <p className="text-xs sm:text-sm text-muted-foreground line-clamp-3">{description}</p>
    </motion.div>
  );
}

export function HowItWorksSection() {
  const [activeStep, setActiveStep] = useState(0);
  
  // Auto-advance through steps for visual effect
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % (steps.length + 1));
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-10 sm:py-16 md:py-24 bg-background-muted overflow-hidden">
      <div className="container px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <SectionHeading
            title="So funktioniert's"
            subtitle="In 5 einfachen Schritten vom Angebot zur Auszahlung – transparent und unkompliziert."
          />
        </motion.div>

        <div className="grid gap-4 sm:gap-6 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
          {steps.map((step, index) => (
            <div key={step.step} className="relative">
              <AnimatedStepCard
                step={step.step}
                icon={step.icon}
                title={step.title}
                description={step.description}
                isActive={activeStep === index + 1}
                isPast={activeStep > index + 1}
                index={index}
              />
              {/* Animated Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:flex absolute top-1/2 -right-3 items-center">
                  <motion.div 
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                    className={cn(
                      "w-6 h-0.5 origin-left transition-colors duration-500",
                      activeStep > index + 1 ? "bg-success" : "bg-border"
                    )} 
                  />
                  <ChevronRight className={cn(
                    "h-4 w-4 -ml-1 transition-all duration-500",
                    activeStep > index + 1 
                      ? "text-success" 
                      : activeStep === index + 1 
                      ? "text-accent animate-pulse" 
                      : "text-muted-foreground"
                  )} />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Progress Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="flex justify-center mt-8 gap-2"
        >
          {steps.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => setActiveStep(index + 1)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              className={cn(
                "w-2 h-2 rounded-full transition-all duration-300",
                activeStep === index + 1
                  ? "bg-accent w-6"
                  : activeStep > index + 1
                  ? "bg-success"
                  : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
              )}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

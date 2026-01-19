import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface WizardStepperProps {
  currentStep: number;
  onStepClick: (step: number) => void;
}

const steps = [
  { number: 1, label: "Kategorie" },
  { number: 2, label: "Hersteller" },
  { number: 3, label: "Basisdaten" },
  { number: 4, label: "Zustand" },
  { number: 5, label: "Medien" },
  { number: 6, label: "Kontakt" },
];

export function WizardStepper({ currentStep, onStepClick }: WizardStepperProps) {
  return (
    <div className="mb-8">
      {/* Mobile: Simple progress */}
      <div className="md:hidden">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-foreground">
            Schritt {currentStep} von 6
          </span>
          <span className="text-sm text-muted-foreground">
            {steps[currentStep - 1].label}
          </span>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-accent transition-all duration-300"
            style={{ width: `${(currentStep / 6) * 100}%` }}
          />
        </div>
      </div>

      {/* Desktop: Full stepper */}
      <div className="hidden md:flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.number} className="flex items-center">
            <button
              onClick={() => onStepClick(step.number)}
              disabled={step.number > currentStep}
              className={cn(
                "flex flex-col items-center gap-2 transition-all",
                step.number <= currentStep ? "cursor-pointer" : "cursor-not-allowed opacity-50"
              )}
            >
              <div
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all",
                  step.number < currentStep
                    ? "bg-accent border-accent text-accent-foreground"
                    : step.number === currentStep
                    ? "bg-primary border-primary text-primary-foreground"
                    : "bg-muted border-border text-muted-foreground"
                )}
              >
                {step.number < currentStep ? (
                  <Check className="h-5 w-5" />
                ) : (
                  <span className="text-sm font-semibold">{step.number}</span>
                )}
              </div>
              <span
                className={cn(
                  "text-xs font-medium",
                  step.number <= currentStep ? "text-foreground" : "text-muted-foreground"
                )}
              >
                {step.label}
              </span>
            </button>

            {/* Connector line */}
            {index < steps.length - 1 && (
              <div
                className={cn(
                  "flex-1 h-0.5 mx-2 transition-all",
                  step.number < currentStep ? "bg-accent" : "bg-border"
                )}
                style={{ minWidth: "40px" }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

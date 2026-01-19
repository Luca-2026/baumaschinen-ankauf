import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StepCardProps {
  step: number;
  icon: LucideIcon;
  title: string;
  description: string;
  isActive?: boolean;
  className?: string;
}

export function StepCard({
  step,
  icon: Icon,
  title,
  description,
  isActive = false,
  className,
}: StepCardProps) {
  return (
    <div
      className={cn(
        "relative flex flex-col items-center text-center p-6 rounded-xl transition-all",
        isActive
          ? "bg-card shadow-lg border-2 border-accent"
          : "bg-card shadow-sm border border-border hover:shadow-md",
        className
      )}
    >
      {/* Step Number */}
      <div
        className={cn(
          "absolute -top-3 left-1/2 -translate-x-1/2 flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold",
          isActive
            ? "bg-accent text-accent-foreground"
            : "bg-primary text-primary-foreground"
        )}
      >
        {step}
      </div>

      {/* Icon */}
      <div
        className={cn(
          "mb-4 flex h-16 w-16 items-center justify-center rounded-full",
          isActive ? "bg-accent/10" : "bg-primary/10"
        )}
      >
        <Icon
          className={cn(
            "h-8 w-8",
            isActive ? "text-accent" : "text-primary"
          )}
        />
      </div>

      {/* Content */}
      <h3 className="mb-2 font-semibold text-headline">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}

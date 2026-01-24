import { cn } from "@/lib/utils";

interface BrandNameProps {
  className?: string;
  variant?: "light" | "dark";
}

export function BrandName({ className, variant = "dark" }: BrandNameProps) {
  const baseColor = variant === "light" ? "text-primary-foreground" : "text-primary";
  
  return (
    <span className={cn("font-bold", className)}>
      <span className={baseColor}>wir</span>
      <span className="text-accent">kaufen</span>
      <span className={baseColor}>deine</span>
      <span className="text-accent">baumaschinen</span>
      <span className={baseColor}>.de</span>
    </span>
  );
}

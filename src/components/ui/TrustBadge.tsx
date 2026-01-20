import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface TrustBadgeProps {
  icon: LucideIcon;
  title: string;
  description?: string;
  variant?: "default" | "compact";
  className?: string;
}

export function TrustBadge({
  icon: Icon,
  title,
  description,
  variant = "default",
  className,
}: TrustBadgeProps) {
  if (variant === "compact") {
    return (
      <div className={cn("flex items-center gap-2", className)}>
        <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-primary/10 shrink-0">
          <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" />
        </div>
        <span className="text-xs sm:text-sm font-medium text-foreground">{title}</span>
      </div>
    );
  }

  return (
    <div className={cn("flex items-start gap-2 sm:gap-3", className)}>
      <div className="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
        <Icon className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
      </div>
      <div>
        <h4 className="font-semibold text-headline text-sm sm:text-base">{title}</h4>
        {description && (
          <p className="text-xs sm:text-sm text-muted-foreground">{description}</p>
        )}
      </div>
    </div>
  );
}

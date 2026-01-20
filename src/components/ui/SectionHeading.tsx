import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

export function SectionHeading({
  title,
  subtitle,
  centered = true,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn(centered && "text-center", "mb-8 sm:mb-12", className)}>
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-headline">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 sm:mt-4 text-sm sm:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto px-2">
          {subtitle}
        </p>
      )}
    </div>
  );
}

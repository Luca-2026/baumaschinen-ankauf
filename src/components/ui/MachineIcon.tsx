import { cn } from "@/lib/utils";
import baggerIcon from "@/assets/icons/icon-bagger.png";
import arbeitsbuehneIcon from "@/assets/icons/icon-arbeitsbuehne.png";

interface MachineIconProps {
  type: "bagger" | "arbeitsbuehne";
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl";
  className?: string;
}

const sizeClasses = {
  sm: "h-5 w-5",
  md: "h-8 w-8",
  lg: "h-12 w-12",
  xl: "h-20 w-20",
  "2xl": "h-28 w-28",
  "3xl": "h-36 w-36",
  "4xl": "h-48 w-48",
};

export function MachineIcon({ type, size = "md", className }: MachineIconProps) {
  const icon = type === "bagger" ? baggerIcon : arbeitsbuehneIcon;
  const alt = type === "bagger" ? "Bagger Icon" : "Arbeitsbühne Icon";
  
  return (
    <img
      src={icon}
      alt={alt}
      className={cn(sizeClasses[size], "object-contain", className)}
    />
  );
}
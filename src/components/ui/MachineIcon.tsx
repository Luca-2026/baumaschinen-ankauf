import { cn } from "@/lib/utils";
import baggerIcon from "@/assets/icons/icon-bagger.png";
import arbeitsbuehneIcon from "@/assets/icons/icon-arbeitsbuehne.png";

interface MachineIconProps {
  type: "bagger" | "arbeitsbuehne";
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

const sizeClasses = {
  sm: "h-4 w-4",
  md: "h-6 w-6",
  lg: "h-10 w-10",
  xl: "h-16 w-16",
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
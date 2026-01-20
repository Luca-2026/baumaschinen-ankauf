import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";

interface WarrantyBadgeProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function WarrantyBadge({ className = "", size = "md" }: WarrantyBadgeProps) {
  const sizeClasses = {
    sm: "text-xs px-2 py-1 gap-1",
    md: "text-sm px-3 py-1.5 gap-1.5",
    lg: "text-base px-4 py-2 gap-2",
  };

  const iconSizes = {
    sm: "h-3 w-3",
    md: "h-4 w-4",
    lg: "h-5 w-5",
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
      }}
      className={`inline-flex items-center font-semibold bg-success text-white rounded-full shadow-md ${sizeClasses[size]} ${className}`}
    >
      <ShieldCheck className={iconSizes[size]} />
      <span>1 Jahr Gewährleistung</span>
    </motion.div>
  );
}

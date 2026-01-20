import { useState, useEffect, useCallback } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, 
  Gauge, 
  MapPin, 
  Phone, 
  Mail, 
  ChevronLeft, 
  ChevronRight,
  Weight,
  CheckCircle2,
  ShieldCheck
} from "lucide-react";
import { MachineIcon } from "@/components/ui/MachineIcon";
import { cn } from "@/lib/utils";

interface Machine {
  id: string;
  title: string;
  manufacturer_name: string;
  model_name: string | null;
  category: "bagger" | "arbeitsbuehne";
  year_built: number;
  operating_hours: number | null;
  weight_kg: number | null;
  price: number;
  condition: string;
  location_name: string | null;
  images: string[] | null;
  description: string | null;
  features: string[] | null;
  financing_available: boolean | null;
}

interface MachineDetailModalProps {
  machine: Machine | null;
  isOpen: boolean;
  onClose: () => void;
}

const conditionLabels: Record<string, string> = {
  sehr_gut: "Sehr gut",
  gut: "Gut",
  ok: "Akzeptabel",
  reparaturbeduerftig: "Reparaturbedürftig"
};

export function MachineDetailModal({ machine, isOpen, onClose }: MachineDetailModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Reset image index when machine changes
  useEffect(() => {
    setCurrentImageIndex(0);
  }, [machine?.id]);

  const hasImages = machine?.images && machine.images.length > 0;
  const hasMultipleImages = machine?.images && machine.images.length > 1;

  const goToNext = useCallback(() => {
    if (!hasMultipleImages || !machine?.images) return;
    setCurrentImageIndex((prev) => (prev + 1) % machine.images!.length);
  }, [machine?.images, hasMultipleImages]);

  const goToPrev = useCallback(() => {
    if (!hasMultipleImages || !machine?.images) return;
    setCurrentImageIndex((prev) => (prev - 1 + machine.images!.length) % machine.images!.length);
  }, [machine?.images, hasMultipleImages]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("de-DE", {
      style: "currency",
      currency: "EUR",
      maximumFractionDigits: 0
    }).format(price);
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "ArrowLeft") goToPrev();
      if (e.key === "ArrowRight") goToNext();
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, goToNext, goToPrev, onClose]);

  if (!machine) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0">
        <DialogHeader className="sr-only">
          <DialogTitle>{machine.title}</DialogTitle>
        </DialogHeader>
        
        {/* Image Gallery */}
        <div className="relative aspect-[16/10] bg-muted">
          {hasImages ? (
            <>
              <img
                src={machine.images![currentImageIndex]}
                alt={`${machine.title} - Bild ${currentImageIndex + 1}`}
                className="w-full h-full object-contain bg-black"
              />

              {/* Navigation Arrows */}
              {hasMultipleImages && (
                <>
                  <button
                    onClick={goToPrev}
                    className="absolute left-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors"
                    aria-label="Vorheriges Bild"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>
                  <button
                    onClick={goToNext}
                    className="absolute right-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors"
                    aria-label="Nächstes Bild"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>
                </>
              )}

              {/* Thumbnail Strip */}
              {hasMultipleImages && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 bg-black/50 p-2 rounded-lg">
                  {machine.images!.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={cn(
                        "h-12 w-16 rounded overflow-hidden border-2 transition-all",
                        index === currentImageIndex
                          ? "border-white"
                          : "border-transparent opacity-60 hover:opacity-100"
                      )}
                    >
                      <img
                        src={img}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Counter */}
              <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                {currentImageIndex + 1} / {machine.images!.length}
              </div>
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <MachineIcon type={machine.category} size="2xl" className="opacity-20" />
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-headline mb-2">
                {machine.title}
              </h2>
              <p className="text-lg text-muted-foreground">
                {machine.manufacturer_name} {machine.model_name}
              </p>
            </div>
            <div className="text-right">
              <p className="text-3xl md:text-4xl font-bold text-primary">
                {formatPrice(machine.price)}
              </p>
              <p className="text-sm text-muted-foreground">inkl. MwSt.</p>
              {machine.financing_available && (
                <Badge variant="outline" className="mt-2">
                  Finanzierung möglich
                </Badge>
              )}
            </div>
          </div>

          {/* Quick Specs */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 p-4 bg-muted rounded-xl">
            <div className="text-center">
              <Calendar className="h-5 w-5 mx-auto mb-1 text-primary" />
              <p className="text-sm text-muted-foreground">Baujahr</p>
              <p className="font-semibold">{machine.year_built}</p>
            </div>
            {machine.operating_hours && (
              <div className="text-center">
                <Gauge className="h-5 w-5 mx-auto mb-1 text-primary" />
                <p className="text-sm text-muted-foreground">Betriebsstunden</p>
                <p className="font-semibold">{machine.operating_hours.toLocaleString("de-DE")} Bh</p>
              </div>
            )}
            {machine.weight_kg && (
              <div className="text-center">
                <Weight className="h-5 w-5 mx-auto mb-1 text-primary" />
                <p className="text-sm text-muted-foreground">Gewicht</p>
                <p className="font-semibold">{machine.weight_kg.toLocaleString("de-DE")} kg</p>
              </div>
            )}
            <div className="text-center">
              <MapPin className="h-5 w-5 mx-auto mb-1 text-primary" />
              <p className="text-sm text-muted-foreground">Standort</p>
              <p className="font-semibold">{machine.location_name || "NRW"}</p>
            </div>
          </div>

          {/* Condition Badge & Warranty */}
          <div className="mb-6 flex flex-wrap gap-3">
            <Badge className="bg-success/20 text-success border-0">
              Zustand: {conditionLabels[machine.condition] || machine.condition}
            </Badge>
            <Badge className="bg-success text-white border-0 flex items-center gap-1">
              <ShieldCheck className="h-3.5 w-3.5" />
              1 Jahr Gewährleistung
            </Badge>
          </div>

          {/* Features */}
          {machine.features && machine.features.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-3">Ausstattung</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {machine.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-success flex-shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Description */}
          {machine.description && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-3">Beschreibung</h3>
              <div className="prose prose-sm max-w-none text-muted-foreground whitespace-pre-line">
                {machine.description}
              </div>
            </div>
          )}

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t">
            <Button asChild size="lg" className="flex-1 bg-accent hover:bg-accent/90">
              <a href="tel:+4921514179904">
                <Phone className="mr-2 h-5 w-5" />
                Jetzt anrufen
              </a>
            </Button>
            <Button asChild variant="outline" size="lg" className="flex-1">
              <a href={`mailto:info@wirkaufendeinebaumaschinen.de?subject=Anfrage: ${machine.title}`}>
                <Mail className="mr-2 h-5 w-5" />
                E-Mail senden
              </a>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

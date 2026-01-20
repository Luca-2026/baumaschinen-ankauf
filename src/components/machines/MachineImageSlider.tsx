import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { MachineIcon } from "@/components/ui/MachineIcon";

interface MachineImageSliderProps {
  images: string[] | null;
  title: string;
  category: "bagger" | "arbeitsbuehne";
  autoPlay?: boolean;
  autoPlayInterval?: number;
  className?: string;
  onClick?: () => void;
}

export function MachineImageSlider({
  images,
  title,
  category,
  autoPlay = true,
  autoPlayInterval = 4000,
  className,
  onClick,
}: MachineImageSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const hasImages = images && images.length > 0;
  const hasMultipleImages = images && images.length > 1;

  const goToNext = useCallback(() => {
    if (!hasMultipleImages) return;
    setCurrentIndex((prev) => (prev + 1) % images!.length);
  }, [images, hasMultipleImages]);

  const goToPrev = useCallback(() => {
    if (!hasMultipleImages) return;
    setCurrentIndex((prev) => (prev - 1 + images!.length) % images!.length);
  }, [images, hasMultipleImages]);

  const goToIndex = (index: number) => {
    setCurrentIndex(index);
  };

  // Auto-play functionality
  useEffect(() => {
    if (!autoPlay || !hasMultipleImages || isPaused) return;

    const interval = setInterval(goToNext, autoPlayInterval);
    return () => clearInterval(interval);
  }, [autoPlay, autoPlayInterval, hasMultipleImages, isPaused, goToNext]);

  return (
    <div
      className={cn("relative aspect-[4/3] bg-muted overflow-hidden group", className)}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {hasImages ? (
        <>
          {/* Images */}
          <div className="relative w-full h-full">
            {images!.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${title} - Bild ${index + 1}`}
                onClick={onClick}
                className={cn(
                  "absolute inset-0 w-full h-full object-cover transition-opacity duration-500 cursor-pointer",
                  index === currentIndex ? "opacity-100" : "opacity-0"
                )}
              />
            ))}
          </div>

          {/* Navigation Arrows */}
          {hasMultipleImages && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  goToPrev();
                }}
                className="absolute left-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70"
                aria-label="Vorheriges Bild"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  goToNext();
                }}
                className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70"
                aria-label="Nächstes Bild"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </>
          )}

          {/* Dots Indicator */}
          {hasMultipleImages && (
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
              {images!.map((_, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation();
                    goToIndex(index);
                  }}
                  className={cn(
                    "h-2 rounded-full transition-all",
                    index === currentIndex
                      ? "w-6 bg-white"
                      : "w-2 bg-white/50 hover:bg-white/75"
                  )}
                  aria-label={`Bild ${index + 1}`}
                />
              ))}
            </div>
          )}

          {/* Image Counter */}
          {hasMultipleImages && (
            <div className="absolute top-3 right-3 bg-black/50 text-white text-xs px-2 py-1 rounded-full">
              {currentIndex + 1} / {images!.length}
            </div>
          )}
        </>
      ) : (
        <div 
          className="w-full h-full flex items-center justify-center cursor-pointer"
          onClick={onClick}
        >
          <MachineIcon type={category} size="2xl" className="opacity-20" />
        </div>
      )}
    </div>
  );
}

import { WizardFormData, arbeitsbuehneWorkingHeights, driveTypes } from "@/types/wizard";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Info, CheckCircle2, Fuel, Zap, Leaf } from "lucide-react";
import { arbeitsbuehneSubtypes } from "@/data/machineData";
import { useMemo } from "react";

interface Step3BaseDataProps {
  formData: WizardFormData;
  updateFormData: (updates: Partial<WizardFormData>) => void;
}

export function Step3BaseData({ formData, updateFormData }: Step3BaseDataProps) {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 30 }, (_, i) => currentYear - i);
  
  // Determine what info is already known from subcategory/model selection
  const arbeitsbuehneSubtype = useMemo(() => {
    if (formData.category !== "arbeitsbuehne" || !formData.subcategory) return null;
    return arbeitsbuehneSubtypes.find(s => s.value === formData.subcategory) || null;
  }, [formData.category, formData.subcategory]);

  // For Arbeitsbühne: working height is known from subcategory, drive type from model
  const hasKnownWorkingHeight = formData.category === "arbeitsbuehne" && arbeitsbuehneSubtype !== null;
  const hasKnownDriveType = formData.category === "arbeitsbuehne" && formData.modelName && !formData.isCustomModel && formData.driveType;
  
  // For Bagger with selected model, show the model info
  const hasSelectedBaggerModel = formData.category === "bagger" && formData.modelName && !formData.isCustomModel;
  
  // For Arbeitsbühne with selected model
  const hasSelectedArbeitsbuehneModel = formData.category === "arbeitsbuehne" && formData.modelName && !formData.isCustomModel;

  // Only show working height selector for custom models without subcategory
  const showWorkingHeightSelector = formData.category === "arbeitsbuehne" && formData.isCustomModel && !hasKnownWorkingHeight;
  
  // Only show drive type selector if not already set by model selection
  const showDriveTypeSelector = !hasKnownDriveType || formData.isCustomModel;

  const isNRW = formData.locationZip && 
    (formData.locationZip.startsWith("4") || 
     formData.locationZip.startsWith("5") ||
     formData.locationZip.startsWith("32") ||
     formData.locationZip.startsWith("33"));

  // Get display text for known data
  const getArbeitsbuehneTypeInfo = () => {
    if (!arbeitsbuehneSubtype) return null;
    
    const categoryLabel = arbeitsbuehneSubtype.categoryType === "scissor" ? "Scherenbühne" : "Gelenkteleskopbühne";
    const heightRange = `${arbeitsbuehneSubtype.workingHeightRange.min}-${arbeitsbuehneSubtype.workingHeightRange.max}m Arbeitshöhe`;
    
    return { categoryLabel, heightRange };
  };

  const getDriveTypeLabel = (type: string) => {
    const labels: Record<string, { label: string; Icon: typeof Fuel }> = {
      diesel: { label: "Diesel", Icon: Fuel },
      electric: { label: "Elektro", Icon: Zap },
      hybrid: { label: "Hybrid", Icon: Leaf },
    };
    return labels[type] || { label: type, Icon: Fuel };
  };

  const typeInfo = getArbeitsbuehneTypeInfo();

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-headline mb-2">
          Technische Basisdaten
        </h2>
        <p className="text-muted-foreground">
          Diese Angaben helfen uns bei der Preisberechnung
        </p>
      </div>

      {/* Show selected model info for Bagger */}
      {hasSelectedBaggerModel && (
        <div className="bg-primary/5 rounded-xl p-4 flex items-center gap-3">
          <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
          <div>
            <p className="font-medium text-headline">
              {formData.manufacturerName} {formData.modelName}
            </p>
            <p className="text-sm text-muted-foreground">
              Gewichtsklasse und Fahrwerk wurden automatisch erfasst
            </p>
          </div>
        </div>
      )}

      {/* Show known info for Arbeitsbühne */}
      {formData.category === "arbeitsbuehne" && typeInfo && (
        <div className="bg-primary/5 rounded-xl p-4 space-y-2">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
            <div>
              <p className="font-medium text-headline">
                {typeInfo.categoryLabel} • {typeInfo.heightRange}
              </p>
              {hasSelectedArbeitsbuehneModel && (
                <p className="text-sm text-muted-foreground">
                  {formData.manufacturerName} {formData.modelName}
                  {hasKnownDriveType && (
                    <> • {getDriveTypeLabel(formData.driveType).label}</>
                  )}
                </p>
              )}
              {!hasSelectedArbeitsbuehneModel && (
                <p className="text-sm text-muted-foreground">
                  Typ und Arbeitshöhe wurden automatisch erfasst
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="grid gap-6 sm:grid-cols-2">
        {/* Year Built */}
        <div>
          <Label htmlFor="yearBuilt" className="text-base font-medium">
            Baujahr *
          </Label>
          <Select
            value={formData.yearBuilt?.toString() || ""}
            onValueChange={(value) => updateFormData({ yearBuilt: parseInt(value) })}
          >
            <SelectTrigger className="mt-2">
              <SelectValue placeholder="Baujahr wählen" />
            </SelectTrigger>
            <SelectContent>
              {years.map((year) => (
                <SelectItem key={year} value={year.toString()}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Operating Hours */}
        <div>
          <Label htmlFor="operatingHours" className="text-base font-medium">
            Betriebsstunden
          </Label>
          <Input
            id="operatingHours"
            type="number"
            placeholder="z.B. 3500"
            className="mt-2"
            value={formData.operatingHours || ""}
            onChange={(e) => updateFormData({ operatingHours: e.target.value ? parseInt(e.target.value) : null })}
          />
        </div>

        {/* Working Height - only for custom Arbeitsbühne without subcategory */}
        {showWorkingHeightSelector && (
          <div>
            <Label className="text-base font-medium">
              Arbeitshöhe
            </Label>
            <Select
              value={formData.workingHeight}
              onValueChange={(value) => updateFormData({ workingHeight: value })}
            >
              <SelectTrigger className="mt-2">
                <SelectValue placeholder="Arbeitshöhe wählen" />
              </SelectTrigger>
              <SelectContent>
                {arbeitsbuehneWorkingHeights.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {/* Drive Type - only if not already set by model */}
        {showDriveTypeSelector && (
          <div>
            <Label className="text-base font-medium">
              Antriebsart
            </Label>
            <Select
              value={formData.driveType}
              onValueChange={(value) => updateFormData({ driveType: value })}
            >
              <SelectTrigger className="mt-2">
                <SelectValue placeholder="Antriebsart wählen" />
              </SelectTrigger>
              <SelectContent>
                {driveTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {/* Serial Number */}
        <div>
          <Label htmlFor="serialNumber" className="text-base font-medium">
            Seriennummer (optional)
          </Label>
          <Input
            id="serialNumber"
            placeholder="Seriennummer"
            className="mt-2"
            value={formData.serialNumber}
            onChange={(e) => updateFormData({ serialNumber: e.target.value })}
          />
        </div>

        {/* Location ZIP */}
        <div>
          <Label htmlFor="locationZip" className="text-base font-medium">
            Standort PLZ *
          </Label>
          <div className="relative mt-2">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="locationZip"
              placeholder="z.B. 47807"
              className="pl-10"
              maxLength={5}
              value={formData.locationZip}
              onChange={(e) => updateFormData({ locationZip: e.target.value.replace(/\D/g, "") })}
            />
          </div>
          {isNRW && (
            <div className="flex items-center gap-2 mt-2 text-sm text-success">
              <Info className="h-4 w-4" />
              <span>NRW-Standort – schnellere Abholung möglich!</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

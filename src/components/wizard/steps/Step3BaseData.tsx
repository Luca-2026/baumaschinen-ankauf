import { WizardFormData, arbeitsbuehneWorkingHeights, driveTypes } from "@/types/wizard";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Info, CheckCircle2 } from "lucide-react";

interface Step3BaseDataProps {
  formData: WizardFormData;
  updateFormData: (updates: Partial<WizardFormData>) => void;
}

export function Step3BaseData({ formData, updateFormData }: Step3BaseDataProps) {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 30 }, (_, i) => currentYear - i);
  
  // Only show weight class / working height if no model is selected (for Arbeitsbühne, or custom models)
  const showSizeSelector = formData.category === "arbeitsbuehne" || formData.isCustomModel;
  const sizeOptions = arbeitsbuehneWorkingHeights;
  const sizeLabel = "Arbeitshöhe";

  const isNRW = formData.locationZip && 
    (formData.locationZip.startsWith("4") || 
     formData.locationZip.startsWith("5") ||
     formData.locationZip.startsWith("32") ||
     formData.locationZip.startsWith("33"));

  // For Bagger with selected model, show the model info
  const hasSelectedModel = formData.category === "bagger" && formData.modelName && !formData.isCustomModel;

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
      {hasSelectedModel && (
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

        {/* Size (Working Height) - only for Arbeitsbühne or custom models */}
        {showSizeSelector && (
          <div>
            <Label className="text-base font-medium">
              {sizeLabel}
            </Label>
            <Select
              value={formData.workingHeight}
              onValueChange={(value) => updateFormData({ workingHeight: value })}
            >
              <SelectTrigger className="mt-2">
                <SelectValue placeholder={`${sizeLabel} wählen`} />
              </SelectTrigger>
              <SelectContent>
                {sizeOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {/* Drive Type */}
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

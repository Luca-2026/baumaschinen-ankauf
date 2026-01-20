import { useState, useMemo } from "react";
import { Search, AlertCircle, ChevronDown } from "lucide-react";
import { WizardFormData } from "@/types/wizard";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { getManufacturersForCategory, getModelsForManufacturer, MachineModel } from "@/data/machineData";

interface Step2ManufacturerProps {
  formData: WizardFormData;
  updateFormData: (updates: Partial<WizardFormData>) => void;
}

export function Step2Manufacturer({
  formData,
  updateFormData,
}: Step2ManufacturerProps) {
  const [manufacturerSearch, setManufacturerSearch] = useState("");
  const [modelSearch, setModelSearch] = useState("");
  const [showAllManufacturers, setShowAllManufacturers] = useState(false);

  // Get manufacturers from static data
  const manufacturers = useMemo(() => {
    if (!formData.category) return [];
    return getManufacturersForCategory(formData.category, formData.subcategory);
  }, [formData.category, formData.subcategory]);

  // Get models from static data
  const models = useMemo(() => {
    if (!formData.category || !formData.manufacturerName) return [];
    return getModelsForManufacturer(formData.category, formData.manufacturerName, formData.subcategory);
  }, [formData.category, formData.manufacturerName, formData.subcategory]);

  const filteredManufacturers = manufacturers.filter((m) =>
    m.toLowerCase().includes(manufacturerSearch.toLowerCase())
  );

  const filteredModels = models.filter((m) =>
    m.model.toLowerCase().includes(modelSearch.toLowerCase())
  );

  // Show first 8 or all if expanded
  const displayedManufacturers = showAllManufacturers 
    ? filteredManufacturers 
    : filteredManufacturers.slice(0, 8);

  const handleManufacturerSelect = (manufacturer: string) => {
    updateFormData({
      manufacturerId: manufacturer, // Use name as ID for static data
      manufacturerName: manufacturer,
      modelId: "",
      modelName: "",
      isCustomModel: false,
      customModelName: "",
    });
    setModelSearch("");
  };

  const handleModelSelect = (model: MachineModel) => {
    updateFormData({
      modelId: `${model.manufacturer}-${model.model}`,
      modelName: model.model,
      isCustomModel: false,
      customModelName: "",
      // Auto-set drive type based on undercarriage
      driveType: model.type === "Mobil" ? "mobil" : "kette",
    });
  };

  const handleCustomModelToggle = (checked: boolean) => {
    updateFormData({
      isCustomModel: checked,
      modelId: "",
      modelName: "",
    });
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-headline mb-2">
          Hersteller & Modell
        </h2>
        <p className="text-muted-foreground">
          Wählen Sie den Hersteller und das Modell Ihrer Maschine
        </p>
      </div>

      {/* Manufacturer Selection */}
      <div>
        <Label className="text-base font-medium mb-3 block">Hersteller</Label>
        <div className="relative mb-3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Hersteller suchen..."
            value={manufacturerSearch}
            onChange={(e) => setManufacturerSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 p-1">
          {displayedManufacturers.map((manufacturer) => (
            <button
              key={manufacturer}
              type="button"
              onClick={() => handleManufacturerSelect(manufacturer)}
              className={cn(
                "px-3 py-2 rounded-lg border text-sm font-medium transition-all text-left",
                formData.manufacturerName === manufacturer
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card hover:border-primary hover:bg-primary/5"
              )}
            >
              {manufacturer}
            </button>
          ))}
        </div>
        
        {/* Show more button */}
        {filteredManufacturers.length > 8 && !showAllManufacturers && (
          <button
            type="button"
            onClick={() => setShowAllManufacturers(true)}
            className="mt-2 flex items-center gap-1 text-sm text-primary hover:underline"
          >
            <ChevronDown className="h-4 w-4" />
            Alle {filteredManufacturers.length} Hersteller anzeigen
          </button>
        )}
        
        {filteredManufacturers.length === 0 && (
          <p className="text-sm text-muted-foreground mt-2">
            Kein Hersteller gefunden. Sie können das Modell manuell eingeben.
          </p>
        )}
      </div>

      {/* Model Selection */}
      {formData.manufacturerName && (
        <div className="animate-fade-in">
          <Label className="text-base font-medium mb-3 block">Modell</Label>
          
          {!formData.isCustomModel && (
            <>
              <div className="relative mb-3">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Modell suchen..."
                  value={modelSearch}
                  onChange={(e) => setModelSearch(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              {filteredModels.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 max-h-60 overflow-y-auto p-1 mb-4">
                  {filteredModels.map((model) => (
                    <button
                      key={`${model.manufacturer}-${model.model}`}
                      type="button"
                      onClick={() => handleModelSelect(model)}
                      className={cn(
                        "px-3 py-3 rounded-lg border text-sm font-medium transition-all text-left",
                        formData.modelName === model.model
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border bg-card hover:border-primary hover:bg-primary/5"
                      )}
                    >
                      <div className="font-medium">{model.model}</div>
                      <div className={cn(
                        "text-xs mt-1",
                        formData.modelName === model.model
                          ? "text-primary-foreground/80"
                          : "text-muted-foreground"
                      )}>
                        {model.tonnage_t}t • {model.type}
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="bg-muted/50 rounded-lg p-4 mb-4">
                  <p className="text-sm text-muted-foreground">
                    Keine Modelle für diesen Hersteller in dieser Kategorie gefunden.
                  </p>
                </div>
              )}
            </>
          )}

          {/* Custom Model Option */}
          <div className="flex items-start gap-3 p-4 rounded-lg border bg-card">
            <Checkbox
              id="customModel"
              checked={formData.isCustomModel}
              onCheckedChange={handleCustomModelToggle}
              className="mt-0.5"
            />
            <div className="flex-1">
              <label
                htmlFor="customModel"
                className="text-sm font-medium cursor-pointer"
              >
                Modell nicht gefunden? Manuell eingeben
              </label>
              
              {formData.isCustomModel && (
                <div className="mt-3 space-y-3 animate-fade-in">
                  <Input
                    placeholder="Modellbezeichnung eingeben"
                    value={formData.customModelName}
                    onChange={(e) => updateFormData({ 
                      customModelName: e.target.value,
                      modelName: e.target.value 
                    })}
                  />
                  <div className="flex items-start gap-2 text-xs text-muted-foreground bg-muted rounded-md p-3">
                    <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                    <span>
                      Tipp: Laden Sie im nächsten Schritt ein Foto des Typenschilds hoch, 
                      um die Identifikation zu erleichtern.
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

import { useState, useMemo } from "react";
import { Search, AlertCircle, ChevronDown, Fuel, Zap, Leaf } from "lucide-react";
import { WizardFormData } from "@/types/wizard";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { 
  getManufacturersForCategory, 
  getModelsForManufacturer, 
  MachineModel,
  ArbeitsbuehnModel,
  ArbeitsbuehneDriveType
} from "@/data/machineData";
import { getAvailableDriveTypes } from "@/data/arbeitsbuehneData";

interface Step2ManufacturerProps {
  formData: WizardFormData;
  updateFormData: (updates: Partial<WizardFormData>) => void;
}

// Type guards
function isBaggerModel(model: MachineModel | ArbeitsbuehnModel): model is MachineModel {
  return 'tonnage_t' in model && 'type' in model;
}

function isArbeitsbuehneModel(model: MachineModel | ArbeitsbuehnModel): model is ArbeitsbuehnModel {
  return 'workingHeightM' in model && 'driveType' in model;
}

const driveTypeLabels: Record<ArbeitsbuehneDriveType, { label: string; icon: typeof Fuel }> = {
  diesel: { label: "Diesel", icon: Fuel },
  electric: { label: "Elektro", icon: Zap },
  hybrid: { label: "Hybrid", icon: Leaf },
};

export function Step2Manufacturer({
  formData,
  updateFormData,
}: Step2ManufacturerProps) {
  const [manufacturerSearch, setManufacturerSearch] = useState("");
  const [modelSearch, setModelSearch] = useState("");
  const [showAllManufacturers, setShowAllManufacturers] = useState(false);
  const [selectedDriveType, setSelectedDriveType] = useState<ArbeitsbuehneDriveType | undefined>(undefined);

  // Get available drive types for arbeitsbuehne
  const availableDriveTypes = useMemo(() => {
    if (formData.category !== "arbeitsbuehne") return [];
    return getAvailableDriveTypes(formData.subcategory, formData.manufacturerName || undefined);
  }, [formData.category, formData.subcategory, formData.manufacturerName]);

  // Get manufacturers from static data
  const manufacturers = useMemo(() => {
    if (!formData.category) return [];
    return getManufacturersForCategory(formData.category, formData.subcategory, selectedDriveType);
  }, [formData.category, formData.subcategory, selectedDriveType]);

  // Get models from static data
  const models = useMemo(() => {
    if (!formData.category || !formData.manufacturerName) return [];
    return getModelsForManufacturer(formData.category, formData.manufacturerName, formData.subcategory, selectedDriveType);
  }, [formData.category, formData.manufacturerName, formData.subcategory, selectedDriveType]);

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

  const handleDriveTypeSelect = (driveType: ArbeitsbuehneDriveType | undefined) => {
    setSelectedDriveType(driveType);
    // Reset manufacturer and model when changing drive type
    if (driveType !== selectedDriveType) {
      updateFormData({
        manufacturerId: "",
        manufacturerName: "",
        modelId: "",
        modelName: "",
      });
    }
  };

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

  const handleModelSelect = (model: MachineModel | ArbeitsbuehnModel) => {
    if (isBaggerModel(model)) {
      updateFormData({
        modelId: `${model.manufacturer}-${model.model}`,
        modelName: model.model,
        isCustomModel: false,
        customModelName: "",
        // Auto-set drive type based on undercarriage
        driveType: model.type === "Mobil" ? "mobil" : "kette",
      });
    } else if (isArbeitsbuehneModel(model)) {
      updateFormData({
        modelId: `${model.manufacturer}-${model.model}`,
        modelName: model.model,
        isCustomModel: false,
        customModelName: "",
        // Auto-set drive type and working height
        driveType: model.driveType,
        workingHeight: `${model.workingHeightM}m`,
      });
    }
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

      {/* Drive Type Filter for Arbeitsbühne */}
      {formData.category === "arbeitsbuehne" && availableDriveTypes.length > 0 && (
        <div className="animate-fade-in">
          <Label className="text-base font-medium mb-3 block">Antriebsart (optional)</Label>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => handleDriveTypeSelect(undefined)}
              className={cn(
                "px-4 py-2 rounded-lg border text-sm font-medium transition-all",
                !selectedDriveType
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card hover:border-primary hover:bg-primary/5"
              )}
            >
              Alle
            </button>
            {availableDriveTypes.map((dt) => {
              const config = driveTypeLabels[dt];
              const Icon = config.icon;
              return (
                <button
                  key={dt}
                  type="button"
                  onClick={() => handleDriveTypeSelect(dt)}
                  className={cn(
                    "px-4 py-2 rounded-lg border text-sm font-medium transition-all flex items-center gap-2",
                    selectedDriveType === dt
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-card hover:border-primary hover:bg-primary/5"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {config.label}
                </button>
              );
            })}
          </div>
        </div>
      )}

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
                  {filteredModels.map((model) => {
                    const isBagger = isBaggerModel(model);
                    const isArbeitsbuehne = isArbeitsbuehneModel(model);
                    
                    return (
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
                          "text-xs mt-1 flex items-center gap-1",
                          formData.modelName === model.model
                            ? "text-primary-foreground/80"
                            : "text-muted-foreground"
                        )}>
                          {isBagger && (
                            <>{model.tonnage_t}t • {model.type}</>
                          )}
                          {isArbeitsbuehne && (
                            <>
                              {model.workingHeightM}m • 
                              {driveTypeLabels[model.driveType]?.label || model.driveType}
                            </>
                          )}
                        </div>
                      </button>
                    );
                  })}
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

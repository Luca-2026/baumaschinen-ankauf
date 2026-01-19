import { useState } from "react";
import { Search, AlertCircle } from "lucide-react";
import { WizardFormData } from "@/types/wizard";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

interface Manufacturer {
  id: string;
  name: string;
  category: string;
}

interface Model {
  id: string;
  name: string;
  manufacturer_id: string;
}

interface Step2ManufacturerProps {
  formData: WizardFormData;
  updateFormData: (updates: Partial<WizardFormData>) => void;
  manufacturers: Manufacturer[];
  models: Model[];
}

export function Step2Manufacturer({
  formData,
  updateFormData,
  manufacturers,
  models,
}: Step2ManufacturerProps) {
  const [manufacturerSearch, setManufacturerSearch] = useState("");
  const [modelSearch, setModelSearch] = useState("");

  const filteredManufacturers = manufacturers.filter((m) =>
    m.name.toLowerCase().includes(manufacturerSearch.toLowerCase())
  );

  const filteredModels = models.filter((m) =>
    m.name.toLowerCase().includes(modelSearch.toLowerCase())
  );

  const handleManufacturerSelect = (manufacturer: Manufacturer) => {
    updateFormData({
      manufacturerId: manufacturer.id,
      manufacturerName: manufacturer.name,
      modelId: "",
      modelName: "",
      isCustomModel: false,
      customModelName: "",
    });
    setModelSearch("");
  };

  const handleModelSelect = (model: Model) => {
    updateFormData({
      modelId: model.id,
      modelName: model.name,
      isCustomModel: false,
      customModelName: "",
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
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 max-h-48 overflow-y-auto p-1">
          {filteredManufacturers.map((manufacturer) => (
            <button
              key={manufacturer.id}
              type="button"
              onClick={() => handleManufacturerSelect(manufacturer)}
              className={cn(
                "px-3 py-2 rounded-lg border text-sm font-medium transition-all text-left",
                formData.manufacturerId === manufacturer.id
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card hover:border-primary hover:bg-primary/5"
              )}
            >
              {manufacturer.name}
            </button>
          ))}
        </div>
        {filteredManufacturers.length === 0 && (
          <p className="text-sm text-muted-foreground mt-2">
            Kein Hersteller gefunden. Sie können das Modell manuell eingeben.
          </p>
        )}
      </div>

      {/* Model Selection */}
      {formData.manufacturerId && (
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
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-40 overflow-y-auto p-1 mb-4">
                  {filteredModels.map((model) => (
                    <button
                      key={model.id}
                      type="button"
                      onClick={() => handleModelSelect(model)}
                      className={cn(
                        "px-3 py-2 rounded-lg border text-sm font-medium transition-all text-left",
                        formData.modelId === model.id
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border bg-card hover:border-primary hover:bg-primary/5"
                      )}
                    >
                      {model.name}
                    </button>
                  ))}
                </div>
              ) : (
                <div className="bg-muted/50 rounded-lg p-4 mb-4">
                  <p className="text-sm text-muted-foreground">
                    Keine Modelle für diesen Hersteller gefunden.
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
                    onChange={(e) => updateFormData({ customModelName: e.target.value })}
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

import { WizardFormData, conditionOptions, baggerEquipment, arbeitsbuehneEquipment } from "@/types/wizard";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { AlertTriangle, FileCheck } from "lucide-react";

interface Step4ConditionProps {
  formData: WizardFormData;
  updateFormData: (updates: Partial<WizardFormData>) => void;
}

export function Step4Condition({ formData, updateFormData }: Step4ConditionProps) {
  const equipmentOptions = formData.category === "bagger" ? baggerEquipment : arbeitsbuehneEquipment;

  const handleConditionSelect = (condition: typeof formData.condition) => {
    updateFormData({ condition });
  };

  const handleEquipmentToggle = (value: string) => {
    const newEquipment = formData.equipment.includes(value)
      ? formData.equipment.filter((e) => e !== value)
      : [...formData.equipment, value];
    updateFormData({ equipment: newEquipment });
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-headline mb-2">
          Zustand & Ausstattung
        </h2>
        <p className="text-muted-foreground">
          Diese Details beeinflussen den Referenzpreis
        </p>
      </div>

      {/* Condition */}
      <div>
        <Label className="text-base font-medium mb-3 block">
          Allgemeiner Zustand *
        </Label>
        <div className="grid gap-3 sm:grid-cols-2">
          {conditionOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => handleConditionSelect(option.value as typeof formData.condition)}
              className={cn(
                "flex flex-col items-start p-4 rounded-xl border-2 transition-all text-left",
                formData.condition === option.value
                  ? "border-primary bg-primary/5"
                  : "border-border bg-card hover:border-primary/50"
              )}
            >
              <span className="font-semibold text-headline">{option.label}</span>
              <span className="text-sm text-muted-foreground mt-1">
                {option.description}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Documentation */}
      <div>
        <Label className="text-base font-medium mb-3 flex items-center gap-2">
          <FileCheck className="h-5 w-5 text-primary" />
          Vorhandene Dokumentation
        </Label>
        <p className="text-sm text-muted-foreground mb-4">
          Vollständige Unterlagen können den Ankaufpreis erhöhen
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="flex items-center gap-3 p-3 rounded-lg border bg-card">
            <Checkbox
              id="serviceBook"
              checked={formData.hasServiceBook}
              onCheckedChange={(checked) => updateFormData({ hasServiceBook: !!checked })}
            />
            <label htmlFor="serviceBook" className="text-sm font-medium cursor-pointer">
              Serviceheft / Wartungshistorie
            </label>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-lg border bg-card">
            <Checkbox
              id="uvv"
              checked={formData.hasUvv}
              onCheckedChange={(checked) => updateFormData({ hasUvv: !!checked })}
            />
            <label htmlFor="uvv" className="text-sm font-medium cursor-pointer">
              UVV-Prüfung aktuell
            </label>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-lg border bg-card">
            <Checkbox
              id="ce"
              checked={formData.hasCe}
              onCheckedChange={(checked) => updateFormData({ hasCe: !!checked })}
            />
            <label htmlFor="ce" className="text-sm font-medium cursor-pointer">
              CE-Kennzeichnung
            </label>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-lg border bg-card">
            <Checkbox
              id="manual"
              checked={formData.hasManual}
              onCheckedChange={(checked) => updateFormData({ hasManual: !!checked })}
            />
            <label htmlFor="manual" className="text-sm font-medium cursor-pointer">
              Betriebsanleitung
            </label>
          </div>
        </div>
      </div>

      {/* Equipment */}
      <div>
        <Label className="text-base font-medium mb-3 block">
          Ausstattung & Extras
        </Label>
        <div className="flex flex-wrap gap-2">
          {equipmentOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => handleEquipmentToggle(option.value)}
              className={cn(
                "px-4 py-2 rounded-full border text-sm font-medium transition-all",
                formData.equipment.includes(option.value)
                  ? "border-accent bg-accent text-accent-foreground"
                  : "border-border bg-card text-foreground hover:border-primary hover:bg-primary/5"
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Damage */}
      <div>
        <div className="flex items-center gap-3 p-4 rounded-lg border bg-card">
          <Checkbox
            id="hasDamage"
            checked={formData.hasDamage}
            onCheckedChange={(checked) => updateFormData({ hasDamage: !!checked })}
          />
          <div>
            <label htmlFor="hasDamage" className="text-sm font-medium cursor-pointer flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-destructive" />
              Unfallschäden oder bekannte Mängel vorhanden
            </label>
          </div>
        </div>

        {formData.hasDamage && (
          <div className="mt-4 animate-fade-in">
            <Label htmlFor="damageDescription" className="text-sm font-medium mb-2 block">
              Bitte beschreiben Sie die Schäden/Mängel:
            </Label>
            <Textarea
              id="damageDescription"
              placeholder="z.B. Delle an der Kabine, Hydraulikzylinder undicht..."
              value={formData.damageDescription}
              onChange={(e) => updateFormData({ damageDescription: e.target.value })}
              rows={3}
            />
          </div>
        )}
      </div>
    </div>
  );
}

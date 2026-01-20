import { ArrowRight } from "lucide-react";
import { WizardFormData } from "@/types/wizard";
import { MachineIcon } from "@/components/ui/MachineIcon";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { getSubcategoriesForCategory, arbeitsbuehneSubtypes } from "@/data/machineData";

interface Step1CategoryProps {
  formData: WizardFormData;
  updateFormData: (updates: Partial<WizardFormData>) => void;
  onNext: () => void;
}

export function Step1Category({ formData, updateFormData, onNext }: Step1CategoryProps) {
  const subcategories = formData.category ? getSubcategoriesForCategory(formData.category) : [];

  const handleCategorySelect = (category: "bagger" | "arbeitsbuehne") => {
    updateFormData({ 
      category, 
      subcategory: "",
      manufacturerId: "",
      manufacturerName: "",
      modelId: "",
      modelName: "",
      workingHeight: "",
      // Bagger sind immer Diesel
      driveType: category === "bagger" ? "diesel" : "",
    });
  };

  const handleSubcategorySelect = (subcategory: string) => {
    // For Arbeitsbühne, auto-set working height based on subcategory
    let workingHeight = "";
    
    if (formData.category === "arbeitsbuehne") {
      const subtype = arbeitsbuehneSubtypes.find(s => s.value === subcategory);
      if (subtype) {
        // Set a representative working height based on the range
        const avgHeight = Math.round((subtype.workingHeightRange.min + subtype.workingHeightRange.max) / 2);
        workingHeight = `${avgHeight}m`;
      }
    }
    
    // Reset manufacturer and model when subcategory changes
    updateFormData({ 
      subcategory,
      manufacturerId: "",
      manufacturerName: "",
      modelId: "",
      modelName: "",
      workingHeight,
    });
  };

  const canProceed = formData.category !== "";

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-headline mb-2">
          Was möchten Sie verkaufen?
        </h2>
        <p className="text-muted-foreground">
          Wählen Sie die Kategorie Ihrer Baumaschine
        </p>
      </div>

      {/* Category Selection */}
      <div className="grid gap-4 sm:grid-cols-2">
        <button
          type="button"
          onClick={() => handleCategorySelect("bagger")}
          className={cn(
            "group relative flex flex-col items-center gap-4 rounded-2xl border-2 p-8 transition-all hover:shadow-md",
            formData.category === "bagger"
              ? "border-primary bg-primary/5"
              : "border-border bg-card hover:border-primary/50"
          )}
        >
          <MachineIcon type="bagger" size="2xl" />
          <span className="text-xl font-semibold text-headline">Bagger</span>
          <span className="text-sm text-muted-foreground text-center">
            Mini-, Midi-, Ketten-, Mobilbagger und mehr
          </span>
          {formData.category === "bagger" && (
            <div className="absolute top-4 right-4 h-6 w-6 rounded-full bg-primary flex items-center justify-center">
              <ArrowRight className="h-4 w-4 text-primary-foreground" />
            </div>
          )}
        </button>

        <button
          type="button"
          onClick={() => handleCategorySelect("arbeitsbuehne")}
          className={cn(
            "group relative flex flex-col items-center gap-4 rounded-2xl border-2 p-8 transition-all hover:shadow-md",
            formData.category === "arbeitsbuehne"
              ? "border-primary bg-primary/5"
              : "border-border bg-card hover:border-primary/50"
          )}
        >
          <MachineIcon type="arbeitsbuehne" size="2xl" />
          <span className="text-xl font-semibold text-headline">Arbeitsbühne</span>
          <span className="text-sm text-muted-foreground text-center">
            Scheren-, Gelenk-, Teleskopbühnen und mehr
          </span>
          {formData.category === "arbeitsbuehne" && (
            <div className="absolute top-4 right-4 h-6 w-6 rounded-full bg-primary flex items-center justify-center">
              <ArrowRight className="h-4 w-4 text-primary-foreground" />
            </div>
          )}
        </button>
      </div>

      {/* Subcategory Selection */}
      {formData.category && subcategories.length > 0 && (
        <div className="animate-fade-in">
          <Label className="text-base font-medium mb-4 block">
            Welcher Typ genau?
          </Label>
          <div className="flex flex-wrap gap-2">
            {subcategories.map((sub) => (
              <button
                key={sub.value}
                type="button"
                onClick={() => handleSubcategorySelect(sub.value)}
                className={cn(
                  "px-4 py-2 rounded-full border text-sm font-medium transition-all",
                  formData.subcategory === sub.value
                    ? "border-accent bg-accent text-accent-foreground"
                    : "border-border bg-card text-foreground hover:border-primary hover:bg-primary/5"
                )}
              >
                {sub.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

import { Shovel, Construction, ArrowRight } from "lucide-react";
import { WizardFormData, baggerSubcategories, arbeitsbuehneSubcategories } from "@/types/wizard";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";

interface Step1CategoryProps {
  formData: WizardFormData;
  updateFormData: (updates: Partial<WizardFormData>) => void;
  onNext: () => void;
}

export function Step1Category({ formData, updateFormData, onNext }: Step1CategoryProps) {
  const subcategories = formData.category === "bagger" ? baggerSubcategories : arbeitsbuehneSubcategories;

  const handleCategorySelect = (category: "bagger" | "arbeitsbuehne") => {
    updateFormData({ 
      category, 
      subcategory: "",
      manufacturerId: "",
      manufacturerName: "",
      modelId: "",
      modelName: "",
    });
  };

  const handleSubcategorySelect = (subcategory: string) => {
    updateFormData({ subcategory });
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
          <div
            className={cn(
              "flex h-20 w-20 items-center justify-center rounded-full transition-colors",
              formData.category === "bagger" ? "bg-primary/20" : "bg-muted"
            )}
          >
            <Shovel
              className={cn(
                "h-10 w-10",
                formData.category === "bagger" ? "text-primary" : "text-muted-foreground"
              )}
            />
          </div>
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
          <div
            className={cn(
              "flex h-20 w-20 items-center justify-center rounded-full transition-colors",
              formData.category === "arbeitsbuehne" ? "bg-primary/20" : "bg-muted"
            )}
          >
            <Construction
              className={cn(
                "h-10 w-10",
                formData.category === "arbeitsbuehne" ? "text-primary" : "text-muted-foreground"
              )}
            />
          </div>
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
      {formData.category && (
        <div className="animate-fade-in">
          <Label className="text-base font-medium mb-4 block">
            Welcher Typ genau? (optional)
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

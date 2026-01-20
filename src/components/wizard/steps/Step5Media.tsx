import { useCallback } from "react";
import { WizardFormData } from "@/types/wizard";
import { Label } from "@/components/ui/label";
import { Camera, FileText, X, Upload, Info, AlertCircle, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface Step5MediaProps {
  formData: WizardFormData;
  updateFormData: (updates: Partial<WizardFormData>) => void;
}

// Photo requirements by category
const PHOTO_REQUIREMENTS = {
  bagger: {
    min: 5,
    description: "Mindestens 5 Fotos erforderlich",
    suggestions: [
      "Vorderseite",
      "Rückseite", 
      "Linke Seite",
      "Rechte Seite",
      "Fahrerkabine (innen)",
    ],
    optional: [
      "Typenschild",
      "Betriebsstundenzähler",
      "Anbaugeräte",
      "Eventuelle Schäden",
    ]
  },
  arbeitsbuehne: {
    min: 2,
    description: "Mindestens 2 Fotos erforderlich",
    suggestions: [
      "Linke Seite",
      "Rechte Seite",
    ],
    optional: [
      "Plattform/Korb",
      "Typenschild",
      "Betriebsstundenzähler",
      "Bedienelemente",
    ]
  }
};

export function Step5Media({ formData, updateFormData }: Step5MediaProps) {
  const handleImageUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const validFiles = files.filter(file => file.type.startsWith("image/"));
    updateFormData({ images: [...formData.images, ...validFiles] });
  }, [formData.images, updateFormData]);

  const handleDocumentUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    updateFormData({ documents: [...formData.documents, ...files] });
  }, [formData.documents, updateFormData]);

  const removeImage = (index: number) => {
    const newImages = formData.images.filter((_, i) => i !== index);
    updateFormData({ images: newImages });
  };

  const removeDocument = (index: number) => {
    const newDocuments = formData.documents.filter((_, i) => i !== index);
    updateFormData({ documents: newDocuments });
  };

  // Get requirements for current category
  const requirements = formData.category 
    ? PHOTO_REQUIREMENTS[formData.category] 
    : PHOTO_REQUIREMENTS.bagger;
  
  const minPhotos = requirements.min;
  const hasEnoughPhotos = formData.images.length >= minPhotos;
  const photosNeeded = minPhotos - formData.images.length;

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-headline mb-2">
          Fotos & Dokumente
        </h2>
        <p className="text-muted-foreground">
          {requirements.description} für eine genaue Preisberechnung
        </p>
      </div>

      {/* Image Upload */}
      <div>
        <Label className="text-base font-medium mb-3 flex items-center gap-2">
          <Camera className="h-5 w-5 text-primary" />
          Fotos *
          <span className={cn(
            "ml-2 text-sm font-normal px-2 py-0.5 rounded-full",
            hasEnoughPhotos 
              ? "bg-success/20 text-success" 
              : "bg-destructive/20 text-destructive"
          )}>
            {formData.images.length} / {minPhotos} min.
          </span>
        </Label>
        
        <div className="grid gap-4">
          {/* Upload Area */}
          <label className={cn(
            "relative flex flex-col items-center justify-center h-40 rounded-xl border-2 border-dashed cursor-pointer transition-all",
            hasEnoughPhotos 
              ? "border-success/50 bg-success/5 hover:border-success hover:bg-success/10"
              : "border-border bg-muted/50 hover:border-primary hover:bg-primary/5"
          )}>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            {hasEnoughPhotos ? (
              <CheckCircle2 className="h-10 w-10 text-success mb-2" />
            ) : (
              <Upload className="h-10 w-10 text-muted-foreground mb-2" />
            )}
            <span className="text-sm font-medium text-foreground">
              {hasEnoughPhotos ? "Weitere Fotos hinzufügen" : "Fotos auswählen"}
            </span>
            <span className="text-xs text-muted-foreground mt-1">
              oder hierher ziehen
            </span>
          </label>

          {/* Validation Message */}
          {!hasEnoughPhotos && (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-destructive/10 text-destructive text-sm">
              <AlertCircle className="h-4 w-4 flex-shrink-0" />
              <span>
                Noch {photosNeeded} {photosNeeded === 1 ? "Foto" : "Fotos"} erforderlich. 
                Bitte laden Sie mindestens {minPhotos} Fotos hoch.
              </span>
            </div>
          )}

          {/* Image Previews */}
          {formData.images.length > 0 && (
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
              {formData.images.map((file, index) => (
                <div key={index} className="relative group">
                  <div className="aspect-square rounded-lg overflow-hidden bg-muted">
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`Upload ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="h-4 w-4" />
                  </button>
                  {/* Photo number indicator */}
                  <div className="absolute bottom-1 left-1 bg-black/60 text-white text-xs px-1.5 py-0.5 rounded">
                    {index + 1}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Required Photos Checklist */}
          <div className="bg-muted rounded-lg p-4">
            <div className="flex items-start gap-2">
              <Info className="h-4 w-4 shrink-0 mt-0.5 text-primary" />
              <div className="text-sm">
                <p className="font-medium text-foreground mb-2">
                  Pflichtfotos ({formData.category === "arbeitsbuehne" ? "Arbeitsbühne" : "Bagger"}):
                </p>
                <div className="grid grid-cols-2 gap-1">
                  {requirements.suggestions.map((item, index) => (
                    <div 
                      key={item} 
                      className={cn(
                        "flex items-center gap-2",
                        index < formData.images.length 
                          ? "text-success" 
                          : "text-muted-foreground"
                      )}
                    >
                      {index < formData.images.length ? (
                        <CheckCircle2 className="h-3 w-3" />
                      ) : (
                        <div className="h-3 w-3 rounded-full border border-current" />
                      )}
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
                
                {requirements.optional.length > 0 && (
                  <>
                    <p className="font-medium text-foreground mt-3 mb-1">
                      Optionale Fotos:
                    </p>
                    <ul className="list-disc list-inside text-muted-foreground space-y-0.5">
                      {requirements.optional.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Document Upload */}
      <div>
        <Label className="text-base font-medium mb-3 flex items-center gap-2">
          <FileText className="h-5 w-5 text-primary" />
          Dokumente (optional)
        </Label>
        
        <label className="relative flex items-center gap-4 p-4 rounded-xl border-2 border-dashed border-border bg-muted/50 cursor-pointer hover:border-primary hover:bg-primary/5 transition-all">
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            multiple
            onChange={handleDocumentUpload}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <Upload className="h-6 w-6 text-muted-foreground" />
          <div>
            <span className="text-sm font-medium text-foreground">
              Rechnungen, Prüfberichte, Serviceberichte
            </span>
            <span className="block text-xs text-muted-foreground mt-0.5">
              PDF, Word-Dokumente
            </span>
          </div>
        </label>

        {/* Document List */}
        {formData.documents.length > 0 && (
          <div className="mt-4 space-y-2">
            {formData.documents.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 rounded-lg border bg-card"
              >
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-primary" />
                  <span className="text-sm font-medium truncate max-w-[200px]">
                    {file.name}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => removeDocument(index)}
                  className="text-muted-foreground hover:text-destructive transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

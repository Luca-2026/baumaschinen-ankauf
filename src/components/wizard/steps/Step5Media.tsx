import { useCallback } from "react";
import { WizardFormData } from "@/types/wizard";
import { Label } from "@/components/ui/label";
import { Camera, FileText, X, Upload, Info } from "lucide-react";
import { cn } from "@/lib/utils";

interface Step5MediaProps {
  formData: WizardFormData;
  updateFormData: (updates: Partial<WizardFormData>) => void;
}

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

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-headline mb-2">
          Fotos & Dokumente
        </h2>
        <p className="text-muted-foreground">
          Bilder erhöhen die Genauigkeit des Referenzpreises
        </p>
      </div>

      {/* Image Upload */}
      <div>
        <Label className="text-base font-medium mb-3 flex items-center gap-2">
          <Camera className="h-5 w-5 text-primary" />
          Fotos (empfohlen: mind. 3)
        </Label>
        
        <div className="grid gap-4">
          {/* Upload Area */}
          <label className="relative flex flex-col items-center justify-center h-40 rounded-xl border-2 border-dashed border-border bg-muted/50 cursor-pointer hover:border-primary hover:bg-primary/5 transition-all">
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <Upload className="h-10 w-10 text-muted-foreground mb-2" />
            <span className="text-sm font-medium text-foreground">
              Fotos auswählen
            </span>
            <span className="text-xs text-muted-foreground mt-1">
              oder hierher ziehen
            </span>
          </label>

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
                </div>
              ))}
            </div>
          )}

          {/* Tips */}
          <div className="flex items-start gap-2 text-xs text-muted-foreground bg-muted rounded-lg p-3">
            <Info className="h-4 w-4 shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-foreground mb-1">Empfohlene Fotos:</p>
              <ul className="list-disc list-inside space-y-0.5">
                <li>Gesamtansicht von vorne und hinten</li>
                <li>Kabine innen (Bedienelemente, Sitz)</li>
                <li>Typenschild</li>
                <li>Betriebsstundenzähler</li>
                <li>Anbaugeräte</li>
                <li>Eventuelle Schäden</li>
              </ul>
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

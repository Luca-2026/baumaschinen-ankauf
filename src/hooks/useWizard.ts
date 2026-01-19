import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { WizardFormData, initialWizardData } from "@/types/wizard";
import { calculateReferencePrice } from "@/lib/priceCalculation";
import { useToast } from "@/hooks/use-toast";

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

export function useWizard() {
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<WizardFormData>(initialWizardData);
  const [manufacturers, setManufacturers] = useState<Manufacturer[]>([]);
  const [models, setModels] = useState<Model[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [leadId, setLeadId] = useState<string | null>(null);

  // Initialize category from URL params
  useEffect(() => {
    const kategorie = searchParams.get("kategorie");
    if (kategorie === "bagger" || kategorie === "arbeitsbuehne") {
      setFormData(prev => ({ ...prev, category: kategorie }));
    }
  }, [searchParams]);

  // Fetch manufacturers when category changes
  useEffect(() => {
    if (formData.category && (formData.category === 'bagger' || formData.category === 'arbeitsbuehne')) {
      fetchManufacturers(formData.category);
    }
  }, [formData.category]);

  // Fetch models when manufacturer changes
  useEffect(() => {
    if (formData.manufacturerId) {
      fetchModels(formData.manufacturerId);
    } else {
      setModels([]);
    }
  }, [formData.manufacturerId]);

  const fetchManufacturers = async (category: 'bagger' | 'arbeitsbuehne') => {
    try {
      const { data, error } = await supabase
        .from("manufacturers")
        .select("id, name, category")
        .eq("category", category)
        .eq("is_active", true)
        .order("sort_order");
      
      if (error) throw error;
      setManufacturers(data || []);
    } catch (error) {
      console.error("Error fetching manufacturers:", error);
    }
  };

  const fetchModels = async (manufacturerId: string) => {
    try {
      const { data, error } = await supabase
        .from("models")
        .select("id, name, manufacturer_id")
        .eq("manufacturer_id", manufacturerId)
        .eq("is_active", true)
        .order("name");
      
      if (error) throw error;
      setModels(data || []);
    } catch (error) {
      console.error("Error fetching models:", error);
    }
  };

  const updateFormData = useCallback((updates: Partial<WizardFormData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  }, []);

  const goToStep = useCallback((step: number) => {
    if (step >= 1 && step <= 6) {
      setCurrentStep(step);
    }
  }, []);

  const nextStep = useCallback(() => {
    if (currentStep < 6) {
      setCurrentStep(prev => prev + 1);
    }
  }, [currentStep]);

  const prevStep = useCallback(() => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  }, [currentStep]);

  const uploadFiles = async (files: File[], folder: string): Promise<string[]> => {
    const uploadedUrls: string[] = [];
    
    for (const file of files) {
      const fileName = `${folder}/${Date.now()}-${file.name}`;
      const { data, error } = await supabase.storage
        .from("machine-uploads")
        .upload(fileName, file);
      
      if (error) {
        console.error("Error uploading file:", error);
        continue;
      }
      
      const { data: { publicUrl } } = supabase.storage
        .from("machine-uploads")
        .getPublicUrl(data.path);
      
      uploadedUrls.push(publicUrl);
    }
    
    return uploadedUrls;
  };

  const submitLead = async () => {
    setIsSubmitting(true);
    
    try {
      // Calculate price
      const priceRange = calculateReferencePrice(formData);
      
      // Upload files
      let imageUrls: string[] = [];
      let documentUrls: string[] = [];
      
      if (formData.images.length > 0) {
        imageUrls = await uploadFiles(formData.images, "images");
      }
      
      if (formData.documents.length > 0) {
        documentUrls = await uploadFiles(formData.documents, "documents");
      }
      
      // Create lead
      const leadPayload = {
        contact_name: formData.contactName,
        contact_email: formData.contactEmail,
        contact_phone: formData.contactPhone,
        contact_company: formData.contactCompany || null,
        category: formData.category as 'bagger' | 'arbeitsbuehne',
        subcategory: formData.subcategory || null,
        manufacturer_name: formData.isCustomModel ? formData.manufacturerName : formData.manufacturerName,
        model_name: formData.isCustomModel ? formData.customModelName : formData.modelName,
        is_custom_model: formData.isCustomModel,
        year_built: formData.yearBuilt!,
        operating_hours: formData.operatingHours || null,
        weight_class: formData.weightClass || null,
        working_height: formData.workingHeight || null,
        drive_type: formData.driveType || null,
        serial_number: formData.serialNumber || null,
        location_zip: formData.locationZip,
        condition: formData.condition as 'sehr_gut' | 'gut' | 'ok' | 'reparaturbeduerftig',
        has_service_book: formData.hasServiceBook,
        has_uvv: formData.hasUvv,
        has_ce: formData.hasCe,
        has_manual: formData.hasManual,
        equipment: formData.equipment,
        has_damage: formData.hasDamage,
        damage_description: formData.damageDescription || null,
        images: imageUrls,
        documents: documentUrls,
        calculated_price_low: priceRange?.low || null,
        calculated_price_high: priceRange?.high || null,
        gdpr_consent: formData.gdprConsent,
        wants_pickup: formData.wantsPickup,
      };

      const { data: lead, error: leadError } = await supabase
        .from("leads")
        .insert(leadPayload)
        .select()
        .single();
      
      if (leadError) throw leadError;
      
      setLeadId(lead.id);
      
      // Send notification email
      try {
        await supabase.functions.invoke("send-lead-notification", {
          body: {
            leadId: lead.id,
            contactName: formData.contactName,
            contactEmail: formData.contactEmail,
            contactPhone: formData.contactPhone,
            contactCompany: formData.contactCompany,
            category: formData.category,
            manufacturerName: formData.isCustomModel ? formData.manufacturerName : formData.manufacturerName,
            modelName: formData.isCustomModel ? formData.customModelName : formData.modelName,
            yearBuilt: formData.yearBuilt,
            operatingHours: formData.operatingHours,
            condition: formData.condition,
            locationZip: formData.locationZip,
            priceRangeLow: priceRange?.low,
            priceRangeHigh: priceRange?.high,
          },
        });
      } catch (emailError) {
        console.error("Error sending notification email:", emailError);
        // Don't fail the submission if email fails
      }
      
      setIsSubmitted(true);
      
      toast({
        title: "Anfrage erfolgreich gesendet!",
        description: "Wir melden uns innerhalb von 24 Stunden bei Ihnen.",
      });
      
    } catch (error: any) {
      console.error("Error submitting lead:", error);
      toast({
        title: "Fehler beim Absenden",
        description: "Bitte versuchen Sie es erneut oder kontaktieren Sie uns.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const priceRange = calculateReferencePrice(formData);

  return {
    currentStep,
    formData,
    manufacturers,
    models,
    isLoading,
    isSubmitting,
    isSubmitted,
    leadId,
    priceRange,
    updateFormData,
    goToStep,
    nextStep,
    prevStep,
    submitLead,
  };
}

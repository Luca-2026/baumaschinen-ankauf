import { Layout } from "@/components/layout/Layout";
import { WizardStepper } from "@/components/wizard/WizardStepper";
import { Step1Category } from "@/components/wizard/steps/Step1Category";
import { Step2Manufacturer } from "@/components/wizard/steps/Step2Manufacturer";
import { Step3BaseData } from "@/components/wizard/steps/Step3BaseData";
import { Step4Condition } from "@/components/wizard/steps/Step4Condition";
import { Step5Media } from "@/components/wizard/steps/Step5Media";
import { Step6Contact } from "@/components/wizard/steps/Step6Contact";
import { SubmissionSuccess } from "@/components/wizard/SubmissionSuccess";
import { useWizard } from "@/hooks/useWizard";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Loader2, Calculator } from "lucide-react";
import { validateEmail, validatePhone } from "@/lib/emailValidation";
import { cn } from "@/lib/utils";
import { SEOHead, SEO_CONFIG } from "@/components/SEOHead";

const Ankauf = () => {
  const {
    currentStep,
    formData,
    manufacturers,
    models,
    isSubmitting,
    isSubmitted,
    priceRange,
    isPriceLoading,
    updateFormData,
    goToStep,
    nextStep,
    prevStep,
    submitLead,
  } = useWizard();

  // Price explanation state removed - price only shown after submission

  // Photo requirements by category
  const minPhotosRequired = formData.category === "arbeitsbuehne" ? 2 : 5;

  // Validation for each step
  const isStep1Valid = formData.category !== "";
  const isStep2Valid = formData.manufacturerId !== "" && (formData.modelId !== "" || (formData.isCustomModel && formData.customModelName !== ""));
  const isStep3Valid = formData.yearBuilt !== null && formData.locationZip.length === 5 && formData.serialNumber.trim() !== "";
  const isStep4Valid = formData.condition !== "";
  const isStep5Valid = formData.images.length >= minPhotosRequired;
  
  // Step 6: Full validation including email and phone verification
  const emailValidation = validateEmail(formData.contactEmail);
  const phoneValidation = validatePhone(formData.contactPhone);
  const isStep6Valid = 
    formData.contactName.trim() !== "" && 
    emailValidation.isValid && 
    phoneValidation.isValid && 
    formData.gdprConsent;

  const canProceed = () => {
    switch (currentStep) {
      case 1: return isStep1Valid;
      case 2: return isStep2Valid;
      case 3: return isStep3Valid;
      case 4: return isStep4Valid;
      case 5: return isStep5Valid;
      case 6: return isStep6Valid;
      default: return false;
    }
  };

  const handleSubmit = () => {
    if (canProceed()) {
      submitLead();
    }
  };

  // If submitted, show success page
  if (isSubmitted) {
    return (
      <Layout>
        <SEOHead {...SEO_CONFIG.ankauf} />
        <div className="bg-background-muted min-h-[calc(100vh-4rem)]">
          <div className="container py-12">
            <div className="max-w-2xl mx-auto bg-card rounded-2xl shadow-lg p-8">
              <SubmissionSuccess
                priceRange={priceRange}
                manufacturerName={formData.manufacturerName || formData.customModelName}
                modelName={formData.modelName || formData.customModelName}
              />
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <SEOHead {...SEO_CONFIG.ankauf} />
      <div className="bg-background-muted min-h-[calc(100vh-4rem)]">
        <div className="container py-8 md:py-12">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Main Wizard Area */}
            <div className="lg:col-span-2">
              <div className="bg-card rounded-2xl shadow-lg p-6 md:p-8">
                {/* Stepper */}
                <WizardStepper currentStep={currentStep} onStepClick={goToStep} />

                {/* Step Content */}
                <div className="min-h-[400px]">
                  {currentStep === 1 && (
                    <Step1Category
                      formData={formData}
                      updateFormData={updateFormData}
                      onNext={nextStep}
                    />
                  )}
                  {currentStep === 2 && (
                    <Step2Manufacturer
                      formData={formData}
                      updateFormData={updateFormData}
                    />
                  )}
                  {currentStep === 3 && (
                    <Step3BaseData
                      formData={formData}
                      updateFormData={updateFormData}
                    />
                  )}
                  {currentStep === 4 && (
                    <Step4Condition
                      formData={formData}
                      updateFormData={updateFormData}
                    />
                  )}
                  {currentStep === 5 && (
                    <Step5Media
                      formData={formData}
                      updateFormData={updateFormData}
                    />
                  )}
                  {currentStep === 6 && (
                    <Step6Contact
                      formData={formData}
                      updateFormData={updateFormData}
                    />
                  )}
                </div>

                {/* Navigation Buttons */}
                <div className="flex items-center justify-between mt-8 pt-6 border-t">
                  <Button
                    variant="outline"
                    onClick={prevStep}
                    disabled={currentStep === 1}
                    className="gap-2"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Zurück
                  </Button>

                  {currentStep < 6 ? (
                    <Button
                      onClick={nextStep}
                      disabled={!canProceed()}
                      className="gap-2 bg-accent hover:bg-accent/90 text-accent-foreground"
                    >
                      Weiter
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  ) : (
                    <Button
                      onClick={handleSubmit}
                      disabled={!canProceed() || isSubmitting}
                      className="gap-2 bg-accent hover:bg-accent/90 text-accent-foreground min-w-[180px]"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Wird gesendet...
                        </>
                      ) : (
                        <>
                          Anfrage absenden
                          <ArrowRight className="h-4 w-4" />
                        </>
                      )}
                    </Button>
                  )}
                </div>
              </div>
            </div>

            {/* Sidebar - Price Preview */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Price Card - Only shown AFTER successful submission in SubmissionSuccess component */}
                <div className="bg-card rounded-2xl shadow-lg p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Calculator className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold text-headline">Referenzpreis</h3>
                  </div>

                  {/* Price is only shown after submission - never during the form */}
                  <div className="text-center py-6 text-muted-foreground">
                    <Calculator className="h-10 w-10 mx-auto mb-3 opacity-30" />
                    <p className="text-sm">
                      {currentStep < 6 
                        ? "Füllen Sie das Formular aus, um Ihren Schätzpreis zu erhalten"
                        : "Nach Absenden Ihrer Anfrage erhalten Sie sofort Ihren Schätzpreis"
                      }
                    </p>
                  </div>
                </div>

                {/* Summary Card */}
                {(formData.category || formData.manufacturerName) && (
                  <div className="bg-card rounded-2xl shadow-lg p-6">
                    <h3 className="font-semibold text-headline mb-4">Ihre Angaben</h3>
                    <dl className="space-y-3 text-sm">
                      {formData.category && (
                        <div className="flex justify-between">
                          <dt className="text-muted-foreground">Kategorie:</dt>
                          <dd className="font-medium">
                            {formData.category === "bagger" ? "Bagger" : "Arbeitsbühne"}
                          </dd>
                        </div>
                      )}
                      {formData.manufacturerName && (
                        <div className="flex justify-between">
                          <dt className="text-muted-foreground">Hersteller:</dt>
                          <dd className="font-medium">{formData.manufacturerName}</dd>
                        </div>
                      )}
                      {(formData.modelName || formData.customModelName) && (
                        <div className="flex justify-between">
                          <dt className="text-muted-foreground">Modell:</dt>
                          <dd className="font-medium">
                            {formData.modelName || formData.customModelName}
                          </dd>
                        </div>
                      )}
                      {formData.yearBuilt && (
                        <div className="flex justify-between">
                          <dt className="text-muted-foreground">Baujahr:</dt>
                          <dd className="font-medium">{formData.yearBuilt}</dd>
                        </div>
                      )}
                      {formData.operatingHours && (
                        <div className="flex justify-between">
                          <dt className="text-muted-foreground">Betriebsstunden:</dt>
                          <dd className="font-medium">
                            {formData.operatingHours.toLocaleString("de-DE")}
                          </dd>
                        </div>
                      )}
                      {formData.condition && (
                        <div className="flex justify-between">
                          <dt className="text-muted-foreground">Zustand:</dt>
                          <dd className="font-medium capitalize">
                            {formData.condition.replace("_", " ")}
                          </dd>
                        </div>
                      )}
                    </dl>
                  </div>
                )}

                {/* Trust Badges */}
                <div className="bg-primary/5 rounded-xl p-4">
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-success" />
                      <span>Unverbindlich & kostenlos</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-success" />
                      <span>Antwort innerhalb 24h</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-success" />
                      <span>NRW-Abholung möglich</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Ankauf;

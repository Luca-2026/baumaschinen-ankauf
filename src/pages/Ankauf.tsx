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
import { ArrowLeft, ArrowRight, Loader2, Calculator, Info, ChevronDown, ChevronUp } from "lucide-react";
import { formatPriceRange } from "@/lib/priceCalculation";
import { useState } from "react";
import { cn } from "@/lib/utils";

const Ankauf = () => {
  const {
    currentStep,
    formData,
    manufacturers,
    models,
    isSubmitting,
    isSubmitted,
    priceRange,
    updateFormData,
    goToStep,
    nextStep,
    prevStep,
    submitLead,
  } = useWizard();

  const [showPriceExplanation, setShowPriceExplanation] = useState(false);

  // Validation for each step
  const isStep1Valid = formData.category !== "";
  const isStep2Valid = formData.manufacturerId !== "" && (formData.modelId !== "" || (formData.isCustomModel && formData.customModelName !== ""));
  const isStep3Valid = formData.yearBuilt !== null && formData.locationZip.length === 5;
  const isStep4Valid = formData.condition !== "";
  const isStep5Valid = true; // Media is optional
  const isStep6Valid = formData.contactName !== "" && formData.contactEmail !== "" && formData.contactPhone !== "" && formData.gdprConsent;

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
                      manufacturers={manufacturers}
                      models={models}
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
                {/* Price Card */}
                <div className="bg-card rounded-2xl shadow-lg p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Calculator className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold text-headline">Referenzpreis</h3>
                  </div>

                  {priceRange ? (
                    <>
                      <div className="bg-accent/10 rounded-xl p-4 mb-4">
                        <p className="text-sm text-muted-foreground mb-1">
                          Vorläufige Schätzung:
                        </p>
                        <p className="text-2xl md:text-3xl font-bold text-accent">
                          {formatPriceRange(priceRange)}
                        </p>
                      </div>

                      {/* How it's calculated */}
                      <button
                        onClick={() => setShowPriceExplanation(!showPriceExplanation)}
                        className="flex items-center justify-between w-full text-sm text-primary hover:underline"
                      >
                        <span className="flex items-center gap-1">
                          <Info className="h-4 w-4" />
                          Wie wird das berechnet?
                        </span>
                        {showPriceExplanation ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </button>

                      {showPriceExplanation && (
                        <div className="mt-4 text-sm text-muted-foreground bg-muted rounded-lg p-4 animate-fade-in">
                          <p className="font-medium text-foreground mb-2">
                            Der Referenzpreis basiert auf:
                          </p>
                          <ul className="space-y-1 list-disc list-inside">
                            <li>Kategorie & Größenklasse</li>
                            <li>Baujahr & Alter</li>
                            <li>Betriebsstunden</li>
                            <li>Zustand der Maschine</li>
                            <li>Dokumentation & Ausstattung</li>
                            <li>Eventuelle Schäden</li>
                          </ul>
                          <p className="mt-3 text-xs">
                            * Der finale Ankaufpreis wird nach persönlicher 
                            Begutachtung Ihrer Maschine festgelegt.
                          </p>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="text-center py-6 text-muted-foreground">
                      <Calculator className="h-10 w-10 mx-auto mb-3 opacity-30" />
                      <p className="text-sm">
                        Füllen Sie die Basisdaten aus, um eine Preisschätzung zu erhalten
                      </p>
                    </div>
                  )}
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

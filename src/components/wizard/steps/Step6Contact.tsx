import { useState, useEffect } from "react";
import { WizardFormData } from "@/types/wizard";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { User, Mail, Phone, Building2, ShieldCheck, Truck, AlertCircle, CheckCircle2 } from "lucide-react";
import { validateEmail, validatePhone } from "@/lib/emailValidation";
import { cn } from "@/lib/utils";

interface Step6ContactProps {
  formData: WizardFormData;
  updateFormData: (updates: Partial<WizardFormData>) => void;
}

export function Step6Contact({ formData, updateFormData }: Step6ContactProps) {
  const [emailError, setEmailError] = useState<string | undefined>();
  const [phoneError, setPhoneError] = useState<string | undefined>();
  const [emailTouched, setEmailTouched] = useState(false);
  const [phoneTouched, setPhoneTouched] = useState(false);

  // Validate email on blur or when value changes after being touched
  useEffect(() => {
    if (emailTouched && formData.contactEmail) {
      const result = validateEmail(formData.contactEmail);
      setEmailError(result.isValid ? undefined : result.error);
    }
  }, [formData.contactEmail, emailTouched]);

  // Validate phone on blur or when value changes after being touched
  useEffect(() => {
    if (phoneTouched && formData.contactPhone) {
      const result = validatePhone(formData.contactPhone);
      setPhoneError(result.isValid ? undefined : result.error);
    }
  }, [formData.contactPhone, phoneTouched]);

  const emailIsValid = formData.contactEmail && !emailError && emailTouched;
  const phoneIsValid = formData.contactPhone && !phoneError && phoneTouched;

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-headline mb-2">
          Ihre Kontaktdaten
        </h2>
        <p className="text-muted-foreground">
          Nach Absenden erhalten Sie sofort Ihren unverbindlichen Schätzpreis
        </p>
      </div>

      {/* Contact Form */}
      <div className="grid gap-5">
        {/* Name */}
        <div>
          <Label htmlFor="contactName" className="text-base font-medium flex items-center gap-2">
            <User className="h-4 w-4 text-primary" />
            Name *
          </Label>
          <Input
            id="contactName"
            placeholder="Ihr vollständiger Name"
            className="mt-2"
            value={formData.contactName}
            onChange={(e) => updateFormData({ contactName: e.target.value })}
          />
        </div>

        {/* Company (optional) */}
        <div>
          <Label htmlFor="contactCompany" className="text-base font-medium flex items-center gap-2">
            <Building2 className="h-4 w-4 text-primary" />
            Firma (optional)
          </Label>
          <Input
            id="contactCompany"
            placeholder="Firmenname"
            className="mt-2"
            value={formData.contactCompany}
            onChange={(e) => updateFormData({ contactCompany: e.target.value })}
          />
        </div>

        {/* Email with validation */}
        <div>
          <Label htmlFor="contactEmail" className="text-base font-medium flex items-center gap-2">
            <Mail className="h-4 w-4 text-primary" />
            E-Mail *
          </Label>
          <div className="relative mt-2">
            <Input
              id="contactEmail"
              type="email"
              placeholder="ihre.email@beispiel.de"
              className={cn(
                "pr-10",
                emailError && emailTouched && "border-destructive focus-visible:ring-destructive",
                emailIsValid && "border-success focus-visible:ring-success"
              )}
              value={formData.contactEmail}
              onChange={(e) => updateFormData({ contactEmail: e.target.value })}
              onBlur={() => setEmailTouched(true)}
            />
            {emailTouched && formData.contactEmail && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                {emailError ? (
                  <AlertCircle className="h-4 w-4 text-destructive" />
                ) : (
                  <CheckCircle2 className="h-4 w-4 text-success" />
                )}
              </div>
            )}
          </div>
          {emailError && emailTouched && (
            <p className="text-sm text-destructive mt-1 flex items-center gap-1">
              <AlertCircle className="h-3 w-3" />
              {emailError}
            </p>
          )}
        </div>

        {/* Phone with validation */}
        <div>
          <Label htmlFor="contactPhone" className="text-base font-medium flex items-center gap-2">
            <Phone className="h-4 w-4 text-primary" />
            Telefon *
          </Label>
          <div className="relative mt-2">
            <Input
              id="contactPhone"
              type="tel"
              placeholder="z.B. 0151 12345678"
              className={cn(
                "pr-10",
                phoneError && phoneTouched && "border-destructive focus-visible:ring-destructive",
                phoneIsValid && "border-success focus-visible:ring-success"
              )}
              value={formData.contactPhone}
              onChange={(e) => updateFormData({ contactPhone: e.target.value })}
              onBlur={() => setPhoneTouched(true)}
            />
            {phoneTouched && formData.contactPhone && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                {phoneError ? (
                  <AlertCircle className="h-4 w-4 text-destructive" />
                ) : (
                  <CheckCircle2 className="h-4 w-4 text-success" />
                )}
              </div>
            )}
          </div>
          {phoneError && phoneTouched && (
            <p className="text-sm text-destructive mt-1 flex items-center gap-1">
              <AlertCircle className="h-3 w-3" />
              {phoneError}
            </p>
          )}
        </div>
      </div>

      {/* Options */}
      <div className="space-y-4">
        {/* Pickup Option */}
        <div className="flex items-start gap-3 p-4 rounded-xl border bg-card">
          <Checkbox
            id="wantsPickup"
            checked={formData.wantsPickup}
            onCheckedChange={(checked) => updateFormData({ wantsPickup: !!checked })}
            className="mt-0.5"
          />
          <div>
            <label htmlFor="wantsPickup" className="font-medium cursor-pointer flex items-center gap-2">
              <Truck className="h-4 w-4 text-accent" />
              Ich möchte ein Angebot für Abholung/Transport
            </label>
            <p className="text-sm text-muted-foreground mt-1">
              Wir holen die Maschine bundesweit ab – besonders schnell in NRW
            </p>
          </div>
        </div>

        {/* GDPR Consent */}
        <div className="flex items-start gap-3 p-4 rounded-xl border bg-card">
          <Checkbox
            id="gdprConsent"
            checked={formData.gdprConsent}
            onCheckedChange={(checked) => updateFormData({ gdprConsent: !!checked })}
            className="mt-0.5"
          />
          <div>
            <label htmlFor="gdprConsent" className="font-medium cursor-pointer flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-success" />
              Datenschutz & Einwilligung *
            </label>
            <p className="text-sm text-muted-foreground mt-1">
              Ich stimme der Verarbeitung meiner Daten gemäß der{" "}
              <a href="/datenschutz" target="_blank" className="text-primary hover:underline">
                Datenschutzerklärung
              </a>{" "}
              zu und willige ein, dass SLT Technology Group mich zur Bearbeitung meiner Anfrage kontaktieren darf.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

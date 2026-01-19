import { WizardFormData } from "@/types/wizard";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { User, Mail, Phone, Building2, ShieldCheck, Truck } from "lucide-react";

interface Step6ContactProps {
  formData: WizardFormData;
  updateFormData: (updates: Partial<WizardFormData>) => void;
}

export function Step6Contact({ formData, updateFormData }: Step6ContactProps) {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-headline mb-2">
          Ihre Kontaktdaten
        </h2>
        <p className="text-muted-foreground">
          Damit wir Ihnen Ihren Referenzpreis senden und Sie kontaktieren können
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

        {/* Email */}
        <div>
          <Label htmlFor="contactEmail" className="text-base font-medium flex items-center gap-2">
            <Mail className="h-4 w-4 text-primary" />
            E-Mail *
          </Label>
          <Input
            id="contactEmail"
            type="email"
            placeholder="ihre.email@beispiel.de"
            className="mt-2"
            value={formData.contactEmail}
            onChange={(e) => updateFormData({ contactEmail: e.target.value })}
          />
        </div>

        {/* Phone */}
        <div>
          <Label htmlFor="contactPhone" className="text-base font-medium flex items-center gap-2">
            <Phone className="h-4 w-4 text-primary" />
            Telefon *
          </Label>
          <Input
            id="contactPhone"
            type="tel"
            placeholder="z.B. 0151 12345678"
            className="mt-2"
            value={formData.contactPhone}
            onChange={(e) => updateFormData({ contactPhone: e.target.value })}
          />
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

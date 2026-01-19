import { Link } from "react-router-dom";
import { Check, Calendar, Phone, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatPriceRange } from "@/lib/priceCalculation";

interface SubmissionSuccessProps {
  priceRange: { low: number; high: number } | null;
  manufacturerName: string;
  modelName: string;
}

export function SubmissionSuccess({ priceRange, manufacturerName, modelName }: SubmissionSuccessProps) {
  return (
    <div className="text-center py-8">
      {/* Success Icon */}
      <div className="flex justify-center mb-6">
        <div className="h-20 w-20 rounded-full bg-success/10 flex items-center justify-center">
          <Check className="h-10 w-10 text-success" />
        </div>
      </div>

      <h2 className="text-3xl font-bold text-headline mb-3">
        Vielen Dank für Ihre Anfrage!
      </h2>
      <p className="text-lg text-muted-foreground mb-8 max-w-md mx-auto">
        Wir haben Ihre Daten für den{" "}
        <strong className="text-foreground">{manufacturerName} {modelName}</strong>{" "}
        erhalten.
      </p>

      {/* Price Display */}
      {priceRange && (
        <div className="bg-accent/10 rounded-2xl p-8 mb-8 max-w-md mx-auto">
          <p className="text-sm font-medium text-muted-foreground mb-2">
            Ihr vorläufiger Referenzpreis:
          </p>
          <p className="text-4xl font-bold text-accent">
            {formatPriceRange(priceRange)}
          </p>
          <p className="text-xs text-muted-foreground mt-3">
            * Der finale Ankaufpreis wird nach Sichtprüfung Ihrer Maschine festgelegt.
          </p>
        </div>
      )}

      {/* Next Steps */}
      <div className="bg-muted rounded-xl p-6 mb-8 max-w-lg mx-auto text-left">
        <h3 className="font-semibold text-headline mb-4">Was passiert als nächstes?</h3>
        <ol className="space-y-3">
          <li className="flex items-start gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">
              1
            </span>
            <span className="text-sm text-muted-foreground">
              Wir prüfen Ihre Angaben und melden uns innerhalb von <strong className="text-foreground">24 Stunden</strong>
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">
              2
            </span>
            <span className="text-sm text-muted-foreground">
              Gemeinsam vereinbaren wir einen Besichtigungstermin
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">
              3
            </span>
            <span className="text-sm text-muted-foreground">
              Nach der Prüfung erhalten Sie ein verbindliches Angebot
            </span>
          </li>
        </ol>
      </div>

      {/* CTAs */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
          <Link to="/kontakt">
            <Calendar className="mr-2 h-5 w-5" />
            Termin vereinbaren
          </Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <a href="tel:+492151999999">
            <Phone className="mr-2 h-5 w-5" />
            Jetzt anrufen
          </a>
        </Button>
      </div>

      {/* Return Home */}
      <div className="mt-8">
        <Link to="/" className="text-sm text-primary hover:underline inline-flex items-center gap-1">
          Zurück zur Startseite
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}

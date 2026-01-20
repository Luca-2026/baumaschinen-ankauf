import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CTASection() {
  return (
    <section className="py-16 md:py-24 bg-primary text-primary-foreground">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl text-white">
            Bereit, Ihre Baumaschine zu verkaufen?
          </h2>
          <p className="mt-6 text-lg text-primary-foreground/80">
            Starten Sie jetzt den kostenlosen Ankauf-Check und erhalten Sie in weniger als 2 Minuten einen unverbindlichen Referenzpreis.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold text-lg h-14 px-8"
            >
              <Link to="/ankauf">
                Jetzt Ankaufpreis erhalten
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 h-14 px-8"
            >
              <Link to="/kontakt">Kontakt aufnehmen</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

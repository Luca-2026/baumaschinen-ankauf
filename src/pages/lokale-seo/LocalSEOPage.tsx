import { Layout } from "@/components/layout/Layout";
import { SEOHead } from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { MapPin, Phone, CheckCircle, Truck, Euro, Clock, ArrowRight } from "lucide-react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

interface LocalSEOPageProps {
  city: string;
  region?: string;
  zipCodes?: string[];
  nearbyAreas?: string[];
  description: string;
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;
  canonicalPath: string;
}

export function LocalSEOPage({
  city,
  region = "NRW",
  zipCodes = [],
  nearbyAreas = [],
  description,
  seoTitle,
  seoDescription,
  seoKeywords,
  canonicalPath,
}: LocalSEOPageProps) {
  const benefits = [
    {
      icon: Euro,
      title: "Faire Preise",
      description: `Wir zahlen marktgerechte Preise für Ihre Baumaschine in ${city}.`,
    },
    {
      icon: Truck,
      title: "Kostenlose Abholung",
      description: `Wir holen Ihre Maschine kostenlos in ${city} und Umgebung ab.`,
    },
    {
      icon: Clock,
      title: "Schnelle Abwicklung",
      description: "Bewertung in 24h, Angebot sofort, Zahlung bei Abholung.",
    },
    {
      icon: CheckCircle,
      title: "Alle Marken",
      description: "Wir kaufen Bagger und Arbeitsbühnen aller Hersteller.",
    },
  ];

  const machineTypes = [
    "Minibagger",
    "Kettenbagger",
    "Mobilbagger",
    "Radlader",
    "Scherenarbeitsbühnen",
    "Teleskoparbeitsbühnen",
    "Gelenkteleskopbühnen",
    "Anhängerarbeitsbühnen",
  ];

  return (
    <Layout>
      <SEOHead
        title={seoTitle}
        description={seoDescription}
        keywords={seoKeywords}
        canonicalPath={canonicalPath}
      />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <AnimatedSection animation="fadeInUp">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6">
                <MapPin className="h-4 w-4" />
                <span className="text-sm font-medium">{city}, {region}</span>
              </div>
              
              <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
                Bagger & Arbeitsbühne verkaufen in {city}
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                {description}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="text-lg">
                  <Link to="/ankauf">
                    Jetzt kostenlos bewerten lassen
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <a href="tel:+4921513766600">
                    <Phone className="mr-2 h-5 w-5" />
                    Direkt anrufen
                  </a>
                </Button>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <AnimatedSection animation="fadeInUp">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
              Ihre Vorteile beim Baumaschinen-Verkauf in {city}
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <AnimatedSection key={index} animation="fadeInUp" delay={index * 100}>
                <div className="bg-card border border-border rounded-xl p-6 h-full hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <benefit.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{benefit.title}</h3>
                  <p className="text-muted-foreground text-sm">{benefit.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Machine Types Section */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <AnimatedSection animation="fadeInUp">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">
              Diese Baumaschinen kaufen wir in {city}
            </h2>
            <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
              Wir kaufen alle gängigen Baumaschinen-Typen – egal ob Bagger oder Arbeitsbühne, 
              neu oder gebraucht, funktionsfähig oder reparaturbedürftig.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {machineTypes.map((type, index) => (
              <AnimatedSection key={index} animation="fadeInUp" delay={index * 50}>
                <div className="bg-card border border-border rounded-lg p-4 text-center hover:border-primary transition-colors">
                  <CheckCircle className="h-5 w-5 text-primary mx-auto mb-2" />
                  <span className="font-medium text-sm">{type}</span>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Local Info Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            <AnimatedSection animation="fadeInUp">
              <h2 className="text-2xl font-bold mb-6">
                Baumaschinen-Ankauf in {city} und Umgebung
              </h2>
              <div className="prose prose-gray max-w-none">
                <p className="text-muted-foreground mb-4">
                  Als erfahrener Ankäufer für Baumaschinen sind wir Ihr zuverlässiger Partner 
                  in {city} und der gesamten Region {region}. Wir bieten einen unkomplizierten 
                  Verkaufsprozess mit fairer Bewertung und schneller Abwicklung.
                </p>
                <p className="text-muted-foreground mb-4">
                  Ob Sie einen Minibagger, Kettenbagger, eine Scherenarbeitsbühne oder 
                  Teleskopbühne verkaufen möchten – wir machen Ihnen ein faires Angebot. 
                  Die Abholung in {city} ist für Sie selbstverständlich kostenlos.
                </p>
                <p className="text-muted-foreground">
                  Starten Sie jetzt mit unserer kostenlosen Online-Bewertung und erhalten 
                  Sie innerhalb von 24 Stunden ein verbindliches Angebot für Ihre Baumaschine.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="fadeInUp" delay={200}>
              <div className="bg-card border border-border rounded-xl p-6">
                <h3 className="font-semibold text-lg mb-4">Unser Einzugsgebiet</h3>
                
                {zipCodes.length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-muted-foreground mb-2">
                      Postleitzahlen in {city}:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {zipCodes.map((zip) => (
                        <span
                          key={zip}
                          className="bg-secondary px-3 py-1 rounded-full text-sm"
                        >
                          {zip}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {nearbyAreas.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-2">
                      Auch in der Nähe:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {nearbyAreas.map((area) => (
                        <span
                          key={area}
                          className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm"
                        >
                          {area}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <AnimatedSection animation="fadeInUp">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Jetzt Baumaschine in {city} verkaufen
            </h2>
            <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              Starten Sie jetzt mit der kostenlosen Bewertung Ihrer Baumaschine. 
              Innerhalb von 24 Stunden erhalten Sie ein verbindliches Angebot.
            </p>
            <Button asChild size="lg" variant="secondary" className="text-lg">
              <Link to="/ankauf">
                Kostenlose Bewertung starten
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </AnimatedSection>
        </div>
      </section>
    </Layout>
  );
}

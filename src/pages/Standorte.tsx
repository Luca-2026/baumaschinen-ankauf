import { Layout } from "@/components/layout/Layout";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/button";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock,
  Navigation,
  Building2
} from "lucide-react";

import krefeldImage from "@/assets/locations/krefeld.jpg";
import bonnImage from "@/assets/locations/bonn.webp";

const locations = [
  {
    city: "Krefeld",
    address: "Anrather Straße 291",
    zip: "47803 Krefeld",
    phone: "+49 2151 417 990 4",
    email: "krefeld@wirkaufendeinebaumaschinen.de",
    hours: "Mo-Fr: 08:00 - 17:00 Uhr",
    description: "Unser Hauptstandort mit großem Maschinenpark und Werkstatt.",
    mapUrl: "https://maps.google.com/?q=Anrather+Straße+291,+47803+Krefeld",
    image: krefeldImage
  },
  {
    city: "Bonn",
    address: "Drachenburgstraße 8",
    zip: "53179 Bonn",
    phone: "+49 228 504 660 61",
    email: "bonn@wirkaufendeinebaumaschinen.de",
    hours: "Mo-Fr: 08:00 - 17:00 Uhr",
    description: "Standort für den Großraum Bonn/Köln mit Beratung vor Ort.",
    mapUrl: "https://maps.google.com/?q=Drachenburgstraße+8,+53179+Bonn",
    image: bonnImage
  },
  {
    city: "Mülheim an der Ruhr",
    address: "Ruhrorter Str. 122",
    zip: "45478 Mülheim an der Ruhr",
    phone: "+49 208 XXXXXX",
    email: "muelheim@wirkaufendeinebaumaschinen.de",
    hours: "Mo-Fr: 08:00 - 17:00 Uhr",
    description: "Ihr Ansprechpartner im Ruhrgebiet.",
    mapUrl: "https://maps.google.com/?q=Ruhrorter+Str.+122,+45478+Mülheim+an+der+Ruhr",
    image: null
  }
];

export default function Standorte() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 via-background to-accent/5 py-16 md:py-24">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold tracking-tight text-headline md:text-5xl mb-6">
              Unsere Standorte in NRW
            </h1>
            <p className="text-xl text-muted-foreground">
              Mit drei Standorten sind wir in ganz Nordrhein-Westfalen für Sie da – 
              persönliche Beratung und schnelle Abwicklung garantiert.
            </p>
          </div>
        </div>
      </section>

      {/* Locations Grid */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid gap-8 lg:grid-cols-3">
            {locations.map((location) => (
              <div
                key={location.city}
                className="rounded-2xl border bg-card overflow-hidden shadow-sm hover:shadow-lg transition-all"
              >
                {/* Location Image */}
                <div className="aspect-video bg-muted relative overflow-hidden">
                  {location.image ? (
                    <img 
                      src={location.image} 
                      alt={`Standort ${location.city}`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <MapPin className="h-12 w-12 text-primary" />
                    </div>
                  )}
                  <Button
                    asChild
                    size="sm"
                    variant="secondary"
                    className="absolute bottom-3 right-3"
                  >
                    <a 
                      href={location.mapUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      <Navigation className="h-4 w-4 mr-1" />
                      Route
                    </a>
                  </Button>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Building2 className="h-5 w-5 text-primary" />
                    <h3 className="text-xl font-bold text-headline">
                      {location.city}
                    </h3>
                  </div>

                  <p className="text-sm text-muted-foreground mb-6">
                    {location.description}
                  </p>

                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium">{location.address}</p>
                        <p className="text-sm text-muted-foreground">{location.zip}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Phone className="h-5 w-5 text-muted-foreground" />
                      <a 
                        href={`tel:${location.phone.replace(/\s/g, "")}`}
                        className="font-medium hover:text-primary transition-colors"
                      >
                        {location.phone}
                      </a>
                    </div>

                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-muted-foreground" />
                      <a 
                        href={`mailto:${location.email}`}
                        className="font-medium hover:text-primary transition-colors"
                      >
                        {location.email}
                      </a>
                    </div>

                    <div className="flex items-center gap-3">
                      <Clock className="h-5 w-5 text-muted-foreground" />
                      <span className="text-sm">{location.hours}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Area */}
      <section className="py-16 bg-muted">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-headline mb-4">
              Kostenlose Abholung in ganz NRW
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              Wir holen Ihre Baumaschine kostenlos an Ihrem Standort ab – 
              bequem und unkompliziert. Bei größerer Entfernung finden wir 
              gemeinsam eine Lösung.
            </p>
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {["Düsseldorf", "Köln", "Essen", "Dortmund", "Duisburg", "Wuppertal", "Bochum", "Aachen"].map((city) => (
                <span 
                  key={city}
                  className="px-4 py-2 rounded-full bg-card border text-sm font-medium"
                >
                  {city}
                </span>
              ))}
            </div>
            <Button asChild size="lg">
              <a href="/ankauf">
                Jetzt Ankauf starten
              </a>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}

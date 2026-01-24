import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, ExternalLink } from "lucide-react";

const locations = [
  {
    city: "Krefeld",
    address: "Anrather Straße 291",
    zip: "47807 Krefeld",
  },
  {
    city: "Bonn",
    address: "Drachenburgstraße 8",
    zip: "53179 Bonn",
  },
  {
    city: "Mülheim",
    address: "Ruhrorter Str. 122",
    zip: "45478 Mülheim an der Ruhr",
  },
];

const trustFeatures = [
  "Schnelle Bewertung",
  "NRW-Abholung möglich",
  "Transparenter Prozess",
];

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Trust Bar */}
      <div className="border-b border-primary-foreground/20">
        <div className="container py-6">
          <div className="flex flex-wrap justify-center gap-8 text-sm">
            {trustFeatures.map((feature, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-accent" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Company Info */}
          <div>
            <div className="mb-4">
              <span className="text-lg font-bold">
                <span className="text-primary-foreground">wir</span>
                <span className="text-accent">kaufen</span>
                <span className="text-primary-foreground">deine</span>
                <span className="text-accent">baumaschinen</span>
                <span className="text-primary-foreground">.de</span>
              </span>
            </div>
            <p className="text-sm text-primary-foreground/80 mb-4">
              Ein Service der SLT Technology Group GmbH & Co. KG
            </p>
            <address className="not-italic text-sm text-primary-foreground/80 space-y-1">
              <p>Anrather Straße 291</p>
              <p>47807 Krefeld</p>
            </address>
            <div className="mt-4 space-y-2">
              <a
                href="tel:+4921514179904"
                className="flex items-center gap-2 text-sm hover:text-accent transition-colors"
              >
                <Phone className="h-4 w-4" />
                02151 417 990 4
              </a>
              <a
                href="mailto:info@wirkaufendeinebaumaschinen.de"
                className="flex items-center gap-2 text-sm hover:text-accent transition-colors"
              >
                <Mail className="h-4 w-4" />
                info@wirkaufendeinebaumaschinen.de
              </a>
            </div>
          </div>

          {/* Locations */}
          <div>
            <h3 className="font-semibold mb-4 text-primary-foreground">Unsere Standorte</h3>
            <div className="space-y-4">
              {locations.map((location) => (
                <div key={location.city} className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-accent" />
                  <div className="text-sm text-primary-foreground/80">
                    <p className="font-medium text-primary-foreground">{location.city}</p>
                    <p>{location.address}</p>
                    <p>{location.zip}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4 text-primary-foreground">Schnellzugriff</h3>
            <nav className="space-y-2">
              <Link
                to="/ankauf"
                className="block text-sm text-primary-foreground/80 hover:text-accent transition-colors"
              >
                Ankauf-Check starten
              </Link>
              <Link
                to="/so-funktionierts"
                className="block text-sm text-primary-foreground/80 hover:text-accent transition-colors"
              >
                So funktioniert's
              </Link>
              <Link
                to="/gebrauchtmaschinen"
                className="block text-sm text-primary-foreground/80 hover:text-accent transition-colors"
              >
                Gebrauchtmaschinen kaufen
              </Link>
              <Link
                to="/finanzierung"
                className="block text-sm text-primary-foreground/80 hover:text-accent transition-colors"
              >
                Finanzierung
              </Link>
              <Link
                to="/faq"
                className="block text-sm text-primary-foreground/80 hover:text-accent transition-colors"
              >
                FAQ
              </Link>
              <Link
                to="/kontakt"
                className="block text-sm text-primary-foreground/80 hover:text-accent transition-colors"
              >
                Kontakt
              </Link>
            </nav>

            {/* Local SEO Links */}
            <h3 className="font-semibold mt-6 mb-3 text-primary-foreground">Ankauf nach Stadt</h3>
            <nav className="grid grid-cols-2 gap-x-4 gap-y-1">
              <Link to="/bagger-verkaufen-duesseldorf" className="text-sm text-primary-foreground/80 hover:text-accent transition-colors">Düsseldorf</Link>
              <Link to="/bagger-verkaufen-koeln" className="text-sm text-primary-foreground/80 hover:text-accent transition-colors">Köln</Link>
              <Link to="/bagger-verkaufen-dortmund" className="text-sm text-primary-foreground/80 hover:text-accent transition-colors">Dortmund</Link>
              <Link to="/bagger-verkaufen-essen" className="text-sm text-primary-foreground/80 hover:text-accent transition-colors">Essen</Link>
              <Link to="/bagger-verkaufen-duisburg" className="text-sm text-primary-foreground/80 hover:text-accent transition-colors">Duisburg</Link>
              <Link to="/bagger-verkaufen-bochum" className="text-sm text-primary-foreground/80 hover:text-accent transition-colors">Bochum</Link>
              <Link to="/bagger-verkaufen-muenster" className="text-sm text-primary-foreground/80 hover:text-accent transition-colors">Münster</Link>
              <Link to="/bagger-verkaufen-bonn" className="text-sm text-primary-foreground/80 hover:text-accent transition-colors">Bonn</Link>
            </nav>
          </div>

          {/* Neumaschinen Link & Legal */}
          <div>
            <h3 className="font-semibold mb-4 text-primary-foreground">Neumaschinen</h3>
            <a
              href="https://www.zoomlion-nrw.de"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-accent text-accent-foreground rounded-md text-sm font-medium hover:bg-accent/90 transition-colors"
            >
              <span>Zoomlion NRW</span>
              <ExternalLink className="h-4 w-4" />
            </a>
            <p className="text-sm text-primary-foreground/60 mt-2">
              Neumaschinen von Zoomlion kaufen
            </p>

            <h3 className="font-semibold mt-8 mb-4 text-primary-foreground">Rechtliches</h3>
            <nav className="space-y-2">
              <Link
                to="/impressum"
                className="block text-sm text-primary-foreground/80 hover:text-accent transition-colors"
              >
                Impressum
              </Link>
              <Link
                to="/datenschutz"
                className="block text-sm text-primary-foreground/80 hover:text-accent transition-colors"
              >
                Datenschutz
              </Link>
              <Link
                to="/agb"
                className="block text-sm text-primary-foreground/80 hover:text-accent transition-colors"
              >
                AGB
              </Link>
            </nav>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/20">
        <div className="container py-4">
          <p className="text-center text-sm text-primary-foreground/60">
            © {new Date().getFullYear()} SLT Technology Group GmbH & Co. KG. Alle Rechte vorbehalten.
          </p>
        </div>
      </div>
    </footer>
  );
}

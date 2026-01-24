import { Layout } from "@/components/layout/Layout";
import { Phone, Mail, Printer } from "lucide-react";
import { SEOHead, SEO_CONFIG } from "@/components/SEOHead";

export default function Impressum() {
  return (
    <Layout>
      <SEOHead {...SEO_CONFIG.impressum} />
      <section className="py-10 sm:py-16 md:py-24">
        <div className="container px-4 sm:px-6">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-headline mb-6 sm:mb-8">
              Impressum
            </h1>

            <div className="prose prose-gray max-w-none space-y-8">
              {/* Angaben gemäß § 5 TMG */}
              <section>
                <h2 className="text-xl sm:text-2xl font-semibold text-headline mb-4">
                  Angaben gemäß § 5 TMG
                </h2>
                <p className="text-sm sm:text-base text-foreground mb-4">
                  wirkaufendeinebaumaschinen.de ist ein Service der
                </p>
                <div className="bg-muted rounded-xl p-4 sm:p-6">
                  <p className="text-sm sm:text-base text-foreground font-semibold mb-2">
                    SLT Technology Group GmbH & Co. KG
                  </p>
                  <p className="text-sm sm:text-base text-foreground mb-4">
                    Anrather Straße 291<br />
                    DE-47807 Krefeld
                  </p>
                  <div className="space-y-2">
                    <a 
                      href="tel:+4921514179902" 
                      className="flex items-center gap-2 text-sm sm:text-base text-foreground hover:text-primary transition-colors"
                    >
                      <Phone className="h-4 w-4 text-primary" />
                      +49 (0) 2151 - 417 99 02
                    </a>
                    <div className="flex items-center gap-2 text-sm sm:text-base text-foreground">
                      <Printer className="h-4 w-4 text-primary" />
                      +49 (0) 2151 - 417 99 04
                    </div>
                    <a 
                      href="mailto:info@slt-rental.de" 
                      className="flex items-center gap-2 text-sm sm:text-base text-foreground hover:text-primary transition-colors"
                    >
                      <Mail className="h-4 w-4 text-primary" />
                      info@slt-rental.de
                    </a>
                  </div>
                  <p className="text-sm sm:text-base text-muted-foreground mt-4">
                    HRA 7075 Amtsgericht Krefeld
                  </p>
                </div>
              </section>

              {/* Geschäftsführer */}
              <section>
                <h2 className="text-xl sm:text-2xl font-semibold text-headline mb-4">
                  Geschäftsführer
                </h2>
                <p className="text-sm sm:text-base text-foreground">
                  Benedikt Nöchel
                </p>
              </section>

              {/* Persönlich haftende Gesellschafterin */}
              <section>
                <h2 className="text-xl sm:text-2xl font-semibold text-headline mb-4">
                  Persönlich haftende Gesellschafterin
                </h2>
                <div className="bg-muted rounded-xl p-4 sm:p-6">
                  <p className="text-sm sm:text-base text-foreground font-semibold mb-2">
                    SLT Management GmbH
                  </p>
                  <p className="text-sm sm:text-base text-foreground mb-4">
                    Anrather Straße 291<br />
                    DE-47807 Krefeld
                  </p>
                  <div className="space-y-2">
                    <a 
                      href="tel:+4921514179903" 
                      className="flex items-center gap-2 text-sm sm:text-base text-foreground hover:text-primary transition-colors"
                    >
                      <Phone className="h-4 w-4 text-primary" />
                      +49 (0) 2151 - 417 99 03
                    </a>
                    <div className="flex items-center gap-2 text-sm sm:text-base text-foreground">
                      <Printer className="h-4 w-4 text-primary" />
                      +49 (0) 2151 - 417 99 04
                    </div>
                    <a 
                      href="mailto:info@slt-m.de" 
                      className="flex items-center gap-2 text-sm sm:text-base text-foreground hover:text-primary transition-colors"
                    >
                      <Mail className="h-4 w-4 text-primary" />
                      info@slt-m.de
                    </a>
                  </div>
                  <p className="text-sm sm:text-base text-muted-foreground mt-4">
                    HRB 18191 Amtsgericht Krefeld<br />
                    Gerichtsstand: Amtsgericht Krefeld
                  </p>
                </div>
              </section>

              {/* Haftungsausschluss */}
              <section>
                <h2 className="text-xl sm:text-2xl font-semibold text-headline mb-4">
                  Haftungsausschluss
                </h2>
                <div className="space-y-4 text-sm sm:text-base text-foreground">
                  <p>
                    Die SLT Technology Group GmbH & Co. KG prüft und aktualisiert die Informationen auf ihrer Webseite ständig. Trotz aller Sorgfalt können sich Daten und Informationen jeglicher Art inzwischen verändert haben. Eine Haftung, Garantie oder sonstiges Einstehen für die Aktualität, Richtigkeit und Vollständigkeit der zur Verfügung gestellten Informationen kann daher nicht übernommen werden.
                  </p>
                  <p>
                    Gleiches gilt auch für alle anderen Webseiten, auf die direkt mittels Hyperlinks oder in sonstiger Weise verwiesen wird. SLT Technology Group GmbH & Co. KG ist für den Inhalt der Webseiten, die aufgrund einer solchen Verbindung oder Hinweis erreicht werden, nicht verantwortlich.
                  </p>
                  <p>
                    Die SLT Technology Group GmbH & Co. KG lehnt jegliche Form der Haftung, insbesondere Vertragshaftung, Deliktshaftung, Gefährdungshaftung oder sonstige Haftung für direkten oder indirekten Schadensersatz, Ersatz des beiläufig entstandenen Schadens oder für Strafe einschließlich Schadensersatz oder für Schäden, die daraus resultieren oder in Zusammenhang damit stehen, dass die SLT Technology Group GmbH & Co. KG-Seiten aufgerufen, benutzt oder nicht benutzt werden können, oder für Schäden durch einen Leistungsausfall, eine Unterbrechung, einen Defekt, eine Übertragungsverzögerung, einen Computervirus oder sonstige schädliche Elemente oder einen Leitungs- und Systemausfall im Zusammenhang mit der Webseite der SLT Technology Group GmbH & Co. KG, ab, unabhängig davon, ob die SLT Technology Group GmbH & Co. KG sich der Möglichkeiten solcher Schäden bewusst ist oder nicht.
                  </p>
                  <p>
                    Die SLT Technology Group GmbH & Co. KG behält sich das Recht vor, jederzeit Änderungen oder Ergänzungen der bereitgestellten Informationen vorzunehmen.
                  </p>
                </div>
              </section>

              {/* Urheberrecht */}
              <section>
                <h2 className="text-xl sm:text-2xl font-semibold text-headline mb-4">
                  Urheberrecht
                </h2>
                <div className="space-y-4 text-sm sm:text-base text-foreground">
                  <p>
                    Inhalt, Struktur und Gestaltung der SLT Technology Group GmbH & Co. KG Webseite sind urheberrechtlich geschützt. Die Vervielfältigung, Änderung, Darstellung, Verbreitung, Übermittlung, Veröffentlichung, Verkauf, Lizenzierung, Bearbeitung, Verfremdung oder Nutzung von Informationen oder Daten für welche Zwecke auch immer, insbesondere die Verwendung von Texten, Textteilen oder Bildmaterial, bedarf der vorherigen schriftlichen Zustimmung der SLT Technology Group GmbH & Co. KG.
                  </p>
                  <p>
                    Dieser Haftungsausschluss ist Teil des Internetangebotes, von welchem aus auf diese Seite verwiesen wurde. Sofern Teile oder einzelne Formulierungen dieses Textes der geltenden Rechtslage nicht, nicht mehr oder nicht vollständig entsprechen sollten, bleiben die übrigen Teile des Textes in ihrem Inhalt und ihrer Gültigkeit davon unberührt.
                  </p>
                </div>
              </section>

              {/* Versicherung */}
              <section>
                <h2 className="text-xl sm:text-2xl font-semibold text-headline mb-4">
                  Betriebshaftpflicht-, Elektronik- & Maschinenbruchversicherung
                </h2>
                <div className="bg-muted rounded-xl p-4 sm:p-6">
                  <p className="text-sm sm:text-base text-foreground font-semibold mb-2">
                    Gothaer Allgemeine Versicherung AG
                  </p>
                  <p className="text-sm sm:text-base text-muted-foreground">
                    Geltungsbereich des Versicherungsschutzes: Deutschland
                  </p>
                </div>
              </section>

              {/* Streitschlichtung */}
              <section>
                <h2 className="text-xl sm:text-2xl font-semibold text-headline mb-4">
                  Streitschlichtung
                </h2>
                <p className="text-sm sm:text-base text-foreground mb-4">
                  Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{" "}
                  <a 
                    href="https://ec.europa.eu/consumers/odr/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:underline break-all"
                  >
                    https://ec.europa.eu/consumers/odr/
                  </a>
                </p>
                <p className="text-sm sm:text-base text-foreground">
                  Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer 
                  Verbraucherschlichtungsstelle teilzunehmen.
                </p>
              </section>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
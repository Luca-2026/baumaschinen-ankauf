import { Layout } from "@/components/layout/Layout";
import { Phone, Mail, Printer } from "lucide-react";
import { SEOHead, SEO_CONFIG } from "@/components/SEOHead";

export default function Datenschutz() {
  return (
    <Layout>
      <SEOHead {...SEO_CONFIG.datenschutz} />
      <section className="py-10 sm:py-16 md:py-24">
        <div className="container px-4 sm:px-6">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-headline mb-6 sm:mb-8">
              Datenschutzerklärung
            </h1>

            <div className="prose prose-gray max-w-none space-y-8">
              {/* Datenschutz auf einen Blick */}
              <section>
                <h2 className="text-xl sm:text-2xl font-semibold text-headline mb-4">
                  1. Datenschutz auf einen Blick
                </h2>
                
                <h3 className="text-lg sm:text-xl font-semibold text-headline mt-6 mb-3">
                  Allgemeine Hinweise
                </h3>
                <p className="text-sm sm:text-base text-foreground mb-4">
                  Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren 
                  personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene 
                  Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.
                </p>

                <h3 className="text-lg sm:text-xl font-semibold text-headline mt-6 mb-3">
                  Datenerfassung auf dieser Website
                </h3>
                <p className="text-sm sm:text-base text-foreground mb-4">
                  <strong>Wer ist verantwortlich für die Datenerfassung auf dieser Website?</strong><br />
                  Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. 
                  Dessen Kontaktdaten können Sie dem Impressum dieser Website entnehmen.
                </p>

                <p className="text-sm sm:text-base text-foreground mb-4">
                  <strong>Wie erfassen wir Ihre Daten?</strong><br />
                  Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. 
                  Hierbei kann es sich z.B. um Daten handeln, die Sie in ein Kontaktformular eingeben.
                  Andere Daten werden automatisch oder nach Ihrer Einwilligung beim Besuch der Website 
                  durch unsere IT-Systeme erfasst. Das sind vor allem technische Daten (z.B. Internetbrowser, 
                  Betriebssystem oder Uhrzeit des Seitenaufrufs).
                </p>
              </section>

              {/* Hosting */}
              <section>
                <h2 className="text-xl sm:text-2xl font-semibold text-headline mb-4">
                  2. Hosting
                </h2>
                <p className="text-sm sm:text-base text-foreground mb-4">
                  Wir hosten die Inhalte unserer Website bei folgendem Anbieter:
                </p>
                <p className="text-sm sm:text-base text-foreground mb-4">
                  <strong>Externes Hosting</strong><br />
                  Diese Website wird extern gehostet. Die personenbezogenen Daten, die auf dieser 
                  Website erfasst werden, werden auf den Servern des Hosters gespeichert. Hierbei 
                  kann es sich v.a. um IP-Adressen, Kontaktanfragen, Meta- und Kommunikationsdaten, 
                  Vertragsdaten, Kontaktdaten, Namen, Websitezugriffe und sonstige Daten, die über 
                  eine Website generiert werden, handeln.
                </p>
              </section>

              {/* Verantwortliche Stelle */}
              <section>
                <h2 className="text-xl sm:text-2xl font-semibold text-headline mb-4">
                  3. Allgemeine Hinweise und Pflichtinformationen
                </h2>
                
                <h3 className="text-lg sm:text-xl font-semibold text-headline mt-6 mb-3">
                  Datenschutz
                </h3>
                <p className="text-sm sm:text-base text-foreground mb-4">
                  Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. 
                  Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend den gesetzlichen 
                  Datenschutzvorschriften sowie dieser Datenschutzerklärung.
                </p>

                <h3 className="text-lg sm:text-xl font-semibold text-headline mt-6 mb-3">
                  Hinweis zur verantwortlichen Stelle
                </h3>
                <p className="text-sm sm:text-base text-foreground mb-4">
                  Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:
                </p>
                
                <div className="bg-muted rounded-xl p-4 sm:p-6 mb-4">
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
                </div>

                <p className="text-sm sm:text-base text-foreground mb-4">
                  Verantwortliche Stelle ist die natürliche oder juristische Person, die allein oder 
                  gemeinsam mit anderen über die Zwecke und Mittel der Verarbeitung von personenbezogenen 
                  Daten (z.B. Namen, E-Mail-Adressen o. Ä.) entscheidet.
                </p>

                <h3 className="text-lg sm:text-xl font-semibold text-headline mt-6 mb-3">
                  Speicherdauer
                </h3>
                <p className="text-sm sm:text-base text-foreground mb-4">
                  Soweit innerhalb dieser Datenschutzerklärung keine speziellere Speicherdauer genannt 
                  wurde, verbleiben Ihre personenbezogenen Daten bei uns, bis der Zweck für die 
                  Datenverarbeitung entfällt.
                </p>

                <h3 className="text-lg sm:text-xl font-semibold text-headline mt-6 mb-3">
                  Widerruf Ihrer Einwilligung zur Datenverarbeitung
                </h3>
                <p className="text-sm sm:text-base text-foreground mb-4">
                  Viele Datenverarbeitungsvorgänge sind nur mit Ihrer ausdrücklichen Einwilligung möglich. 
                  Sie können eine bereits erteilte Einwilligung jederzeit widerrufen. Die Rechtmäßigkeit 
                  der bis zum Widerruf erfolgten Datenverarbeitung bleibt vom Widerruf unberührt.
                </p>
              </section>

              {/* Datenerfassung */}
              <section>
                <h2 className="text-xl sm:text-2xl font-semibold text-headline mb-4">
                  4. Datenerfassung auf dieser Website
                </h2>

                <h3 className="text-lg sm:text-xl font-semibold text-headline mt-6 mb-3">
                  Kontaktformular
                </h3>
                <p className="text-sm sm:text-base text-foreground mb-4">
                  Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus 
                  dem Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks 
                  Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. 
                  Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.
                </p>
                <p className="text-sm sm:text-base text-foreground mb-4">
                  Die Verarbeitung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO, 
                  sofern Ihre Anfrage mit der Erfüllung eines Vertrags zusammenhängt oder zur 
                  Durchführung vorvertraglicher Maßnahmen erforderlich ist. In allen übrigen Fällen 
                  beruht die Verarbeitung auf unserem berechtigten Interesse an der effektiven 
                  Bearbeitung der an uns gerichteten Anfragen (Art. 6 Abs. 1 lit. f DSGVO) oder auf 
                  Ihrer Einwilligung (Art. 6 Abs. 1 lit. a DSGVO) sofern diese abgefragt wurde.
                </p>

                <h3 className="text-lg sm:text-xl font-semibold text-headline mt-6 mb-3">
                  Anfrage per E-Mail oder Telefon
                </h3>
                <p className="text-sm sm:text-base text-foreground mb-4">
                  Wenn Sie uns per E-Mail oder Telefon kontaktieren, wird Ihre Anfrage inklusive 
                  aller daraus hervorgehenden personenbezogenen Daten (Name, Anfrage) zum Zwecke 
                  der Bearbeitung Ihres Anliegens bei uns gespeichert und verarbeitet.
                </p>

                <h3 className="text-lg sm:text-xl font-semibold text-headline mt-6 mb-3">
                  Ankauf-Formular
                </h3>
                <p className="text-sm sm:text-base text-foreground mb-4">
                  Bei Nutzung unseres Ankauf-Formulars werden folgende Daten erfasst und verarbeitet: 
                  Angaben zur Baumaschine (Kategorie, Hersteller, Modell, Baujahr, Betriebsstunden, 
                  Zustand), Ihre Kontaktdaten (Name, E-Mail, Telefon, optional Firma) sowie 
                  hochgeladene Bilder und Dokumente. Diese Daten werden ausschließlich zur 
                  Bearbeitung Ihrer Verkaufsanfrage verwendet.
                </p>
              </section>

              {/* Ihre Rechte */}
              <section>
                <h2 className="text-xl sm:text-2xl font-semibold text-headline mb-4">
                  5. Ihre Rechte
                </h2>
                <p className="text-sm sm:text-base text-foreground mb-4">
                  Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und 
                  Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem 
                  ein Recht, die Berichtigung oder Löschung dieser Daten zu verlangen. Wenn Sie eine 
                  Einwilligung zur Datenverarbeitung erteilt haben, können Sie diese Einwilligung 
                  jederzeit für die Zukunft widerrufen. Außerdem haben Sie das Recht, unter bestimmten 
                  Umständen die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen.
                </p>
                <p className="text-sm sm:text-base text-foreground mb-4">
                  Des Weiteren steht Ihnen ein Beschwerderecht bei der zuständigen Aufsichtsbehörde zu.
                </p>
                <p className="text-sm sm:text-base text-foreground mb-4">
                  Hierzu sowie zu weiteren Fragen zum Thema Datenschutz können Sie sich jederzeit an 
                  uns wenden.
                </p>
              </section>

              {/* SSL */}
              <section>
                <h2 className="text-xl sm:text-2xl font-semibold text-headline mb-4">
                  6. SSL- bzw. TLS-Verschlüsselung
                </h2>
                <p className="text-sm sm:text-base text-foreground mb-4">
                  Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der Übertragung 
                  vertraulicher Inhalte, wie zum Beispiel Bestellungen oder Anfragen, die Sie an 
                  uns als Seitenbetreiber senden, eine SSL- bzw. TLS-Verschlüsselung. Eine 
                  verschlüsselte Verbindung erkennen Sie daran, dass die Adresszeile des Browsers 
                  von "http://" auf "https://" wechselt und an dem Schloss-Symbol in Ihrer Browserzeile.
                </p>
                <p className="text-sm sm:text-base text-foreground">
                  Wenn die SSL- bzw. TLS-Verschlüsselung aktiviert ist, können die Daten, die Sie an 
                  uns übermitteln, nicht von Dritten mitgelesen werden.
                </p>
              </section>

              {/* Cookies */}
              <section>
                <h2 className="text-xl sm:text-2xl font-semibold text-headline mb-4">
                  7. Cookies
                </h2>
                <p className="text-sm sm:text-base text-foreground mb-4">
                  Unsere Internetseiten verwenden so genannte „Cookies". Cookies sind kleine 
                  Datenpakete und richten auf Ihrem Endgerät keinen Schaden an. Sie werden entweder 
                  vorübergehend für die Dauer einer Sitzung (Session-Cookies) oder dauerhaft 
                  (permanente Cookies) auf Ihrem Endgerät gespeichert. Session-Cookies werden nach 
                  Ende Ihres Besuchs automatisch gelöscht. Permanente Cookies bleiben auf Ihrem 
                  Endgerät gespeichert, bis Sie diese selbst löschen oder eine automatische Löschung 
                  durch Ihren Webbrowser erfolgt.
                </p>
                <p className="text-sm sm:text-base text-foreground">
                  Cookies, die zur Durchführung des elektronischen Kommunikationsvorgangs, zur 
                  Bereitstellung bestimmter, von Ihnen erwünschter Funktionen oder zur Optimierung 
                  der Website erforderlich sind, werden auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO 
                  gespeichert, sofern keine andere Rechtsgrundlage angegeben wird.
                </p>
              </section>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
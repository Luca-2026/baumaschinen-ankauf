import { useEffect } from "react";

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonicalPath?: string;
  ogImage?: string;
  ogType?: "website" | "article" | "product";
  noIndex?: boolean;
}

const BASE_URL = "https://www.wirkaufendeinebaumaschinen.de";
const DEFAULT_OG_IMAGE = `${BASE_URL}/og-image.jpg`;

export function SEOHead({
  title = "Bagger & Arbeitsbühne verkaufen | Ankauf in NRW",
  description = "Verkaufen Sie Ihren Bagger oder Ihre Arbeitsbühne schnell & fair in NRW. ✓ Kostenlose Bewertung ✓ Sofortiges Angebot ✓ Kostenlose Abholung ✓ Sichere Zahlung.",
  keywords = "Bagger verkaufen, Arbeitsbühne verkaufen, Baumaschinen Ankauf, NRW",
  canonicalPath = "/",
  ogImage = DEFAULT_OG_IMAGE,
  ogType = "website",
  noIndex = false,
}: SEOHeadProps) {
  const fullTitle = title.includes("wirkaufendeinebaumaschinen")
    ? title
    : `${title} | wirkaufendeinebaumaschinen.de`;

  const canonicalUrl = `${BASE_URL}${canonicalPath}`;

  useEffect(() => {
    // Update document title
    document.title = fullTitle;

    // Update meta tags
    const updateMetaTag = (name: string, content: string, isProperty = false) => {
      const selector = isProperty 
        ? `meta[property="${name}"]` 
        : `meta[name="${name}"]`;
      let meta = document.querySelector(selector) as HTMLMetaElement;
      
      if (!meta) {
        meta = document.createElement("meta");
        if (isProperty) {
          meta.setAttribute("property", name);
        } else {
          meta.setAttribute("name", name);
        }
        document.head.appendChild(meta);
      }
      meta.setAttribute("content", content);
    };

    // Standard meta tags
    updateMetaTag("description", description);
    updateMetaTag("keywords", keywords);
    updateMetaTag("robots", noIndex ? "noindex, nofollow" : "index, follow");

    // Open Graph tags
    updateMetaTag("og:title", fullTitle, true);
    updateMetaTag("og:description", description, true);
    updateMetaTag("og:url", canonicalUrl, true);
    updateMetaTag("og:type", ogType, true);
    updateMetaTag("og:image", ogImage, true);

    // Twitter tags
    updateMetaTag("twitter:title", fullTitle);
    updateMetaTag("twitter:description", description);
    updateMetaTag("twitter:image", ogImage);

    // Update canonical link
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", canonicalUrl);

    // Cleanup function - reset to defaults when component unmounts
    return () => {
      // Keep current values, don't reset
    };
  }, [fullTitle, description, keywords, canonicalUrl, ogImage, ogType, noIndex]);

  return null;
}

// Pre-defined SEO configurations for each page
export const SEO_CONFIG = {
  home: {
    title: "Baumaschinen verkaufen | Bagger & Arbeitsbühne Ankauf NRW",
    description: "Baumaschinen verkaufen in NRW ✓ Kostenlose Bewertung in 2 Min ✓ Sofort Ankaufpreis erhalten ✓ Kostenlose Abholung ✓ Faire Preise. Bagger, Arbeitsbühnen & mehr – jetzt unverbindlich anfragen!",
    keywords: "Baumaschinen verkaufen, Baumaschinen Ankauf, Baumaschine verkaufen, Ankauf Baumaschinen, Bagger verkaufen, Bagger Ankauf, Arbeitsbühne verkaufen, Maschinen Ankauf NRW, gebrauchte Baumaschinen verkaufen, Baugeräte verkaufen",
    canonicalPath: "/",
  },
  ankauf: {
    title: "Baumaschine verkaufen – Kostenlose Bewertung in 2 Minuten",
    description: "Baumaschine jetzt verkaufen! Daten eingeben und sofort unverbindlichen Ankaufpreis erhalten. ✓ 100% kostenlos ✓ Keine Verpflichtung ✓ Abholung in NRW inklusive.",
    keywords: "Baumaschine verkaufen, Baumaschinen Ankauf, Bagger verkaufen, Arbeitsbühne verkaufen, kostenlose Bewertung, Sofortangebot, Baugeräte Ankauf",
    canonicalPath: "/ankauf",
  },
  ankaufBagger: {
    title: "Bagger verkaufen | Minibagger, Kettenbagger & Mobilbagger Ankauf NRW",
    description: "Bagger verkaufen zum Bestpreis! ✓ Minibagger ✓ Kettenbagger ✓ Mobilbagger ✓ Radlader – kostenlose Bewertung, faire Preise & kostenlose Abholung in NRW.",
    keywords: "Bagger verkaufen, Bagger Ankauf, Minibagger verkaufen, Kettenbagger verkaufen, Mobilbagger verkaufen, Radlader verkaufen, Bagger Ankauf NRW",
    canonicalPath: "/ankauf/bagger",
  },
  ankaufArbeitsbuehne: {
    title: "Arbeitsbühne verkaufen | Scherenarbeitsbühne & Teleskopbühne Ankauf NRW",
    description: "Arbeitsbühne verkaufen zum fairen Preis! ✓ Scherenarbeitsbühnen ✓ Teleskopbühnen ✓ Gelenkbühnen – kostenlose Bewertung & Abholung in NRW.",
    keywords: "Arbeitsbühne verkaufen, Arbeitsbühne Ankauf, Scherenarbeitsbühne verkaufen, Teleskopbühne verkaufen, Hubarbeitsbühne verkaufen, Arbeitsbühne Ankauf NRW",
    canonicalPath: "/ankauf/arbeitsbuehne",
  },
  soFunktionierts: {
    title: "So funktioniert der Baumaschinen-Verkauf | 4 einfache Schritte",
    description: "Baumaschinen verkaufen in 4 Schritten: Bewertung → Angebot → Abholung → Auszahlung. Schnell, transparent und ohne Kosten. Jetzt starten!",
    keywords: "Baumaschine verkaufen Ablauf, Baumaschinen Ankauf Prozess, Bagger verkaufen wie, Arbeitsbühne verkaufen Schritte",
    canonicalPath: "/so-funktionierts",
  },
  gebrauchtmaschinen: {
    title: "Gebrauchte Baumaschinen kaufen | Bagger & Arbeitsbühnen mit Garantie",
    description: "Entdecken Sie geprüfte gebrauchte Baumaschinen mit 1 Jahr Garantie. Bagger, Arbeitsbühnen und mehr zu fairen Preisen. Finanzierung möglich!",
    keywords: "gebrauchte Baumaschinen, Bagger gebraucht kaufen, Arbeitsbühne gebraucht, Gebrauchtmaschinen mit Garantie",
    canonicalPath: "/gebrauchtmaschinen",
  },
  standorte: {
    title: "Unsere Standorte in NRW | Krefeld, Bonn & Mülheim",
    description: "Besuchen Sie uns an unseren Standorten in Krefeld, Bonn oder Mülheim an der Ruhr. Persönliche Beratung und kostenlose Abholung in ganz NRW.",
    keywords: "Baumaschinen Ankauf Krefeld, Bagger verkaufen Bonn, Arbeitsbühne Ankauf Mülheim, Baumaschinen NRW Standorte",
    canonicalPath: "/standorte",
  },
  finanzierung: {
    title: "Baumaschinen Finanzierung | Leasing, Mietkauf & Kredit",
    description: "Flexible Finanzierungslösungen für Ihre Baumaschine. Leasing, Mietkauf oder Kredit – wir finden die passende Lösung für Ihr Unternehmen.",
    keywords: "Baumaschinen Finanzierung, Bagger Leasing, Arbeitsbühne Mietkauf, Baumaschinen Kredit",
    canonicalPath: "/finanzierung",
  },
  faq: {
    title: "Häufige Fragen zum Baumaschinen-Verkauf | FAQ",
    description: "Antworten auf die häufigsten Fragen zum Verkauf von Baggern und Arbeitsbühnen. Erfahren Sie alles über den Ankaufprozess, Preise und Abholung.",
    keywords: "Baumaschinen verkaufen FAQ, Bagger Ankauf Fragen, wie verkaufe ich meine Baumaschine",
    canonicalPath: "/faq",
  },
  kontakt: {
    title: "Kontakt | Baumaschinen Ankauf Beratung",
    description: "Kontaktieren Sie uns für eine kostenlose Beratung zum Verkauf Ihrer Baumaschine. Telefonisch, per E-Mail oder über unser Kontaktformular.",
    keywords: "Baumaschinen Ankauf Kontakt, Bagger verkaufen Beratung, Arbeitsbühne Ankauf Telefon",
    canonicalPath: "/kontakt",
  },
  impressum: {
    title: "Impressum",
    description: "Impressum der SLT Technology Group GmbH & Co. KG - Betreiber von wirkaufendeinebaumaschinen.de",
    keywords: "Impressum, SLT Technology Group, Baumaschinen Ankauf Firma",
    canonicalPath: "/impressum",
  },
  datenschutz: {
    title: "Datenschutzerklärung",
    description: "Datenschutzerklärung von wirkaufendeinebaumaschinen.de. Informationen zur Verarbeitung Ihrer personenbezogenen Daten.",
    keywords: "Datenschutz, DSGVO, personenbezogene Daten",
    canonicalPath: "/datenschutz",
  },
  agb: {
    title: "Allgemeine Geschäftsbedingungen (AGB)",
    description: "Allgemeine Geschäftsbedingungen für den Ankauf von Baumaschinen bei wirkaufendeinebaumaschinen.de",
    keywords: "AGB, Geschäftsbedingungen, Baumaschinen Ankauf Bedingungen",
    canonicalPath: "/agb",
  },
};

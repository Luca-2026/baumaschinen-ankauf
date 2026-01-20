import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { X, Settings, Cookie } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const COOKIE_CONSENT_KEY = "slt-cookie-consent";

interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
}

const defaultPreferences: CookiePreferences = {
  necessary: true,
  analytics: false,
  marketing: false,
};

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>(defaultPreferences);

  useEffect(() => {
    const storedConsent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!storedConsent) {
      // Small delay for better UX
      const timer = setTimeout(() => setShowBanner(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const savePreferences = (prefs: CookiePreferences) => {
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(prefs));
    setShowBanner(false);
    setShowSettings(false);
  };

  const acceptAll = () => {
    const allAccepted: CookiePreferences = {
      necessary: true,
      analytics: true,
      marketing: true,
    };
    savePreferences(allAccepted);
  };

  const acceptNecessary = () => {
    savePreferences(defaultPreferences);
  };

  const saveCustomPreferences = () => {
    savePreferences(preferences);
  };

  if (!showBanner) return null;

  return (
    <>
      {/* Cookie Banner */}
      <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-background border-t border-border shadow-lg animate-in slide-in-from-bottom-5 duration-300">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-start gap-3 flex-1">
              <Cookie className="h-6 w-6 text-primary shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="text-sm font-medium">Cookie-Einstellungen</p>
                <p className="text-sm text-muted-foreground">
                  Wir verwenden Cookies, um Ihnen die bestmögliche Erfahrung auf unserer Website zu bieten. 
                  Einige Cookies sind notwendig, während andere uns helfen, die Website und Ihr Erlebnis zu verbessern.{" "}
                  <Link to="/datenschutz" className="text-primary hover:underline">
                    Mehr erfahren
                  </Link>
                </p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-2 shrink-0">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowSettings(true)}
                className="gap-2"
              >
                <Settings className="h-4 w-4" />
                Einstellungen
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={acceptNecessary}
              >
                Nur Notwendige
              </Button>
              <Button
                size="sm"
                onClick={acceptAll}
              >
                Alle akzeptieren
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Settings Dialog */}
      <Dialog open={showSettings} onOpenChange={setShowSettings}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Cookie className="h-5 w-5 text-primary" />
              Cookie-Einstellungen
            </DialogTitle>
            <DialogDescription>
              Verwalten Sie Ihre Cookie-Präferenzen. Notwendige Cookies sind für die Funktion der Website erforderlich und können nicht deaktiviert werden.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Necessary Cookies */}
            <div className="flex items-start justify-between gap-4 p-4 rounded-lg bg-muted/50">
              <div className="space-y-1">
                <Label className="text-base font-medium">Notwendige Cookies</Label>
                <p className="text-sm text-muted-foreground">
                  Diese Cookies sind für die Grundfunktionen der Website erforderlich. Sie ermöglichen grundlegende Funktionen wie die Seitennavigation und den Zugriff auf sichere Bereiche der Website.
                </p>
              </div>
              <Switch
                checked={true}
                disabled
                className="shrink-0"
              />
            </div>

            {/* Analytics Cookies */}
            <div className="flex items-start justify-between gap-4 p-4 rounded-lg border">
              <div className="space-y-1">
                <Label className="text-base font-medium">Analyse-Cookies</Label>
                <p className="text-sm text-muted-foreground">
                  Diese Cookies helfen uns zu verstehen, wie Besucher mit unserer Website interagieren. Sie ermöglichen uns, die Leistung unserer Website zu messen und zu verbessern.
                </p>
              </div>
              <Switch
                checked={preferences.analytics}
                onCheckedChange={(checked) =>
                  setPreferences((prev) => ({ ...prev, analytics: checked }))
                }
                className="shrink-0"
              />
            </div>

            {/* Marketing Cookies */}
            <div className="flex items-start justify-between gap-4 p-4 rounded-lg border">
              <div className="space-y-1">
                <Label className="text-base font-medium">Marketing-Cookies</Label>
                <p className="text-sm text-muted-foreground">
                  Diese Cookies werden verwendet, um Werbung relevanter für Sie zu gestalten. Sie können auch dazu verwendet werden, die Wirksamkeit von Werbekampagnen zu messen.
                </p>
              </div>
              <Switch
                checked={preferences.marketing}
                onCheckedChange={(checked) =>
                  setPreferences((prev) => ({ ...prev, marketing: checked }))
                }
                className="shrink-0"
              />
            </div>
          </div>

          <div className="flex flex-col-reverse sm:flex-row gap-2 pt-4 border-t">
            <Button
              variant="outline"
              onClick={acceptNecessary}
              className="flex-1"
            >
              Nur Notwendige
            </Button>
            <Button
              onClick={saveCustomPreferences}
              className="flex-1"
            >
              Auswahl speichern
            </Button>
          </div>

          <p className="text-xs text-muted-foreground text-center pt-2">
            Weitere Informationen finden Sie in unserer{" "}
            <Link to="/datenschutz" className="text-primary hover:underline" onClick={() => setShowSettings(false)}>
              Datenschutzerklärung
            </Link>
          </p>
        </DialogContent>
      </Dialog>
    </>
  );
}

// Hook to get cookie consent preferences
export function useCookieConsent(): CookiePreferences | null {
  const [consent, setConsent] = useState<CookiePreferences | null>(null);

  useEffect(() => {
    const storedConsent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (storedConsent) {
      try {
        setConsent(JSON.parse(storedConsent));
      } catch {
        setConsent(null);
      }
    }
  }, []);

  return consent;
}

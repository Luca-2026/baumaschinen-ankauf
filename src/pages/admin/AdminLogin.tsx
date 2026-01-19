import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Lock, Mail, AlertCircle } from "lucide-react";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email("Bitte geben Sie eine gültige E-Mail-Adresse ein"),
  password: z.string().min(6, "Das Passwort muss mindestens 6 Zeichen haben"),
});

const AdminLogin = () => {
  const navigate = useNavigate();
  const { signIn, signUp, isLoading: authLoading, user, isAdmin } = useAuth();
  const { toast } = useToast();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  // Redirect if already logged in as admin
  if (user && isAdmin) {
    navigate("/admin");
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Validate input
    const result = loginSchema.safeParse({ email, password });
    if (!result.success) {
      const fieldErrors: { email?: string; password?: string } = {};
      result.error.errors.forEach((err) => {
        if (err.path[0] === "email") fieldErrors.email = err.message;
        if (err.path[0] === "password") fieldErrors.password = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setIsLoading(true);

    try {
      if (isRegisterMode) {
        const { error } = await signUp(email, password);

        if (error) {
          toast({
            title: "Registrierung fehlgeschlagen",
            description: error.message === "User already registered"
              ? "Diese E-Mail ist bereits registriert"
              : error.message,
            variant: "destructive",
          });
        } else {
          toast({
            title: "Erfolgreich registriert",
            description: "Bitte prüfen Sie Ihre E-Mail für die Bestätigung oder melden Sie sich direkt an.",
          });
          setIsRegisterMode(false);
        }
      } else {
        const { error } = await signIn(email, password);

        if (error) {
          toast({
            title: "Anmeldung fehlgeschlagen",
            description: error.message === "Invalid login credentials" 
              ? "E-Mail oder Passwort ist falsch" 
              : error.message,
            variant: "destructive",
          });
        } else {
          toast({
            title: "Erfolgreich angemeldet",
            description: "Willkommen im Admin-Bereich",
          });
          navigate("/admin");
        }
      }
    } catch (error: any) {
      toast({
        title: "Fehler",
        description: "Ein unerwarteter Fehler ist aufgetreten",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background-muted flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-card rounded-2xl shadow-lg p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                <Lock className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-headline">
              {isRegisterMode ? "Admin-Registrierung" : "Admin-Anmeldung"}
            </h1>
            <p className="text-muted-foreground mt-2">
              {isRegisterMode 
                ? "Erstellen Sie ein neues Admin-Konto" 
                : "Melden Sie sich an, um auf den Admin-Bereich zuzugreifen"}
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                E-Mail
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2"
                disabled={isLoading}
              />
              {errors.email && (
                <p className="text-sm text-destructive mt-1 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="password" className="flex items-center gap-2">
                <Lock className="h-4 w-4 text-muted-foreground" />
                Passwort
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-2"
                disabled={isLoading}
              />
              {errors.password && (
                <p className="text-sm text-destructive mt-1 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  {errors.password}
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90"
              disabled={isLoading || authLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {isRegisterMode ? "Registrieren..." : "Anmelden..."}
                </>
              ) : (
                isRegisterMode ? "Registrieren" : "Anmelden"
              )}
            </Button>

            <div className="text-center">
              <button
                type="button"
                onClick={() => setIsRegisterMode(!isRegisterMode)}
                className="text-sm text-primary hover:underline"
              >
                {isRegisterMode 
                  ? "Bereits registriert? Anmelden" 
                  : "Noch kein Konto? Registrieren"}
              </button>
            </div>
          </form>

          {/* Back Link */}
          <div className="mt-6 text-center">
            <a
              href="/"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              ← Zurück zur Website
            </a>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-muted-foreground mt-6">
          © {new Date().getFullYear()} SLT Technology Group GmbH & Co. KG
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;

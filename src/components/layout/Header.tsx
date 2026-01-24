import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { BrandName } from "@/components/ui/BrandName";

const navItems = [
  { label: "Ankauf-Check", href: "/ankauf" },
  { label: "So funktioniert's", href: "/so-funktionierts" },
  { label: "Gebrauchtmaschinen", href: "/gebrauchtmaschinen" },
  { label: "Finanzierung", href: "/finanzierung" },
  { label: "Standorte", href: "/standorte" },
  { label: "FAQ", href: "/faq" },
  { label: "Kontakt", href: "/kontakt" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <BrandName className="text-lg" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "px-3 py-2 text-sm font-medium rounded-md transition-colors hover:bg-muted hover:text-primary",
                location.pathname === item.href
                  ? "text-primary bg-muted"
                  : "text-foreground"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* CTA Button */}
        <div className="hidden lg:flex items-center gap-4">
          <a
            href="tel:+4921514179904"
            className="flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
          >
            <Phone className="h-4 w-4" />
            02151 417 990 4
          </a>
          <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold">
            <Link to="/ankauf">Jetzt Preis erhalten</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6 text-foreground" />
          ) : (
            <Menu className="h-6 w-6 text-foreground" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t bg-background">
          <nav className="container py-4 flex flex-col gap-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "px-4 py-3 text-base font-medium rounded-md transition-colors",
                  location.pathname === item.href
                    ? "text-primary bg-muted"
                    : "text-foreground hover:bg-muted hover:text-primary"
                )}
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-4 pt-4 border-t flex flex-col gap-3">
              <a
                href="tel:+4921514179904"
                className="flex items-center gap-2 px-4 py-2 text-base font-medium text-foreground"
              >
                <Phone className="h-5 w-5" />
                02151 417 990 4
              </a>
              <Button
                asChild
                className="mx-4 bg-accent hover:bg-accent/90 text-accent-foreground font-semibold"
              >
                <Link to="/ankauf" onClick={() => setMobileMenuOpen(false)}>
                  Jetzt Preis erhalten
                </Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

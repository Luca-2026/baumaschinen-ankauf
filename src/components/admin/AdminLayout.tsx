import { ReactNode, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { 
  LayoutDashboard, 
  FileText, 
  Truck, 
  Settings, 
  LogOut, 
  Menu,
  X,
  Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface AdminLayoutProps {
  children: ReactNode;
}

const navItems = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Leads", href: "/admin/leads", icon: FileText },
  { label: "Maschinen", href: "/admin/maschinen", icon: Truck },
  { label: "Einstellungen", href: "/admin/einstellungen", icon: Settings },
];

export function AdminLayout({ children }: AdminLayoutProps) {
  const { user, isAdmin, isLoading, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!isLoading && (!user || !isAdmin)) {
      navigate("/admin/login");
    }
  }, [user, isAdmin, isLoading, navigate]);

  const handleSignOut = async () => {
    await signOut();
    navigate("/admin/login");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background-muted flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Lädt...</p>
        </div>
      </div>
    );
  }

  if (!user || !isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background-muted">
      {/* Mobile Header */}
      <header className="lg:hidden sticky top-0 z-50 bg-primary text-primary-foreground">
        <div className="flex items-center justify-between p-4">
          <span className="font-bold">Admin Panel</span>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2"
          >
            {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={cn(
            "fixed inset-y-0 left-0 z-40 w-64 bg-primary text-primary-foreground transform transition-transform lg:translate-x-0 lg:static",
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <div className="flex flex-col h-full">
            {/* Logo */}
            <div className="p-6 border-b border-primary-foreground/20">
              <Link to="/" className="block">
                <span className="text-lg font-bold">
                  <span className="text-primary-foreground">wir</span>
                  <span className="text-accent">kaufen</span>
                  <span className="text-primary-foreground">deine</span>
                  <span className="text-accent">baumaschinen</span>
                  <span className="text-primary-foreground">.de</span>
                </span>
              </Link>
              <p className="text-xs text-primary-foreground/60 mt-1">Admin Panel</p>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.href;
                
                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                      isActive
                        ? "bg-primary-foreground/20 text-primary-foreground"
                        : "text-primary-foreground/70 hover:bg-primary-foreground/10 hover:text-primary-foreground"
                    )}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            {/* User & Logout */}
            <div className="p-4 border-t border-primary-foreground/20">
              <p className="text-xs text-primary-foreground/60 mb-3 truncate">
                {user.email}
              </p>
              <Button
                variant="ghost"
                onClick={handleSignOut}
                className="w-full justify-start text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/10"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Abmelden
              </Button>
            </div>
          </div>
        </aside>

        {/* Mobile Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { CookieConsent } from "@/components/CookieConsent";
import { ScrollToTop } from "@/components/ScrollToTop";
import { lazy, Suspense } from "react";

// Critical pages loaded eagerly
import Index from "./pages/Index";
import Ankauf from "./pages/Ankauf";
import BaumaschinenVerkaufen from "./pages/BaumaschinenVerkaufen";

// Lazy-loaded pages for code splitting
const SoFunktionierts = lazy(() => import("./pages/SoFunktionierts"));
const Gebrauchtmaschinen = lazy(() => import("./pages/Gebrauchtmaschinen"));
const Finanzierung = lazy(() => import("./pages/Finanzierung"));
const Standorte = lazy(() => import("./pages/Standorte"));
const FAQ = lazy(() => import("./pages/FAQ"));
const Kontakt = lazy(() => import("./pages/Kontakt"));
const Impressum = lazy(() => import("./pages/Impressum"));
const Datenschutz = lazy(() => import("./pages/Datenschutz"));
const AGB = lazy(() => import("./pages/AGB"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Blog / Ratgeber Pages
const RatgeberIndex = lazy(() => import("./pages/ratgeber/RatgeberIndex"));
const WasIstMeinBaggerWert = lazy(() => import("./pages/ratgeber/WasIstMeinBaggerWert"));
const BaumaschinenVerkaufenTipps = lazy(() => import("./pages/ratgeber/BaumaschinenVerkaufenTipps"));
const ArbeitsbuehneVerkaufenRatgeber = lazy(() => import("./pages/ratgeber/ArbeitsbuehneVerkaufenRatgeber"));
const BaumaschinenAnkaufProzess = lazy(() => import("./pages/ratgeber/BaumaschinenAnkaufProzess"));
const GebrauchteBaumaschinenMarkt = lazy(() => import("./pages/ratgeber/GebrauchteBaumaschinenMarkt"));

// Local SEO Pages
const Duesseldorf = lazy(() => import("./pages/lokale-seo/Duesseldorf"));
const Koeln = lazy(() => import("./pages/lokale-seo/Koeln"));
const Dortmund = lazy(() => import("./pages/lokale-seo/Dortmund"));
const Essen = lazy(() => import("./pages/lokale-seo/Essen"));
const Duisburg = lazy(() => import("./pages/lokale-seo/Duisburg"));
const Bochum = lazy(() => import("./pages/lokale-seo/Bochum"));
const Wuppertal = lazy(() => import("./pages/lokale-seo/Wuppertal"));
const Muenster = lazy(() => import("./pages/lokale-seo/Muenster"));
const Bielefeld = lazy(() => import("./pages/lokale-seo/Bielefeld"));
const Gelsenkirchen = lazy(() => import("./pages/lokale-seo/Gelsenkirchen"));
const Krefeld = lazy(() => import("./pages/lokale-seo/Krefeld"));
const Bonn = lazy(() => import("./pages/lokale-seo/Bonn"));
const MuelheimRuhr = lazy(() => import("./pages/lokale-seo/MuelheimRuhr"));
const Oberhausen = lazy(() => import("./pages/lokale-seo/Oberhausen"));
const Moenchengladbach = lazy(() => import("./pages/lokale-seo/Moenchengladbach"));
const Aachen = lazy(() => import("./pages/lokale-seo/Aachen"));

// Admin Pages
const AdminLogin = lazy(() => import("./pages/admin/AdminLogin"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const AdminLeads = lazy(() => import("./pages/admin/AdminLeads"));
const AdminMachines = lazy(() => import("./pages/admin/AdminMachines"));
const AdminSettings = lazy(() => import("./pages/admin/AdminSettings"));

const queryClient = new QueryClient();

const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <CookieConsent />
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/baumaschinen-verkaufen" element={<BaumaschinenVerkaufen />} />
              <Route path="/ankauf" element={<Ankauf />} />
              <Route path="/so-funktionierts" element={<SoFunktionierts />} />
              <Route path="/gebrauchtmaschinen" element={<Gebrauchtmaschinen />} />
              <Route path="/finanzierung" element={<Finanzierung />} />
              <Route path="/standorte" element={<Standorte />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/kontakt" element={<Kontakt />} />
              <Route path="/impressum" element={<Impressum />} />
              <Route path="/datenschutz" element={<Datenschutz />} />
              <Route path="/agb" element={<AGB />} />
              
              {/* Local SEO Pages */}
              <Route path="/bagger-verkaufen-duesseldorf" element={<Duesseldorf />} />
              <Route path="/bagger-verkaufen-koeln" element={<Koeln />} />
              <Route path="/bagger-verkaufen-dortmund" element={<Dortmund />} />
              <Route path="/bagger-verkaufen-essen" element={<Essen />} />
              <Route path="/bagger-verkaufen-duisburg" element={<Duisburg />} />
              <Route path="/bagger-verkaufen-bochum" element={<Bochum />} />
              <Route path="/bagger-verkaufen-wuppertal" element={<Wuppertal />} />
              <Route path="/bagger-verkaufen-muenster" element={<Muenster />} />
              <Route path="/bagger-verkaufen-bielefeld" element={<Bielefeld />} />
              <Route path="/bagger-verkaufen-gelsenkirchen" element={<Gelsenkirchen />} />
              <Route path="/bagger-verkaufen-krefeld" element={<Krefeld />} />
              <Route path="/bagger-verkaufen-bonn" element={<Bonn />} />
              <Route path="/bagger-verkaufen-muelheim" element={<MuelheimRuhr />} />
              <Route path="/bagger-verkaufen-oberhausen" element={<Oberhausen />} />
              <Route path="/bagger-verkaufen-moenchengladbach" element={<Moenchengladbach />} />
              <Route path="/bagger-verkaufen-aachen" element={<Aachen />} />
              
              {/* Ratgeber / Blog */}
              <Route path="/ratgeber" element={<RatgeberIndex />} />
              <Route path="/ratgeber/was-ist-mein-bagger-wert" element={<WasIstMeinBaggerWert />} />
              <Route path="/ratgeber/baumaschinen-verkaufen-tipps" element={<BaumaschinenVerkaufenTipps />} />
              <Route path="/ratgeber/arbeitsbuehne-verkaufen-ratgeber" element={<ArbeitsbuehneVerkaufenRatgeber />} />
              <Route path="/ratgeber/baumaschinen-ankauf-prozess" element={<BaumaschinenAnkaufProzess />} />
              <Route path="/ratgeber/gebrauchte-baumaschinen-markt" element={<GebrauchteBaumaschinenMarkt />} />
              
              {/* Admin Routes */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/leads" element={<AdminLeads />} />
              <Route path="/admin/maschinen" element={<AdminMachines />} />
              <Route path="/admin/einstellungen" element={<AdminSettings />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;

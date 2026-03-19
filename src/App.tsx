import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { CookieConsent } from "@/components/CookieConsent";
import { ScrollToTop } from "@/components/ScrollToTop";
import Index from "./pages/Index";
import BaumaschinenVerkaufen from "./pages/BaumaschinenVerkaufen";
import Ankauf from "./pages/Ankauf";
import SoFunktionierts from "./pages/SoFunktionierts";
import Gebrauchtmaschinen from "./pages/Gebrauchtmaschinen";
import Finanzierung from "./pages/Finanzierung";
import Standorte from "./pages/Standorte";
import FAQ from "./pages/FAQ";
import Kontakt from "./pages/Kontakt";
import Impressum from "./pages/Impressum";
import Datenschutz from "./pages/Datenschutz";
import AGB from "./pages/AGB";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminLeads from "./pages/admin/AdminLeads";
import AdminMachines from "./pages/admin/AdminMachines";
import AdminSettings from "./pages/admin/AdminSettings";
import NotFound from "./pages/NotFound";

// Local SEO Pages
import Duesseldorf from "./pages/lokale-seo/Duesseldorf";
import Koeln from "./pages/lokale-seo/Koeln";
import Dortmund from "./pages/lokale-seo/Dortmund";
import Essen from "./pages/lokale-seo/Essen";
import Duisburg from "./pages/lokale-seo/Duisburg";
import Bochum from "./pages/lokale-seo/Bochum";
import Wuppertal from "./pages/lokale-seo/Wuppertal";
import Muenster from "./pages/lokale-seo/Muenster";
import Bielefeld from "./pages/lokale-seo/Bielefeld";
import Gelsenkirchen from "./pages/lokale-seo/Gelsenkirchen";
import Krefeld from "./pages/lokale-seo/Krefeld";
import Bonn from "./pages/lokale-seo/Bonn";
import MuelheimRuhr from "./pages/lokale-seo/MuelheimRuhr";
import Oberhausen from "./pages/lokale-seo/Oberhausen";
import Moenchengladbach from "./pages/lokale-seo/Moenchengladbach";
import Aachen from "./pages/lokale-seo/Aachen";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <CookieConsent />
          <Routes>
            <Route path="/" element={<Index />} />
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
            
            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/leads" element={<AdminLeads />} />
            <Route path="/admin/maschinen" element={<AdminMachines />} />
            <Route path="/admin/einstellungen" element={<AdminSettings />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;

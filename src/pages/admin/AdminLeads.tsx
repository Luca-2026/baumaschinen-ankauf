import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Search, 
  Phone, 
  Mail, 
  MapPin, 
  Calendar,
  Eye,
  Download
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Lead {
  id: string;
  contact_name: string;
  contact_email: string;
  contact_phone: string;
  contact_company: string | null;
  category: string;
  manufacturer_name: string;
  model_name: string;
  year_built: number;
  operating_hours: number | null;
  condition: string;
  location_zip: string;
  status: string;
  calculated_price_low: number | null;
  calculated_price_high: number | null;
  created_at: string;
}

const statusOptions = [
  { value: "all", label: "Alle Status" },
  { value: "neu", label: "Neu" },
  { value: "in_bearbeitung", label: "In Bearbeitung" },
  { value: "angebot_erstellt", label: "Angebot erstellt" },
  { value: "abgeschlossen", label: "Abgeschlossen" },
  { value: "abgelehnt", label: "Abgelehnt" },
];

const statusLabels: Record<string, { label: string; color: string }> = {
  neu: { label: "Neu", color: "bg-accent text-accent-foreground" },
  in_bearbeitung: { label: "In Bearbeitung", color: "bg-primary text-primary-foreground" },
  angebot_erstellt: { label: "Angebot erstellt", color: "bg-success text-success-foreground" },
  abgeschlossen: { label: "Abgeschlossen", color: "bg-muted text-muted-foreground" },
  abgelehnt: { label: "Abgelehnt", color: "bg-destructive text-destructive-foreground" },
};

const conditionLabels: Record<string, string> = {
  sehr_gut: "Sehr gut",
  gut: "Gut",
  ok: "OK",
  reparaturbeduerftig: "Reparaturbedürftig",
};

const AdminLeads = () => {
  const { toast } = useToast();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    fetchLeads();
  }, [statusFilter]);

  const fetchLeads = async () => {
    setIsLoading(true);
    try {
      let query = supabase
        .from("leads")
        .select("*")
        .order("created_at", { ascending: false });

      if (statusFilter !== "all") {
        query = query.eq("status", statusFilter as any);
      }

      const { data, error } = await query;

      if (error) throw error;
      setLeads(data || []);
    } catch (error) {
      console.error("Error fetching leads:", error);
      toast({
        title: "Fehler",
        description: "Leads konnten nicht geladen werden",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const updateLeadStatus = async (leadId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from("leads")
        .update({ status: newStatus as any })
        .eq("id", leadId);

      if (error) throw error;

      setLeads(leads.map(lead => 
        lead.id === leadId ? { ...lead, status: newStatus } : lead
      ));

      toast({
        title: "Status aktualisiert",
        description: `Lead wurde auf "${statusLabels[newStatus]?.label}" gesetzt`,
      });
    } catch (error) {
      console.error("Error updating lead status:", error);
      toast({
        title: "Fehler",
        description: "Status konnte nicht aktualisiert werden",
        variant: "destructive",
      });
    }
  };

  const filteredLeads = leads.filter(lead => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      lead.contact_name.toLowerCase().includes(query) ||
      lead.contact_email.toLowerCase().includes(query) ||
      lead.manufacturer_name.toLowerCase().includes(query) ||
      lead.model_name.toLowerCase().includes(query)
    );
  });

  const formatPrice = (low: number | null, high: number | null) => {
    if (!low || !high) return "–";
    return `€ ${low.toLocaleString("de-DE")} – € ${high.toLocaleString("de-DE")}`;
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-headline">Leads</h1>
            <p className="text-muted-foreground mt-1">
              {filteredLeads.length} Anfragen
            </p>
          </div>
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Exportieren
          </Button>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Suchen nach Name, E-Mail, Maschine..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-[200px]">
              <SelectValue placeholder="Status filtern" />
            </SelectTrigger>
            <SelectContent>
              {statusOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Leads Table/Cards */}
        {isLoading ? (
          <div className="text-center py-12 text-muted-foreground">
            Lädt...
          </div>
        ) : filteredLeads.length === 0 ? (
          <div className="text-center py-12 bg-card rounded-xl">
            <p className="text-muted-foreground">Keine Leads gefunden</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredLeads.map((lead) => (
              <div
                key={lead.id}
                className="bg-card rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                  {/* Machine Info */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-headline text-lg">
                          {lead.manufacturer_name} {lead.model_name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {lead.category === "bagger" ? "Bagger" : "Arbeitsbühne"} • Baujahr {lead.year_built}
                          {lead.operating_hours && ` • ${lead.operating_hours.toLocaleString("de-DE")} Std.`}
                        </p>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          statusLabels[lead.status]?.color || "bg-muted"
                        }`}
                      >
                        {statusLabels[lead.status]?.label || lead.status}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-4 mt-3 text-sm">
                      <span className="flex items-center gap-1 text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        PLZ {lead.location_zip}
                      </span>
                      <span className="text-muted-foreground">
                        Zustand: {conditionLabels[lead.condition] || lead.condition}
                      </span>
                    </div>

                    {/* Price */}
                    <div className="mt-3 inline-block bg-accent/10 px-3 py-1 rounded-lg">
                      <span className="text-sm font-medium text-accent">
                        {formatPrice(lead.calculated_price_low, lead.calculated_price_high)}
                      </span>
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="lg:w-64 space-y-2 text-sm">
                    <p className="font-medium text-headline">{lead.contact_name}</p>
                    {lead.contact_company && (
                      <p className="text-muted-foreground">{lead.contact_company}</p>
                    )}
                    <a
                      href={`mailto:${lead.contact_email}`}
                      className="flex items-center gap-2 text-primary hover:underline"
                    >
                      <Mail className="h-4 w-4" />
                      {lead.contact_email}
                    </a>
                    <a
                      href={`tel:${lead.contact_phone}`}
                      className="flex items-center gap-2 text-primary hover:underline"
                    >
                      <Phone className="h-4 w-4" />
                      {lead.contact_phone}
                    </a>
                    <p className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      {new Date(lead.created_at).toLocaleDateString("de-DE", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col gap-2 lg:w-48">
                    <Select
                      value={lead.status}
                      onValueChange={(value) => updateLeadStatus(lead.id, value)}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {statusOptions.filter(o => o.value !== "all").map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Button variant="outline" size="sm" className="gap-2" asChild>
                      <Link to={`/admin/leads/${lead.id}`}>
                        <Eye className="h-4 w-4" />
                        Details
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminLeads;

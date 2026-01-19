import { useEffect, useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { 
  FileText, 
  Truck, 
  TrendingUp, 
  Clock,
  ArrowRight
} from "lucide-react";
import { Link } from "react-router-dom";

interface Stats {
  totalLeads: number;
  newLeads: number;
  totalMachines: number;
  publishedMachines: number;
}

const AdminDashboard = () => {
  const [stats, setStats] = useState<Stats>({
    totalLeads: 0,
    newLeads: 0,
    totalMachines: 0,
    publishedMachines: 0,
  });
  const [recentLeads, setRecentLeads] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchStats();
    fetchRecentLeads();
  }, []);

  const fetchStats = async () => {
    try {
      // Get total leads
      const { count: totalLeads } = await supabase
        .from("leads")
        .select("*", { count: "exact", head: true });

      // Get new leads (status = 'neu')
      const { count: newLeads } = await supabase
        .from("leads")
        .select("*", { count: "exact", head: true })
        .eq("status", "neu");

      // Get total machines
      const { count: totalMachines } = await supabase
        .from("machines")
        .select("*", { count: "exact", head: true });

      // Get published machines
      const { count: publishedMachines } = await supabase
        .from("machines")
        .select("*", { count: "exact", head: true })
        .eq("is_published", true);

      setStats({
        totalLeads: totalLeads || 0,
        newLeads: newLeads || 0,
        totalMachines: totalMachines || 0,
        publishedMachines: publishedMachines || 0,
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  const fetchRecentLeads = async () => {
    try {
      const { data, error } = await supabase
        .from("leads")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(5);

      if (error) throw error;
      setRecentLeads(data || []);
    } catch (error) {
      console.error("Error fetching recent leads:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const statCards = [
    {
      label: "Neue Leads",
      value: stats.newLeads,
      icon: Clock,
      color: "bg-accent",
      href: "/admin/leads?status=neu",
    },
    {
      label: "Gesamt Leads",
      value: stats.totalLeads,
      icon: FileText,
      color: "bg-primary",
      href: "/admin/leads",
    },
    {
      label: "Aktive Maschinen",
      value: stats.publishedMachines,
      icon: Truck,
      color: "bg-success",
      href: "/admin/maschinen",
    },
    {
      label: "Gesamt Maschinen",
      value: stats.totalMachines,
      icon: TrendingUp,
      color: "bg-muted-foreground",
      href: "/admin/maschinen",
    },
  ];

  const statusLabels: Record<string, { label: string; color: string }> = {
    neu: { label: "Neu", color: "bg-accent text-accent-foreground" },
    in_bearbeitung: { label: "In Bearbeitung", color: "bg-primary text-primary-foreground" },
    angebot_erstellt: { label: "Angebot erstellt", color: "bg-success text-success-foreground" },
    abgeschlossen: { label: "Abgeschlossen", color: "bg-muted text-muted-foreground" },
    abgelehnt: { label: "Abgelehnt", color: "bg-destructive text-destructive-foreground" },
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-headline">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Willkommen im Admin-Bereich
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {statCards.map((stat) => {
            const Icon = stat.icon;
            return (
              <Link
                key={stat.label}
                to={stat.href}
                className="bg-card rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-lg ${stat.color} text-white`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                </div>
                <p className="text-3xl font-bold text-headline">{stat.value}</p>
                <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
              </Link>
            );
          })}
        </div>

        {/* Recent Leads */}
        <div className="bg-card rounded-xl shadow-sm">
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="text-lg font-semibold text-headline">Neueste Leads</h2>
            <Link
              to="/admin/leads"
              className="text-sm text-primary hover:underline flex items-center gap-1"
            >
              Alle anzeigen
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {isLoading ? (
            <div className="p-6 text-center text-muted-foreground">
              Lädt...
            </div>
          ) : recentLeads.length === 0 ? (
            <div className="p-6 text-center text-muted-foreground">
              Noch keine Leads vorhanden
            </div>
          ) : (
            <div className="divide-y">
              {recentLeads.map((lead) => (
                <Link
                  key={lead.id}
                  to={`/admin/leads/${lead.id}`}
                  className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-headline truncate">
                      {lead.manufacturer_name} {lead.model_name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {lead.contact_name} • {lead.contact_email}
                    </p>
                  </div>
                  <div className="flex items-center gap-4 ml-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        statusLabels[lead.status]?.color || "bg-muted"
                      }`}
                    >
                      {statusLabels[lead.status]?.label || lead.status}
                    </span>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">
                      {new Date(lead.created_at).toLocaleDateString("de-DE")}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;

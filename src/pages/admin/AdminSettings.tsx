import { useEffect, useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Save, Loader2, Mail, Phone, Building2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AppSetting {
  id: string;
  key: string;
  value: string;
  description: string | null;
}

const AdminSettings = () => {
  const { toast } = useToast();
  const [settings, setSettings] = useState<AppSetting[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [formValues, setFormValues] = useState<Record<string, string>>({});

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const { data, error } = await supabase
        .from("app_settings")
        .select("*")
        .order("key");

      if (error) throw error;

      setSettings(data || []);
      
      const values: Record<string, string> = {};
      data?.forEach(setting => {
        values[setting.key] = setting.value;
      });
      setFormValues(values);
    } catch (error) {
      console.error("Error fetching settings:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);

    try {
      for (const setting of settings) {
        if (formValues[setting.key] !== setting.value) {
          const { error } = await supabase
            .from("app_settings")
            .update({ value: formValues[setting.key] })
            .eq("key", setting.key);

          if (error) throw error;
        }
      }

      toast({
        title: "Einstellungen gespeichert",
        description: "Alle Änderungen wurden übernommen",
      });

      fetchSettings();
    } catch (error) {
      console.error("Error saving settings:", error);
      toast({
        title: "Fehler",
        description: "Einstellungen konnten nicht gespeichert werden",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const settingIcons: Record<string, any> = {
    lead_notification_email: Mail,
    company_phone: Phone,
    company_name: Building2,
  };

  const settingLabels: Record<string, string> = {
    lead_notification_email: "Lead-Benachrichtigungs-E-Mail",
    company_phone: "Telefonnummer",
    company_name: "Firmenname",
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-headline">Einstellungen</h1>
            <p className="text-muted-foreground mt-1">
              Konfigurieren Sie die App-Einstellungen
            </p>
          </div>
          <Button
            onClick={handleSave}
            disabled={isSaving}
            className="gap-2 bg-primary"
          >
            {isSaving ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Speichern...
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                Speichern
              </>
            )}
          </Button>
        </div>

        {isLoading ? (
          <div className="text-center py-12 text-muted-foreground">
            Lädt...
          </div>
        ) : (
          <div className="bg-card rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-headline mb-6">
              Allgemeine Einstellungen
            </h2>
            
            <div className="space-y-6 max-w-xl">
              {settings.map((setting) => {
                const Icon = settingIcons[setting.key] || Building2;
                const label = settingLabels[setting.key] || setting.key;
                
                return (
                  <div key={setting.key}>
                    <Label 
                      htmlFor={setting.key}
                      className="flex items-center gap-2 mb-2"
                    >
                      <Icon className="h-4 w-4 text-muted-foreground" />
                      {label}
                    </Label>
                    <Input
                      id={setting.key}
                      value={formValues[setting.key] || ""}
                      onChange={(e) => 
                        setFormValues({ ...formValues, [setting.key]: e.target.value })
                      }
                    />
                    {setting.description && (
                      <p className="text-xs text-muted-foreground mt-1">
                        {setting.description}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Info Card */}
        <div className="bg-primary/5 rounded-xl p-6">
          <h3 className="font-semibold text-headline mb-2">
            Hinweis zu E-Mail-Benachrichtigungen
          </h3>
          <p className="text-sm text-muted-foreground">
            Alle neuen Ankauf-Anfragen werden an die oben konfigurierte E-Mail-Adresse gesendet. 
            Stellen Sie sicher, dass die E-Mail-Adresse korrekt ist, um keine Leads zu verpassen.
          </p>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminSettings;

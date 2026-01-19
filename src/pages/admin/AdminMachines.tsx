import { useEffect, useState } from "react";
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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Plus, 
  Search, 
  Pencil, 
  Trash2,
  Eye,
  EyeOff
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Machine {
  id: string;
  title: string;
  category: string;
  subcategory: string | null;
  manufacturer_name: string;
  model_name: string | null;
  year_built: number;
  operating_hours: number | null;
  price: number;
  condition: string;
  description: string | null;
  location_name: string | null;
  is_published: boolean;
  is_featured: boolean;
  financing_available: boolean;
  created_at: string;
}

const emptyMachine = {
  title: "",
  category: "bagger",
  subcategory: "",
  manufacturer_name: "",
  model_name: "",
  year_built: new Date().getFullYear(),
  operating_hours: 0,
  price: 0,
  condition: "gut",
  description: "",
  location_name: "Krefeld",
  is_published: true,
  is_featured: false,
  financing_available: true,
};

const AdminMachines = () => {
  const { toast } = useToast();
  const [machines, setMachines] = useState<Machine[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingMachine, setEditingMachine] = useState<Machine | null>(null);
  const [formData, setFormData] = useState(emptyMachine);

  useEffect(() => {
    fetchMachines();
  }, [categoryFilter]);

  const fetchMachines = async () => {
    setIsLoading(true);
    try {
      let query = supabase
        .from("machines")
        .select("*")
        .order("created_at", { ascending: false });

      if (categoryFilter !== "all") {
        query = query.eq("category", categoryFilter as any);
      }

      const { data, error } = await query;

      if (error) throw error;
      setMachines(data || []);
    } catch (error) {
      console.error("Error fetching machines:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const machineData = {
        title: formData.title,
        category: formData.category as any,
        subcategory: formData.subcategory || null,
        manufacturer_name: formData.manufacturer_name,
        model_name: formData.model_name || null,
        year_built: formData.year_built,
        operating_hours: formData.operating_hours || null,
        price: formData.price,
        condition: formData.condition as any,
        description: formData.description || null,
        location_name: formData.location_name || null,
        is_published: formData.is_published,
        is_featured: formData.is_featured,
        financing_available: formData.financing_available,
      };

      if (editingMachine) {
        const { error } = await supabase
          .from("machines")
          .update(machineData)
          .eq("id", editingMachine.id);

        if (error) throw error;

        toast({
          title: "Maschine aktualisiert",
          description: "Die Änderungen wurden gespeichert",
        });
      } else {
        const { error } = await supabase
          .from("machines")
          .insert(machineData);

        if (error) throw error;

        toast({
          title: "Maschine erstellt",
          description: "Die Maschine wurde erfolgreich angelegt",
        });
      }

      setIsDialogOpen(false);
      setEditingMachine(null);
      setFormData(emptyMachine);
      fetchMachines();
    } catch (error: any) {
      console.error("Error saving machine:", error);
      toast({
        title: "Fehler",
        description: error.message || "Maschine konnte nicht gespeichert werden",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (machine: Machine) => {
    setEditingMachine(machine);
    setFormData({
      title: machine.title,
      category: machine.category as 'bagger' | 'arbeitsbuehne',
      subcategory: machine.subcategory || "",
      manufacturer_name: machine.manufacturer_name,
      model_name: machine.model_name || "",
      year_built: machine.year_built,
      operating_hours: machine.operating_hours || 0,
      price: machine.price,
      condition: machine.condition as 'sehr_gut' | 'gut' | 'ok' | 'reparaturbeduerftig',
      description: machine.description || "",
      location_name: machine.location_name || "Krefeld",
      is_published: machine.is_published,
      is_featured: machine.is_featured,
      financing_available: machine.financing_available,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Möchten Sie diese Maschine wirklich löschen?")) return;

    try {
      const { error } = await supabase
        .from("machines")
        .delete()
        .eq("id", id);

      if (error) throw error;

      toast({
        title: "Maschine gelöscht",
        description: "Die Maschine wurde entfernt",
      });

      fetchMachines();
    } catch (error) {
      console.error("Error deleting machine:", error);
      toast({
        title: "Fehler",
        description: "Maschine konnte nicht gelöscht werden",
        variant: "destructive",
      });
    }
  };

  const togglePublished = async (machine: Machine) => {
    try {
      const { error } = await supabase
        .from("machines")
        .update({ is_published: !machine.is_published })
        .eq("id", machine.id);

      if (error) throw error;

      setMachines(machines.map(m => 
        m.id === machine.id ? { ...m, is_published: !m.is_published } : m
      ));

      toast({
        title: machine.is_published ? "Deaktiviert" : "Aktiviert",
        description: `Maschine ist jetzt ${machine.is_published ? "nicht mehr" : ""} sichtbar`,
      });
    } catch (error) {
      console.error("Error toggling published:", error);
    }
  };

  const filteredMachines = machines.filter(machine => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      machine.title.toLowerCase().includes(query) ||
      machine.manufacturer_name.toLowerCase().includes(query)
    );
  });

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-headline">Maschinen</h1>
            <p className="text-muted-foreground mt-1">
              {filteredMachines.length} Gebrauchtmaschinen
            </p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={(open) => {
            setIsDialogOpen(open);
            if (!open) {
              setEditingMachine(null);
              setFormData(emptyMachine);
            }
          }}>
            <DialogTrigger asChild>
              <Button className="gap-2 bg-accent hover:bg-accent/90">
                <Plus className="h-4 w-4" />
                Neue Maschine
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingMachine ? "Maschine bearbeiten" : "Neue Maschine anlegen"}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <Label htmlFor="title">Titel *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="z.B. Liebherr A918 Compact"
                      required
                    />
                  </div>

                  <div>
                    <Label>Kategorie *</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value: 'bagger' | 'arbeitsbuehne') => 
                        setFormData({ ...formData, category: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="bagger">Bagger</SelectItem>
                        <SelectItem value="arbeitsbuehne">Arbeitsbühne</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="subcategory">Unterkategorie</Label>
                    <Input
                      id="subcategory"
                      value={formData.subcategory}
                      onChange={(e) => setFormData({ ...formData, subcategory: e.target.value })}
                      placeholder="z.B. Mobilbagger"
                    />
                  </div>

                  <div>
                    <Label htmlFor="manufacturer">Hersteller *</Label>
                    <Input
                      id="manufacturer"
                      value={formData.manufacturer_name}
                      onChange={(e) => setFormData({ ...formData, manufacturer_name: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="model">Modell</Label>
                    <Input
                      id="model"
                      value={formData.model_name}
                      onChange={(e) => setFormData({ ...formData, model_name: e.target.value })}
                    />
                  </div>

                  <div>
                    <Label htmlFor="year">Baujahr *</Label>
                    <Input
                      id="year"
                      type="number"
                      value={formData.year_built}
                      onChange={(e) => setFormData({ ...formData, year_built: parseInt(e.target.value) })}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="hours">Betriebsstunden</Label>
                    <Input
                      id="hours"
                      type="number"
                      value={formData.operating_hours}
                      onChange={(e) => setFormData({ ...formData, operating_hours: parseInt(e.target.value) })}
                    />
                  </div>

                  <div>
                    <Label htmlFor="price">Preis (€) *</Label>
                    <Input
                      id="price"
                      type="number"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                      required
                    />
                  </div>

                  <div>
                    <Label>Zustand *</Label>
                    <Select
                      value={formData.condition}
                      onValueChange={(value: 'sehr_gut' | 'gut' | 'ok' | 'reparaturbeduerftig') => 
                        setFormData({ ...formData, condition: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sehr_gut">Sehr gut</SelectItem>
                        <SelectItem value="gut">Gut</SelectItem>
                        <SelectItem value="ok">OK</SelectItem>
                        <SelectItem value="reparaturbeduerftig">Reparaturbedürftig</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="location">Standort</Label>
                    <Select
                      value={formData.location_name}
                      onValueChange={(value) => setFormData({ ...formData, location_name: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Krefeld">Krefeld</SelectItem>
                        <SelectItem value="Bonn">Bonn</SelectItem>
                        <SelectItem value="Mülheim">Mülheim</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="sm:col-span-2">
                    <Label htmlFor="description">Beschreibung</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      rows={3}
                    />
                  </div>

                  <div className="sm:col-span-2 flex flex-wrap gap-6">
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="published"
                        checked={formData.is_published}
                        onCheckedChange={(checked) => 
                          setFormData({ ...formData, is_published: !!checked })
                        }
                      />
                      <Label htmlFor="published">Veröffentlicht</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="featured"
                        checked={formData.is_featured}
                        onCheckedChange={(checked) => 
                          setFormData({ ...formData, is_featured: !!checked })
                        }
                      />
                      <Label htmlFor="featured">Hervorgehoben</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="financing"
                        checked={formData.financing_available}
                        onCheckedChange={(checked) => 
                          setFormData({ ...formData, financing_available: !!checked })
                        }
                      />
                      <Label htmlFor="financing">Finanzierung möglich</Label>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsDialogOpen(false)}
                  >
                    Abbrechen
                  </Button>
                  <Button type="submit" className="bg-primary">
                    {editingMachine ? "Speichern" : "Anlegen"}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Suchen nach Titel, Hersteller..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-full sm:w-[200px]">
              <SelectValue placeholder="Kategorie filtern" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Alle Kategorien</SelectItem>
              <SelectItem value="bagger">Bagger</SelectItem>
              <SelectItem value="arbeitsbuehne">Arbeitsbühnen</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Machines Table */}
        {isLoading ? (
          <div className="text-center py-12 text-muted-foreground">
            Lädt...
          </div>
        ) : filteredMachines.length === 0 ? (
          <div className="text-center py-12 bg-card rounded-xl">
            <p className="text-muted-foreground">Keine Maschinen gefunden</p>
          </div>
        ) : (
          <div className="bg-card rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="text-left p-4 font-medium text-muted-foreground">Maschine</th>
                    <th className="text-left p-4 font-medium text-muted-foreground">Jahr</th>
                    <th className="text-left p-4 font-medium text-muted-foreground">Preis</th>
                    <th className="text-left p-4 font-medium text-muted-foreground">Standort</th>
                    <th className="text-left p-4 font-medium text-muted-foreground">Status</th>
                    <th className="text-right p-4 font-medium text-muted-foreground">Aktionen</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {filteredMachines.map((machine) => (
                    <tr key={machine.id} className="hover:bg-muted/30">
                      <td className="p-4">
                        <p className="font-medium text-headline">{machine.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {machine.category === "bagger" ? "Bagger" : "Arbeitsbühne"}
                          {machine.subcategory && ` • ${machine.subcategory}`}
                        </p>
                      </td>
                      <td className="p-4 text-muted-foreground">
                        {machine.year_built}
                        {machine.operating_hours && (
                          <span className="block text-xs">
                            {machine.operating_hours.toLocaleString("de-DE")} Std.
                          </span>
                        )}
                      </td>
                      <td className="p-4 font-medium">
                        € {machine.price.toLocaleString("de-DE")}
                      </td>
                      <td className="p-4 text-muted-foreground">
                        {machine.location_name || "–"}
                      </td>
                      <td className="p-4">
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                            machine.is_published
                              ? "bg-success/10 text-success"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {machine.is_published ? (
                            <>
                              <Eye className="h-3 w-3" />
                              Aktiv
                            </>
                          ) : (
                            <>
                              <EyeOff className="h-3 w-3" />
                              Inaktiv
                            </>
                          )}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => togglePublished(machine)}
                          >
                            {machine.is_published ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit(machine)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(machine.id)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminMachines;

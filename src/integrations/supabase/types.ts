export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      app_settings: {
        Row: {
          created_at: string
          description: string | null
          id: string
          key: string
          updated_at: string
          value: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          key: string
          updated_at?: string
          value: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          key?: string
          updated_at?: string
          value?: string
        }
        Relationships: []
      }
      leads: {
        Row: {
          assigned_to: string | null
          calculated_price_high: number | null
          calculated_price_low: number | null
          category: Database["public"]["Enums"]["machine_category"]
          condition: Database["public"]["Enums"]["machine_condition"]
          contact_company: string | null
          contact_email: string
          contact_name: string
          contact_phone: string
          created_at: string
          damage_description: string | null
          documents: Json | null
          drive_type: string | null
          equipment: Json | null
          final_offer: number | null
          gdpr_consent: boolean
          has_ce: boolean | null
          has_damage: boolean | null
          has_manual: boolean | null
          has_service_book: boolean | null
          has_uvv: boolean | null
          id: string
          images: Json | null
          is_custom_model: boolean | null
          location_zip: string
          manufacturer_name: string
          model_name: string
          notes: string | null
          operating_hours: number | null
          serial_number: string | null
          status: Database["public"]["Enums"]["lead_status"]
          subcategory: string | null
          updated_at: string
          wants_pickup: boolean | null
          weight_class: string | null
          working_height: string | null
          year_built: number
        }
        Insert: {
          assigned_to?: string | null
          calculated_price_high?: number | null
          calculated_price_low?: number | null
          category: Database["public"]["Enums"]["machine_category"]
          condition: Database["public"]["Enums"]["machine_condition"]
          contact_company?: string | null
          contact_email: string
          contact_name: string
          contact_phone: string
          created_at?: string
          damage_description?: string | null
          documents?: Json | null
          drive_type?: string | null
          equipment?: Json | null
          final_offer?: number | null
          gdpr_consent?: boolean
          has_ce?: boolean | null
          has_damage?: boolean | null
          has_manual?: boolean | null
          has_service_book?: boolean | null
          has_uvv?: boolean | null
          id?: string
          images?: Json | null
          is_custom_model?: boolean | null
          location_zip: string
          manufacturer_name: string
          model_name: string
          notes?: string | null
          operating_hours?: number | null
          serial_number?: string | null
          status?: Database["public"]["Enums"]["lead_status"]
          subcategory?: string | null
          updated_at?: string
          wants_pickup?: boolean | null
          weight_class?: string | null
          working_height?: string | null
          year_built: number
        }
        Update: {
          assigned_to?: string | null
          calculated_price_high?: number | null
          calculated_price_low?: number | null
          category?: Database["public"]["Enums"]["machine_category"]
          condition?: Database["public"]["Enums"]["machine_condition"]
          contact_company?: string | null
          contact_email?: string
          contact_name?: string
          contact_phone?: string
          created_at?: string
          damage_description?: string | null
          documents?: Json | null
          drive_type?: string | null
          equipment?: Json | null
          final_offer?: number | null
          gdpr_consent?: boolean
          has_ce?: boolean | null
          has_damage?: boolean | null
          has_manual?: boolean | null
          has_service_book?: boolean | null
          has_uvv?: boolean | null
          id?: string
          images?: Json | null
          is_custom_model?: boolean | null
          location_zip?: string
          manufacturer_name?: string
          model_name?: string
          notes?: string | null
          operating_hours?: number | null
          serial_number?: string | null
          status?: Database["public"]["Enums"]["lead_status"]
          subcategory?: string | null
          updated_at?: string
          wants_pickup?: boolean | null
          weight_class?: string | null
          working_height?: string | null
          year_built?: number
        }
        Relationships: []
      }
      machines: {
        Row: {
          category: Database["public"]["Enums"]["machine_category"]
          condition: Database["public"]["Enums"]["machine_condition"]
          created_at: string
          description: string | null
          documents: Json | null
          drive_type: string | null
          features: Json | null
          financing_available: boolean | null
          id: string
          images: Json | null
          is_featured: boolean | null
          is_published: boolean | null
          is_sold: boolean | null
          location_name: string | null
          manufacturer_name: string
          model_name: string | null
          operating_hours: number | null
          price: number
          serial_number: string | null
          subcategory: string | null
          title: string
          updated_at: string
          weight_kg: number | null
          working_height_m: number | null
          year_built: number
        }
        Insert: {
          category: Database["public"]["Enums"]["machine_category"]
          condition?: Database["public"]["Enums"]["machine_condition"]
          created_at?: string
          description?: string | null
          documents?: Json | null
          drive_type?: string | null
          features?: Json | null
          financing_available?: boolean | null
          id?: string
          images?: Json | null
          is_featured?: boolean | null
          is_published?: boolean | null
          is_sold?: boolean | null
          location_name?: string | null
          manufacturer_name: string
          model_name?: string | null
          operating_hours?: number | null
          price: number
          serial_number?: string | null
          subcategory?: string | null
          title: string
          updated_at?: string
          weight_kg?: number | null
          working_height_m?: number | null
          year_built: number
        }
        Update: {
          category?: Database["public"]["Enums"]["machine_category"]
          condition?: Database["public"]["Enums"]["machine_condition"]
          created_at?: string
          description?: string | null
          documents?: Json | null
          drive_type?: string | null
          features?: Json | null
          financing_available?: boolean | null
          id?: string
          images?: Json | null
          is_featured?: boolean | null
          is_published?: boolean | null
          is_sold?: boolean | null
          location_name?: string | null
          manufacturer_name?: string
          model_name?: string | null
          operating_hours?: number | null
          price?: number
          serial_number?: string | null
          subcategory?: string | null
          title?: string
          updated_at?: string
          weight_kg?: number | null
          working_height_m?: number | null
          year_built?: number
        }
        Relationships: []
      }
      manufacturers: {
        Row: {
          category: Database["public"]["Enums"]["machine_category"]
          created_at: string
          id: string
          is_active: boolean
          logo_url: string | null
          name: string
          sort_order: number | null
          updated_at: string
        }
        Insert: {
          category: Database["public"]["Enums"]["machine_category"]
          created_at?: string
          id?: string
          is_active?: boolean
          logo_url?: string | null
          name: string
          sort_order?: number | null
          updated_at?: string
        }
        Update: {
          category?: Database["public"]["Enums"]["machine_category"]
          created_at?: string
          id?: string
          is_active?: boolean
          logo_url?: string | null
          name?: string
          sort_order?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      market_price_data: {
        Row: {
          age_years: number
          as_of_date: string
          category: string
          created_at: string
          hours_max: number | null
          hours_min: number | null
          id: string
          manufacturer: string
          model: string
          price_max_eur: number
          price_mid_eur: number
          price_min_eur: number
          reference_year: number
          segment: string
          source_note: string | null
          source_url: string | null
          updated_at: string
        }
        Insert: {
          age_years: number
          as_of_date?: string
          category: string
          created_at?: string
          hours_max?: number | null
          hours_min?: number | null
          id?: string
          manufacturer: string
          model: string
          price_max_eur: number
          price_mid_eur: number
          price_min_eur: number
          reference_year: number
          segment: string
          source_note?: string | null
          source_url?: string | null
          updated_at?: string
        }
        Update: {
          age_years?: number
          as_of_date?: string
          category?: string
          created_at?: string
          hours_max?: number | null
          hours_min?: number | null
          id?: string
          manufacturer?: string
          model?: string
          price_max_eur?: number
          price_mid_eur?: number
          price_min_eur?: number
          reference_year?: number
          segment?: string
          source_note?: string | null
          source_url?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      models: {
        Row: {
          created_at: string
          id: string
          is_active: boolean
          manufacturer_id: string
          name: string
          subcategory: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_active?: boolean
          manufacturer_id: string
          name: string
          subcategory?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          is_active?: boolean
          manufacturer_id?: string
          name?: string
          subcategory?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "models_manufacturer_id_fkey"
            columns: ["manufacturer_id"]
            isOneToOne: false
            referencedRelation: "manufacturers"
            referencedColumns: ["id"]
          },
        ]
      }
      pricing_factors: {
        Row: {
          category: Database["public"]["Enums"]["machine_category"]
          created_at: string
          description: string | null
          factor_key: string
          factor_type: string
          factor_value: number
          id: string
          is_active: boolean
          updated_at: string
        }
        Insert: {
          category: Database["public"]["Enums"]["machine_category"]
          created_at?: string
          description?: string | null
          factor_key: string
          factor_type: string
          factor_value: number
          id?: string
          is_active?: boolean
          updated_at?: string
        }
        Update: {
          category?: Database["public"]["Enums"]["machine_category"]
          created_at?: string
          description?: string | null
          factor_key?: string
          factor_type?: string
          factor_value?: number
          id?: string
          is_active?: boolean
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          company: string | null
          created_at: string
          email: string | null
          full_name: string | null
          id: string
          phone: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          company?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          phone?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          company?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          phone?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
      lead_status:
        | "neu"
        | "in_bearbeitung"
        | "angebot_erstellt"
        | "abgeschlossen"
        | "abgelehnt"
      machine_category: "bagger" | "arbeitsbuehne"
      machine_condition: "sehr_gut" | "gut" | "ok" | "reparaturbeduerftig"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "moderator", "user"],
      lead_status: [
        "neu",
        "in_bearbeitung",
        "angebot_erstellt",
        "abgeschlossen",
        "abgelehnt",
      ],
      machine_category: ["bagger", "arbeitsbuehne"],
      machine_condition: ["sehr_gut", "gut", "ok", "reparaturbeduerftig"],
    },
  },
} as const

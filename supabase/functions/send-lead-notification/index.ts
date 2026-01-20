import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface LeadNotificationRequest {
  leadId: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  contactCompany?: string;
  category: string;
  manufacturerName: string;
  modelName: string;
  yearBuilt: number;
  operatingHours?: number;
  condition: string;
  locationZip: string;
  priceRangeLow?: number;
  priceRangeHigh?: number;
}

async function sendEmail(to: string[], subject: string, html: string) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from: "wirkaufendeinebaumaschinen.de <onboarding@resend.dev>",
      to,
      subject,
      html,
    }),
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(`Failed to send email: ${error}`);
  }

  return res.json();
}

const handler = async (req: Request): Promise<Response> => {
  console.log("send-lead-notification function called");
  
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Get notification email from settings
    const { data: settingsData } = await supabase
      .from("app_settings")
      .select("value")
      .eq("key", "lead_notification_email")
      .maybeSingle();

    const notificationEmail = settingsData?.value || "info@wirkaufendeinebaumaschinen.de";

    const leadData: LeadNotificationRequest = await req.json();
    console.log("Lead data received:", leadData);

    const conditionLabels: Record<string, string> = {
      sehr_gut: "Sehr gut",
      gut: "Gut",
      ok: "OK",
      reparaturbeduerftig: "Reparaturbedürftig",
    };

    const categoryLabels: Record<string, string> = {
      bagger: "Bagger",
      arbeitsbuehne: "Arbeitsbühne",
    };

    const priceRange = leadData.priceRangeLow && leadData.priceRangeHigh
      ? `€ ${leadData.priceRangeLow.toLocaleString("de-DE")} – € ${leadData.priceRangeHigh.toLocaleString("de-DE")}`
      : "Nicht berechnet";

    // Send notification to admin
    const adminEmailResponse = await sendEmail(
      [notificationEmail],
      `Neue Ankauf-Anfrage: ${leadData.manufacturerName} ${leadData.modelName}`,
      `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #00507D; padding: 20px; text-align: center;">
            <h1 style="color: white; margin: 0;">Neue Ankauf-Anfrage</h1>
          </div>
          
          <div style="padding: 20px; background-color: #f5f5f5;">
            <h2 style="color: #00507D; border-bottom: 2px solid #FF8E02; padding-bottom: 10px;">
              Kontaktdaten
            </h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 8px 0; font-weight: bold;">Name:</td><td>${leadData.contactName}</td></tr>
              <tr><td style="padding: 8px 0; font-weight: bold;">E-Mail:</td><td><a href="mailto:${leadData.contactEmail}">${leadData.contactEmail}</a></td></tr>
              <tr><td style="padding: 8px 0; font-weight: bold;">Telefon:</td><td><a href="tel:${leadData.contactPhone}">${leadData.contactPhone}</a></td></tr>
              ${leadData.contactCompany ? `<tr><td style="padding: 8px 0; font-weight: bold;">Firma:</td><td>${leadData.contactCompany}</td></tr>` : ""}
            </table>

            <h2 style="color: #00507D; border-bottom: 2px solid #FF8E02; padding-bottom: 10px; margin-top: 30px;">
              Maschinendaten
            </h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 8px 0; font-weight: bold;">Kategorie:</td><td>${categoryLabels[leadData.category] || leadData.category}</td></tr>
              <tr><td style="padding: 8px 0; font-weight: bold;">Hersteller:</td><td>${leadData.manufacturerName}</td></tr>
              <tr><td style="padding: 8px 0; font-weight: bold;">Modell:</td><td>${leadData.modelName}</td></tr>
              <tr><td style="padding: 8px 0; font-weight: bold;">Baujahr:</td><td>${leadData.yearBuilt}</td></tr>
              ${leadData.operatingHours ? `<tr><td style="padding: 8px 0; font-weight: bold;">Betriebsstunden:</td><td>${leadData.operatingHours.toLocaleString("de-DE")}</td></tr>` : ""}
              <tr><td style="padding: 8px 0; font-weight: bold;">Zustand:</td><td>${conditionLabels[leadData.condition] || leadData.condition}</td></tr>
              <tr><td style="padding: 8px 0; font-weight: bold;">Standort PLZ:</td><td>${leadData.locationZip}</td></tr>
            </table>

            <div style="background-color: #FF8E02; color: white; padding: 15px; margin-top: 30px; border-radius: 8px; text-align: center;">
              <h3 style="margin: 0 0 10px 0;">Berechneter Referenzpreis</h3>
              <p style="font-size: 24px; font-weight: bold; margin: 0;">${priceRange}</p>
            </div>

            <p style="margin-top: 30px; color: #666; font-size: 12px;">
              Lead-ID: ${leadData.leadId}<br>
              Erstellt am: ${new Date().toLocaleString("de-DE")}
            </p>
          </div>
        </div>
      `
    );

    console.log("Admin email sent:", adminEmailResponse);

    // Send confirmation to customer
    const customerEmailResponse = await sendEmail(
      [leadData.contactEmail],
      "Ihre Ankauf-Anfrage bei wirkaufendeinebaumaschinen.de",
      `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #00507D; padding: 20px; text-align: center;">
            <h1 style="color: white; margin: 0;">Vielen Dank für Ihre Anfrage!</h1>
          </div>
          
          <div style="padding: 20px;">
            <p>Guten Tag ${leadData.contactName},</p>
            
            <p>vielen Dank für Ihre Ankauf-Anfrage für Ihren <strong>${leadData.manufacturerName} ${leadData.modelName}</strong>.</p>
            
            <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #00507D; margin-top: 0;">Ihr vorläufiger Referenzpreis:</h3>
              <p style="font-size: 28px; font-weight: bold; color: #FF8E02; margin: 10px 0;">${priceRange}</p>
              <p style="font-size: 12px; color: #666; margin-bottom: 0;">
                * Der finale Ankaufpreis wird nach Sichtprüfung Ihrer Maschine festgelegt.
              </p>
            </div>
            
            <h3 style="color: #00507D;">Wie geht es weiter?</h3>
            <ol style="color: #595959; line-height: 1.8;">
              <li>Wir prüfen Ihre Angaben und melden uns innerhalb von 24 Stunden bei Ihnen.</li>
              <li>Gemeinsam vereinbaren wir einen Besichtigungstermin.</li>
              <li>Nach der Prüfung erhalten Sie ein verbindliches Ankaufangebot.</li>
              <li>Bei Einigung erfolgt die schnelle Abwicklung und Auszahlung.</li>
            </ol>
            
            <p>Bei Fragen erreichen Sie uns telefonisch unter <a href="tel:+4921514179904">02151 417 990 4</a>.</p>
            
            <p>Mit freundlichen Grüßen,<br>
            Ihr Team von wirkaufendeinebaumaschinen.de</p>
            
            <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
            
            <p style="font-size: 12px; color: #999;">
              SLT Technology Group GmbH & Co. KG<br>
              Anrather Straße 291, 47807 Krefeld<br>
              <a href="https://www.wirkaufendeinebaumaschinen.de">www.wirkaufendeinebaumaschinen.de</a>
            </p>
          </div>
        </div>
      `
    );

    console.log("Customer email sent:", customerEmailResponse);

    return new Response(
      JSON.stringify({ 
        success: true, 
        adminEmail: adminEmailResponse,
        customerEmail: customerEmailResponse 
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error in send-lead-notification:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);

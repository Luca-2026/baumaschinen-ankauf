import { WizardFormData } from "@/types/wizard";

interface PriceRange {
  low: number;
  high: number;
}

// Price calculation based on the defined factors
export function calculateReferencePrice(data: WizardFormData): PriceRange | null {
  if (!data.category || !data.yearBuilt || !data.condition) {
    return null;
  }

  // Base values by category and size
  const baseValues: Record<string, Record<string, number>> = {
    bagger: {
      mini_bis_3t: 25000,
      mini_3_6t: 45000,
      midi_6_15t: 75000,
      standard_15_25t: 120000,
      gross_ueber_25t: 180000,
    },
    arbeitsbuehne: {
      bis_10m: 12000,
      '10_15m': 25000,
      '15_20m': 40000,
      '20_30m': 65000,
      ueber_30m: 100000,
    },
  };

  // Get base value
  const sizeKey = data.category === 'bagger' ? data.weightClass : data.workingHeight;
  const categoryBaseValues = baseValues[data.category];
  let baseValue = categoryBaseValues?.[sizeKey] || 50000; // Default fallback

  // Age factor
  const currentYear = new Date().getFullYear();
  const age = currentYear - (data.yearBuilt || currentYear);
  let ageFactor = 1.0;
  if (age <= 2) ageFactor = data.category === 'bagger' ? 0.95 : 0.92;
  else if (age <= 5) ageFactor = data.category === 'bagger' ? 0.85 : 0.80;
  else if (age <= 10) ageFactor = data.category === 'bagger' ? 0.70 : 0.65;
  else if (age <= 15) ageFactor = data.category === 'bagger' ? 0.55 : 0.50;
  else ageFactor = data.category === 'bagger' ? 0.40 : 0.35;

  // Hours factor
  const hours = data.operatingHours || 0;
  let hoursFactor = 1.0;
  if (data.category === 'bagger') {
    if (hours <= 2000) hoursFactor = 1.0;
    else if (hours <= 4000) hoursFactor = 0.90;
    else if (hours <= 6000) hoursFactor = 0.80;
    else if (hours <= 10000) hoursFactor = 0.65;
    else hoursFactor = 0.50;
  } else {
    if (hours <= 1000) hoursFactor = 1.0;
    else if (hours <= 2000) hoursFactor = 0.90;
    else if (hours <= 4000) hoursFactor = 0.80;
    else if (hours <= 6000) hoursFactor = 0.65;
    else hoursFactor = 0.50;
  }

  // Condition factor
  const conditionFactors: Record<string, number> = {
    sehr_gut: 1.10,
    gut: 1.0,
    ok: 0.85,
    reparaturbeduerftig: data.category === 'bagger' ? 0.60 : 0.55,
  };
  const conditionFactor = conditionFactors[data.condition] || 1.0;

  // Documentation bonus
  let docBonus = 1.0;
  if (data.hasServiceBook) docBonus += 0.02;
  if (data.hasUvv) docBonus += 0.02;
  if (data.hasCe) docBonus += 0.01;
  if (data.hasManual) docBonus += 0.01;

  // Equipment bonus (max 10%)
  const equipmentCount = data.equipment.length;
  const equipmentBonus = Math.min(equipmentCount * 0.02, 0.10);

  // Damage penalty
  const damagePenalty = data.hasDamage ? 0.85 : 1.0;

  // Calculate final price
  const calculatedPrice = baseValue * ageFactor * hoursFactor * conditionFactor * docBonus * (1 + equipmentBonus) * damagePenalty;

  // Return range (±10%)
  return {
    low: Math.round(calculatedPrice * 0.90 / 100) * 100,
    high: Math.round(calculatedPrice * 1.10 / 100) * 100,
  };
}

export function formatPrice(price: number): string {
  return price.toLocaleString('de-DE');
}

export function formatPriceRange(range: PriceRange): string {
  return `€ ${formatPrice(range.low)} – € ${formatPrice(range.high)}`;
}

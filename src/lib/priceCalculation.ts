import { WizardFormData } from "@/types/wizard";
import { supabase } from "@/integrations/supabase/client";

export interface PriceRange {
  low: number;
  high: number;
  mid?: number;
  isMarketBased?: boolean;
  matchedModel?: string;
}

interface MarketPriceData {
  manufacturer: string;
  model: string;
  reference_year: number;
  age_years: number;
  hours_min: number | null;
  hours_max: number | null;
  price_min_eur: number;
  price_max_eur: number;
  price_mid_eur: number;
  segment: string;
}

// Fetch market data for price calculation
export async function fetchMarketPriceData(
  category: string,
  manufacturer: string,
  model?: string
): Promise<MarketPriceData[]> {
  try {
    let query = supabase
      .from('market_price_data')
      .select('*')
      .eq('category', category)
      .ilike('manufacturer', `%${manufacturer}%`);
    
    if (model) {
      query = query.ilike('model', `%${model}%`);
    }
    
    const { data, error } = await query;
    
    if (error) {
      console.error('Error fetching market data:', error);
      return [];
    }
    
    return (data || []) as MarketPriceData[];
  } catch (error) {
    console.error('Error in fetchMarketPriceData:', error);
    return [];
  }
}

// Find best matching market data entry
function findBestMatch(
  marketData: MarketPriceData[],
  yearBuilt: number,
  operatingHours?: number
): MarketPriceData | null {
  if (marketData.length === 0) return null;
  
  // Score each entry based on similarity
  const scored = marketData.map(entry => {
    let score = 0;
    
    // Year similarity (closer is better)
    const yearDiff = Math.abs(entry.reference_year - yearBuilt);
    score += Math.max(0, 10 - yearDiff); // Up to 10 points for exact year match
    
    // Hours similarity if available
    if (operatingHours && entry.hours_min && entry.hours_max) {
      const avgHours = (entry.hours_min + entry.hours_max) / 2;
      const hoursDiff = Math.abs(avgHours - operatingHours);
      score += Math.max(0, 5 - hoursDiff / 1000); // Up to 5 points
    }
    
    return { entry, score };
  });
  
  // Sort by score descending
  scored.sort((a, b) => b.score - a.score);
  
  return scored[0]?.entry || null;
}

// Calculate price adjustment based on condition, age, hours
function calculateAdjustmentFactor(
  data: WizardFormData,
  referenceAge: number
): number {
  const currentYear = new Date().getFullYear();
  const actualAge = currentYear - (data.yearBuilt || currentYear);
  
  let factor = 1.0;
  
  // Age difference adjustment
  const ageDifference = actualAge - referenceAge;
  if (ageDifference > 0) {
    // Older than reference: depreciate
    factor *= Math.pow(0.93, ageDifference);
  } else if (ageDifference < 0) {
    // Newer than reference: appreciate
    factor *= Math.pow(1.05, Math.abs(ageDifference));
  }
  
  // Condition factor
  const conditionFactors: Record<string, number> = {
    sehr_gut: 1.15,
    gut: 1.0,
    ok: 0.85,
    reparaturbeduerftig: 0.65,
  };
  factor *= conditionFactors[data.condition] || 1.0;
  
  // Documentation bonus
  if (data.hasServiceBook) factor += 0.03;
  if (data.hasUvv) factor += 0.03;
  if (data.hasCe) factor += 0.02;
  if (data.hasManual) factor += 0.01;
  
  // Equipment bonus (max 8%)
  const equipmentBonus = Math.min((data.equipment?.length || 0) * 0.02, 0.08);
  factor += equipmentBonus;
  
  // Damage penalty
  if (data.hasDamage) factor *= 0.80;
  
  return factor;
}

// Calculate reference price using market data
export async function calculateMarketBasedPrice(
  data: WizardFormData
): Promise<PriceRange | null> {
  if (!data.category || !data.yearBuilt || !data.condition || !data.manufacturerName) {
    return null;
  }
  
  // Try to fetch market data
  const marketData = await fetchMarketPriceData(
    data.category,
    data.manufacturerName,
    data.modelName
  );
  
  if (marketData.length > 0) {
    // Find best matching entry
    const bestMatch = findBestMatch(marketData, data.yearBuilt, data.operatingHours);
    
    if (bestMatch) {
      const adjustmentFactor = calculateAdjustmentFactor(data, bestMatch.age_years);
      
      // Calculate adjusted prices
      const adjustedLow = bestMatch.price_min_eur * adjustmentFactor;
      const adjustedHigh = bestMatch.price_max_eur * adjustmentFactor;
      const adjustedMid = bestMatch.price_mid_eur * adjustmentFactor;
      
      return {
        low: Math.round(adjustedLow / 100) * 100,
        high: Math.round(adjustedHigh / 100) * 100,
        mid: Math.round(adjustedMid / 100) * 100,
        isMarketBased: true,
        matchedModel: `${bestMatch.manufacturer} ${bestMatch.model}`,
      };
    }
  }
  
  // Fallback to formula-based calculation if no market data
  return calculateReferencePrice(data);
}

// Original formula-based calculation (fallback)
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
  let baseValue = categoryBaseValues?.[sizeKey] || 50000;

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
    isMarketBased: false,
  };
}

export function formatPrice(price: number): string {
  return price.toLocaleString('de-DE');
}

export function formatPriceRange(range: PriceRange): string {
  return `€ ${formatPrice(range.low)} – € ${formatPrice(range.high)}`;
}
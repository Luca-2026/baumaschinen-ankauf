import { WizardFormData } from "@/types/wizard";
import { supabase } from "@/integrations/supabase/client";
import { findMachineModel, DEALER_MARGIN, findArbeitsbuehneModel, ArbeitsbuehnModel, MachineModel } from "@/data/machineData";

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

// Fetch market data for price calculation (from database)
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

// Calculate price based on static machine data (primary method)
export function calculateStaticMachinePrice(data: WizardFormData): PriceRange | null {
  if (!data.category || !data.yearBuilt || !data.condition || !data.manufacturerName || !data.modelName) {
    return null;
  }

  // Find the machine in our static data
  let usedPriceMinEur: number;
  let usedPriceMaxEur: number;
  let matchedModelName: string;

  if (data.category === "bagger") {
    const machine = findMachineModel(data.category, data.manufacturerName, data.modelName) as MachineModel | null;
    if (!machine) return null;
    usedPriceMinEur = machine.usedPriceMinEur;
    usedPriceMaxEur = machine.usedPriceMaxEur;
    matchedModelName = `${machine.manufacturer} ${machine.model}`;
  } else if (data.category === "arbeitsbuehne") {
    const machine = findArbeitsbuehneModel(data.manufacturerName, data.modelName);
    if (!machine) return null;
    usedPriceMinEur = machine.usedPriceMinEur;
    usedPriceMaxEur = machine.usedPriceMaxEur;
    matchedModelName = `${machine.manufacturer} ${machine.model}`;
  } else {
    return null;
  }

  const currentYear = new Date().getFullYear();
  const age = currentYear - data.yearBuilt;
  const hours = data.operatingHours || 0;

  // Calculate position between min and max price based on age and condition
  // Reference: min = 8-10 years old, high hours, ok condition
  //            max = 1-3 years old, low hours, sehr gut condition
  
  let positionFactor = 0.5; // Start in the middle

  // Age factor: newer = higher position
  if (age <= 2) positionFactor += 0.25;
  else if (age <= 4) positionFactor += 0.15;
  else if (age <= 6) positionFactor += 0.05;
  else if (age <= 8) positionFactor -= 0.05;
  else if (age <= 10) positionFactor -= 0.15;
  else positionFactor -= 0.25;

  // Hours factor
  const avgHoursPerYear = 500; // Typical for construction equipment
  const expectedHours = age * avgHoursPerYear;
  const hoursRatio = hours / Math.max(expectedHours, 1);
  
  if (hoursRatio < 0.7) positionFactor += 0.10; // Low hours
  else if (hoursRatio < 1.0) positionFactor += 0.05;
  else if (hoursRatio > 1.5) positionFactor -= 0.10; // High hours
  else if (hoursRatio > 1.2) positionFactor -= 0.05;

  // Condition factor
  const conditionFactors: Record<string, number> = {
    sehr_gut: 0.15,
    gut: 0.05,
    ok: -0.10,
    reparaturbeduerftig: -0.25,
  };
  positionFactor += conditionFactors[data.condition] || 0;

  // Documentation bonus
  if (data.hasServiceBook) positionFactor += 0.03;
  if (data.hasUvv) positionFactor += 0.03;
  if (data.hasCe) positionFactor += 0.02;
  if (data.hasManual) positionFactor += 0.01;

  // Equipment bonus (max 5%)
  const equipmentBonus = Math.min((data.equipment?.length || 0) * 0.015, 0.05);
  positionFactor += equipmentBonus;

  // Damage penalty
  if (data.hasDamage) positionFactor -= 0.20;

  // Clamp factor between 0 and 1
  positionFactor = Math.max(0, Math.min(1, positionFactor));

  // Calculate market value (what we would sell for)
  const priceRange = usedPriceMaxEur - usedPriceMinEur;
  const marketValue = usedPriceMinEur + (priceRange * positionFactor);

  // Apply dealer margin (15%) - this is what we offer to buy
  const purchasePrice = marketValue * (1 - DEALER_MARGIN);

  // Create a realistic range around the calculated price (±8%)
  const low = Math.round((purchasePrice * 0.92) / 100) * 100;
  const high = Math.round((purchasePrice * 1.08) / 100) * 100;

  return {
    low,
    high,
    mid: Math.round(purchasePrice / 100) * 100,
    isMarketBased: true,
    matchedModel: matchedModelName,
  };
}

// Find best matching market data entry (from database)
function findBestMatch(
  marketData: MarketPriceData[],
  yearBuilt: number,
  operatingHours?: number
): MarketPriceData | null {
  if (marketData.length === 0) return null;
  
  const scored = marketData.map(entry => {
    let score = 0;
    const yearDiff = Math.abs(entry.reference_year - yearBuilt);
    score += Math.max(0, 10 - yearDiff);
    
    if (operatingHours && entry.hours_min && entry.hours_max) {
      const avgHours = (entry.hours_min + entry.hours_max) / 2;
      const hoursDiff = Math.abs(avgHours - operatingHours);
      score += Math.max(0, 5 - hoursDiff / 1000);
    }
    
    return { entry, score };
  });
  
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
  
  const ageDifference = actualAge - referenceAge;
  if (ageDifference > 0) {
    factor *= Math.pow(0.93, ageDifference);
  } else if (ageDifference < 0) {
    factor *= Math.pow(1.05, Math.abs(ageDifference));
  }
  
  const conditionFactors: Record<string, number> = {
    sehr_gut: 1.15,
    gut: 1.0,
    ok: 0.85,
    reparaturbeduerftig: 0.65,
  };
  factor *= conditionFactors[data.condition] || 1.0;
  
  if (data.hasServiceBook) factor += 0.03;
  if (data.hasUvv) factor += 0.03;
  if (data.hasCe) factor += 0.02;
  if (data.hasManual) factor += 0.01;
  
  const equipmentBonus = Math.min((data.equipment?.length || 0) * 0.02, 0.08);
  factor += equipmentBonus;
  
  if (data.hasDamage) factor *= 0.80;
  
  return factor;
}

// Main price calculation function
export async function calculateMarketBasedPrice(
  data: WizardFormData
): Promise<PriceRange | null> {
  if (!data.category || !data.yearBuilt || !data.condition) {
    return null;
  }

  // First try: Use static machine data (most accurate)
  if (data.manufacturerName && data.modelName) {
    const staticPrice = calculateStaticMachinePrice(data);
    if (staticPrice) {
      return staticPrice;
    }
  }

  // Second try: Use database market data
  if (data.manufacturerName) {
    const marketData = await fetchMarketPriceData(
      data.category,
      data.manufacturerName,
      data.modelName
    );
    
    if (marketData.length > 0) {
      const bestMatch = findBestMatch(marketData, data.yearBuilt, data.operatingHours);
      
      if (bestMatch) {
        const adjustmentFactor = calculateAdjustmentFactor(data, bestMatch.age_years);
        
        // Apply dealer margin to database prices too
        const adjustedLow = bestMatch.price_min_eur * adjustmentFactor * (1 - DEALER_MARGIN);
        const adjustedHigh = bestMatch.price_max_eur * adjustmentFactor * (1 - DEALER_MARGIN);
        const adjustedMid = bestMatch.price_mid_eur * adjustmentFactor * (1 - DEALER_MARGIN);
        
        return {
          low: Math.round(adjustedLow / 100) * 100,
          high: Math.round(adjustedHigh / 100) * 100,
          mid: Math.round(adjustedMid / 100) * 100,
          isMarketBased: true,
          matchedModel: `${bestMatch.manufacturer} ${bestMatch.model}`,
        };
      }
    }
  }
  
  // For custom models (manually entered), don't show estimated price
  // Users must submit to get a manual evaluation
  if (data.isCustomModel) {
    return null;
  }
  
  // Fallback to formula-based calculation
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
      minibagger_1_3t: 25000,
      minibagger_3_6t: 45000,
      kettenbagger_6_10t: 75000,
      kettenbagger_10_16t: 120000,
      kettenbagger_18_26t: 180000,
      kettenbagger_27_40t: 260000,
      mobilbagger_10_21t: 150000,
      // Legacy keys for backward compatibility
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

  // Get base value - try subcategory first, then weight/height class
  let baseValue = 50000;
  const categoryBaseValues = baseValues[data.category];
  
  if (categoryBaseValues) {
    if (data.subcategory && categoryBaseValues[data.subcategory]) {
      baseValue = categoryBaseValues[data.subcategory];
    } else {
      const sizeKey = data.category === 'bagger' ? data.weightClass : data.workingHeight;
      if (sizeKey && categoryBaseValues[sizeKey]) {
        baseValue = categoryBaseValues[sizeKey];
      }
    }
  }

  // Age factor
  const currentYear = new Date().getFullYear();
  const age = currentYear - (data.yearBuilt || currentYear);
  let ageFactor = 1.0;
  if (age <= 2) ageFactor = 0.95;
  else if (age <= 5) ageFactor = 0.85;
  else if (age <= 10) ageFactor = 0.70;
  else if (age <= 15) ageFactor = 0.55;
  else ageFactor = 0.40;

  // Hours factor
  const hours = data.operatingHours || 0;
  let hoursFactor = 1.0;
  if (hours <= 2000) hoursFactor = 1.0;
  else if (hours <= 4000) hoursFactor = 0.90;
  else if (hours <= 6000) hoursFactor = 0.80;
  else if (hours <= 10000) hoursFactor = 0.65;
  else hoursFactor = 0.50;

  // Condition factor
  const conditionFactors: Record<string, number> = {
    sehr_gut: 1.10,
    gut: 1.0,
    ok: 0.85,
    reparaturbeduerftig: 0.60,
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

  // Calculate market value
  const marketValue = baseValue * ageFactor * hoursFactor * conditionFactor * docBonus * (1 + equipmentBonus) * damagePenalty;

  // Apply dealer margin (15%)
  const purchasePrice = marketValue * (1 - DEALER_MARGIN);

  // Return range (±10%)
  return {
    low: Math.round(purchasePrice * 0.90 / 100) * 100,
    high: Math.round(purchasePrice * 1.10 / 100) * 100,
    isMarketBased: false,
  };
}

export function formatPrice(price: number): string {
  return price.toLocaleString('de-DE');
}

export function formatPriceRange(range: PriceRange): string {
  return `€ ${formatPrice(range.low)} – € ${formatPrice(range.high)}`;
}

// Arbeitsbühnen (Aerial Work Platform) data for the purchase wizard
// Last updated: 2026-01-20
// Data source: CE-certified European models
// Prices include 15% dealer margin calculation

export type ArbeitsbuehneDriveType = "diesel" | "electric" | "hybrid";

export interface ArbeitsbuehnModel {
  manufacturer: string;
  model: string;
  category: "scissor" | "articulated" | "telescopic" | "mast";
  driveType: ArbeitsbuehneDriveType;
  // Estimated working height from model number (m)
  workingHeightM: number;
  // Price data: new price and typical used price range for 3-5 year old machine with avg. hours
  newPriceEur: number;
  usedPriceMinEur: number; // Low end (older, more hours, ok condition)
  usedPriceMaxEur: number; // High end (newer, low hours, sehr gut condition)
}

export interface ArbeitsbuehnSubtype {
  name: string;
  value: string;
  categoryType: "scissor" | "articulated" | "telescopic" | "mast" | "trailer" | "truck";
  workingHeightRange: { min: number; max: number };
  models: ArbeitsbuehnModel[];
}

// Helper to extract working height from model name
function extractWorkingHeight(model: string, category: string): number {
  // Try to extract numbers that represent height
  const numbers = model.match(/\d+/g);
  if (!numbers) return 10;
  
  // For scissor lifts, first two digits often indicate platform height
  if (category === "scissor") {
    const firstNum = parseInt(numbers[0], 10);
    // Dingli format: JCPT0607 = 6m, JCPT1218 = 12m
    if (model.includes("JCPT")) {
      if (firstNum < 10) return firstNum + 2; // Add ~2m for working height
      return Math.floor(firstNum / 100) * 10 + 2;
    }
    // Genie GS-2669 = 26ft = ~8m platform, ~10m working height
    if (model.startsWith("GS-")) {
      const heightFeet = firstNum;
      return Math.round(heightFeet * 0.3048) + 2;
    }
    // Snorkel S2255RT = 22ft, S3010E = 30in deck (small)
    if (firstNum >= 20 && firstNum <= 90) {
      return Math.round(firstNum * 0.3048) + 2;
    }
    return 10;
  }
  
  // For articulated, HR12 = 12m working height
  if (category === "articulated") {
    const firstNum = parseInt(numbers[0], 10);
    if (firstNum >= 10 && firstNum <= 50) return firstNum;
    // Snorkel A46JRT = 46ft ≈ 14m
    if (model.startsWith("A") && firstNum >= 30) {
      return Math.round(firstNum * 0.3048);
    }
    return 15;
  }
  
  return 12;
}

// Calculate realistic prices based on working height and manufacturer tier
function calculatePrices(
  category: string,
  driveType: string,
  workingHeight: number,
  manufacturer: string
): { newPrice: number; usedMin: number; usedMax: number } {
  // Base price per meter of working height
  let basePerMeter = category === "scissor" ? 3500 : 5500;
  
  // Drive type multiplier
  if (driveType === "diesel") basePerMeter *= 1.15;
  if (driveType === "hybrid" || driveType === "hybrid/bi-energy") basePerMeter *= 1.25;
  
  // Manufacturer tier
  const premiumBrands = ["Genie", "JLG", "Haulotte"];
  const midBrands = ["Niftylift", "Skyjack", "Snorkel"];
  const valueBrands = ["Dingli", "LGMG", "Sinoboom"];
  
  let tierMultiplier = 1.0;
  if (premiumBrands.includes(manufacturer)) tierMultiplier = 1.2;
  else if (valueBrands.includes(manufacturer)) tierMultiplier = 0.7;
  
  const newPrice = Math.round(workingHeight * basePerMeter * tierMultiplier / 1000) * 1000;
  const usedMin = Math.round(newPrice * 0.25 / 1000) * 1000;
  const usedMax = Math.round(newPrice * 0.55 / 1000) * 1000;
  
  return { newPrice, usedMin, usedMax };
}

// Parse the Excel data and create structured data
// Categories: scissor, articulated
// Manufacturers: Dingli, Genie, Niftylift, Snorkel
// Drive types: diesel, electric, hybrid/bi-energy

export const arbeitsbuehneModels: ArbeitsbuehnModel[] = [
  // === DINGLI SCISSOR LIFTS ===
  // Diesel RT (Rough Terrain)
  { manufacturer: "Dingli", model: "JCPT1218RT", category: "scissor", driveType: "diesel", workingHeightM: 14, newPriceEur: 38000, usedPriceMinEur: 12000, usedPriceMaxEur: 24000 },
  { manufacturer: "Dingli", model: "JCPT1418RT", category: "scissor", driveType: "diesel", workingHeightM: 16, newPriceEur: 42000, usedPriceMinEur: 14000, usedPriceMaxEur: 27000 },
  { manufacturer: "Dingli", model: "JCPT1523RTB", category: "scissor", driveType: "diesel", workingHeightM: 17, newPriceEur: 48000, usedPriceMinEur: 16000, usedPriceMaxEur: 30000 },
  { manufacturer: "Dingli", model: "JCPT1823RTB", category: "scissor", driveType: "diesel", workingHeightM: 20, newPriceEur: 55000, usedPriceMinEur: 18000, usedPriceMaxEur: 35000 },
  { manufacturer: "Dingli", model: "JCPT2223RTB", category: "scissor", driveType: "diesel", workingHeightM: 24, newPriceEur: 68000, usedPriceMinEur: 22000, usedPriceMaxEur: 42000 },
  // Electric indoor/compact
  { manufacturer: "Dingli", model: "JCPT0607DCS", category: "scissor", driveType: "electric", workingHeightM: 8, newPriceEur: 18000, usedPriceMinEur: 6000, usedPriceMaxEur: 12000 },
  { manufacturer: "Dingli", model: "JCPT0608DCS", category: "scissor", driveType: "electric", workingHeightM: 8, newPriceEur: 19000, usedPriceMinEur: 6500, usedPriceMaxEur: 12500 },
  { manufacturer: "Dingli", model: "JCPT0708DCS", category: "scissor", driveType: "electric", workingHeightM: 9, newPriceEur: 20000, usedPriceMinEur: 7000, usedPriceMaxEur: 13000 },
  { manufacturer: "Dingli", model: "JCPT0807AC", category: "scissor", driveType: "electric", workingHeightM: 10, newPriceEur: 22000, usedPriceMinEur: 7500, usedPriceMaxEur: 14000 },
  { manufacturer: "Dingli", model: "JCPT0808AC", category: "scissor", driveType: "electric", workingHeightM: 10, newPriceEur: 23000, usedPriceMinEur: 8000, usedPriceMaxEur: 15000 },
  { manufacturer: "Dingli", model: "JCPT1008AC", category: "scissor", driveType: "electric", workingHeightM: 12, newPriceEur: 26000, usedPriceMinEur: 9000, usedPriceMaxEur: 17000 },
  { manufacturer: "Dingli", model: "JCPT1012AC", category: "scissor", driveType: "electric", workingHeightM: 12, newPriceEur: 28000, usedPriceMinEur: 9500, usedPriceMaxEur: 18000 },
  { manufacturer: "Dingli", model: "JCPT1212AC", category: "scissor", driveType: "electric", workingHeightM: 14, newPriceEur: 32000, usedPriceMinEur: 11000, usedPriceMaxEur: 21000 },
  { manufacturer: "Dingli", model: "JCPT1218DC", category: "scissor", driveType: "electric", workingHeightM: 14, newPriceEur: 34000, usedPriceMinEur: 12000, usedPriceMaxEur: 22000 },
  { manufacturer: "Dingli", model: "JCPT1412AC", category: "scissor", driveType: "electric", workingHeightM: 16, newPriceEur: 38000, usedPriceMinEur: 13000, usedPriceMaxEur: 24000 },
  { manufacturer: "Dingli", model: "JCPT1418DC", category: "scissor", driveType: "electric", workingHeightM: 16, newPriceEur: 40000, usedPriceMinEur: 14000, usedPriceMaxEur: 26000 },
  { manufacturer: "Dingli", model: "JCPT1523DCB", category: "scissor", driveType: "electric", workingHeightM: 17, newPriceEur: 44000, usedPriceMinEur: 15000, usedPriceMaxEur: 28000 },
  { manufacturer: "Dingli", model: "JCPT1612AC", category: "scissor", driveType: "electric", workingHeightM: 18, newPriceEur: 46000, usedPriceMinEur: 16000, usedPriceMaxEur: 30000 },
  { manufacturer: "Dingli", model: "JCPT1614AC", category: "scissor", driveType: "electric", workingHeightM: 18, newPriceEur: 48000, usedPriceMinEur: 17000, usedPriceMaxEur: 31000 },
  { manufacturer: "Dingli", model: "JCPT2223DC", category: "scissor", driveType: "electric", workingHeightM: 24, newPriceEur: 62000, usedPriceMinEur: 21000, usedPriceMaxEur: 40000 },
  { manufacturer: "Dingli", model: "JCPT2814DC", category: "scissor", driveType: "electric", workingHeightM: 30, newPriceEur: 85000, usedPriceMinEur: 28000, usedPriceMaxEur: 52000 },
  { manufacturer: "Dingli", model: "JCPT3214DC", category: "scissor", driveType: "electric", workingHeightM: 34, newPriceEur: 105000, usedPriceMinEur: 35000, usedPriceMaxEur: 65000 },
  
  // === GENIE SCISSOR LIFTS ===
  // Diesel RT (Rough Terrain)
  { manufacturer: "Genie", model: "GS-2669 RT", category: "scissor", driveType: "diesel", workingHeightM: 10, newPriceEur: 52000, usedPriceMinEur: 18000, usedPriceMaxEur: 35000 },
  { manufacturer: "Genie", model: "GS-3369 RT", category: "scissor", driveType: "diesel", workingHeightM: 12, newPriceEur: 62000, usedPriceMinEur: 22000, usedPriceMaxEur: 42000 },
  { manufacturer: "Genie", model: "GS-3384 RT", category: "scissor", driveType: "diesel", workingHeightM: 12, newPriceEur: 68000, usedPriceMinEur: 24000, usedPriceMaxEur: 45000 },
  { manufacturer: "Genie", model: "GS-3390 RT", category: "scissor", driveType: "diesel", workingHeightM: 12, newPriceEur: 72000, usedPriceMinEur: 26000, usedPriceMaxEur: 48000 },
  { manufacturer: "Genie", model: "GS-4069 RT", category: "scissor", driveType: "diesel", workingHeightM: 14, newPriceEur: 78000, usedPriceMinEur: 28000, usedPriceMaxEur: 52000 },
  { manufacturer: "Genie", model: "GS-4390 RT", category: "scissor", driveType: "diesel", workingHeightM: 15, newPriceEur: 88000, usedPriceMinEur: 32000, usedPriceMaxEur: 58000 },
  { manufacturer: "Genie", model: "GS-5390 RT", category: "scissor", driveType: "diesel", workingHeightM: 18, newPriceEur: 105000, usedPriceMinEur: 38000, usedPriceMaxEur: 70000 },
  // Electric DC
  { manufacturer: "Genie", model: "GS-2669 DC", category: "scissor", driveType: "electric", workingHeightM: 10, newPriceEur: 45000, usedPriceMinEur: 16000, usedPriceMaxEur: 30000 },
  { manufacturer: "Genie", model: "GS-3369 DC", category: "scissor", driveType: "electric", workingHeightM: 12, newPriceEur: 55000, usedPriceMinEur: 19000, usedPriceMaxEur: 36000 },
  { manufacturer: "Genie", model: "GS-4069 DC", category: "scissor", driveType: "electric", workingHeightM: 14, newPriceEur: 68000, usedPriceMinEur: 24000, usedPriceMaxEur: 45000 },
  // Hybrid / Bi-Energy
  { manufacturer: "Genie", model: "GS-2669 BE", category: "scissor", driveType: "hybrid", workingHeightM: 10, newPriceEur: 58000, usedPriceMinEur: 20000, usedPriceMaxEur: 38000 },
  { manufacturer: "Genie", model: "GS-3369 BE", category: "scissor", driveType: "hybrid", workingHeightM: 12, newPriceEur: 70000, usedPriceMinEur: 25000, usedPriceMaxEur: 46000 },
  { manufacturer: "Genie", model: "GS-4069 BE", category: "scissor", driveType: "hybrid", workingHeightM: 14, newPriceEur: 85000, usedPriceMinEur: 30000, usedPriceMaxEur: 55000 },
  
  // === NIFTYLIFT ARTICULATED BOOMS ===
  // Diesel 4x4
  { manufacturer: "Niftylift", model: "HR12 4x4", category: "articulated", driveType: "diesel", workingHeightM: 12, newPriceEur: 68000, usedPriceMinEur: 22000, usedPriceMaxEur: 42000 },
  { manufacturer: "Niftylift", model: "HR15 4x4", category: "articulated", driveType: "diesel", workingHeightM: 15, newPriceEur: 85000, usedPriceMinEur: 28000, usedPriceMaxEur: 52000 },
  { manufacturer: "Niftylift", model: "HR17 4x4", category: "articulated", driveType: "diesel", workingHeightM: 17, newPriceEur: 98000, usedPriceMinEur: 33000, usedPriceMaxEur: 62000 },
  { manufacturer: "Niftylift", model: "HR21 4x4", category: "articulated", driveType: "diesel", workingHeightM: 21, newPriceEur: 125000, usedPriceMinEur: 42000, usedPriceMaxEur: 78000 },
  // Electric
  { manufacturer: "Niftylift", model: "HR12LE", category: "articulated", driveType: "electric", workingHeightM: 12, newPriceEur: 58000, usedPriceMinEur: 19000, usedPriceMaxEur: 36000 },
  { manufacturer: "Niftylift", model: "HR12NE", category: "articulated", driveType: "electric", workingHeightM: 12, newPriceEur: 62000, usedPriceMinEur: 21000, usedPriceMaxEur: 40000 },
  { manufacturer: "Niftylift", model: "HR15E", category: "articulated", driveType: "electric", workingHeightM: 15, newPriceEur: 72000, usedPriceMinEur: 24000, usedPriceMaxEur: 46000 },
  { manufacturer: "Niftylift", model: "HR15N", category: "articulated", driveType: "electric", workingHeightM: 15, newPriceEur: 75000, usedPriceMinEur: 25000, usedPriceMaxEur: 48000 },
  { manufacturer: "Niftylift", model: "HR17E", category: "articulated", driveType: "electric", workingHeightM: 17, newPriceEur: 85000, usedPriceMinEur: 28000, usedPriceMaxEur: 52000 },
  { manufacturer: "Niftylift", model: "HR17N", category: "articulated", driveType: "electric", workingHeightM: 17, newPriceEur: 88000, usedPriceMinEur: 29000, usedPriceMaxEur: 55000 },
  { manufacturer: "Niftylift", model: "HR21E", category: "articulated", driveType: "electric", workingHeightM: 21, newPriceEur: 110000, usedPriceMinEur: 36000, usedPriceMaxEur: 68000 },
  { manufacturer: "Niftylift", model: "HR22SE", category: "articulated", driveType: "electric", workingHeightM: 22, newPriceEur: 118000, usedPriceMinEur: 39000, usedPriceMaxEur: 72000 },
  { manufacturer: "Niftylift", model: "HR28 4x4", category: "articulated", driveType: "electric", workingHeightM: 28, newPriceEur: 165000, usedPriceMinEur: 55000, usedPriceMaxEur: 105000 },
  // Hybrid
  { manufacturer: "Niftylift", model: "HR12 Hybrid", category: "articulated", driveType: "hybrid", workingHeightM: 12, newPriceEur: 72000, usedPriceMinEur: 24000, usedPriceMaxEur: 46000 },
  { manufacturer: "Niftylift", model: "HR15 Hybrid", category: "articulated", driveType: "hybrid", workingHeightM: 15, newPriceEur: 92000, usedPriceMinEur: 31000, usedPriceMaxEur: 58000 },
  { manufacturer: "Niftylift", model: "HR15N Hybrid", category: "articulated", driveType: "hybrid", workingHeightM: 15, newPriceEur: 95000, usedPriceMinEur: 32000, usedPriceMaxEur: 60000 },
  { manufacturer: "Niftylift", model: "HR17 Hybrid", category: "articulated", driveType: "hybrid", workingHeightM: 17, newPriceEur: 108000, usedPriceMinEur: 36000, usedPriceMaxEur: 68000 },
  { manufacturer: "Niftylift", model: "HR17N Hybrid", category: "articulated", driveType: "hybrid", workingHeightM: 17, newPriceEur: 112000, usedPriceMinEur: 38000, usedPriceMaxEur: 70000 },
  { manufacturer: "Niftylift", model: "HR21 Hybrid", category: "articulated", driveType: "hybrid", workingHeightM: 21, newPriceEur: 138000, usedPriceMinEur: 46000, usedPriceMaxEur: 88000 },
  { manufacturer: "Niftylift", model: "HR28 Hybrid", category: "articulated", driveType: "hybrid", workingHeightM: 28, newPriceEur: 185000, usedPriceMinEur: 62000, usedPriceMaxEur: 118000 },
  
  // === SNORKEL ARTICULATED BOOMS ===
  { manufacturer: "Snorkel", model: "A46JRT", category: "articulated", driveType: "diesel", workingHeightM: 16, newPriceEur: 95000, usedPriceMinEur: 32000, usedPriceMaxEur: 60000 },
  { manufacturer: "Snorkel", model: "A62JRT", category: "articulated", driveType: "diesel", workingHeightM: 21, newPriceEur: 135000, usedPriceMinEur: 45000, usedPriceMaxEur: 85000 },
  { manufacturer: "Snorkel", model: "A38E", category: "articulated", driveType: "electric", workingHeightM: 14, newPriceEur: 75000, usedPriceMinEur: 25000, usedPriceMaxEur: 48000 },
  { manufacturer: "Snorkel", model: "A46JE", category: "articulated", driveType: "electric", workingHeightM: 16, newPriceEur: 88000, usedPriceMinEur: 29000, usedPriceMaxEur: 55000 },
  
  // === SNORKEL SCISSOR LIFTS ===
  // Diesel RT
  { manufacturer: "Snorkel", model: "S2255RT", category: "scissor", driveType: "diesel", workingHeightM: 8.5, newPriceEur: 38000, usedPriceMinEur: 13000, usedPriceMaxEur: 25000 },
  { manufacturer: "Snorkel", model: "S2755RT", category: "scissor", driveType: "diesel", workingHeightM: 10, newPriceEur: 45000, usedPriceMinEur: 15000, usedPriceMaxEur: 29000 },
  { manufacturer: "Snorkel", model: "S2770RT", category: "scissor", driveType: "diesel", workingHeightM: 10, newPriceEur: 48000, usedPriceMinEur: 16000, usedPriceMaxEur: 31000 },
  { manufacturer: "Snorkel", model: "S3370RT", category: "scissor", driveType: "diesel", workingHeightM: 12, newPriceEur: 55000, usedPriceMinEur: 19000, usedPriceMaxEur: 36000 },
  { manufacturer: "Snorkel", model: "S3970RT", category: "scissor", driveType: "diesel", workingHeightM: 14, newPriceEur: 65000, usedPriceMinEur: 22000, usedPriceMaxEur: 42000 },
  { manufacturer: "Snorkel", model: "S9031RT", category: "scissor", driveType: "diesel", workingHeightM: 11, newPriceEur: 52000, usedPriceMinEur: 18000, usedPriceMaxEur: 34000 },
  { manufacturer: "Snorkel", model: "S9033RT", category: "scissor", driveType: "diesel", workingHeightM: 12, newPriceEur: 58000, usedPriceMinEur: 20000, usedPriceMaxEur: 38000 },
  { manufacturer: "Snorkel", model: "S9043RT", category: "scissor", driveType: "diesel", workingHeightM: 15, newPriceEur: 72000, usedPriceMinEur: 25000, usedPriceMaxEur: 46000 },
  { manufacturer: "Snorkel", model: "S9053RT", category: "scissor", driveType: "diesel", workingHeightM: 18, newPriceEur: 88000, usedPriceMinEur: 30000, usedPriceMaxEur: 55000 },
  { manufacturer: "Snorkel", model: "S9056RT", category: "scissor", driveType: "diesel", workingHeightM: 19, newPriceEur: 95000, usedPriceMinEur: 32000, usedPriceMaxEur: 60000 },
  { manufacturer: "Snorkel", model: "S9070RT", category: "scissor", driveType: "diesel", workingHeightM: 23, newPriceEur: 118000, usedPriceMinEur: 40000, usedPriceMaxEur: 75000 },
  // Electric
  { manufacturer: "Snorkel", model: "S3010E", category: "scissor", driveType: "electric", workingHeightM: 5, newPriceEur: 12000, usedPriceMinEur: 4000, usedPriceMaxEur: 8000 },
  { manufacturer: "Snorkel", model: "S3019E", category: "scissor", driveType: "electric", workingHeightM: 7.5, newPriceEur: 16000, usedPriceMinEur: 5500, usedPriceMaxEur: 10500 },
  { manufacturer: "Snorkel", model: "S3215E", category: "scissor", driveType: "electric", workingHeightM: 6.5, newPriceEur: 18000, usedPriceMinEur: 6000, usedPriceMaxEur: 11500 },
  { manufacturer: "Snorkel", model: "S3219E", category: "scissor", driveType: "electric", workingHeightM: 7.5, newPriceEur: 20000, usedPriceMinEur: 7000, usedPriceMaxEur: 13000 },
  { manufacturer: "Snorkel", model: "S3220E", category: "scissor", driveType: "electric", workingHeightM: 8, newPriceEur: 22000, usedPriceMinEur: 7500, usedPriceMaxEur: 14000 },
  { manufacturer: "Snorkel", model: "S3226E", category: "scissor", driveType: "electric", workingHeightM: 10, newPriceEur: 28000, usedPriceMinEur: 9500, usedPriceMaxEur: 18000 },
  { manufacturer: "Snorkel", model: "S4726E", category: "scissor", driveType: "electric", workingHeightM: 10, newPriceEur: 32000, usedPriceMinEur: 11000, usedPriceMaxEur: 21000 },
  { manufacturer: "Snorkel", model: "S4732E", category: "scissor", driveType: "electric", workingHeightM: 12, newPriceEur: 38000, usedPriceMinEur: 13000, usedPriceMaxEur: 25000 },
  { manufacturer: "Snorkel", model: "S4740E", category: "scissor", driveType: "electric", workingHeightM: 14, newPriceEur: 45000, usedPriceMinEur: 15000, usedPriceMaxEur: 29000 },
];

// Group models by subtype based on category and working height
export const arbeitsbuehneSubtypes: ArbeitsbuehnSubtype[] = [
  {
    name: "Scherenarbeitsbühne bis 10m",
    value: "schere_bis_10m",
    categoryType: "scissor",
    workingHeightRange: { min: 0, max: 10 },
    models: arbeitsbuehneModels.filter(m => m.category === "scissor" && m.workingHeightM <= 10)
  },
  {
    name: "Scherenarbeitsbühne 10–15m",
    value: "schere_10_15m",
    categoryType: "scissor",
    workingHeightRange: { min: 10, max: 15 },
    models: arbeitsbuehneModels.filter(m => m.category === "scissor" && m.workingHeightM > 10 && m.workingHeightM <= 15)
  },
  {
    name: "Scherenarbeitsbühne 15–20m",
    value: "schere_15_20m",
    categoryType: "scissor",
    workingHeightRange: { min: 15, max: 20 },
    models: arbeitsbuehneModels.filter(m => m.category === "scissor" && m.workingHeightM > 15 && m.workingHeightM <= 20)
  },
  {
    name: "Scherenarbeitsbühne über 20m",
    value: "schere_ueber_20m",
    categoryType: "scissor",
    workingHeightRange: { min: 20, max: 50 },
    models: arbeitsbuehneModels.filter(m => m.category === "scissor" && m.workingHeightM > 20)
  },
  {
    name: "Gelenkteleskopbühne bis 15m",
    value: "gelenk_bis_15m",
    categoryType: "articulated",
    workingHeightRange: { min: 0, max: 15 },
    models: arbeitsbuehneModels.filter(m => m.category === "articulated" && m.workingHeightM <= 15)
  },
  {
    name: "Gelenkteleskopbühne 15–20m",
    value: "gelenk_15_20m",
    categoryType: "articulated",
    workingHeightRange: { min: 15, max: 20 },
    models: arbeitsbuehneModels.filter(m => m.category === "articulated" && m.workingHeightM > 15 && m.workingHeightM <= 20)
  },
  {
    name: "Gelenkteleskopbühne über 20m",
    value: "gelenk_ueber_20m",
    categoryType: "articulated",
    workingHeightRange: { min: 20, max: 50 },
    models: arbeitsbuehneModels.filter(m => m.category === "articulated" && m.workingHeightM > 20)
  },
];

// Get all unique manufacturers for arbeitsbuehne
export function getArbeitsbuehneManufacturers(subcategory?: string, driveType?: ArbeitsbuehneDriveType): string[] {
  let models = arbeitsbuehneModels;
  
  if (subcategory) {
    const subtype = arbeitsbuehneSubtypes.find(s => s.value === subcategory);
    if (subtype) {
      models = subtype.models;
    }
  }
  
  if (driveType) {
    models = models.filter(m => m.driveType === driveType);
  }
  
  const manufacturers = [...new Set(models.map(m => m.manufacturer))];
  return manufacturers.sort();
}

// Get models for a manufacturer with optional filters
export function getArbeitsbuehneModelsForManufacturer(
  manufacturer: string,
  subcategory?: string,
  driveType?: ArbeitsbuehneDriveType
): ArbeitsbuehnModel[] {
  let models = arbeitsbuehneModels.filter(m => m.manufacturer === manufacturer);
  
  if (subcategory) {
    const subtype = arbeitsbuehneSubtypes.find(s => s.value === subcategory);
    if (subtype) {
      models = models.filter(m => 
        m.category === subtype.categoryType &&
        m.workingHeightM > subtype.workingHeightRange.min &&
        m.workingHeightM <= subtype.workingHeightRange.max
      );
    }
  }
  
  if (driveType) {
    models = models.filter(m => m.driveType === driveType);
  }
  
  return models.sort((a, b) => a.workingHeightM - b.workingHeightM);
}

// Find a specific arbeitsbuehne model
export function findArbeitsbuehneModel(
  manufacturer: string,
  modelName: string
): ArbeitsbuehnModel | null {
  return arbeitsbuehneModels.find(
    m => m.manufacturer === manufacturer && m.model === modelName
  ) || null;
}

// Get available drive types for filtering
export function getAvailableDriveTypes(subcategory?: string, manufacturer?: string): ArbeitsbuehneDriveType[] {
  let models = arbeitsbuehneModels;
  
  if (subcategory) {
    const subtype = arbeitsbuehneSubtypes.find(s => s.value === subcategory);
    if (subtype) {
      models = models.filter(m => 
        m.category === subtype.categoryType &&
        m.workingHeightM > subtype.workingHeightRange.min &&
        m.workingHeightM <= subtype.workingHeightRange.max
      );
    }
  }
  
  if (manufacturer) {
    models = models.filter(m => m.manufacturer === manufacturer);
  }
  
  const driveTypes = [...new Set(models.map(m => m.driveType))] as ArbeitsbuehneDriveType[];
  return driveTypes.sort();
}

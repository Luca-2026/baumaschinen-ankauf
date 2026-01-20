// Machine data for the purchase wizard
// Last updated: 2026-01-20
// Prices are market reference values (Neupreis = new price, Gebrauchtpreis = used price range)

import { 
  arbeitsbuehneSubtypes, 
  getArbeitsbuehneManufacturers, 
  getArbeitsbuehneModelsForManufacturer,
  findArbeitsbuehneModel,
  ArbeitsbuehnModel,
  ArbeitsbuehneDriveType
} from "./arbeitsbuehneData";

export type { ArbeitsbuehnModel, ArbeitsbuehneDriveType };
export { 
  arbeitsbuehneSubtypes, 
  getArbeitsbuehneManufacturers, 
  getArbeitsbuehneModelsForManufacturer,
  findArbeitsbuehneModel 
};

export interface MachineModel {
  manufacturer: string;
  model: string;
  tonnage_t: number;
  type: "Kette" | "Mobil";
  // Price data: new price and typical used price range for 3-5 year old machine with avg. hours
  newPriceEur: number;
  usedPriceMinEur: number; // Low end (older, more hours, ok condition)
  usedPriceMaxEur: number; // High end (newer, low hours, sehr gut condition)
}

export interface MachineSubtype {
  name: string;
  value: string;
  undercarriage: "Kette" | "Mobil";
  tonnage_class_t: { min: number; max: number };
  models: MachineModel[];
}

export interface MachineCategory {
  name: string;
  value: "bagger" | "arbeitsbuehne";
  subtypes: MachineSubtype[];
}

// Dealer margin (15% - this is subtracted from the purchase price we offer)
export const DEALER_MARGIN = 0.15;

// Bagger data with realistic market prices (2024-2025)
export const baggerSubtypes: MachineSubtype[] = [
  {
    name: "Minibagger 1–3 t",
    value: "minibagger_1_3t",
    undercarriage: "Kette",
    tonnage_class_t: { min: 1.0, max: 3.0 },
    models: [
      // Caterpillar - Premium brand, higher prices
      { manufacturer: "Caterpillar", model: "301.7 CR", tonnage_t: 1.7, type: "Kette", newPriceEur: 42000, usedPriceMinEur: 15000, usedPriceMaxEur: 28000 },
      { manufacturer: "Caterpillar", model: "301.8", tonnage_t: 1.8, type: "Kette", newPriceEur: 45000, usedPriceMinEur: 16000, usedPriceMaxEur: 30000 },
      { manufacturer: "Caterpillar", model: "302 CR", tonnage_t: 2.0, type: "Kette", newPriceEur: 48000, usedPriceMinEur: 18000, usedPriceMaxEur: 32000 },
      { manufacturer: "Caterpillar", model: "302.7 CR", tonnage_t: 2.7, type: "Kette", newPriceEur: 55000, usedPriceMinEur: 22000, usedPriceMaxEur: 38000 },
      // Kubota - Popular, good resale value
      { manufacturer: "Kubota", model: "KX016-4", tonnage_t: 1.6, type: "Kette", newPriceEur: 38000, usedPriceMinEur: 14000, usedPriceMaxEur: 26000 },
      { manufacturer: "Kubota", model: "U17-3a", tonnage_t: 1.7, type: "Kette", newPriceEur: 40000, usedPriceMinEur: 15000, usedPriceMaxEur: 28000 },
      { manufacturer: "Kubota", model: "U27-4", tonnage_t: 2.7, type: "Kette", newPriceEur: 52000, usedPriceMinEur: 20000, usedPriceMaxEur: 36000 },
      { manufacturer: "Kubota", model: "KX027-4", tonnage_t: 2.7, type: "Kette", newPriceEur: 50000, usedPriceMinEur: 19000, usedPriceMaxEur: 35000 },
      // Takeuchi - Quality Japanese brand
      { manufacturer: "Takeuchi", model: "TB216", tonnage_t: 1.9, type: "Kette", newPriceEur: 43000, usedPriceMinEur: 17000, usedPriceMaxEur: 29000 },
      { manufacturer: "Takeuchi", model: "TB225", tonnage_t: 2.5, type: "Kette", newPriceEur: 50000, usedPriceMinEur: 21000, usedPriceMaxEur: 36000 },
      { manufacturer: "Takeuchi", model: "TB230", tonnage_t: 3.0, type: "Kette", newPriceEur: 55000, usedPriceMinEur: 24000, usedPriceMaxEur: 40000 },
      // Bobcat
      { manufacturer: "Bobcat", model: "E19", tonnage_t: 1.9, type: "Kette", newPriceEur: 40000, usedPriceMinEur: 15000, usedPriceMaxEur: 27000 },
      { manufacturer: "Bobcat", model: "E20", tonnage_t: 2.0, type: "Kette", newPriceEur: 42000, usedPriceMinEur: 16000, usedPriceMaxEur: 28000 },
      { manufacturer: "Bobcat", model: "E26", tonnage_t: 2.6, type: "Kette", newPriceEur: 48000, usedPriceMinEur: 18000, usedPriceMaxEur: 33000 },
      // JCB
      { manufacturer: "JCB", model: "16C-1", tonnage_t: 1.6, type: "Kette", newPriceEur: 36000, usedPriceMinEur: 12000, usedPriceMaxEur: 24000 },
      { manufacturer: "JCB", model: "19C-1", tonnage_t: 1.9, type: "Kette", newPriceEur: 40000, usedPriceMinEur: 14000, usedPriceMaxEur: 27000 },
      { manufacturer: "JCB", model: "26C-1", tonnage_t: 2.6, type: "Kette", newPriceEur: 46000, usedPriceMinEur: 17000, usedPriceMaxEur: 32000 },
      // Wacker Neuson
      { manufacturer: "Wacker Neuson", model: "ET18", tonnage_t: 1.8, type: "Kette", newPriceEur: 39000, usedPriceMinEur: 14000, usedPriceMaxEur: 26000 },
      { manufacturer: "Wacker Neuson", model: "EZ17", tonnage_t: 1.7, type: "Kette", newPriceEur: 37000, usedPriceMinEur: 13000, usedPriceMaxEur: 25000 },
      { manufacturer: "Wacker Neuson", model: "ET24", tonnage_t: 2.4, type: "Kette", newPriceEur: 44000, usedPriceMinEur: 16000, usedPriceMaxEur: 30000 },
      // Yanmar
      { manufacturer: "Yanmar", model: "ViO17", tonnage_t: 1.7, type: "Kette", newPriceEur: 38000, usedPriceMinEur: 14000, usedPriceMaxEur: 26000 },
      { manufacturer: "Yanmar", model: "ViO26", tonnage_t: 2.6, type: "Kette", newPriceEur: 47000, usedPriceMinEur: 18000, usedPriceMaxEur: 33000 },
      { manufacturer: "Yanmar", model: "SV26", tonnage_t: 2.6, type: "Kette", newPriceEur: 46000, usedPriceMinEur: 17000, usedPriceMaxEur: 32000 },
      // Hitachi
      { manufacturer: "Hitachi", model: "ZX17U", tonnage_t: 1.7, type: "Kette", newPriceEur: 40000, usedPriceMinEur: 15000, usedPriceMaxEur: 28000 },
      { manufacturer: "Hitachi", model: "ZX26U", tonnage_t: 2.6, type: "Kette", newPriceEur: 50000, usedPriceMinEur: 19000, usedPriceMaxEur: 35000 },
      { manufacturer: "Hitachi", model: "ZX30U", tonnage_t: 3.0, type: "Kette", newPriceEur: 54000, usedPriceMinEur: 22000, usedPriceMaxEur: 38000 },
      // Komatsu
      { manufacturer: "Komatsu", model: "PC16R", tonnage_t: 1.6, type: "Kette", newPriceEur: 39000, usedPriceMinEur: 14000, usedPriceMaxEur: 27000 },
      { manufacturer: "Komatsu", model: "PC26MR", tonnage_t: 2.6, type: "Kette", newPriceEur: 52000, usedPriceMinEur: 20000, usedPriceMaxEur: 36000 },
      // Volvo
      { manufacturer: "Volvo", model: "EC18E", tonnage_t: 1.8, type: "Kette", newPriceEur: 42000, usedPriceMinEur: 16000, usedPriceMaxEur: 29000 },
      { manufacturer: "Volvo", model: "ECR25D", tonnage_t: 2.5, type: "Kette", newPriceEur: 50000, usedPriceMinEur: 20000, usedPriceMaxEur: 35000 },
      // Chinese brands - Lower prices
      { manufacturer: "SANY", model: "SY18C", tonnage_t: 1.8, type: "Kette", newPriceEur: 28000, usedPriceMinEur: 10000, usedPriceMaxEur: 18000 },
      { manufacturer: "SANY", model: "SY26U", tonnage_t: 2.7, type: "Kette", newPriceEur: 35000, usedPriceMinEur: 12000, usedPriceMaxEur: 22000 },
      { manufacturer: "XCMG", model: "XE18U", tonnage_t: 1.8, type: "Kette", newPriceEur: 26000, usedPriceMinEur: 9000, usedPriceMaxEur: 17000 },
      { manufacturer: "XCMG", model: "XE27U", tonnage_t: 2.7, type: "Kette", newPriceEur: 32000, usedPriceMinEur: 11000, usedPriceMaxEur: 20000 },
      { manufacturer: "Zoomlion", model: "ZE18G", tonnage_t: 1.8, type: "Kette", newPriceEur: 27000, usedPriceMinEur: 9000, usedPriceMaxEur: 17000 },
      { manufacturer: "Zoomlion", model: "ZE26G", tonnage_t: 2.6, type: "Kette", newPriceEur: 33000, usedPriceMinEur: 11000, usedPriceMaxEur: 21000 }
    ]
  },
  {
    name: "Minibagger 3–6 t",
    value: "minibagger_3_6t",
    undercarriage: "Kette",
    tonnage_class_t: { min: 3.0, max: 6.0 },
    models: [
      // Caterpillar
      { manufacturer: "Caterpillar", model: "303.5E CR / 303.5", tonnage_t: 3.5, type: "Kette", newPriceEur: 62000, usedPriceMinEur: 25000, usedPriceMaxEur: 45000 },
      { manufacturer: "Caterpillar", model: "304 CR", tonnage_t: 4.0, type: "Kette", newPriceEur: 70000, usedPriceMinEur: 28000, usedPriceMaxEur: 50000 },
      { manufacturer: "Caterpillar", model: "305 CR", tonnage_t: 5.0, type: "Kette", newPriceEur: 78000, usedPriceMinEur: 32000, usedPriceMaxEur: 56000 },
      // Kubota
      { manufacturer: "Kubota", model: "KX037-4", tonnage_t: 3.7, type: "Kette", newPriceEur: 58000, usedPriceMinEur: 23000, usedPriceMaxEur: 42000 },
      { manufacturer: "Kubota", model: "U48-4", tonnage_t: 4.8, type: "Kette", newPriceEur: 68000, usedPriceMinEur: 28000, usedPriceMaxEur: 50000 },
      { manufacturer: "Kubota", model: "KX057-4", tonnage_t: 5.7, type: "Kette", newPriceEur: 75000, usedPriceMinEur: 30000, usedPriceMaxEur: 54000 },
      // Takeuchi
      { manufacturer: "Takeuchi", model: "TB235-2", tonnage_t: 3.5, type: "Kette", newPriceEur: 60000, usedPriceMinEur: 24000, usedPriceMaxEur: 44000 },
      { manufacturer: "Takeuchi", model: "TB250-2", tonnage_t: 5.0, type: "Kette", newPriceEur: 72000, usedPriceMinEur: 30000, usedPriceMaxEur: 52000 },
      { manufacturer: "Takeuchi", model: "TB260", tonnage_t: 6.0, type: "Kette", newPriceEur: 82000, usedPriceMinEur: 35000, usedPriceMaxEur: 60000 },
      // Bobcat
      { manufacturer: "Bobcat", model: "E35", tonnage_t: 3.5, type: "Kette", newPriceEur: 55000, usedPriceMinEur: 22000, usedPriceMaxEur: 40000 },
      { manufacturer: "Bobcat", model: "E50", tonnage_t: 5.0, type: "Kette", newPriceEur: 68000, usedPriceMinEur: 28000, usedPriceMaxEur: 48000 },
      { manufacturer: "Bobcat", model: "E57", tonnage_t: 5.7, type: "Kette", newPriceEur: 74000, usedPriceMinEur: 30000, usedPriceMaxEur: 52000 },
      // Wacker Neuson
      { manufacturer: "Wacker Neuson", model: "ET35", tonnage_t: 3.5, type: "Kette", newPriceEur: 54000, usedPriceMinEur: 21000, usedPriceMaxEur: 38000 },
      { manufacturer: "Wacker Neuson", model: "ET42", tonnage_t: 4.2, type: "Kette", newPriceEur: 60000, usedPriceMinEur: 24000, usedPriceMaxEur: 42000 },
      { manufacturer: "Wacker Neuson", model: "ET58", tonnage_t: 5.8, type: "Kette", newPriceEur: 72000, usedPriceMinEur: 29000, usedPriceMaxEur: 50000 },
      // Yanmar
      { manufacturer: "Yanmar", model: "ViO38", tonnage_t: 3.8, type: "Kette", newPriceEur: 56000, usedPriceMinEur: 22000, usedPriceMaxEur: 40000 },
      { manufacturer: "Yanmar", model: "ViO50", tonnage_t: 5.0, type: "Kette", newPriceEur: 66000, usedPriceMinEur: 27000, usedPriceMaxEur: 48000 },
      { manufacturer: "Yanmar", model: "SV60", tonnage_t: 6.0, type: "Kette", newPriceEur: 76000, usedPriceMinEur: 31000, usedPriceMaxEur: 55000 }
    ]
  },
  {
    name: "Kettenbagger 6–10 t (Midi)",
    value: "kettenbagger_6_10t",
    undercarriage: "Kette",
    tonnage_class_t: { min: 6.0, max: 10.0 },
    models: [
      { manufacturer: "Caterpillar", model: "306 / 307", tonnage_t: 7.0, type: "Kette", newPriceEur: 95000, usedPriceMinEur: 40000, usedPriceMaxEur: 70000 },
      { manufacturer: "Komatsu", model: "PC78", tonnage_t: 8.0, type: "Kette", newPriceEur: 100000, usedPriceMinEur: 42000, usedPriceMaxEur: 72000 },
      { manufacturer: "Hitachi", model: "ZX85", tonnage_t: 8.5, type: "Kette", newPriceEur: 105000, usedPriceMinEur: 44000, usedPriceMaxEur: 75000 },
      { manufacturer: "Volvo", model: "EC88", tonnage_t: 8.8, type: "Kette", newPriceEur: 108000, usedPriceMinEur: 45000, usedPriceMaxEur: 78000 },
      { manufacturer: "JCB", model: "86C-2", tonnage_t: 8.6, type: "Kette", newPriceEur: 98000, usedPriceMinEur: 40000, usedPriceMaxEur: 70000 },
      { manufacturer: "Takeuchi", model: "TB290", tonnage_t: 9.0, type: "Kette", newPriceEur: 110000, usedPriceMinEur: 48000, usedPriceMaxEur: 80000 }
    ]
  },
  {
    name: "Kettenbagger 10–16 t",
    value: "kettenbagger_10_16t",
    undercarriage: "Kette",
    tonnage_class_t: { min: 10.0, max: 16.0 },
    models: [
      { manufacturer: "Caterpillar", model: "313 / 315", tonnage_t: 14.0, type: "Kette", newPriceEur: 160000, usedPriceMinEur: 65000, usedPriceMaxEur: 115000 },
      { manufacturer: "Komatsu", model: "PC138", tonnage_t: 14.0, type: "Kette", newPriceEur: 155000, usedPriceMinEur: 62000, usedPriceMaxEur: 110000 },
      { manufacturer: "Hitachi", model: "ZX135 / ZX145", tonnage_t: 14.0, type: "Kette", newPriceEur: 158000, usedPriceMinEur: 64000, usedPriceMaxEur: 112000 },
      { manufacturer: "Volvo", model: "EC140", tonnage_t: 14.0, type: "Kette", newPriceEur: 162000, usedPriceMinEur: 66000, usedPriceMaxEur: 118000 },
      { manufacturer: "Liebherr", model: "R914 / R916", tonnage_t: 15.0, type: "Kette", newPriceEur: 175000, usedPriceMinEur: 72000, usedPriceMaxEur: 130000 },
      { manufacturer: "Develon", model: "DX140", tonnage_t: 14.0, type: "Kette", newPriceEur: 145000, usedPriceMinEur: 55000, usedPriceMaxEur: 100000 }
    ]
  },
  {
    name: "Kettenbagger 18–26 t (Mainstream)",
    value: "kettenbagger_18_26t",
    undercarriage: "Kette",
    tonnage_class_t: { min: 18.0, max: 26.0 },
    models: [
      { manufacturer: "Caterpillar", model: "320 / 323", tonnage_t: 22.0, type: "Kette", newPriceEur: 220000, usedPriceMinEur: 85000, usedPriceMaxEur: 160000 },
      { manufacturer: "Komatsu", model: "PC210 / PC220", tonnage_t: 22.0, type: "Kette", newPriceEur: 210000, usedPriceMinEur: 80000, usedPriceMaxEur: 150000 },
      { manufacturer: "Hitachi", model: "ZX210", tonnage_t: 21.0, type: "Kette", newPriceEur: 215000, usedPriceMinEur: 82000, usedPriceMaxEur: 155000 },
      { manufacturer: "Volvo", model: "EC220", tonnage_t: 22.0, type: "Kette", newPriceEur: 225000, usedPriceMinEur: 88000, usedPriceMaxEur: 165000 },
      { manufacturer: "Liebherr", model: "R920 / R922 / R924", tonnage_t: 23.0, type: "Kette", newPriceEur: 240000, usedPriceMinEur: 95000, usedPriceMaxEur: 180000 },
      { manufacturer: "Develon", model: "DX225", tonnage_t: 23.0, type: "Kette", newPriceEur: 195000, usedPriceMinEur: 72000, usedPriceMaxEur: 140000 },
      { manufacturer: "Hyundai", model: "HX220", tonnage_t: 22.0, type: "Kette", newPriceEur: 190000, usedPriceMinEur: 70000, usedPriceMaxEur: 135000 },
      { manufacturer: "Kobelco", model: "SK210", tonnage_t: 22.0, type: "Kette", newPriceEur: 205000, usedPriceMinEur: 78000, usedPriceMaxEur: 148000 },
      { manufacturer: "SANY", model: "SY215", tonnage_t: 22.0, type: "Kette", newPriceEur: 145000, usedPriceMinEur: 50000, usedPriceMaxEur: 95000 },
      { manufacturer: "XCMG", model: "XE215", tonnage_t: 22.0, type: "Kette", newPriceEur: 140000, usedPriceMinEur: 48000, usedPriceMaxEur: 90000 },
      { manufacturer: "Zoomlion", model: "ZE215", tonnage_t: 22.0, type: "Kette", newPriceEur: 142000, usedPriceMinEur: 49000, usedPriceMaxEur: 92000 },
      { manufacturer: "JCB", model: "220X", tonnage_t: 22.0, type: "Kette", newPriceEur: 200000, usedPriceMinEur: 75000, usedPriceMaxEur: 145000 }
    ]
  },
  {
    name: "Kettenbagger 27–40 t",
    value: "kettenbagger_27_40t",
    undercarriage: "Kette",
    tonnage_class_t: { min: 27.0, max: 40.0 },
    models: [
      { manufacturer: "Caterpillar", model: "330 / 336", tonnage_t: 35.0, type: "Kette", newPriceEur: 320000, usedPriceMinEur: 120000, usedPriceMaxEur: 240000 },
      { manufacturer: "Komatsu", model: "PC290 / PC360", tonnage_t: 35.0, type: "Kette", newPriceEur: 310000, usedPriceMinEur: 115000, usedPriceMaxEur: 230000 },
      { manufacturer: "Hitachi", model: "ZX300 / ZX350", tonnage_t: 35.0, type: "Kette", newPriceEur: 315000, usedPriceMinEur: 118000, usedPriceMaxEur: 235000 },
      { manufacturer: "Volvo", model: "EC300 / EC350", tonnage_t: 35.0, type: "Kette", newPriceEur: 325000, usedPriceMinEur: 125000, usedPriceMaxEur: 245000 },
      { manufacturer: "Liebherr", model: "R930 / R936 / R940", tonnage_t: 35.0, type: "Kette", newPriceEur: 350000, usedPriceMinEur: 140000, usedPriceMaxEur: 280000 },
      { manufacturer: "Develon", model: "DX300", tonnage_t: 31.0, type: "Kette", newPriceEur: 280000, usedPriceMinEur: 100000, usedPriceMaxEur: 200000 }
    ]
  },
  {
    name: "Mobilbagger 10–21 t",
    value: "mobilbagger_10_21t",
    undercarriage: "Mobil",
    tonnage_class_t: { min: 10.0, max: 21.0 },
    models: [
      { manufacturer: "Caterpillar", model: "M313 / M315 / M317 / M318", tonnage_t: 16.0, type: "Mobil", newPriceEur: 200000, usedPriceMinEur: 65000, usedPriceMaxEur: 145000 },
      { manufacturer: "Liebherr", model: "A910 / A912 / A914 / A916", tonnage_t: 15.0, type: "Mobil", newPriceEur: 210000, usedPriceMinEur: 70000, usedPriceMaxEur: 155000 },
      { manufacturer: "Volvo", model: "EW140 / EW160", tonnage_t: 16.0, type: "Mobil", newPriceEur: 195000, usedPriceMinEur: 62000, usedPriceMaxEur: 140000 },
      { manufacturer: "Hitachi", model: "ZX130W / ZX140W / ZX155W", tonnage_t: 16.0, type: "Mobil", newPriceEur: 190000, usedPriceMinEur: 60000, usedPriceMaxEur: 135000 },
      { manufacturer: "Komatsu", model: "PW148 / PW160", tonnage_t: 16.0, type: "Mobil", newPriceEur: 185000, usedPriceMinEur: 58000, usedPriceMaxEur: 130000 },
      { manufacturer: "Hyundai", model: "HW140 / HW160", tonnage_t: 16.0, type: "Mobil", newPriceEur: 165000, usedPriceMinEur: 50000, usedPriceMaxEur: 115000 },
      { manufacturer: "Develon", model: "DX140W / DX160W", tonnage_t: 16.0, type: "Mobil", newPriceEur: 160000, usedPriceMinEur: 48000, usedPriceMaxEur: 110000 },
      { manufacturer: "Atlas", model: "140W / 150W / 160W", tonnage_t: 16.0, type: "Mobil", newPriceEur: 175000, usedPriceMinEur: 55000, usedPriceMaxEur: 125000 },
      { manufacturer: "Mecalac", model: "12MXT / 15MWR", tonnage_t: 15.0, type: "Mobil", newPriceEur: 180000, usedPriceMinEur: 58000, usedPriceMaxEur: 130000 },
      { manufacturer: "Wacker Neuson", model: "EW65 / EW100", tonnage_t: 10.0, type: "Mobil", newPriceEur: 130000, usedPriceMinEur: 40000, usedPriceMaxEur: 90000 }
    ]
  }
];

// Helper function to get all unique manufacturers for a category
export function getManufacturersForCategory(category: "bagger" | "arbeitsbuehne", subcategory?: string, driveType?: ArbeitsbuehneDriveType): string[] {
  if (category === "bagger") {
    let models: MachineModel[] = [];
    
    if (subcategory) {
      const subtype = baggerSubtypes.find(s => s.value === subcategory);
      models = subtype?.models || [];
    } else {
      models = baggerSubtypes.flatMap(s => s.models);
    }
    
    const manufacturers = [...new Set(models.map(m => m.manufacturer))];
    return manufacturers.sort();
  }
  
  if (category === "arbeitsbuehne") {
    return getArbeitsbuehneManufacturers(subcategory, driveType);
  }
  
  return [];
}

// Helper function to get models for a manufacturer in a category/subcategory
export function getModelsForManufacturer(
  category: "bagger" | "arbeitsbuehne",
  manufacturer: string,
  subcategory?: string,
  driveType?: ArbeitsbuehneDriveType
): MachineModel[] | ArbeitsbuehnModel[] {
  if (category === "bagger") {
    let allModels: MachineModel[] = [];
    
    if (subcategory) {
      const subtype = baggerSubtypes.find(s => s.value === subcategory);
      allModels = subtype?.models || [];
    } else {
      allModels = baggerSubtypes.flatMap(s => s.models);
    }
    
    return allModels.filter(m => m.manufacturer === manufacturer);
  }
  
  if (category === "arbeitsbuehne") {
    return getArbeitsbuehneModelsForManufacturer(manufacturer, subcategory, driveType);
  }
  
  return [];
}

// Find a specific model by manufacturer and model name
export function findMachineModel(
  category: "bagger" | "arbeitsbuehne",
  manufacturer: string,
  modelName: string
): MachineModel | ArbeitsbuehnModel | null {
  if (category === "bagger") {
    for (const subtype of baggerSubtypes) {
      const model = subtype.models.find(
        m => m.manufacturer === manufacturer && m.model === modelName
      );
      if (model) return model;
    }
  }
  
  if (category === "arbeitsbuehne") {
    return findArbeitsbuehneModel(manufacturer, modelName);
  }
  
  return null;
}

// Helper to get subcategories for display
export function getSubcategoriesForCategory(category: "bagger" | "arbeitsbuehne"): { value: string; label: string }[] {
  if (category === "bagger") {
    return baggerSubtypes.map(s => ({
      value: s.value,
      label: s.name
    }));
  }
  
  if (category === "arbeitsbuehne") {
    return arbeitsbuehneSubtypes.map(s => ({
      value: s.value,
      label: s.name
    }));
  }
  
  return [];
}

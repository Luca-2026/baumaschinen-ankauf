// Machine data for the purchase wizard
// Last updated: 2026-01-20

export interface MachineModel {
  manufacturer: string;
  model: string;
  tonnage_t: number;
  type: "Kette" | "Mobil";
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

// Bagger data
export const baggerSubtypes: MachineSubtype[] = [
  {
    name: "Minibagger 1–3 t",
    value: "minibagger_1_3t",
    undercarriage: "Kette",
    tonnage_class_t: { min: 1.0, max: 3.0 },
    models: [
      { manufacturer: "Caterpillar", model: "301.7 CR", tonnage_t: 1.7, type: "Kette" },
      { manufacturer: "Caterpillar", model: "301.8", tonnage_t: 1.8, type: "Kette" },
      { manufacturer: "Caterpillar", model: "302 CR", tonnage_t: 2.0, type: "Kette" },
      { manufacturer: "Caterpillar", model: "302.7 CR", tonnage_t: 2.7, type: "Kette" },
      { manufacturer: "Kubota", model: "KX016-4", tonnage_t: 1.6, type: "Kette" },
      { manufacturer: "Kubota", model: "U17-3a", tonnage_t: 1.7, type: "Kette" },
      { manufacturer: "Kubota", model: "U27-4", tonnage_t: 2.7, type: "Kette" },
      { manufacturer: "Kubota", model: "KX027-4", tonnage_t: 2.7, type: "Kette" },
      { manufacturer: "Takeuchi", model: "TB216", tonnage_t: 1.9, type: "Kette" },
      { manufacturer: "Takeuchi", model: "TB225", tonnage_t: 2.5, type: "Kette" },
      { manufacturer: "Takeuchi", model: "TB230", tonnage_t: 3.0, type: "Kette" },
      { manufacturer: "Bobcat", model: "E19", tonnage_t: 1.9, type: "Kette" },
      { manufacturer: "Bobcat", model: "E20", tonnage_t: 2.0, type: "Kette" },
      { manufacturer: "Bobcat", model: "E26", tonnage_t: 2.6, type: "Kette" },
      { manufacturer: "JCB", model: "16C-1", tonnage_t: 1.6, type: "Kette" },
      { manufacturer: "JCB", model: "19C-1", tonnage_t: 1.9, type: "Kette" },
      { manufacturer: "JCB", model: "26C-1", tonnage_t: 2.6, type: "Kette" },
      { manufacturer: "Wacker Neuson", model: "ET18", tonnage_t: 1.8, type: "Kette" },
      { manufacturer: "Wacker Neuson", model: "EZ17", tonnage_t: 1.7, type: "Kette" },
      { manufacturer: "Wacker Neuson", model: "ET24", tonnage_t: 2.4, type: "Kette" },
      { manufacturer: "Yanmar", model: "ViO17", tonnage_t: 1.7, type: "Kette" },
      { manufacturer: "Yanmar", model: "ViO26", tonnage_t: 2.6, type: "Kette" },
      { manufacturer: "Yanmar", model: "SV26", tonnage_t: 2.6, type: "Kette" },
      { manufacturer: "Hitachi", model: "ZX17U", tonnage_t: 1.7, type: "Kette" },
      { manufacturer: "Hitachi", model: "ZX26U", tonnage_t: 2.6, type: "Kette" },
      { manufacturer: "Hitachi", model: "ZX30U", tonnage_t: 3.0, type: "Kette" },
      { manufacturer: "Komatsu", model: "PC16R", tonnage_t: 1.6, type: "Kette" },
      { manufacturer: "Komatsu", model: "PC26MR", tonnage_t: 2.6, type: "Kette" },
      { manufacturer: "Volvo", model: "EC18E", tonnage_t: 1.8, type: "Kette" },
      { manufacturer: "Volvo", model: "ECR25D", tonnage_t: 2.5, type: "Kette" },
      { manufacturer: "SANY", model: "SY18C", tonnage_t: 1.8, type: "Kette" },
      { manufacturer: "SANY", model: "SY26U", tonnage_t: 2.7, type: "Kette" },
      { manufacturer: "XCMG", model: "XE18U", tonnage_t: 1.8, type: "Kette" },
      { manufacturer: "XCMG", model: "XE27U", tonnage_t: 2.7, type: "Kette" },
      { manufacturer: "Zoomlion", model: "ZE18G", tonnage_t: 1.8, type: "Kette" },
      { manufacturer: "Zoomlion", model: "ZE26G", tonnage_t: 2.6, type: "Kette" }
    ]
  },
  {
    name: "Minibagger 3–6 t",
    value: "minibagger_3_6t",
    undercarriage: "Kette",
    tonnage_class_t: { min: 3.0, max: 6.0 },
    models: [
      { manufacturer: "Caterpillar", model: "303.5E CR / 303.5", tonnage_t: 3.5, type: "Kette" },
      { manufacturer: "Caterpillar", model: "304 CR", tonnage_t: 4.0, type: "Kette" },
      { manufacturer: "Caterpillar", model: "305 CR", tonnage_t: 5.0, type: "Kette" },
      { manufacturer: "Kubota", model: "KX037-4", tonnage_t: 3.7, type: "Kette" },
      { manufacturer: "Kubota", model: "U48-4", tonnage_t: 4.8, type: "Kette" },
      { manufacturer: "Kubota", model: "KX057-4", tonnage_t: 5.7, type: "Kette" },
      { manufacturer: "Takeuchi", model: "TB235-2", tonnage_t: 3.5, type: "Kette" },
      { manufacturer: "Takeuchi", model: "TB250-2", tonnage_t: 5.0, type: "Kette" },
      { manufacturer: "Takeuchi", model: "TB260", tonnage_t: 6.0, type: "Kette" },
      { manufacturer: "Bobcat", model: "E35", tonnage_t: 3.5, type: "Kette" },
      { manufacturer: "Bobcat", model: "E50", tonnage_t: 5.0, type: "Kette" },
      { manufacturer: "Bobcat", model: "E57", tonnage_t: 5.7, type: "Kette" },
      { manufacturer: "Wacker Neuson", model: "ET35", tonnage_t: 3.5, type: "Kette" },
      { manufacturer: "Wacker Neuson", model: "ET42", tonnage_t: 4.2, type: "Kette" },
      { manufacturer: "Wacker Neuson", model: "ET58", tonnage_t: 5.8, type: "Kette" },
      { manufacturer: "Yanmar", model: "ViO38", tonnage_t: 3.8, type: "Kette" },
      { manufacturer: "Yanmar", model: "ViO50", tonnage_t: 5.0, type: "Kette" },
      { manufacturer: "Yanmar", model: "SV60", tonnage_t: 6.0, type: "Kette" }
    ]
  },
  {
    name: "Kettenbagger 6–10 t (Midi)",
    value: "kettenbagger_6_10t",
    undercarriage: "Kette",
    tonnage_class_t: { min: 6.0, max: 10.0 },
    models: [
      { manufacturer: "Caterpillar", model: "306 / 307", tonnage_t: 7.0, type: "Kette" },
      { manufacturer: "Komatsu", model: "PC78", tonnage_t: 8.0, type: "Kette" },
      { manufacturer: "Hitachi", model: "ZX85", tonnage_t: 8.5, type: "Kette" },
      { manufacturer: "Volvo", model: "EC88", tonnage_t: 8.8, type: "Kette" },
      { manufacturer: "JCB", model: "86C-2", tonnage_t: 8.6, type: "Kette" },
      { manufacturer: "Takeuchi", model: "TB290", tonnage_t: 9.0, type: "Kette" }
    ]
  },
  {
    name: "Kettenbagger 10–16 t",
    value: "kettenbagger_10_16t",
    undercarriage: "Kette",
    tonnage_class_t: { min: 10.0, max: 16.0 },
    models: [
      { manufacturer: "Caterpillar", model: "313 / 315", tonnage_t: 14.0, type: "Kette" },
      { manufacturer: "Komatsu", model: "PC138", tonnage_t: 14.0, type: "Kette" },
      { manufacturer: "Hitachi", model: "ZX135 / ZX145", tonnage_t: 14.0, type: "Kette" },
      { manufacturer: "Volvo", model: "EC140", tonnage_t: 14.0, type: "Kette" },
      { manufacturer: "Liebherr", model: "R914 / R916", tonnage_t: 15.0, type: "Kette" },
      { manufacturer: "Develon", model: "DX140", tonnage_t: 14.0, type: "Kette" }
    ]
  },
  {
    name: "Kettenbagger 18–26 t (Mainstream)",
    value: "kettenbagger_18_26t",
    undercarriage: "Kette",
    tonnage_class_t: { min: 18.0, max: 26.0 },
    models: [
      { manufacturer: "Caterpillar", model: "320 / 323", tonnage_t: 22.0, type: "Kette" },
      { manufacturer: "Komatsu", model: "PC210 / PC220", tonnage_t: 22.0, type: "Kette" },
      { manufacturer: "Hitachi", model: "ZX210", tonnage_t: 21.0, type: "Kette" },
      { manufacturer: "Volvo", model: "EC220", tonnage_t: 22.0, type: "Kette" },
      { manufacturer: "Liebherr", model: "R920 / R922 / R924", tonnage_t: 23.0, type: "Kette" },
      { manufacturer: "Develon", model: "DX225", tonnage_t: 23.0, type: "Kette" },
      { manufacturer: "Hyundai", model: "HX220", tonnage_t: 22.0, type: "Kette" },
      { manufacturer: "Kobelco", model: "SK210", tonnage_t: 22.0, type: "Kette" },
      { manufacturer: "SANY", model: "SY215", tonnage_t: 22.0, type: "Kette" },
      { manufacturer: "XCMG", model: "XE215", tonnage_t: 22.0, type: "Kette" },
      { manufacturer: "Zoomlion", model: "ZE215", tonnage_t: 22.0, type: "Kette" },
      { manufacturer: "JCB", model: "220X", tonnage_t: 22.0, type: "Kette" }
    ]
  },
  {
    name: "Kettenbagger 27–40 t",
    value: "kettenbagger_27_40t",
    undercarriage: "Kette",
    tonnage_class_t: { min: 27.0, max: 40.0 },
    models: [
      { manufacturer: "Caterpillar", model: "330 / 336", tonnage_t: 35.0, type: "Kette" },
      { manufacturer: "Komatsu", model: "PC290 / PC360", tonnage_t: 35.0, type: "Kette" },
      { manufacturer: "Hitachi", model: "ZX300 / ZX350", tonnage_t: 35.0, type: "Kette" },
      { manufacturer: "Volvo", model: "EC300 / EC350", tonnage_t: 35.0, type: "Kette" },
      { manufacturer: "Liebherr", model: "R930 / R936 / R940", tonnage_t: 35.0, type: "Kette" },
      { manufacturer: "Develon", model: "DX300", tonnage_t: 31.0, type: "Kette" }
    ]
  },
  {
    name: "Mobilbagger 10–21 t",
    value: "mobilbagger_10_21t",
    undercarriage: "Mobil",
    tonnage_class_t: { min: 10.0, max: 21.0 },
    models: [
      { manufacturer: "Caterpillar", model: "M313 / M315 / M317 / M318", tonnage_t: 16.0, type: "Mobil" },
      { manufacturer: "Liebherr", model: "A910 / A912 / A914 / A916", tonnage_t: 15.0, type: "Mobil" },
      { manufacturer: "Volvo", model: "EW140 / EW160", tonnage_t: 16.0, type: "Mobil" },
      { manufacturer: "Hitachi", model: "ZX130W / ZX140W / ZX155W", tonnage_t: 16.0, type: "Mobil" },
      { manufacturer: "Komatsu", model: "PW148 / PW160", tonnage_t: 16.0, type: "Mobil" },
      { manufacturer: "Hyundai", model: "HW140 / HW160", tonnage_t: 16.0, type: "Mobil" },
      { manufacturer: "Develon", model: "DX140W / DX160W", tonnage_t: 16.0, type: "Mobil" },
      { manufacturer: "Atlas", model: "140W / 150W / 160W", tonnage_t: 16.0, type: "Mobil" },
      { manufacturer: "Mecalac", model: "12MXT / 15MWR", tonnage_t: 15.0, type: "Mobil" },
      { manufacturer: "Wacker Neuson", model: "EW65 / EW100", tonnage_t: 10.0, type: "Mobil" }
    ]
  }
];

// Helper function to get all unique manufacturers for a category
export function getManufacturersForCategory(category: "bagger" | "arbeitsbuehne", subcategory?: string): string[] {
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
  
  // TODO: Add arbeitsbuehne data
  return [];
}

// Helper function to get models for a manufacturer in a category/subcategory
export function getModelsForManufacturer(
  category: "bagger" | "arbeitsbuehne",
  manufacturer: string,
  subcategory?: string
): MachineModel[] {
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
  
  // TODO: Add arbeitsbuehne data
  return [];
}

// Helper to get subcategories for display
export function getSubcategoriesForCategory(category: "bagger" | "arbeitsbuehne"): { value: string; label: string }[] {
  if (category === "bagger") {
    return baggerSubtypes.map(s => ({
      value: s.value,
      label: s.name
    }));
  }
  
  // Return existing arbeitsbuehne subcategories
  return [
    { value: 'schere', label: 'Scherenarbeitsbühne' },
    { value: 'gelenk', label: 'Gelenkteleskopbühne' },
    { value: 'teleskop', label: 'Teleskoparbeitsbühne' },
    { value: 'mast', label: 'Mastbühne' },
    { value: 'raupen', label: 'Raupenarbeitsbühne' },
    { value: 'lkw', label: 'LKW-Arbeitsbühne' },
    { value: 'anhaenger', label: 'Anhänger-Arbeitsbühne' },
  ];
}

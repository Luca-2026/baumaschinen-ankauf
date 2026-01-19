// Wizard form data types
export interface WizardFormData {
  // Step 1: Category
  category: 'bagger' | 'arbeitsbuehne' | '';
  subcategory: string;
  
  // Step 2: Manufacturer & Model
  manufacturerId: string;
  manufacturerName: string;
  modelId: string;
  modelName: string;
  isCustomModel: boolean;
  customModelName: string;
  
  // Step 3: Base Data
  yearBuilt: number | null;
  operatingHours: number | null;
  weightClass: string;
  workingHeight: string;
  driveType: string;
  serialNumber: string;
  locationZip: string;
  
  // Step 4: Condition & Equipment
  condition: 'sehr_gut' | 'gut' | 'ok' | 'reparaturbeduerftig' | '';
  hasServiceBook: boolean;
  hasUvv: boolean;
  hasCe: boolean;
  hasManual: boolean;
  equipment: string[];
  hasDamage: boolean;
  damageDescription: string;
  
  // Step 5: Media
  images: File[];
  imageUrls: string[];
  documents: File[];
  documentUrls: string[];
  
  // Step 6: Contact
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  contactCompany: string;
  gdprConsent: boolean;
  wantsPickup: boolean;
}

export const initialWizardData: WizardFormData = {
  category: '',
  subcategory: '',
  manufacturerId: '',
  manufacturerName: '',
  modelId: '',
  modelName: '',
  isCustomModel: false,
  customModelName: '',
  yearBuilt: null,
  operatingHours: null,
  weightClass: '',
  workingHeight: '',
  driveType: '',
  serialNumber: '',
  locationZip: '',
  condition: '',
  hasServiceBook: false,
  hasUvv: false,
  hasCe: false,
  hasManual: false,
  equipment: [],
  hasDamage: false,
  damageDescription: '',
  images: [],
  imageUrls: [],
  documents: [],
  documentUrls: [],
  contactName: '',
  contactEmail: '',
  contactPhone: '',
  contactCompany: '',
  gdprConsent: false,
  wantsPickup: false,
};

// Subcategories
export const baggerSubcategories = [
  { value: 'minibagger_bis_3t', label: 'Minibagger (bis 3t)' },
  { value: 'minibagger_3_6t', label: 'Minibagger (3-6t)' },
  { value: 'midibagger', label: 'Midibagger (6-15t)' },
  { value: 'kettenbagger', label: 'Kettenbagger' },
  { value: 'mobilbagger', label: 'Mobilbagger' },
  { value: 'kurzheckbagger', label: 'Kurzheckbagger' },
  { value: 'raupenbagger', label: 'Raupenbagger' },
];

export const arbeitsbuehneSubcategories = [
  { value: 'schere', label: 'Scherenarbeitsbühne' },
  { value: 'gelenk', label: 'Gelenkteleskopbühne' },
  { value: 'teleskop', label: 'Teleskoparbeitsbühne' },
  { value: 'mast', label: 'Mastbühne' },
  { value: 'raupen', label: 'Raupenarbeitsbühne' },
  { value: 'lkw', label: 'LKW-Arbeitsbühne' },
  { value: 'anhaenger', label: 'Anhänger-Arbeitsbühne' },
];

// Weight classes for Bagger
export const baggerWeightClasses = [
  { value: 'mini_bis_3t', label: 'bis 3 Tonnen' },
  { value: 'mini_3_6t', label: '3-6 Tonnen' },
  { value: 'midi_6_15t', label: '6-15 Tonnen' },
  { value: 'standard_15_25t', label: '15-25 Tonnen' },
  { value: 'gross_ueber_25t', label: 'über 25 Tonnen' },
];

// Working heights for Arbeitsbühnen
export const arbeitsbuehneWorkingHeights = [
  { value: 'bis_10m', label: 'bis 10m' },
  { value: '10_15m', label: '10-15m' },
  { value: '15_20m', label: '15-20m' },
  { value: '20_30m', label: '20-30m' },
  { value: 'ueber_30m', label: 'über 30m' },
];

// Drive types
export const driveTypes = [
  { value: 'diesel', label: 'Diesel' },
  { value: 'elektro', label: 'Elektro' },
  { value: 'hybrid', label: 'Hybrid' },
  { value: 'benzin', label: 'Benzin' },
];

// Bagger equipment options
export const baggerEquipment = [
  { value: 'schnellwechsler', label: 'Schnellwechsler' },
  { value: 'zusatzhydraulik', label: 'Zusatzhydraulik' },
  { value: 'tiltrotator', label: 'Tiltrotator' },
  { value: 'klimaanlage', label: 'Klimaanlage' },
  { value: 'planierschild', label: 'Planierschild' },
  { value: 'gummipolster', label: 'Gummipolster/Gummiketten' },
  { value: 'zweischalengreifer', label: 'Zweischalengreifer' },
  { value: 'powertilt', label: 'Powertilt' },
  { value: 'gps', label: 'GPS/Maschinensteuerung' },
  { value: 'kamera', label: 'Rückfahrkamera' },
];

// Arbeitsbühne equipment options
export const arbeitsbuehneEquipment = [
  { value: 'non_marking', label: 'Non-Marking Reifen' },
  { value: '4x4', label: '4x4 Antrieb' },
  { value: '4x4x4', label: '4x4x4 Allradlenkung' },
  { value: 'indoor_outdoor', label: 'Indoor/Outdoor' },
  { value: 'korberweiterung', label: 'Korberweiterung' },
  { value: 'abstützung', label: 'Automatische Abstützung' },
  { value: 'diesel_electric', label: 'Diesel + Elektro' },
  { value: 'gelaendegaengig', label: 'Geländegängig' },
  { value: 'stabilisatoren', label: 'Stabilisatoren' },
];

// Condition options
export const conditionOptions = [
  { value: 'sehr_gut', label: 'Sehr gut', description: 'Wenig Gebrauchsspuren, wie neu' },
  { value: 'gut', label: 'Gut', description: 'Normale Gebrauchsspuren, voll funktionsfähig' },
  { value: 'ok', label: 'OK', description: 'Deutliche Gebrauchsspuren, funktionsfähig' },
  { value: 'reparaturbeduerftig', label: 'Reparaturbedürftig', description: 'Mängel vorhanden, Reparatur erforderlich' },
];

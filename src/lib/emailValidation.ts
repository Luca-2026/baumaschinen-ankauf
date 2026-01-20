// Common email providers for validation
const VALID_EMAIL_DOMAINS = [
  // German providers
  "gmx.de", "gmx.net", "gmx.at", "gmx.ch",
  "web.de",
  "t-online.de",
  "freenet.de",
  "1und1.de", "1&1.de",
  "vodafone.de",
  "arcor.de",
  "posteo.de",
  "mailbox.org",
  "icloud.de",
  
  // International providers
  "gmail.com", "googlemail.com",
  "outlook.com", "outlook.de", "hotmail.com", "hotmail.de", "live.com", "live.de", "msn.com",
  "yahoo.com", "yahoo.de",
  "icloud.com", "me.com", "mac.com",
  "aol.com", "aol.de",
  "protonmail.com", "proton.me",
  "zoho.com",
  "mail.com",
  "yandex.com", "yandex.ru",
  
  // Business/Corporate (allow any .de, .com, .eu, .net, .org domain for companies)
];

// TLDs that are commonly used for business emails
const VALID_TLDS = [
  ".de", ".com", ".net", ".org", ".eu", ".at", ".ch", ".nl", ".be", ".fr", ".uk", ".co.uk",
  ".info", ".biz", ".io", ".tech", ".gmbh", ".ag", ".ltd"
];

export interface EmailValidationResult {
  isValid: boolean;
  error?: string;
}

export function validateEmail(email: string): EmailValidationResult {
  const trimmedEmail = email.trim().toLowerCase();
  
  // Basic format check
  if (!trimmedEmail) {
    return { isValid: false, error: "E-Mail-Adresse ist erforderlich" };
  }
  
  // Check for basic email format with regex
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(trimmedEmail)) {
    return { isValid: false, error: "Ungültiges E-Mail-Format" };
  }
  
  // Check for common typos
  const commonTypos = [
    { wrong: "gmial.com", correct: "gmail.com" },
    { wrong: "gmal.com", correct: "gmail.com" },
    { wrong: "gamil.com", correct: "gmail.com" },
    { wrong: "gmail.de", correct: "gmail.com" },
    { wrong: "outloo.com", correct: "outlook.com" },
    { wrong: "outlok.com", correct: "outlook.com" },
    { wrong: "hotmal.com", correct: "hotmail.com" },
    { wrong: "hotmai.com", correct: "hotmail.com" },
    { wrong: "yahooo.com", correct: "yahoo.com" },
    { wrong: "yahho.com", correct: "yahoo.com" },
    { wrong: "web.com", correct: "web.de" },
    { wrong: "gmx.com", correct: "gmx.de" },
  ];
  
  const domain = trimmedEmail.split("@")[1];
  const typo = commonTypos.find(t => domain === t.wrong);
  if (typo) {
    return { 
      isValid: false, 
      error: `Meinten Sie ${typo.correct}?` 
    };
  }
  
  // Check for valid domain or TLD
  const isKnownProvider = VALID_EMAIL_DOMAINS.some(d => domain === d);
  const hasValidTld = VALID_TLDS.some(tld => domain.endsWith(tld));
  
  if (!isKnownProvider && !hasValidTld) {
    return { 
      isValid: false, 
      error: "Bitte geben Sie eine gültige geschäftliche oder private E-Mail-Adresse ein" 
    };
  }
  
  // Check for suspicious patterns
  if (domain.includes("..") || domain.startsWith(".") || domain.endsWith(".")) {
    return { isValid: false, error: "Ungültiges E-Mail-Format" };
  }
  
  // Check minimum length of local part
  const localPart = trimmedEmail.split("@")[0];
  if (localPart.length < 2) {
    return { isValid: false, error: "E-Mail-Adresse ist zu kurz" };
  }
  
  // Check for disposable email domains (basic list)
  const disposableDomains = [
    "tempmail.com", "throwaway.com", "guerrillamail.com", "10minutemail.com",
    "mailinator.com", "trashmail.com", "fakeinbox.com", "temp-mail.org"
  ];
  
  if (disposableDomains.includes(domain)) {
    return { 
      isValid: false, 
      error: "Bitte verwenden Sie keine temporären E-Mail-Adressen" 
    };
  }
  
  return { isValid: true };
}

// Phone number validation for German numbers
export function validatePhone(phone: string): EmailValidationResult {
  const cleaned = phone.replace(/[\s\-\/\(\)]/g, "");
  
  if (!cleaned) {
    return { isValid: false, error: "Telefonnummer ist erforderlich" };
  }
  
  // German phone number patterns
  // Mobile: 015x, 016x, 017x (10-11 digits after country code)
  // Landline: 02x, 03x, 04x, 05x, 06x, 07x, 08x, 09x
  const germanMobileRegex = /^(\+49|0049|0)?1[567]\d{8,10}$/;
  const germanLandlineRegex = /^(\+49|0049|0)?[2-9]\d{6,11}$/;
  
  if (!germanMobileRegex.test(cleaned) && !germanLandlineRegex.test(cleaned)) {
    return { 
      isValid: false, 
      error: "Bitte geben Sie eine gültige deutsche Telefonnummer ein" 
    };
  }
  
  return { isValid: true };
}

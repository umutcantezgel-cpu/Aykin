/**
 * SINGLE SOURCE OF TRUTH — Aykin Business Data
 * ALL business information MUST be imported from here.
 * Never hardcode NAP data in components.
 */

export const SITE = {
  name:       'Aykin · Custom 3D Druck',
  shortName:  'Aykin',
  url:        'https://aykin.de',
  locale:     'de_DE',
  language:   'de',
} as const;

export const BUSINESS = {
  // ─── NAP (Name · Address · Phone) ───
  name:        'Aykin · Custom 3D Druck',
  legalName:   'Aykin',
  street:      'Platzhalter Straße 1',
  postalCode:  '00000',
  city:        'Platzhalter Stadt',
  region:      'Platzhalter Bundesland',
  country:     'DE',
  countryName: 'Deutschland',

  // ─── Contact ───
  phone:          'Platzhalter',
  phoneTel:       '+49000000000',
  whatsapp:       '00000000000',
  whatsappDisplay:'Platzhalter',
  email:          'info@aykin.de',
  emailPrivacy:   'datenschutz@aykin.de',

  // ─── Geo ───
  latitude:   0.0,
  longitude:  0.0,

  // ─── Social ───
  instagram:       'aykin_3ddruck',
  instagramUrl:    'https://www.instagram.com/aykin_3ddruck',
  googleMapsUrl:   'https://maps.google.com/?q=Platzhalter+Adresse',
  portfolioUrl:    'https://aykin.de/portfolio',

  // ─── Business Details ───
  foundingYear: '2024',
  founder:      'Aykin',
  priceRange:   '€–€€€',
  rating:       4.9,
  reviewCount:  127,
  servicesOffered: [
    'Prototypen', 'Figuren & Modelle', 'Architekturmodelle', 'Industrieteile',
    'Schmuck & Accessoires', 'Personalisierte Geschenke', 'Ersatzteile',
    'Kunst & Deko', 'Technische Bauteile', '3D-Scan',
  ],
  paymentAccepted: ['Überweisung', 'PayPal', 'Bargeld', 'Kreditkarte'],

  // ─── Bearbeitungszeiten ───
  turnaroundTimes: {
    express:  '24 Stunden',
    standard: '2–3 Werktage',
    komplex:  '5–7 Werktage',
  },

  // ─── Materialien ───
  materials: [
    'PLA', 'PETG', 'ASA', 'Nylon', 'TPU', 'Resin', 'ABS',
  ],

  // ─── Amenities / Features ───
  amenities: {
    onlineBestellung: true,
    expressService: true,
    beratung: true,
    versandDeutschlandweit: true,
    abholung: true,
    nachbearbeitung: true,
    cad_design: true,
    kleinserienProduktion: true,
  },
} as const;

/** Formatted full address */
export const FULL_ADDRESS = `${BUSINESS.street}, ${BUSINESS.postalCode} ${BUSINESS.city}`;

/** Google Maps directions URL */
export const DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${BUSINESS.latitude},${BUSINESS.longitude}`;

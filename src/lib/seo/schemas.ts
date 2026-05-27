import { SITE, BUSINESS, FULL_ADDRESS, DIRECTIONS_URL } from './business-data';

/* ═══════════════════════════════════════════════════════════
   JSON-LD Schema Templates for Aykin · Custom 3D Druck
   ═══════════════════════════════════════════════════════════ */

/* ─── 1. LocalBusiness (3D Printing Service) ─── */
export const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': ['LocalBusiness', 'ProfessionalService'],
  '@id': `${SITE.url}#business`,
  name: SITE.name,
  alternateName: ['Aykin', 'Aykin 3D Druck', 'Aykin Custom 3D Druck'],
  description: 'Individueller 3D-Druck-Service für Prototypen, Figuren, Architekturmodelle, Industrieteile und personalisierte Geschenke. Präzision trifft Kreativität — Aykin, dein Partner für Custom 3D Druck in Deutschland.',
  url: SITE.url,
  telephone: BUSINESS.phoneTel,
  email: BUSINESS.email,
  image: [`${SITE.url}/og/default.png`],
  logo: `${SITE.url}/favicon.ico`,
  priceRange: BUSINESS.priceRange,
  paymentAccepted: BUSINESS.paymentAccepted,
  currenciesAccepted: 'EUR',
  address: {
    '@type': 'PostalAddress',
    streetAddress: BUSINESS.street,
    postalCode: BUSINESS.postalCode,
    addressLocality: BUSINESS.city,
    addressRegion: BUSINESS.region,
    addressCountry: BUSINESS.country,
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: BUSINESS.latitude,
    longitude: BUSINESS.longitude,
  },
  hasMap: BUSINESS.googleMapsUrl,
  areaServed: [
    { '@type': 'Country', name: 'Deutschland', sameAs: 'https://www.wikidata.org/wiki/Q183' },
  ],
  founder: {
    '@type': 'Person',
    name: BUSINESS.founder,
  },
  foundingDate: BUSINESS.foundingYear,
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: String(BUSINESS.rating),
    reviewCount: String(BUSINESS.reviewCount),
    bestRating: '5',
    worstRating: '1',
  },
  potentialAction: [
    {
      '@type': 'OrderAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE.url}/services`,
        inLanguage: 'de-DE',
        actionPlatform: [
          'https://schema.org/DesktopWebPlatform',
          'https://schema.org/MobileWebPlatform',
        ],
      },
    },
    {
      '@type': 'CommunicateAction',
      target: { '@type': 'EntryPoint', urlTemplate: `${SITE.url}/contact` },
    },
  ],
  sameAs: [
    BUSINESS.instagramUrl,
    BUSINESS.googleMapsUrl,
  ],
  amenityFeature: Object.entries(BUSINESS.amenities)
    .filter(([, v]) => v)
    .map(([k]) => ({
      '@type': 'LocationFeatureSpecification',
      name: k, value: true,
    })),
  knowsAbout: [
    '3D-Druck', 'FDM', 'Resin-Druck', 'Prototyping', 'CAD-Design',
    'Kleinserienfertigung', 'Rapid Prototyping', 'Additive Fertigung',
  ],
  keywords: '3D Druck, Custom 3D Druck, Prototypen, 3D Druckservice, Figuren, Architekturmodelle, Industrieteile, Deutschland',
};

/* ─── 2. WebSite Schema ─── */
export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE.url}#website`,
  name: SITE.name,
  alternateName: SITE.shortName,
  url: SITE.url,
  inLanguage: SITE.language,
  publisher: { '@id': `${SITE.url}#business` },
  potentialAction: {
    '@type': 'SearchAction',
    target: { '@type': 'EntryPoint', urlTemplate: `${SITE.url}/services?q={search_term_string}` },
    'query-input': 'required name=search_term_string',
  },
};

/* ─── 3. Organization Schema ─── */
export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${SITE.url}#org`,
  name: SITE.name,
  url: SITE.url,
  logo: `${SITE.url}/favicon.ico`,
  founder: { '@type': 'Person', name: BUSINESS.founder },
  foundingDate: BUSINESS.foundingYear,
  address: localBusinessSchema.address,
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: BUSINESS.phoneTel,
    email: BUSINESS.email,
    contactType: 'customer service',
    availableLanguage: ['German'],
  },
  sameAs: localBusinessSchema.sameAs,
  knowsAbout: [
    '3D-Druck', 'Rapid Prototyping', 'FDM-Druck', 'Resin-Druck',
    'CAD-Modellierung', 'Additive Fertigung', 'Kleinserienfertigung',
  ],
};

/* ─── 4. Breadcrumb Generator ─── */
export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Aykin', item: SITE.url },
      ...items.map((item, i) => ({
        '@type': 'ListItem',
        position: i + 2,
        name: item.name,
        item: `${SITE.url}${item.path}`,
      })),
    ],
  };
}

/* ─── 5. FAQ Schema Generator ─── */
export function faqSchema(questions: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: questions.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: a,
      },
    })),
  };
}

/* ─── 6. Service Catalog Schema ─── */
export function serviceCatalogSchema(categories: { name: string; items: { name: string; price: string; desc: string }[] }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'OfferCatalog',
    '@id': `${SITE.url}/services#catalog`,
    name: 'Aykin · Leistungen & Preise',
    url: `${SITE.url}/services`,
    inLanguage: 'de',
    itemListElement: categories.map(cat => ({
      '@type': 'OfferCatalog',
      name: cat.name,
      itemListElement: cat.items.map(item => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: item.name,
          description: item.desc,
        },
        price: item.price.replace(/[^0-9,.]/g, '').replace(',', '.'),
        priceCurrency: 'EUR',
        availability: 'https://schema.org/InStock',
      })),
    })),
  };
}

/* ─── 7. Service Schema ─── */
export const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'Custom 3D Printing',
  provider: { '@id': `${SITE.url}#business` },
  areaServed: { '@type': 'Country', name: 'Deutschland' },
  hasOfferCatalog: { '@id': `${SITE.url}/services#catalog` },
  description: 'Individueller 3D-Druck-Service: Prototypen, Figuren, Architekturmodelle, Industrieteile, Schmuck und personalisierte Geschenke. FDM- und Resin-Druck in höchster Qualität.',
};

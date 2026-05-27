import type { Metadata } from 'next';
import { SITE, BUSINESS } from './business-data';

/**
 * Builds complete Next.js Metadata for any page.
 * Includes OG, Twitter, canonical, robots, geo, verification.
 */
export function buildMetadata(opts: {
  title:       string;
  description: string;
  path:        string;
  ogType?:     'website' | 'article';
  keywords?:   string[];
  noIndex?:    boolean;
}): Metadata {
  const url = `${SITE.url}${opts.path}`;

  return {
    title:       opts.title,
    description: opts.description,
    keywords:    opts.keywords,
    authors:     [{ name: SITE.shortName, url: SITE.url }],
    creator:     SITE.name,
    publisher:   SITE.name,
    metadataBase: new URL(SITE.url),
    alternates: {
      canonical: url,
      languages: { 'de-DE': url, 'x-default': url },
    },
    openGraph: {
      title:       opts.title,
      description: opts.description,
      url,
      siteName:    SITE.name,
      locale:      SITE.locale,
      type:        opts.ogType ?? 'website',
      images: [{
        url: '/og/default.png',
        width: 1200, height: 630,
        alt: opts.title,
      }],
    },
    twitter: {
      card:        'summary_large_image',
      title:       opts.title,
      description: opts.description,
      images:      ['/og/default.png'],
    },
    robots: opts.noIndex
      ? { index: false, follow: false }
      : {
          index: true, follow: true,
          googleBot: {
            index: true, follow: true,
            'max-snippet': -1,
            'max-image-preview': 'large' as const,
            'max-video-preview': -1,
          },
        },
    category: '3d printing',
    other: {
      'geo.region':    'DE',
      'geo.placename': BUSINESS.city,
      'geo.position':  `${BUSINESS.latitude};${BUSINESS.longitude}`,
      'ICBM':          `${BUSINESS.latitude}, ${BUSINESS.longitude}`,
    },
  };
}

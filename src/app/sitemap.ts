import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://aykin.de';
  const now = new Date().toISOString();

  return [
    { url: baseUrl,                lastModified: now, changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${baseUrl}/menu`,      lastModified: now, changeFrequency: 'weekly',  priority: 0.95 },
    { url: `${baseUrl}/about`,     lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/visit`,     lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${baseUrl}/order-hub`, lastModified: now, changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${baseUrl}/support`,   lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/loyalty`,   lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/legal`,     lastModified: now, changeFrequency: 'yearly',  priority: 0.3 },
    { url: `${baseUrl}/gutscheine`,lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/reservierung`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
  ];
}

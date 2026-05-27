import { buildMetadata } from '@/lib/seo/metadata';

export const metadata = buildMetadata({
  title: 'Standort & Kontakt · Aykin',
  description: 'Finde Aykin — Kontaktiere uns für einen Termin. Individuelle 3D-Drucke aus dem Aykin Studio.',
  path: '/visit',
  keywords: ['Aykin Standort','Aykin Adresse','Kontakt Aykin','Aykin Studio'],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

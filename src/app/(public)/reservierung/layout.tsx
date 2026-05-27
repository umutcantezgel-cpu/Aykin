import { buildMetadata } from '@/lib/seo/metadata';

export const metadata = buildMetadata({
  title: 'Beratungstermin · Aykin',
  description: 'Buche jetzt einen Beratungstermin bei Aykin. Perfekt für Prototypen, individuelle Projekte oder Serienfertigung.',
  path: '/reservierung',
  keywords: ['Beratungstermin Aykin', 'Aykin Beratung', 'Aykin Beratung'],
});

export default function ReservierungLayout({ children }: { children: React.ReactNode }) {
  return children;
}

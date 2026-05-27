import { buildMetadata } from '@/lib/seo/metadata';

export const metadata = buildMetadata({
  title: 'Impressum & Datenschutz',
  description: 'Impressum, Datenschutzerklärung und AGB von Aykin Custom 3D Druck.',
  path: '/legal',
  keywords: ['Impressum Aykin','Datenschutz Aykin'],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

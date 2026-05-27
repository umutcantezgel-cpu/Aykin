import { buildMetadata } from '@/lib/seo/metadata';

export const metadata = buildMetadata({
  title: 'Hilfe & Kontakt',
  description: 'FAQ, Kontakt und Hilfe für Aykin. Kontakt: info@aykin3d.de.',
  path: '/support',
  keywords: ['Aykin Kontakt','FAQ Aykin','Telefon Aykin'],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

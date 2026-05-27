import { buildMetadata } from '@/lib/seo/metadata';

export const metadata = buildMetadata({
  title: 'Gutscheine · Aykin',
  description: 'Verschenke süße Momente! Bestelle unsere Gutscheine bequem per E-Mail zum Selbstausdrucken oder im edlen Umschlag nach Hause.',
  path: '/gutscheine',
  keywords: ['Gutschein Aykin 3D', 'Geschenkkarte 3D Druck', '3D Druck Gutschein'],
});

export default function GutscheineLayout({ children }: { children: React.ReactNode }) {
  return children;
}

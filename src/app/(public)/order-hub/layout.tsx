import { buildMetadata } from '@/lib/seo/metadata';

export const metadata = buildMetadata({
  title: 'Online Bestellen',
  description: 'Bestelle online bei Aykin — Custom 3D Druck-Produkte. Abholung oder Lieferung via Lieferando.',
  path: '/order-hub',
  keywords: ['Aykin bestellen','Lieferung 3D Druck','3D Druck bestellen'],
});

export default function OrderHubLayout({ children }: { children: React.ReactNode }) {
  return children;
}

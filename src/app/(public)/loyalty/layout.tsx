import { buildMetadata } from '@/lib/seo/metadata';

export const metadata = buildMetadata({
  title: 'Aykin Coins · Treueprogramm',
  description: 'Sammle Aykin Coins und erhalte exklusive Belohnungen. Unser Treueprogramm für Stammgäste.',
  path: '/loyalty',
  keywords: ['Aykin Treueprogramm','Aykin Coins'],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

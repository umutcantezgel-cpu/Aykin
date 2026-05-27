import { buildMetadata } from '@/lib/seo/metadata';

export const metadata = buildMetadata({
  title: 'Passwort zurücksetzen · Aykin',
  description: 'Setze dein Passwort für dein Aykin Konto zurück.',
  path: '/password-reset',
  noIndex: true, // Should not be indexed
});

export default function PasswordResetLayout({ children }: { children: React.ReactNode }) {
  return children;
}

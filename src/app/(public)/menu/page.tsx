import { MenuClientWrapper } from "./MenuClientWrapper";
import { buildMetadata } from '@/lib/seo/metadata';
import { MenuSEO } from "@/content/seo/MenuSEO";
import { SEOContentBlock } from "@/components/seo/SEOContentBlock";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, serviceCatalogSchema } from "@/lib/seo/schemas";
import { AYKIN_DATA } from "@/lib/data";

export const revalidate = 60;

export const metadata = buildMetadata({
  title: 'Produkte · Custom 3D-Druck Katalog',
  description: 'Der vollständige Produktkatalog von Aykin: Custom 3D-Drucke, Prototypen, Kleinserien und individuelle Projekte.',
  path: '/menu',
  keywords: ['Produkte Aykin','3D Druck Materialien','Prototypen 3D Druck','Kleinserien 3D','Custom Teile'],
});

const menuSchemaData = serviceCatalogSchema(
  Object.entries(AYKIN_DATA.menu).map(([key, cat]) => ({
    name: AYKIN_DATA.categories.find(c => c.id === key)?.label || key,
    items: (cat as { items: { name: string; price: string; desc: string }[] }).items,
  }))
);

export default function MenuPage() {
  return (
    <>
      <MenuClientWrapper />
      <SEOContentBlock visible={true} ariaLabel="Wissenswertes rund um unsere Leistungen">
        <MenuSEO />
      </SEOContentBlock>
      <JsonLd data={[menuSchemaData, breadcrumbSchema([{ name: 'Leistungen', path: '/menu' }])]} />
    </>
  );
}

'use client';

import React, { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { MenuHero } from '@/components/sections/menu/MenuHero';
import { MenuFilter } from '@/components/sections/menu/MenuFilter';
import { ProductGrid } from '@/components/sections/menu/ProductGrid';
import { WaveDivider } from '@/components/atoms/WaveDivider';

// Data can be moved to a hook or fetched, for now using AYKIN_DATA categories
import { AYKIN_DATA } from '@/lib/data';

function MenuContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeCategory, setActiveCategory] = useState<string>('bubble');

  // URL Sync
  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat && AYKIN_DATA.categories.find(c => c.id === cat)) {
      setActiveCategory(cat);
    }
  }, [searchParams]);

  const handleCategoryChange = (catId: string) => {
    setActiveCategory(catId);
    router.replace(`/menu?category=${catId}`, { scroll: false });
  };

  return (
    <div className="bg-sand min-h-screen">
      <MenuHero />
      <MenuFilter 
        categories={AYKIN_DATA.categories} 
        activeCategory={activeCategory} 
        onChange={handleCategoryChange} 
      />
      <ProductGrid activeCategory={activeCategory} />
    </div>
  );
}

export function MenuClientWrapper() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-sand" />}>
      <MenuContent />
    </Suspense>
  );
}

"use client";
import React, { useState, useEffect, useRef, useMemo } from "react";
import * as Icons from "lucide-react";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import { AYKIN_DATA } from "@/lib/data";
import { WaffleCrafter } from "@/components/menu/WaffleCrafter";

const useDebounce = <T,>(value: T, delay: number = 300): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
};

const ProductCard = React.memo(({ item, catIcon, onAdd }: { item: any, catIcon: string, onAdd: (item: any) => void }) => {
  const LIcon = (Icons as any)[catIcon] || Icons.Sparkles;

  return (
    <div className="group bg-white rounded-[18px] p-[16px_18px] flex gap-3.5 items-center transition-all duration-250 hover:-translate-y-0.5 hover:shadow-[0_6px_22px_rgba(196,30,58,0.13)] shadow-[0_2px_10px_rgba(26,26,26,0.05)] hover:bg-[#fef8f5]">
      <div className="w-[68px] h-[68px] rounded-full bg-[#E8D5C4] flex items-center justify-center shrink-0 overflow-hidden">
        <LIcon size={26} strokeWidth={1.4} color="#C41E3A" className="opacity-65" />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start gap-2 mb-1">
          <span className="font-nunito font-black text-[0.95rem] text-[#1A1A1A]">
            {item.name}
          </span>
          <span className="font-calistoga text-[1.05rem] text-[#C41E3A] shrink-0">
            {item.price}
          </span>
        </div>
        {item.desc && (
          <p className="font-nunito text-[0.77rem] text-[#8A8A8A] leading-[1.45]">
            {item.desc}
          </p>
        )}
      </div>

      <div className="flex flex-col items-end justify-between h-full py-1">
        {item.tag && (
          <div className="bg-[#F2E8E0] text-[#C41E3A] font-nunito font-black text-[0.64rem] px-[11px] py-1 rounded-full shrink-0 tracking-[0.5px]">
            {item.tag}
          </div>
        )}
        <button
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); onAdd(item); }}
          className="mt-auto w-8 h-8 rounded-full bg-[#C41E3A] flex items-center justify-center text-white hover:bg-[#b5523d] transition-colors shadow-sm shrink-0"
        >
          <Icons.Plus size={18} strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
});
ProductCard.displayName = "ProductCard";

const BoxCard = React.memo(({ item, onAdd }: { item: any, onAdd: (item: any) => void }) => {
  return (
    <div className="group bg-white border-2 border-dashed border-[#C41E3A] rounded-xl p-[20px_22px] relative transition-all duration-[280ms] hover:-translate-y-1 hover:shadow-[0_8px_28px_rgba(196,30,58,0.18)] shadow-[0_2px_12px_rgba(26,26,26,0.06)] hover:bg-[#fef8f5] mx-3">
      {/* Perforation holes */}
      <div className="absolute -left-[11px] top-1/2 -translate-y-1/2 w-[22px] h-[22px] rounded-full bg-[#FAF8F5] border-2 border-dashed border-[#E8D5C4]" />
      <div className="absolute -right-[11px] top-1/2 -translate-y-1/2 w-[22px] h-[22px] rounded-full bg-[#FAF8F5] border-2 border-dashed border-[#E8D5C4]" />

      {item.tag && (
        <div className="absolute -top-[11px] right-[18px] bg-[#C41E3A] text-white font-nunito font-black text-[0.64rem] px-3.5 py-1 rounded-full tracking-[1px] uppercase">
          {item.tag}
        </div>
      )}

      <div className="flex gap-3.5 items-start">
        <div className="w-[74px] h-[74px] rounded-full bg-[#E8D5C4] flex items-center justify-center shrink-0">
          <Icons.Package size={30} strokeWidth={1.3} color="#C41E3A" className="opacity-65" />
        </div>
        <div className="flex-1">
          <h3 className="font-calistoga text-[1.08rem] text-[#1A1A1A] mb-1.5">{item.name}</h3>
          <p className="font-nunito text-[0.78rem] text-[#7a5a52] leading-[1.55] mb-2">{item.desc}</p>
          <div className="flex items-center justify-between mt-3">
            <span className="font-calistoga text-[1.3rem] text-[#C41E3A]">{item.price}</span>
            <button
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); onAdd(item); }}
              className="px-4 py-2 rounded-full bg-[#C41E3A] flex items-center justify-center text-white font-nunito font-bold text-xs hover:bg-[#b5523d] transition-colors shadow-[0_4px_12px_rgba(196,30,58,0.25)]"
            >
              Hinzufügen
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});
BoxCard.displayName = "BoxCard";

import { useStore } from "@/store/useStore";

export function MenuClient({ categories: initialCategories, menu: initialMenu }: { categories: any[], menu: any }) {
  const [categories, setCategories] = useState(initialCategories);
  const [menuData, setMenuData] = useState(initialMenu);
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearch = useDebounce(searchQuery, 300);
  
  const { addToCart } = useStore();
  const [activeId, setActiveId] = useState('boxen');
  const tabsRef = useRef<HTMLDivElement>(null);
  const [sticky, setSticky] = useState(false);
  const tabsRowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Attempt to load from Firestore if configured
    const loadFromFirebase = async () => {
      try {
        if (!db.app.options.apiKey || db.app.options.apiKey === "dummy" || db.app.options.apiKey === "DEIN_API_KEY") return;
        
        const catSnap = await getDocs(collection(db, "categories"));
        if (!catSnap.empty) {
          const loadedCats = catSnap.docs.map(d => ({ id: d.id, ...d.data() }));
          setCategories(loadedCats.sort((a: any, b: any) => (a.order || 0) - (b.order || 0)));
        }

        const menuSnap = await getDocs(collection(db, "menuItems"));
        if (!menuSnap.empty) {
          // Process menu array into object map grouped by category
          const newMenu: any = {};
          menuSnap.docs.forEach(doc => {
            const data = doc.data();
            if (!newMenu[data.categoryId]) newMenu[data.categoryId] = { items: [] };
            newMenu[data.categoryId].items.push({ id: doc.id, ...data });
          });
          setMenuData(newMenu);
        }
      } catch (err) {
        console.log("Using fallback static data, Firebase load failed:", err);
      }
    };
    loadFromFirebase();
  }, []);

  useEffect(() => {
    const fn = () => {
      if (tabsRef.current) setSticky(tabsRef.current.getBoundingClientRect().top <= 68);
    };
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => {
    if (!tabsRowRef.current) return;
    const active = tabsRowRef.current.querySelector('[data-active="true"]');
    if (active) active.scrollIntoView({ inline: 'nearest', block: 'nearest', behavior: 'smooth' });
  }, [activeId]);

  const cat = categories.find((c: any) => c.id === activeId);
  const data = menuData[activeId] || { items: [] };

  const filteredItems = useMemo(() => {
    if (!data.items) return [];
    if (!debouncedSearch) return data.items;
    const lower = debouncedSearch.toLowerCase();
    return data.items.filter((item: any) => 
      item.name?.toLowerCase().includes(lower) || 
      item.desc?.toLowerCase().includes(lower) ||
      item.tag?.toLowerCase().includes(lower)
    );
  }, [data.items, debouncedSearch]);

  return (
    <div className="min-h-screen bg-[#FAF8F5] animate-fade-in">

      {/* ── Page hero ── */}
      <div className="bg-[#E8D5C4] pt-[100px] px-6 pb-[72px] text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.35] dot-bg" />

        <div className="absolute top-[10%] right-[4%] w-[200px] h-[200px] bg-[rgba(250,248,245,0.3)] rounded-[58%_42%_52%_48%] opacity-60" />
        <div className="absolute bottom-[15%] left-[3%] w-[150px] h-[150px] bg-[rgba(196,30,58,0.12)] rounded-[45%_55%_60%_40%]" />

        <div className="relative z-10">
          <h1 className="font-calistoga text-[clamp(2.4rem,6vw,4.5rem)] text-[#1A1A1A] mb-2.5 leading-[1.05]">
            Die Produkte
          </h1>
          <p className="font-nunito text-[1.04rem] text-[#4A4A4A] max-w-[420px] mx-auto">
            Alles frisch & selbstgemacht — gönn dir was!
          </p>
        </div>

        <div className="absolute bottom-0 left-0 right-0 leading-none">
          <svg viewBox="0 0 1440 44" className="block w-full h-[44px]" preserveAspectRatio="none">
            <path d="M0,22 C320,46 640,0 960,22 C1120,34 1300,14 1440,22 L1440,44 L0,44 Z" fill="#FAF8F5" />
          </svg>
        </div>
      </div>

      <div ref={tabsRef} className="h-0 overflow-hidden" />

      <div 
        className="transition-shadow duration-300"
        style={{
          position: sticky ? 'sticky' : 'relative', top: sticky ? 68 : 'auto', zIndex: 200,
          background: sticky ? 'rgba(250,248,245,0.97)' : '#FAF8F5',
          backdropFilter: sticky ? 'blur(16px)' : 'none',
          boxShadow: sticky ? '0 3px 20px rgba(26,26,26,0.09)' : 'none',
          borderBottom: sticky ? '1px solid #F2E8E0' : 'none',
        }}>
        <div className="max-w-[1200px] mx-auto px-6">
          <div ref={tabsRowRef} className="flex gap-2 overflow-x-auto py-[13px] scroll-hide snap-x snap-mandatory">
            {categories.map((c: any) => {
              const isActive = activeId === c.id;
              const LIcon = (Icons as any)[c.icon] || Icons.Sparkles;
              return (
                <button key={c.id} data-active={isActive}
                  onClick={() => setActiveId(c.id)}
                  className={`flex items-center gap-1.5 font-nunito font-extrabold text-[0.8rem] px-4 py-[9px] rounded-full border-none cursor-pointer transition-all duration-[220ms] whitespace-nowrap shrink-0 snap-start ${isActive ? 'bg-[#C41E3A] text-white shadow-[0_3px_12px_rgba(196,30,58,0.3)]' : 'bg-[#F2E8E0] text-[#4A4A4A]'}`}>
                  <LIcon size={13} strokeWidth={2} />
                  <span>{c.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="max-w-[880px] mx-auto pt-11 px-6 pb-20">
        
        {/* Search input */}
        <div className="mb-8 relative max-w-[400px]">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <Icons.Search size={18} className="text-terracotta opacity-60" />
          </div>
          <input 
            type="text" 
            placeholder="Suchen (z.B. Schoko)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-[#F2E8E0] rounded-full py-3.5 pl-11 pr-4 text-sm font-nunito text-charcoal focus:outline-none focus:border-terracotta focus:ring-2 focus:ring-terracotta/20 transition-all shadow-[0_2px_8px_rgba(26,26,26,0.04)]"
          />
        </div>

        {/* Category header */}
        <div className="mb-7">
          <h2 className="font-calistoga text-[clamp(1.5rem,3vw,2.1rem)] text-[#1A1A1A] mb-1.5">{cat?.label}</h2>
          {data.desc && <p className="font-nunito text-[0.88rem] text-[#8A8A8A]">{data.desc}</p>}
          <div className="w-11 h-[3px] bg-[#C41E3A] rounded-sm mt-3" />
        </div>

        {/* Items */}
        <div className="flex flex-col gap-3">
          {activeId === 'bubble' ? (
            <WaffleCrafter />
          ) : filteredItems.length > 0 ? (
            filteredItems.map((item: any) =>
              item.ticket
                ? <BoxCard key={item.id} item={item} onAdd={addToCart} />
                : <ProductCard key={item.id} item={item} catIcon={cat?.icon} onAdd={addToCart} />
            )
          ) : (
            <div className="text-center py-10 bg-white/40 rounded-[18px] border border-dashed border-[#F2E8E0]">
              <p className="font-nunito text-charcoal/60">Keine Produkte gefunden für "{searchQuery}"</p>
            </div>
          )}
        </div>

        {/* Note */}
        {data.note && (
          <div className="bg-[#F2E8E0] rounded-[14px] p-[14px_18px] mt-4.5 flex gap-2 items-start">
            <div className="w-[7px] h-[7px] bg-[#C41E3A] rounded-full mt-1 shrink-0" />
            <p className="font-nunito text-[0.84rem] text-[#4A4A4A] italic leading-[1.55]">{data.note}</p>
          </div>
        )}

        {/* Vitrine hint */}
        {(activeId === 'kuchen' || activeId === 'cookies') && (
          <div className="mt-6 bg-[#F2E8E0] rounded-[18px] p-[20px_22px] flex gap-4 items-center">
            <div className="w-14 h-14 rounded-xl bg-[#E8D5C4] flex items-center justify-center shrink-0">
              <Icons.Cake size={26} strokeWidth={1.4} color="#C41E3A" className="opacity-70" />
            </div>
            <p className="font-nunito text-[0.86rem] text-[#4A4A4A] italic leading-[1.6]">
              Weitere individuelle Produkte und Materialien findest du bei uns im Studio!
            </p>
          </div>
        )}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .scroll-hide{-ms-overflow-style:none;scrollbar-width:none}
        .scroll-hide::-webkit-scrollbar{display:none}
        .animate-fade-in { animation: fadeIn 0.4s ease both; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(18px) } to { opacity: 1; transform: none } }
      `}} />
    </div>
  );
}

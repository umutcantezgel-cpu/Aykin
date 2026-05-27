'use client';

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { db } from '@/lib/firebase';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { Euro, ShoppingBag, Trophy } from 'lucide-react';
import type { AnalyticsDaily } from '@/types/firestore';

const RevenueChart = dynamic(() => import('@/components/admin/RevenueChart'), { ssr: false });

export default function AdminDashboard() {
  const [data, setData] = useState<AnalyticsDaily[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAnalytics() {
      try {
        // Mock data if no firebase connection or empty
        const q = query(collection(db, 'analytics_daily'), orderBy('date', 'desc'), limit(7));
        const snap = await getDocs(q);
        
        if (!snap.empty) {
          const docs = snap.docs.map(d => d.data() as AnalyticsDaily).reverse();
          setData(docs);
        } else {
          // Fallback to demo data
          const demoData: AnalyticsDaily[] = Array.from({ length: 7 }).map((_, i) => {
            const date = new Date();
            date.setDate(date.getDate() - (6 - i));
            return {
              date: date.toISOString().split('T')[0],
              revenue: 300 + Math.random() * 500,
              orderCount: 15 + Math.floor(Math.random() * 30),
              topItems: [{ id: 'b1', name: 'Custom Prototyp', quantity: Math.floor(Math.random() * 10) }]
            };
          });
          setData(demoData);
        }
      } catch (err) {
        console.error("Error fetching analytics", err);
      } finally {
        setLoading(false);
      }
    }
    fetchAnalytics();
  }, []);

  const today = data.length > 0 ? data[data.length - 1] : null;

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="font-calistoga text-4xl text-charcoal mb-2">Dashboard</h1>
        <p className="font-bold text-charcoal/60">Tagesübersicht & Performance</p>
      </div>

      {loading ? (
        <div className="animate-pulse space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="h-32 bg-cream rounded-2xl"></div>
            <div className="h-32 bg-cream rounded-2xl"></div>
            <div className="h-32 bg-cream rounded-2xl"></div>
          </div>
          <div className="h-96 bg-cream rounded-2xl"></div>
        </div>
      ) : (
        <>
          {/* Stat Blocks */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-cream rounded-3xl p-6 shadow-sm border border-peach">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-terracotta/20 flex items-center justify-center text-terracotta">
                  <Euro className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-charcoal/60 text-sm">Umsatz Heute</h3>
                  <p className="font-calistoga text-3xl text-charcoal">
                    {today?.revenue.toFixed(2).replace('.', ',')} €
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-cream rounded-3xl p-6 shadow-sm border border-peach">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-brown/20 flex items-center justify-center text-brown">
                  <ShoppingBag className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-charcoal/60 text-sm">Aufträge</h3>
                  <p className="font-calistoga text-3xl text-charcoal">
                    {today?.orderCount}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-cream rounded-3xl p-6 shadow-sm border border-peach">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-peach flex items-center justify-center text-terracotta">
                  <Trophy className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-charcoal/60 text-sm">Top Item</h3>
                  <p className="font-calistoga text-xl text-charcoal line-clamp-1">
                    {today?.topItems?.[0]?.name || '-'}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-cream rounded-3xl p-6 shadow-sm border border-peach">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-mint/20 flex items-center justify-center text-mint">
                  <Euro className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-charcoal/60 text-sm">Ø Auftragswert</h3>
                  <p className="font-calistoga text-3xl text-charcoal">
                    {today && today.orderCount > 0 ? (today.revenue / today.orderCount).toFixed(2).replace('.', ',') : '0,00'} €
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Chart */}
          <div className="bg-cream rounded-3xl p-6 shadow-sm border border-peach h-[400px]">
            <h3 className="font-calistoga text-xl text-charcoal mb-6">Umsatz (Letzte 7 Tage)</h3>
            <RevenueChart data={data} />
          </div>
        </>
      )}
    </div>
  );
}

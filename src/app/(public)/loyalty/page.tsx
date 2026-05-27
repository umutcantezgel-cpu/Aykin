"use client";

import React, { useEffect, useState } from 'react';
import { TransitionLink } from '@/components/ui/TransitionLink';
import { ArrowLeft, Lock } from 'lucide-react';
import { useAuth } from '@/store/useAuth';
import { useAchievements } from '@/store/useAchievements';
import { ACHIEVEMENTS, type AchievementId } from '@/lib/achievements';
import { doc, getDoc, collection, query, orderBy, getDocs, limit } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { FadeUp } from '@/components/ui/FadeUp';
import { LoyaltyCoin } from '@/components/loyalty/LoyaltyCoin';
import { AuthGuard } from '@/components/auth/AuthGuard';

export default function LoyaltyPage() {
  const { user } = useAuth();
  const unlockedIds = useAchievements((s) => s.unlocked) as AchievementId[];
  const [balance, setBalance] = useState<number>(0);
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        const lpRef = doc(db, 'loyalty_points', user.uid);
        const lpSnap = await getDoc(lpRef);
        if (lpSnap.exists()) {
          setBalance(lpSnap.data().balance || 0);
        }

        const histRef = collection(db, 'loyalty_points', user.uid, 'history');
        const q = query(histRef, orderBy('createdAt', 'desc'), limit(10));
        const histSnap = await getDocs(q);
        setHistory(histSnap.docs.map(d => ({ id: d.id, ...d.data() })));
      } catch (e) {
        console.error("Failed to fetch loyalty points", e);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [user]);

  const allAchievements = Object.values(ACHIEVEMENTS);
  const unlocked = allAchievements.filter(a => unlockedIds.includes(a.id));
  const locked = allAchievements.filter(a => !unlockedIds.includes(a.id));

  return (
    <AuthGuard>
      <div className="min-h-screen bg-[#FAF8F5] text-[#1A1A1A] font-nunito pb-20">
        {/* Header */}
        <div className="bg-[#E8D5C4] pt-6 pb-8 px-5 relative overflow-hidden shadow-sm">
          <div className="absolute -top-10 -right-10 w-48 h-48 bg-[rgba(250,248,245,0.4)] rounded-full blur-2xl"></div>
          <div className="relative z-10 flex items-center justify-between mb-8">
            <button onClick={() => window.history.back()} className="w-10 h-10 bg-white/60 backdrop-blur-md rounded-full flex items-center justify-center">
              <ArrowLeft className="w-5 h-5 text-[#C41E3A]" />
            </button>
            <div className="font-calistoga text-lg text-[#1A1A1A]">Aykin Rewards</div>
            <div className="w-10 h-10" />
          </div>
          
          <FadeUp delay={0.1} className="text-center flex flex-col items-center">
            <div className="mb-4">
              <LoyaltyCoin />
            </div>
            <div className="text-[12px] font-black text-[#C41E3A] tracking-widest uppercase mb-1">Deine Coins</div>
            <div className="font-calistoga text-5xl text-[#1A1A1A]">{loading ? '...' : balance}</div>
          </FadeUp>
        </div>

        <div className="px-5 mt-8 space-y-8">
          {/* Explanation Section */}
          <FadeUp delay={0.2} className="bg-white p-5 rounded-[18px] shadow-sm text-center">
            <h3 className="font-calistoga text-lg text-[#1A1A1A] mb-2">So funktioniert's</h3>
            <p className="font-nunito text-[13px] text-[#7a5a52] leading-relaxed">
              Sammle Aykin Coins durch Achievements und Aufträge. Du kannst sie beim nächsten Checkout für Rabatte einlösen! (10 Coins = 1€)
            </p>
          </FadeUp>

          {/* History Section */}
          {history.length > 0 && (
            <div>
              <h2 className="font-calistoga text-xl text-[#1A1A1A] mb-4">Letzte Aktivitäten</h2>
              <div className="bg-white rounded-[18px] shadow-sm overflow-hidden">
                {history.map((item, idx) => (
                  <div key={item.id} className={`p-4 flex justify-between items-center ${idx !== history.length - 1 ? 'border-b border-[#F2E8E0]' : ''}`}>
                    <div>
                      <div className="font-bold text-[#1A1A1A] text-[13px]">{item.description || 'Punkte gesammelt'}</div>
                      <div className="text-[11px] font-semibold text-[#7a5a52] mt-0.5">
                        {item.createdAt ? new Date(item.createdAt).toLocaleDateString('de-DE') : ''}
                      </div>
                    </div>
                    <div className={`font-calistoga text-[16px] ${item.amount > 0 ? 'text-[#3a9d52]' : 'text-[#C41E3A]'}`}>
                      {item.amount > 0 ? '+' : ''}{item.amount}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Unlocked */}
          {unlocked.length > 0 && (
            <div>
              <h2 className="font-calistoga text-xl text-[#1A1A1A] mb-4">Freigeschaltet</h2>
              <div className="space-y-3">
                {unlocked.map((ach, i) => (
                  <FadeUp key={ach.id} delay={0.2 + (i * 0.05)} className="bg-white p-4 rounded-[18px] flex gap-4 items-center shadow-sm border border-[#F2E8E0]">
                    <div className="w-12 h-12 bg-[#E8D5C4] rounded-full flex items-center justify-center text-2xl shrink-0">
                      {ach.icon}
                    </div>
                    <div>
                      <div className="font-calistoga text-[15px] text-[#1A1A1A] leading-tight">{ach.title}</div>
                      <div className="text-[12px] font-semibold text-[#7a5a52] mt-1 leading-snug">{ach.description}</div>
                      {ach.coinReward && ach.coinReward > 0 && (
                        <div className="text-[10px] font-bold text-[#C41E3A] uppercase tracking-wider mt-2">
                          +{ach.coinReward} Coins erhalten
                        </div>
                      )}
                    </div>
                  </FadeUp>
                ))}
              </div>
            </div>
          )}

          {/* Locked */}
          {locked.length > 0 && (
            <div>
              <h2 className="font-calistoga text-xl text-[#1A1A1A] mb-4">Noch zu entdecken</h2>
              <div className="space-y-3">
                {locked.map((ach, i) => (
                  <FadeUp key={ach.id} delay={0.4 + (i * 0.05)} className="bg-[rgba(255,255,255,0.5)] p-4 rounded-[18px] flex gap-4 items-center border border-[rgba(242,232,224,0.5)] opacity-75 grayscale-[0.5]">
                    <div className="w-12 h-12 bg-[#F2E8E0] rounded-full flex items-center justify-center text-[#C41E3A] shrink-0">
                      <Lock className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-calistoga text-[15px] text-[#1A1A1A] leading-tight flex items-center gap-2">
                        ???
                        {ach.coinReward && ach.coinReward > 0 && (
                          <span className="bg-[rgba(232,213,196,0.5)] text-[#C41E3A] text-[10px] font-black uppercase px-2 py-0.5 rounded-full">
                            +{ach.coinReward} Coins
                          </span>
                        )}
                      </div>
                      <div className="text-[12px] font-semibold text-[#7a5a52] mt-1 leading-snug blur-[2px] select-none">
                        {ach.description}
                      </div>
                    </div>
                  </FadeUp>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </AuthGuard>
  );
}

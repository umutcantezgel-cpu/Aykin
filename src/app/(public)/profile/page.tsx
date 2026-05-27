"use client";

import React, { useState } from 'react';
import { TransitionLink } from '@/components/ui/TransitionLink';
import { Package, Gift, MapPin, User, LogOut, Loader2, Save, Plus, Trash2, Calendar } from 'lucide-react';
import { useAuth } from '@/store/useAuth';
import { useOrders } from '@/hooks/useOrders';
import { auth, db } from '@/lib/firebase';
import { signOut } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import { FadeUp } from '@/components/ui/FadeUp';
import { AuthGuard } from '@/components/auth/AuthGuard';

export default function ProfilePage() {
  const { user, dbUser } = useAuth();
  const { orders } = useOrders();

  const [isEditingData, setIsEditingData] = useState(false);
  const [name, setName] = useState(dbUser?.name || user?.displayName || "");
  const [phone, setPhone] = useState(dbUser?.phone || "");
  const [birthday, setBirthday] = useState(dbUser?.birthday || "");
  const [savingData, setSavingData] = useState(false);

  const [addresses, setAddresses] = useState<any[]>(dbUser?.addresses || []);
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [newAddress, setNewAddress] = useState({ street: "", zip: "", city: "" });

  const orderCount = orders.length;

  const handleLogout = async () => {
    await signOut(auth);
  };

  const handleSaveData = async () => {
    if (!user) return;
    setSavingData(true);
    try {
      await updateDoc(doc(db, 'users', user.uid), {
        name,
        phone,
        birthday
      });
      setIsEditingData(false);
    } catch (e) {
      console.error(e);
      alert("Fehler beim Speichern");
    } finally {
      setSavingData(false);
    }
  };

  const handleAddAddress = async () => {
    if (!user) return;
    if (!newAddress.street || !newAddress.zip || !newAddress.city) return;
    setSavingData(true);
    try {
      const updated = [...addresses, newAddress];
      await updateDoc(doc(db, 'users', user.uid), {
        addresses: updated
      });
      setAddresses(updated);
      setIsAddingAddress(false);
      setNewAddress({ street: "", zip: "", city: "" });
    } catch (e) {
      console.error(e);
    } finally {
      setSavingData(false);
    }
  };

  const handleDeleteAddress = async (index: number) => {
    if (!user) return;
    setSavingData(true);
    try {
      const updated = addresses.filter((_, i) => i !== index);
      await updateDoc(doc(db, 'users', user.uid), {
        addresses: updated
      });
      setAddresses(updated);
    } catch (e) {
      console.error(e);
    } finally {
      setSavingData(false);
    }
  };

  return (
    <AuthGuard>
      <div className="min-h-screen bg-[#FAF8F5] text-[#1A1A1A] font-nunito pb-20">
        {/* Hero header */}
        <div className="bg-[#E8D5C4] pt-12 pb-10 px-6 relative overflow-hidden">
          <div className="absolute -top-8 -right-8 w-40 h-40 bg-[rgba(250,248,245,0.4)] rounded-[58%_42%_52%_48%/48%_58%_42%_52%]"></div>
          <div className="relative flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-[#C41E3A] flex items-center justify-center text-white font-calistoga text-2xl shadow-sm">
              {name?.[0]?.toUpperCase() || 'H'}
            </div>
            <div>
              <div className="text-[10px] font-black text-[#C41E3A] tracking-widest uppercase">Mein Konto</div>
              <div className="font-calistoga text-2xl text-[#1A1A1A] mt-0.5 leading-none">{name || 'Gast'}</div>
              <div className="text-xs text-[#7a5a52] mt-1.5 font-bold">Mitglied seit {dbUser?.createdAt ? new Date(dbUser.createdAt).getFullYear() : '2024'}</div>
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div className="-mt-4 mx-5 bg-white rounded-[18px] p-4 shadow-sm relative z-10 flex divide-x divide-[#F2E8E0]">
          <TransitionLink href="/profile/orders" className="flex-1 text-center py-2 block hover:bg-[#FAF8F5] rounded-l-xl transition-colors">
            <div className="text-2xl font-calistoga text-[#1A1A1A]">{orderCount}</div>
            <div className="text-[11px] font-bold text-[#7a5a52] mt-1 uppercase tracking-wide">Bestellungen</div>
          </TransitionLink>
          <TransitionLink href="/loyalty" className="flex-1 text-center py-2 block hover:bg-[#FAF8F5] rounded-r-xl transition-colors">
            <div className="text-2xl font-calistoga text-[#1A1A1A] flex items-center justify-center gap-1">
              <Gift className="w-5 h-5 text-[#C41E3A]" />
            </div>
            <div className="text-[11px] font-bold text-[#7a5a52] mt-1 uppercase tracking-wide">Rewards</div>
          </TransitionLink>
        </div>

        <div className="px-5 mt-6 space-y-5">
          {/* Sektion 1: Persönliche Daten & Geburtstag */}
          <FadeUp delay={0.1}>
            <div className="flex justify-between items-baseline mb-2.5">
              <div className="font-nunito text-[11px] font-black text-[#C41E3A] tracking-[1.4px] uppercase">Persönliche Daten</div>
              <button onClick={() => isEditingData ? handleSaveData() : setIsEditingData(true)} disabled={savingData} className="font-nunito text-[11px] font-extrabold text-[#C41E3A] underline">
                {savingData ? "..." : isEditingData ? "Speichern" : "Bearbeiten"}
              </button>
            </div>
            <div className="bg-white rounded-[18px] p-1 shadow-sm">
              <div className="p-3.5 border-b border-[#F2E8E0] flex gap-3 items-center">
                <User size={18} className="text-[#C41E3A]" />
                <div className="flex-1">
                  <div className="font-nunito text-[10px] font-extrabold text-[#7a5a52] uppercase tracking-wider mb-0.5">Name</div>
                  {isEditingData ? (
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full font-bold text-[#1A1A1A] bg-[#FAF8F5] px-2 py-1 rounded outline-none" />
                  ) : (
                    <div className="font-bold text-[#1A1A1A] text-[13px]">{name}</div>
                  )}
                </div>
              </div>
              <div className="p-3.5 border-b border-[#F2E8E0] flex gap-3 items-center">
                <div className="w-[18px]" />
                <div className="flex-1">
                  <div className="font-nunito text-[10px] font-extrabold text-[#7a5a52] uppercase tracking-wider mb-0.5">Handy</div>
                  {isEditingData ? (
                    <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full font-bold text-[#1A1A1A] bg-[#FAF8F5] px-2 py-1 rounded outline-none" />
                  ) : (
                    <div className="font-bold text-[#1A1A1A] text-[13px]">{phone || '—'}</div>
                  )}
                </div>
              </div>
              <div className="p-3.5 flex gap-3 items-center">
                <Calendar size={18} className="text-[#C41E3A]" />
                <div className="flex-1">
                  <div className="font-nunito text-[10px] font-extrabold text-[#7a5a52] uppercase tracking-wider mb-0.5">Geburtstag (für Überraschungen 🎁)</div>
                  {isEditingData ? (
                    <input type="date" value={birthday} onChange={(e) => setBirthday(e.target.value)} className="w-full font-bold text-[#1A1A1A] bg-[#FAF8F5] px-2 py-1 rounded outline-none" />
                  ) : (
                    <div className="font-bold text-[#1A1A1A] text-[13px]">{birthday ? new Date(birthday).toLocaleDateString('de-DE') : '—'}</div>
                  )}
                </div>
              </div>
            </div>
          </FadeUp>

          {/* Sektion 2: Adressen */}
          <FadeUp delay={0.2}>
            <div className="flex justify-between items-baseline mb-2.5">
              <div className="font-nunito text-[11px] font-black text-[#C41E3A] tracking-[1.4px] uppercase">Lieferadressen</div>
            </div>
            
            <div className="space-y-2">
              {addresses.map((addr, i) => (
                <div key={i} className="bg-white rounded-[18px] p-3.5 shadow-sm flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <MapPin size={18} className="text-[#C41E3A]" />
                    <div>
                      <div className="font-bold text-[#1A1A1A] text-[13px]">{addr.street}</div>
                      <div className="text-[11px] text-[#7a5a52] font-semibold">{addr.zip} {addr.city}</div>
                    </div>
                  </div>
                  <button onClick={() => handleDeleteAddress(i)} disabled={savingData} className="w-8 h-8 rounded-full bg-[#FAF8F5] flex items-center justify-center text-[#C41E3A] hover:bg-[#F2E8E0]">
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}

              {isAddingAddress ? (
                <div className="bg-white rounded-[18px] p-4 shadow-sm border border-[#C41E3A]">
                  <div className="space-y-2.5">
                    <input type="text" placeholder="Straße & Hausnr." value={newAddress.street} onChange={e => setNewAddress({...newAddress, street: e.target.value})} className="w-full font-bold text-[#1A1A1A] text-sm bg-[#FAF8F5] px-3 py-2 rounded-xl outline-none" />
                    <div className="flex gap-2">
                      <input type="text" placeholder="PLZ" value={newAddress.zip} onChange={e => setNewAddress({...newAddress, zip: e.target.value})} className="w-1/3 font-bold text-[#1A1A1A] text-sm bg-[#FAF8F5] px-3 py-2 rounded-xl outline-none" />
                      <input type="text" placeholder="Ort" value={newAddress.city} onChange={e => setNewAddress({...newAddress, city: e.target.value})} className="flex-1 font-bold text-[#1A1A1A] text-sm bg-[#FAF8F5] px-3 py-2 rounded-xl outline-none" />
                    </div>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <button onClick={handleAddAddress} disabled={savingData} className="flex-1 bg-[#C41E3A] text-white font-bold text-[12px] py-2 rounded-xl">Hinzufügen</button>
                    <button onClick={() => setIsAddingAddress(false)} disabled={savingData} className="flex-1 bg-[#F2E8E0] text-[#1A1A1A] font-bold text-[12px] py-2 rounded-xl">Abbrechen</button>
                  </div>
                </div>
              ) : (
                <button onClick={() => setIsAddingAddress(true)} className="w-full bg-[rgba(255,255,255,0.6)] rounded-[18px] p-3.5 flex items-center justify-center gap-2 border-2 border-dashed border-[#E8D5C4] text-[#C41E3A] font-extrabold text-[12.5px] hover:bg-white transition-colors">
                  <Plus size={16} /> Neue Adresse
                </button>
              )}
            </div>
          </FadeUp>
        </div>

        {/* Logout */}
        <div className="pt-10 pb-12 text-center">
          <button onClick={handleLogout} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[rgba(196,30,58,0.1)] hover:bg-[rgba(196,30,58,0.15)] transition-colors">
            <LogOut size={16} className="text-[#C41E3A]" strokeWidth={2} />
            <span className="text-[13px] font-bold text-[#C41E3A]">Abmelden</span>
          </button>
        </div>
      </div>
    </AuthGuard>
  );
}

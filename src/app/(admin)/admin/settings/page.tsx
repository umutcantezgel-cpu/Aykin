'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useStoreSettings } from '@/hooks/useStoreSettings';
import { db } from '@/lib/firebase';
import { doc, updateDoc, setDoc, collection, getDocs, deleteDoc } from 'firebase/firestore';
import { Power, Clock, Megaphone, Calendar, AlertTriangle, Tag, Trash2, Plus } from 'lucide-react';
import { useToastStore } from '@/store/useToastStore';

export default function AdminSettingsPage() {
  const { settings, loading } = useStoreSettings();
  const { addToast } = useToastStore();
  
  const [localSettings, setLocalSettings] = useState({
    currentWaitTime: 15,
    bannerText: '',
    emergencyNotice: '',
    openingHours: 'Mi-Sa 12-19 Uhr, So 13-19 Uhr',
    deliveryZones: '35576, 35578'
  });
  const [isSaving, setIsSaving] = useState(false);
  
  const [promoCodes, setPromoCodes] = useState<any[]>([]);
  const [newPromo, setNewPromo] = useState({ code: '', type: 'fixed', amount: 0 });

  const fetchPromoCodes = async () => {
    try {
      const snap = await getDocs(collection(db, 'promo_codes'));
      setPromoCodes(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (settings) {
      setLocalSettings({
        currentWaitTime: settings.currentWaitTime || 15,
        bannerText: settings.bannerText || '',
        emergencyNotice: (settings as any).emergencyNotice || '',
        openingHours: (settings as any).openingHours || 'Mi-Sa 12-19 Uhr, So 13-19 Uhr',
        deliveryZones: (settings as any).deliveryZones || '35576, 35578'
      });
    }
    fetchPromoCodes();
  }, [settings]);

  const handleToggleOnline = async () => {
    if (!settings) return;
    try {
      await updateDoc(doc(db, 'store_settings', 'general'), {
        isOnline: !settings.isOnline
      });
      addToast({
        title: !settings.isOnline ? 'Shop ist Online' : 'Notfall-Stopp aktiv',
        message: !settings.isOnline ? 'Aufträge werden jetzt angenommen.' : 'Auftragsannahme gestoppt.',
        type: !settings.isOnline ? 'success' : 'error'
      });
    } catch (err) {
      console.error(err);
      addToast({ title: 'Fehler', message: 'Status konnte nicht geändert werden.', type: 'error' });
    }
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await setDoc(doc(db, 'store_settings', 'general'), {
        ...localSettings
      }, { merge: true });
      addToast({ title: 'Gespeichert', message: 'Einstellungen wurden erfolgreich aktualisiert.', type: 'success' });
    } catch (err) {
      console.error(err);
      addToast({ title: 'Fehler', message: 'Speichern fehlgeschlagen.', type: 'error' });
    } finally {
      setIsSaving(false);
    }
  };

  const handleAddPromo = async () => {
    if (!newPromo.code || newPromo.amount <= 0) return;
    try {
      const codeUpper = newPromo.code.toUpperCase();
      await setDoc(doc(db, 'promo_codes', codeUpper), {
        type: newPromo.type,
        amount: newPromo.amount,
        active: true
      });
      setNewPromo({ code: '', type: 'fixed', amount: 0 });
      fetchPromoCodes();
      addToast({ title: 'Gutschein erstellt', type: 'success' });
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeletePromo = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'promo_codes', id));
      fetchPromoCodes();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-10">
        <h1 className="font-calistoga text-4xl text-charcoal mb-2">Einstellungen</h1>
        <p className="font-bold text-charcoal/60">Store-Status, Wartezeiten und Texte verwalten</p>
      </div>

      {loading ? (
        <div className="animate-pulse flex flex-col gap-8">
          <div className="h-32 bg-cream rounded-3xl" />
          <div className="h-64 bg-cream rounded-3xl" />
        </div>
      ) : (
        <div className="flex flex-col gap-8">
          
          {/* Emergency Stop Toggle */}
          <div className={`p-8 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6 transition-colors duration-500 ${settings?.isOnline ? 'bg-mint/20 border-mint/40' : 'bg-red-500/10 border-red-500/20'} border-2`}>
            <div>
              <h2 className="font-calistoga text-2xl text-charcoal mb-2 flex items-center gap-3">
                <Power className={settings?.isOnline ? 'text-mint' : 'text-red-500'} />
                {settings?.isOnline ? 'Store ist Online' : 'Store ist Offline (Notfall-Stopp)'}
              </h2>
              <p className="font-bold text-charcoal/70">
                {settings?.isOnline 
                  ? 'Kunden können aktuell Aufträge aufgeben.' 
                  : 'Die Auftragsannahme ist komplett deaktiviert. Der Shop zeigt einen Wartungshinweis.'}
              </p>
            </div>

            <button 
              onClick={handleToggleOnline}
              className={`relative flex h-14 w-28 items-center rounded-full p-2 transition-colors duration-500 shrink-0 ${settings?.isOnline ? 'bg-mint' : 'bg-red-500'}`}
            >
              <motion.div 
                layout
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className="h-10 w-10 rounded-full bg-white shadow-lg flex items-center justify-center"
              >
                <Power className={`w-5 h-5 ${settings?.isOnline ? 'text-mint' : 'text-red-500'}`} />
              </motion.div>
              {/* This span pushes the toggle to the right if online using flex properties (e.g. justify-end) 
                  Or we can just rely on layout animation inside a flex-start/flex-end container */}
              <div className="absolute inset-0 flex items-center justify-between px-4 pointer-events-none">
                <span className={`text-white font-bold text-xs ${settings?.isOnline ? 'opacity-100' : 'opacity-0'}`}>ON</span>
                <span className={`text-white font-bold text-xs ${!settings?.isOnline ? 'opacity-100' : 'opacity-0'}`}>OFF</span>
              </div>
            </button>
          </div>

          {/* Settings Form */}
          <form onSubmit={handleSaveSettings} className="bg-cream p-8 rounded-3xl border border-peach flex flex-col gap-6">
            <h2 className="font-calistoga text-2xl text-charcoal mb-2 border-b border-peach pb-4">Allgemeine Einstellungen</h2>

            <div>
              <label className="flex items-center gap-2 text-sm font-bold text-brown mb-2">
                <Clock className="w-4 h-4" /> Aktuelle Wartezeit (Minuten)
              </label>
              <input 
                type="number" 
                value={localSettings.currentWaitTime}
                onChange={e => setLocalSettings({...localSettings, currentWaitTime: parseInt(e.target.value) || 0})}
                className="w-full px-4 py-3 rounded-xl bg-sand border border-peach focus:outline-none focus:border-terracotta font-bold text-charcoal max-w-xs"
              />
              <p className="text-xs text-charcoal/50 mt-2 font-bold">
                Wird im Checkout als geschätzte Bearbeitungszeit angezeigt.
              </p>
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-bold text-brown mb-2">
                <Megaphone className="w-4 h-4" /> Promo-Banner Text
              </label>
              <input 
                type="text" 
                value={localSettings.bannerText}
                onChange={e => setLocalSettings({...localSettings, bannerText: e.target.value})}
                placeholder="z.B. Heute 10% auf alle 3D-Drucke!"
                className="w-full px-4 py-3 rounded-xl bg-sand border border-peach focus:outline-none focus:border-terracotta font-bold text-charcoal"
              />
              <p className="text-xs text-charcoal/50 mt-2 font-bold">
                Wird als Marquee im Header angezeigt. Leer lassen zum Ausblenden.
              </p>
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-bold text-brown mb-2">
                <AlertTriangle className="w-4 h-4" /> Notfall-Banner Text
              </label>
              <input 
                type="text" 
                value={localSettings.emergencyNotice}
                onChange={e => setLocalSettings({...localSettings, emergencyNotice: e.target.value})}
                placeholder="z.B. Wir haben heute wegen Krankheit geschlossen."
                className="w-full px-4 py-3 rounded-xl bg-sand border border-peach focus:outline-none focus:border-terracotta font-bold text-charcoal"
              />
              <p className="text-xs text-charcoal/50 mt-2 font-bold">
                Wird nur angezeigt, wenn der Store Offline geschaltet ist.
              </p>
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-bold text-brown mb-2">
                <Calendar className="w-4 h-4" /> Öffnungszeiten (Anzeige)
              </label>
              <input 
                type="text" 
                value={localSettings.openingHours}
                onChange={e => setLocalSettings({...localSettings, openingHours: e.target.value})}
                className="w-full px-4 py-3 rounded-xl bg-sand border border-peach focus:outline-none focus:border-terracotta font-bold text-charcoal"
              />
            </div>
            
            <div>
              <label className="flex items-center gap-2 text-sm font-bold text-brown mb-2">
                Lieferzonen (PLZ, kommagetrennt)
              </label>
              <input 
                type="text" 
                value={localSettings.deliveryZones}
                onChange={e => setLocalSettings({...localSettings, deliveryZones: e.target.value})}
                className="w-full px-4 py-3 rounded-xl bg-sand border border-peach focus:outline-none focus:border-terracotta font-bold text-charcoal"
              />
            </div>

            <button 
              type="submit"
              disabled={isSaving}
              className="mt-6 bg-terracotta text-cream py-4 rounded-xl font-bold text-lg shadow-clay hover:bg-brown transition-colors disabled:opacity-50"
            >
              {isSaving ? 'Speichert...' : 'Einstellungen speichern'}
            </button>
          </form>

          {/* Promo Codes Section */}
          <div className="bg-cream p-8 rounded-3xl border border-peach flex flex-col gap-6">
            <h2 className="font-calistoga text-2xl text-charcoal mb-2 border-b border-peach pb-4 flex items-center gap-2">
              <Tag className="w-6 h-6 text-terracotta" /> Promo Codes
            </h2>
            
            <div className="bg-sand p-4 rounded-2xl flex gap-3 items-end">
              <div className="flex-1">
                <label className="block text-xs font-bold text-brown mb-1">Code</label>
                <input type="text" value={newPromo.code} onChange={e => setNewPromo({...newPromo, code: e.target.value})} placeholder="z.B. SUMMER24" className="w-full bg-cream border border-peach px-3 py-2 rounded-xl outline-none font-bold uppercase" />
              </div>
              <div className="w-32">
                <label className="block text-xs font-bold text-brown mb-1">Typ</label>
                <select value={newPromo.type} onChange={e => setNewPromo({...newPromo, type: e.target.value})} className="w-full bg-cream border border-peach px-3 py-2 rounded-xl outline-none font-bold">
                  <option value="fixed">€ Rabatt</option>
                  <option value="percent">% Rabatt</option>
                </select>
              </div>
              <div className="w-24">
                <label className="block text-xs font-bold text-brown mb-1">Wert</label>
                <input type="number" value={newPromo.amount || ''} onChange={e => setNewPromo({...newPromo, amount: parseFloat(e.target.value) || 0})} className="w-full bg-cream border border-peach px-3 py-2 rounded-xl outline-none font-bold" />
              </div>
              <button onClick={handleAddPromo} className="bg-terracotta text-cream px-4 py-2 rounded-xl font-bold mb-[1px]"><Plus size={20} /></button>
            </div>

            <div className="space-y-3">
              {promoCodes.map(promo => (
                <div key={promo.id} className="flex justify-between items-center bg-white p-4 rounded-2xl border border-peach shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="font-calistoga text-lg text-terracotta">{promo.id}</div>
                    <span className="px-2 py-1 bg-sand text-brown rounded-full text-[10px] font-black uppercase tracking-widest">
                      {promo.type === 'fixed' ? `${promo.amount}€` : `${promo.amount}%`}
                    </span>
                  </div>
                  <button onClick={() => handleDeletePromo(promo.id)} className="text-charcoal/40 hover:text-red-500 transition-colors">
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
              {promoCodes.length === 0 && <div className="text-sm font-bold text-charcoal/50">Keine Gutscheincodes vorhanden.</div>}
            </div>
          </div>

        </div>
      )}
    </div>
  );
}

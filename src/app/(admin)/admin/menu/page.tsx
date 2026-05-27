'use client';

import React, { useState } from 'react';
import { useMenu } from '@/hooks/useMenu';
import { db } from '@/lib/firebase';
import { doc, updateDoc, addDoc, collection } from 'firebase/firestore';
import type { MenuItem } from '@/types/firestore';
import { Search, Edit2, Check, X, Plus } from 'lucide-react';
import { Modal } from '@/components/molecules/feedback/Modal';

export default function AdminMenuPage() {
  const { items, loading } = useMenu();
  const [searchTerm, setSearchTerm] = useState('');
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);

  const handleToggleAvailable = async (item: MenuItem) => {
    try {
      await updateDoc(doc(db, 'menu_items', item.id), {
        available: !item.available
      });
    } catch (err) {
      console.error('Failed to toggle availability', err);
    }
  };

  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;
    try {
      const { id, ...data } = editingItem;
      if (id === 'new') {
        await addDoc(collection(db, 'menu_items'), data);
      } else {
        await updateDoc(doc(db, 'menu_items', id), data);
      }
      setEditingItem(null);
    } catch (err) {
      console.error('Failed to save item', err);
    }
  };

  const handleAddNew = () => {
    setEditingItem({
      id: 'new',
      name: '',
      desc: '',
      price: 0,
      category: 'boxen',
      available: true,
      tags: [],
      icon: '',
      color: ''
    } as unknown as MenuItem);
  };

  const filteredItems = items.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="font-calistoga text-4xl text-charcoal mb-2">Menü Manager</h1>
          <p className="font-bold text-charcoal/60">Produkte, Preise und Verfügbarkeit verwalten</p>
        </div>
        
        <div className="flex gap-4 w-full md:w-auto">
          <div className="relative w-full md:w-72">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-charcoal/40" />
            <input 
              type="text" 
              placeholder="Suchen..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-full bg-cream border border-peach focus:outline-none focus:border-terracotta font-bold text-charcoal placeholder:text-charcoal/40"
            />
          </div>
          <button 
            onClick={handleAddNew}
            className="flex items-center gap-2 bg-terracotta text-cream px-6 py-3 rounded-full font-bold shadow-clay hover:bg-brown transition-colors shrink-0"
          >
            <Plus className="w-5 h-5" />
            Neues Produkt
          </button>
        </div>
      </div>

      {loading ? (
        <div className="animate-pulse flex flex-col gap-4">
          {[1,2,3,4,5].map(i => <div key={i} className="h-20 bg-cream rounded-2xl" />)}
        </div>
      ) : (
        <div className="bg-cream rounded-3xl overflow-hidden shadow-sm border border-peach">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-peach">
                <th className="py-4 px-6 font-calistoga text-terracotta">Produkt</th>
                <th className="py-4 px-6 font-calistoga text-terracotta hidden md:table-cell">Kategorie</th>
                <th className="py-4 px-6 font-calistoga text-terracotta">Preis</th>
                <th className="py-4 px-6 font-calistoga text-terracotta text-center">Verfügbar</th>
                <th className="py-4 px-6 font-calistoga text-terracotta text-right">Aktion</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map(item => (
                <tr key={item.id} className="border-b border-peach/50 hover:bg-peach/10 transition-colors">
                  <td className="py-4 px-6">
                    <div className="font-bold text-charcoal">{item.name}</div>
                    <div className="text-xs text-charcoal/60 line-clamp-1 max-w-xs">{item.desc}</div>
                  </td>
                  <td className="py-4 px-6 hidden md:table-cell">
                    <span className="bg-sand px-3 py-1 rounded-full text-xs font-bold text-brown uppercase tracking-wider">
                      {item.category}
                    </span>
                  </td>
                  <td className="py-4 px-6 font-bold text-charcoal">
                    {typeof item.price === 'number' ? item.price.toFixed(2).replace('.', ',') : item.price} €
                  </td>
                  <td className="py-4 px-6 text-center">
                    <button 
                      onClick={() => handleToggleAvailable(item)}
                      className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors ${item.available ? 'bg-terracotta' : 'bg-charcoal/20'}`}
                    >
                      <span className={`inline-block h-5 w-5 transform rounded-full bg-cream transition-transform shadow-sm ${item.available ? 'translate-x-6' : 'translate-x-1'}`} />
                    </button>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <button 
                      onClick={() => setEditingItem(item)}
                      className="p-2 text-charcoal/60 hover:text-terracotta hover:bg-peach/30 rounded-full transition-colors"
                    >
                      <Edit2 className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Edit Modal */}
      <Modal 
        isOpen={!!editingItem} 
        onClose={() => setEditingItem(null)} 
        title={editingItem?.id === 'new' ? "Neues Produkt anlegen" : "Produkt bearbeiten"}
      >
        {editingItem && (
          <form onSubmit={handleSaveEdit} className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-bold text-brown mb-1">Name</label>
              <input 
                type="text" 
                value={editingItem.name} 
                onChange={e => setEditingItem({ ...editingItem, name: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-sand border border-peach focus:outline-none focus:border-terracotta font-bold text-charcoal"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-brown mb-1">Preis (€)</label>
                <input 
                  type="number" 
                  step="0.01"
                  value={editingItem.price} 
                  onChange={e => setEditingItem({ ...editingItem, price: parseFloat(e.target.value) })}
                  className="w-full px-4 py-3 rounded-xl bg-sand border border-peach focus:outline-none focus:border-terracotta font-bold text-charcoal"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-brown mb-1">Kategorie</label>
                <input 
                  type="text" 
                  value={editingItem.category} 
                  onChange={e => setEditingItem({ ...editingItem, category: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-sand border border-peach focus:outline-none focus:border-terracotta font-bold text-charcoal"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-brown mb-1">Beschreibung</label>
              <textarea 
                value={editingItem.desc} 
                onChange={e => setEditingItem({ ...editingItem, desc: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-sand border border-peach focus:outline-none focus:border-terracotta font-bold text-charcoal min-h-[100px] resize-none"
              />
            </div>

            <button 
              type="submit"
              className="mt-4 bg-terracotta text-cream py-3 rounded-xl font-bold text-lg shadow-clay hover:bg-brown transition-colors"
            >
              Speichern
            </button>
          </form>
        )}
      </Modal>
    </div>
  );
}

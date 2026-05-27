'use client';

import React, { useState, useEffect } from 'react';
import { collection, query, getDocs, doc, updateDoc, getDoc, setDoc, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Search, UserCog, Mail, ShieldAlert, Coins, History, Check, X, Shield, ChevronRight } from 'lucide-react';
import { Modal } from '@/components/molecules/feedback/Modal';
import { useToastStore } from '@/store/useToastStore';

type UserData = {
  id: string;
  name?: string;
  email?: string;
  role: 'customer' | 'admin';
  createdAt?: string;
};

export default function AdminUsersPage() {
  const [activeTab, setActiveTab] = useState<'users' | 'support'>('users');
  const [users, setUsers] = useState<UserData[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);
  const [userOrders, setUserOrders] = useState<any[]>([]);
  const [userBalance, setUserBalance] = useState<number>(0);
  const [coinAmountToAdd, setCoinAmountToAdd] = useState<number>(0);
  
  const { addToast } = useToastStore();

  useEffect(() => {
    fetchUsers();
    fetchSupportMessages();
  }, []);

  const fetchUsers = async () => {
    try {
      const snap = await getDocs(collection(db, 'users'));
      setUsers(snap.docs.map(d => ({ id: d.id, ...d.data() } as UserData)));
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const fetchSupportMessages = async () => {
    try {
      const q = query(collection(db, 'support_messages'), orderBy('createdAt', 'desc'));
      const snap = await getDocs(q);
      setMessages(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    } catch (e) {
      console.error(e);
    }
  };

  const loadUserDetails = async (u: UserData) => {
    setSelectedUser(u);
    // Fetch orders
    const qOrders = query(collection(db, 'orders'));
    const orderSnap = await getDocs(qOrders);
    setUserOrders(orderSnap.docs.map(d => ({ id: d.id, ...d.data() })).filter((o: any) => o.userId === u.id || o.customerEmail === u.email));
    
    // Fetch loyalty balance
    const lpRef = doc(db, 'loyalty_points', u.id);
    const lpSnap = await getDoc(lpRef);
    if (lpSnap.exists()) {
      setUserBalance(lpSnap.data().balance || 0);
    } else {
      setUserBalance(0);
    }
  };

  const handleRoleChange = async (newRole: 'admin' | 'customer') => {
    if (!selectedUser) return;
    if (confirm(`Wirklich die Rolle von ${selectedUser.name || selectedUser.email} auf ${newRole.toUpperCase()} ändern?`)) {
      try {
        await updateDoc(doc(db, 'users', selectedUser.id), { role: newRole });
        setUsers(users.map(u => u.id === selectedUser.id ? { ...u, role: newRole } : u));
        setSelectedUser({ ...selectedUser, role: newRole });
        addToast({ title: 'Rolle aktualisiert', type: 'success' });
      } catch (e) {
        console.error(e);
        addToast({ title: 'Fehler', type: 'error' });
      }
    }
  };

  const handleAddCoins = async () => {
    if (!selectedUser || coinAmountToAdd <= 0) return;
    try {
      const newBalance = userBalance + coinAmountToAdd;
      await setDoc(doc(db, 'loyalty_points', selectedUser.id), { balance: newBalance }, { merge: true });
      
      const historyRef = collection(db, 'loyalty_points', selectedUser.id, 'history');
      await setDoc(doc(historyRef), {
        amount: coinAmountToAdd,
        description: 'Manuelle Gutschrift (Admin)',
        createdAt: new Date().toISOString()
      });
      
      setUserBalance(newBalance);
      setCoinAmountToAdd(0);
      addToast({ title: 'Coins gutgeschrieben', type: 'success' });
    } catch (e) {
      console.error(e);
      addToast({ title: 'Fehler', type: 'error' });
    }
  };

  const filteredUsers = users.filter(u => 
    (u.name?.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (u.email?.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="p-8 max-w-6xl mx-auto flex gap-6">
      <div className="flex-1">
        <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <h1 className="font-calistoga text-4xl text-charcoal mb-2">Nutzer & Support</h1>
            <p className="font-bold text-charcoal/60">Kundenverwaltung, Rechte und Nachrichten</p>
          </div>
          
          <div className="flex gap-2">
            <button 
              onClick={() => setActiveTab('users')}
              className={`px-4 py-2 rounded-xl font-bold flex items-center gap-2 ${activeTab === 'users' ? 'bg-terracotta text-cream' : 'bg-cream text-charcoal border border-peach'}`}
            >
              <UserCog size={18} /> Nutzer
            </button>
            <button 
              onClick={() => setActiveTab('support')}
              className={`px-4 py-2 rounded-xl font-bold flex items-center gap-2 ${activeTab === 'support' ? 'bg-terracotta text-cream' : 'bg-cream text-charcoal border border-peach'}`}
            >
              <Mail size={18} /> Support Inbox
            </button>
          </div>
        </div>

        {loading ? (
          <div className="animate-pulse flex flex-col gap-4">
            <div className="h-20 bg-cream rounded-2xl" />
            <div className="h-20 bg-cream rounded-2xl" />
          </div>
        ) : activeTab === 'users' ? (
          <div className="bg-cream rounded-3xl overflow-hidden shadow-sm border border-peach">
            <div className="p-4 border-b border-peach">
              <div className="relative w-full max-w-md">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-charcoal/40" />
                <input 
                  type="text" 
                  placeholder="Suchen nach Name oder E-Mail..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-2 rounded-full bg-sand border border-peach focus:outline-none focus:border-terracotta font-bold text-charcoal"
                />
              </div>
            </div>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-peach bg-sand/50">
                  <th className="py-3 px-6 font-calistoga text-terracotta">Name</th>
                  <th className="py-3 px-6 font-calistoga text-terracotta">E-Mail</th>
                  <th className="py-3 px-6 font-calistoga text-terracotta text-center">Rolle</th>
                  <th className="py-3 px-6 font-calistoga text-terracotta text-right">Details</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map(u => (
                  <tr key={u.id} className="border-b border-peach/50 hover:bg-peach/10 transition-colors">
                    <td className="py-3 px-6 font-bold text-charcoal">{u.name || '-'}</td>
                    <td className="py-3 px-6 text-charcoal/80 text-sm">{u.email || '-'}</td>
                    <td className="py-3 px-6 text-center">
                      <span className={`px-2 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${u.role === 'admin' ? 'bg-terracotta text-cream' : 'bg-mint/20 text-mint'}`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="py-3 px-6 text-right">
                      <button onClick={() => loadUserDetails(u)} className="p-2 text-terracotta bg-peach/30 rounded-full hover:bg-peach/80 transition-colors">
                        <ChevronRight size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.length === 0 ? (
              <div className="text-center p-8 bg-cream rounded-3xl border border-peach text-charcoal/60 font-bold">Keine Support-Nachrichten</div>
            ) : (
              messages.map(m => (
                <div key={m.id} className="bg-cream rounded-3xl p-6 shadow-sm border border-peach">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="font-bold text-charcoal">{m.name}</div>
                      <div className="text-sm text-terracotta">{m.email}</div>
                    </div>
                    <div className="text-xs font-bold text-charcoal/40">
                      {m.createdAt ? new Date(m.createdAt).toLocaleDateString() : ''}
                    </div>
                  </div>
                  <p className="mt-4 text-charcoal/80 text-sm leading-relaxed whitespace-pre-wrap">{m.message}</p>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* Detail Pane */}
      {selectedUser && (
        <div className="w-96 bg-cream rounded-3xl border border-peach shadow-sm flex flex-col h-[calc(100vh-8rem)] sticky top-8">
          <div className="p-6 border-b border-peach flex justify-between items-start">
            <div>
              <div className="font-calistoga text-2xl text-charcoal line-clamp-1">{selectedUser.name || 'Ohne Name'}</div>
              <div className="text-sm text-charcoal/60 font-bold">{selectedUser.email}</div>
            </div>
            <button onClick={() => setSelectedUser(null)} className="p-1 bg-peach/30 text-terracotta rounded-full"><X size={18} /></button>
          </div>
          
          <div className="p-6 flex-1 overflow-y-auto space-y-8">
            {/* Rolle */}
            <div>
              <h4 className="font-nunito text-[11px] font-black text-terracotta tracking-[1.4px] uppercase mb-3">Rechteverwaltung</h4>
              <div className="flex gap-2">
                <button 
                  onClick={() => handleRoleChange('customer')}
                  disabled={selectedUser.role === 'customer'}
                  className={`flex-1 py-2 rounded-xl font-bold text-sm border-2 ${selectedUser.role === 'customer' ? 'border-mint text-mint bg-mint/10' : 'border-peach text-charcoal/60'}`}
                >
                  Kunde
                </button>
                <button 
                  onClick={() => handleRoleChange('admin')}
                  disabled={selectedUser.role === 'admin'}
                  className={`flex-1 flex justify-center items-center gap-1 py-2 rounded-xl font-bold text-sm border-2 ${selectedUser.role === 'admin' ? 'border-terracotta text-terracotta bg-terracotta/10' : 'border-peach text-charcoal/60'}`}
                >
                  <Shield size={16} /> Admin
                </button>
              </div>
            </div>

            {/* Coins */}
            <div>
              <h4 className="font-nunito text-[11px] font-black text-terracotta tracking-[1.4px] uppercase mb-3">Loyalty Coins</h4>
              <div className="bg-sand rounded-2xl p-4 flex justify-between items-center mb-3">
                <span className="font-bold text-charcoal">Guthaben:</span>
                <span className="font-calistoga text-2xl text-terracotta">{userBalance}</span>
              </div>
              <div className="flex gap-2">
                <input 
                  type="number" 
                  value={coinAmountToAdd || ''} 
                  onChange={e => setCoinAmountToAdd(parseInt(e.target.value) || 0)}
                  placeholder="Betrag"
                  className="w-full bg-sand px-3 py-2 rounded-xl font-bold outline-none"
                />
                <button onClick={handleAddCoins} className="bg-terracotta text-cream px-4 rounded-xl font-bold text-sm">Gutschreiben</button>
              </div>
            </div>

            {/* Orders */}
            <div>
              <h4 className="font-nunito text-[11px] font-black text-terracotta tracking-[1.4px] uppercase mb-3">Bestellhistorie ({userOrders.length})</h4>
              <div className="space-y-2">
                {userOrders.slice(0, 5).map(o => (
                  <div key={o.id} className="bg-sand p-3 rounded-xl flex justify-between items-center">
                    <div>
                      <div className="font-bold text-charcoal text-sm">{o.orderNumber || 'Online Order'}</div>
                      <div className="text-[10px] text-charcoal/60 font-bold">{new Date(o.createdAt).toLocaleDateString()}</div>
                    </div>
                    <div className="font-bold text-terracotta">{o.total?.toFixed(2)} €</div>
                  </div>
                ))}
                {userOrders.length === 0 && <div className="text-sm text-charcoal/50 font-bold italic">Keine Bestellungen</div>}
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}

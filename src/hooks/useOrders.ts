import { useEffect, useState } from 'react';
import { collection, onSnapshot, query, where, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '@/store/useAuth';
import type { Order } from '@/types/firestore';

export function useOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  
  const { user, role, loading: authLoading } = useAuth();

  useEffect(() => {
    if (authLoading) return;

    if (!user) {
      setOrders([]);
      setLoading(false);
      return;
    }

    let q = query(collection(db, 'orders'), orderBy('createdAt', 'desc'));
    
    // If not admin, restrict to owner's orders
    if (role !== 'admin') {
      q = query(collection(db, 'orders'), where('userId', '==', user.uid), orderBy('createdAt', 'desc'));
    }

    const unsub = onSnapshot(
      q,
      (snap) => {
        setOrders(snap.docs.map(d => ({
          id: d.id,
          ...d.data(),
          // Convert Firestore Timestamp to Date if needed:
          createdAt: d.data().createdAt?.toDate() || new Date()
        } as Order)));
        setLoading(false);
        setError(null);
      },
      (err) => {
        console.error("useOrders error:", err);
        setError(err);
        setLoading(false);
      }
    );

    return () => unsub();
  }, [user, role, authLoading]);

  return { orders, loading, error };
}

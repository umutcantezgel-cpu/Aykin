import { useEffect, useState } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { Order } from '@/types/firestore';

export function useOrder(orderId: string | null) {
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!orderId) {
      setLoading(false);
      return;
    }

    const unsub = onSnapshot(
      doc(db, 'orders', orderId),
      (snap) => {
        if (snap.exists()) {
          setOrder({
            id: snap.id,
            ...snap.data(),
            createdAt: snap.data().createdAt?.toDate() || new Date()
          } as Order);
        } else {
          setOrder(null);
        }
        setLoading(false);
        setError(null);
      },
      (err) => {
        console.error("useOrder error:", err);
        setError(err);
        setLoading(false);
      }
    );

    return () => unsub();
  }, [orderId]);

  return { order, loading, error };
}

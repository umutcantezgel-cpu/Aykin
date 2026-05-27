import { useEffect, useState } from 'react';
import { collection, onSnapshot, query, where, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { MenuItem } from '@/types/firestore';

export function useMenu(category?: string) {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let q = query(collection(db, 'menu_items'), orderBy('category', 'asc'));
    if (category) {
      q = query(collection(db, 'menu_items'), where('category', '==', category), orderBy('category', 'asc'));
    }

    const unsub = onSnapshot(
      q,
      (snap) => {
        setItems(snap.docs.map(d => ({ id: d.id, ...d.data() } as MenuItem)));
        setLoading(false);
        setError(null);
      },
      (err) => {
        console.error("useMenu error:", err);
        setError(err);
        setLoading(false);
      }
    );

    return () => unsub();
  }, [category]);

  return { items, loading, error };
}

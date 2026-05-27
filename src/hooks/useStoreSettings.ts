import { useEffect, useState } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { StoreSettings } from '@/types/firestore';

export function useStoreSettings() {
  const [settings, setSettings] = useState<StoreSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const unsub = onSnapshot(
      doc(db, 'store_settings', 'general'),
      (snap) => {
        if (snap.exists()) {
          setSettings({ id: snap.id, ...snap.data() } as StoreSettings);
        } else {
          setSettings(null);
        }
        setLoading(false);
        setError(null);
      },
      (err) => {
        console.error("useStoreSettings error:", err);
        setError(err);
        setLoading(false);
      }
    );

    return () => unsub();
  }, []);

  return { settings, loading, error };
}

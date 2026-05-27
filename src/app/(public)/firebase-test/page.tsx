'use client';

import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function FirebaseTestPage() {
  const [status, setStatus] = useState<string>('Testing connection...');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function testFirestore() {
      try {
        const querySnapshot = await getDocs(collection(db, 'test_collection'));
        setStatus(`Success: Read ${querySnapshot.size} documents.`);
      } catch (err: any) {
        setStatus('Error occurred during read.');
        setError(err.message);
      }
    }

    testFirestore();
  }, []);

  return (
    <div className="p-8 font-sans">
      <h1 className="text-2xl font-bold mb-4">Firebase Init Test</h1>
      <div className="mb-4">
        <strong>Status:</strong> {status}
      </div>
      {error && (
        <div className="p-4 bg-red-100 text-red-800 border border-red-300 rounded">
          <strong>Expected Error:</strong> {error}
        </div>
      )}
      <p className="mt-8 text-sm text-gray-500">
        If you see a "Missing or insufficient permissions" error (or similar), Firebase is correctly initialized and communicating with the server.
      </p>
    </div>
  );
}

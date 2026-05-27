"use client";

import { useStoreSettings } from "@/hooks/useStoreSettings";
import { useMenu } from "@/hooks/useMenu";
import { useOrders } from "@/hooks/useOrders";
import { useAuth } from "@/store/useAuth";

export default function TestRealtimePage() {
  const { settings, loading: settingsLoading } = useStoreSettings();
  const { items: menu, loading: menuLoading } = useMenu();
  const { orders, loading: ordersLoading } = useOrders();
  const { user, role } = useAuth();

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8 bg-cream text-charcoal">
      <h1 className="text-3xl font-calistoga text-terracotta">Realtime Hooks Test</h1>
      
      <div className="p-6 bg-white rounded-xl shadow-clay">
        <h2 className="text-xl font-bold mb-4">Auth Status</h2>
        <p>User: {user ? user.email : "Not logged in"}</p>
        <p>Role: <span className="font-bold text-peach">{role || "None"}</span></p>
      </div>

      <div className="p-6 bg-white rounded-xl shadow-clay">
        <h2 className="text-xl font-bold mb-4">Store Settings (Live)</h2>
        {settingsLoading ? <p>Loading...</p> : (
          <pre className="bg-sand p-4 rounded text-sm overflow-auto">
            {JSON.stringify(settings, null, 2)}
          </pre>
        )}
        <p className="mt-2 text-sm text-gray-500">
          Gehe in die Firebase Console ➔ Firestore ➔ `store_settings/general` und ändere `isOnline` oder `currentWaitTime`. Die Änderung sollte hier sofort erscheinen.
        </p>
      </div>

      <div className="p-6 bg-white rounded-xl shadow-clay">
        <h2 className="text-xl font-bold mb-4">Menu Items (Live, first 3)</h2>
        {menuLoading ? <p>Loading...</p> : (
          <pre className="bg-sand p-4 rounded text-sm overflow-auto">
            {JSON.stringify(menu.slice(0, 3), null, 2)}
          </pre>
        )}
      </div>

      <div className="p-6 bg-white rounded-xl shadow-clay">
        <h2 className="text-xl font-bold mb-4">Orders (Live)</h2>
        {ordersLoading ? <p>Loading...</p> : (
          <pre className="bg-sand p-4 rounded text-sm overflow-auto">
            {JSON.stringify(orders, null, 2)}
          </pre>
        )}
      </div>
    </div>
  );
}

import admin from 'firebase-admin';
import fs from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

admin.initializeApp({
  projectId: 'hey-fedee'
});

const db = admin.firestore();

async function seedDatabase() {
  try {
    const dataPath = resolve(__dirname, '../seed-data.json');
    const menuItems = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

    const batch = db.batch();

    // 1. Seed menu_items
    let count = 0;
    for (const item of menuItems) {
      const { id, ...data } = item;
      const docRef = db.collection('menu_items').doc(id);
      batch.set(docRef, data);
      count++;
    }

    // 2. Seed store_settings
    const settingsRef = db.collection('store_settings').doc('general');
    batch.set(settingsRef, {
      id: 'general',
      isOnline: true,
      currentWaitTime: 15,
      bannerText: '',
      emergencyNotice: ''
    });

    // 3. Seed delivery_zones (PLZ 35578)
    const zoneRef = db.collection('delivery_zones').doc('35578');
    batch.set(zoneRef, {
      id: '35578',
      zipCode: '35578',
      minOrderValue: 15.0,
      fee: 2.50,
      active: true
    });

    await batch.commit();

    console.log(`Successfully seeded ${count} menu items, store_settings, and 1 delivery_zone!`);
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();

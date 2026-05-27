import {
  assertFails,
  assertSucceeds,
  initializeTestEnvironment,
  RulesTestEnvironment,
} from '@firebase/rules-unit-testing';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { afterAll, beforeAll, beforeEach, describe, it } from 'vitest';
import { setDoc, doc, getDoc, addDoc, collection } from 'firebase/firestore';

let testEnv: RulesTestEnvironment;

beforeAll(async () => {
  // Initialize the test environment, connecting to the local emulator
  testEnv = await initializeTestEnvironment({
    projectId: 'hey-fedee',
    firestore: {
      rules: readFileSync(resolve(__dirname, '../firestore.rules'), 'utf8'),
      host: '127.0.0.1',
      port: 8080,
    },
  });
});

beforeEach(async () => {
  await testEnv.clearFirestore();
});

afterAll(async () => {
  await testEnv.cleanup();
});

describe('Firestore Security Rules', () => {
  
  describe('menu_items collection', () => {
    it('should allow public read', async () => {
      const unauthDb = testEnv.unauthenticatedContext().firestore();
      await assertSucceeds(getDoc(doc(unauthDb, 'menu_items', 'item1')));
    });

    it('should deny non-admin writes', async () => {
      const unauthDb = testEnv.unauthenticatedContext().firestore();
      await assertFails(setDoc(doc(unauthDb, 'menu_items', 'item1'), { name: 'Waffle' }));

      const authDb = testEnv.authenticatedContext('user123').firestore();
      await assertFails(setDoc(doc(authDb, 'menu_items', 'item1'), { name: 'Waffle' }));
    });

    it('should allow admin writes', async () => {
      // Create admin user in firestore first via test env bypass
      await testEnv.withSecurityRulesDisabled(async (context) => {
        await setDoc(doc(context.firestore(), 'users', 'admin123'), { role: 'admin' });
      });

      const adminDb = testEnv.authenticatedContext('admin123').firestore();
      await assertSucceeds(setDoc(doc(adminDb, 'menu_items', 'item1'), { name: 'Admin Waffle' }));
    });
  });

  describe('orders collection', () => {
    it('should allow anonymous create on orders', async () => {
      const unauthDb = testEnv.unauthenticatedContext().firestore();
      await assertSucceeds(addDoc(collection(unauthDb, 'orders'), {
        userId: null,
        status: 'pending',
        total: 10
      }));
    });

    it('should deny cross-user read on orders', async () => {
      // Create an order for user1
      await testEnv.withSecurityRulesDisabled(async (context) => {
        await setDoc(doc(context.firestore(), 'orders', 'order1'), { userId: 'user1' });
      });

      const user2Db = testEnv.authenticatedContext('user2').firestore();
      await assertFails(getDoc(doc(user2Db, 'orders', 'order1')));
    });

    it('should allow owner read on orders', async () => {
      await testEnv.withSecurityRulesDisabled(async (context) => {
        await setDoc(doc(context.firestore(), 'orders', 'order1'), { userId: 'user1' });
      });

      const user1Db = testEnv.authenticatedContext('user1').firestore();
      await assertSucceeds(getDoc(doc(user1Db, 'orders', 'order1')));
    });
  });

  describe('store_settings collection', () => {
    it('should allow public read', async () => {
      const unauthDb = testEnv.unauthenticatedContext().firestore();
      await assertSucceeds(getDoc(doc(unauthDb, 'store_settings', 'general')));
    });

    it('should deny non-admin writes', async () => {
      const unauthDb = testEnv.unauthenticatedContext().firestore();
      await assertFails(setDoc(doc(unauthDb, 'store_settings', 'general'), { isOnline: false }));
    });

    it('should allow admin writes', async () => {
      await testEnv.withSecurityRulesDisabled(async (context) => {
        await setDoc(doc(context.firestore(), 'users', 'admin123'), { role: 'admin' });
      });

      const adminDb = testEnv.authenticatedContext('admin123').firestore();
      await assertSucceeds(setDoc(doc(adminDb, 'store_settings', 'general'), { isOnline: false }));
    });
  });

});

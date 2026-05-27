import * as admin from 'firebase-admin';

if (!admin.apps.length) {
  try {
    // Falls FIREBASE_ADMIN_CREDENTIALS als JSON-String in den Umgebungsvariablen liegt
    if (process.env.FIREBASE_ADMIN_CREDENTIALS) {
      admin.initializeApp({
        credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_ADMIN_CREDENTIALS)),
      });
    } else {
      // Fallback auf Standard Application Default Credentials (ADC) oder uninitialisiert lassen
      // für lokales Testing ohne Credentials
      console.warn("FIREBASE_ADMIN_CREDENTIALS is not set. Admin SDK may not function correctly if ADC is also missing.");
      admin.initializeApp();
    }
  } catch (error) {
    console.error('Firebase admin initialization error', error);
  }
}

const adminDb = admin.firestore();
const adminAuth = admin.auth();

export { adminDb, adminAuth, admin };

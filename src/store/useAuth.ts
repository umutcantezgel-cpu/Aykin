import { create } from 'zustand';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import type { User as FirestoreUser } from '@/types/firestore';
import { useAchievements } from '@/store/useAchievements';

export type UserRole = 'customer' | 'admin' | null;

interface AuthState {
  user: FirebaseUser | null;
  dbUser: FirestoreUser | null;
  role: UserRole;
  loading: boolean;
  init: () => void;
}

export const useAuth = create<AuthState>((set) => ({
  user: null,
  dbUser: null,
  role: null,
  loading: true,
  init: () => {
    // Prevent multiple listeners
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
          const userData = userDoc.exists() ? (userDoc.data() as FirestoreUser) : null;
          const role = userData?.role || 'customer';
          
          if (userData?.achievements) {
            useAchievements.getState().syncFromFirebase(userData.achievements);
          }

          if (userData?.birthday) {
            const today = new Date();
            const todayStr = `${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`;
            if (userData.birthday.endsWith(todayStr)) {
              useAchievements.getState().unlock('birthday-treat');
            }
          }

          set({ user: firebaseUser, dbUser: userData, role, loading: false });
        } catch (error) {
          console.error("Error fetching user data:", error);
          set({ user: firebaseUser, dbUser: null, role: 'customer', loading: false });
        }
      } else {
        set({ user: null, dbUser: null, role: null, loading: false });
      }
    });
    
    // Optional: Return the unsubscribe function or handle it in a singleton manner
    return unsubscribe;
  }
}));

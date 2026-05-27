import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ACHIEVEMENTS, type AchievementId } from '@/lib/achievements';
import { auth, db } from '@/lib/firebase';
import { doc, updateDoc, arrayUnion, setDoc, getDoc } from 'firebase/firestore';

interface AchievementsState {
  unlocked: string[];
  unlock: (id: AchievementId) => Promise<void>;
  isUnlocked: (id: AchievementId) => boolean;
  syncFromFirebase: (firebaseUnlocked: string[]) => void;
}

export const useAchievements = create<AchievementsState>()(
  persist(
    (set, get) => ({
      unlocked: [],
      
      syncFromFirebase: (firebaseUnlocked) => {
        set({ unlocked: Array.from(new Set([...get().unlocked, ...firebaseUnlocked])) });
      },

      unlock: async (id) => {
        const state = get();
        if (state.unlocked.includes(id)) return; // prevent duplicate unlock locally

        // Unlock locally first for immediate feedback
        set({ unlocked: [...state.unlocked, id] });
        
        // Dispatch event for UI banners
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('achievementUnlocked', { detail: id }));
        }

        // Sync to Firebase if user is logged in
        const user = auth.currentUser;
        if (user) {
          try {
            const userRef = doc(db, 'users', user.uid);
            await updateDoc(userRef, {
              achievements: arrayUnion(id)
            });

            // Reward coins if any
            const achievement = ACHIEVEMENTS[id];
            if (achievement && achievement.coinReward && achievement.coinReward > 0) {
              const lpRef = doc(db, 'loyalty_points', user.uid);
              const lpSnap = await getDoc(lpRef);
              
              const newEntry = {
                amount: achievement.coinReward,
                type: 'earned',
                date: new Date(),
                reason: `Achievement: ${achievement.title}`
              };

              if (lpSnap.exists()) {
                const data = lpSnap.data();
                await updateDoc(lpRef, {
                  balance: (data.balance || 0) + achievement.coinReward,
                  history: arrayUnion(newEntry)
                });
              } else {
                await setDoc(lpRef, {
                  uid: user.uid,
                  balance: achievement.coinReward,
                  history: [newEntry]
                });
              }
            }
          } catch (err) {
            console.error("Failed to sync achievement to Firestore", err);
          }
        }
      },
      
      isUnlocked: (id) => get().unlocked.includes(id),
    }),
    {
      name: 'aykin-achievements',
    }
  )
);

// Global listener for sweet-tooth logo taps
if (typeof window !== 'undefined') {
  window.addEventListener('achievementUnlocked', (e) => {
    // This is to catch the event from Logo.tsx which doesn't have access to the store directly
    // Wait, Logo.tsx already dispatches it. If Logo dispatches it, and the store listens to it, 
    // it will unlock it. But wait, we shouldn't infinitely loop. Logo.tsx dispatches `achievementUnlocked`.
    // We want Logo.tsx to call `useAchievements.getState().unlock('sweet-tooth')`.
    // But Logo is a component. It can just use the hook.
  });
}

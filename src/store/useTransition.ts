import { create } from 'zustand';

interface TransitionState {
  isBusy: boolean;
  setBusy: (v: boolean) => void;
}

export const useTransition = create<TransitionState>((set) => ({
  isBusy: false,
  setBusy: (v) => set({ isBusy: v })
}));

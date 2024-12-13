// src/store/useSettingsStore.js
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useSettingsStore = create(
  persist(
    (set) => ({
      selectedCountry: null,

      setSelectedCountry: (country) => set({ selectedCountry: country }),

      resetSettings: () => set({ selectedCountry: null }),
    }),
    {
      name: 'settings-storage',
      getStorage: () => localStorage,
    }
  )
);

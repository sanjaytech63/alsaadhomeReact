import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Storage from '../../utils/store'; // Assuming you have a custom Storage utility

export const useLanguageStore = create(
  persist(
    (set) => ({
      language: null,
      setLanguage: (lang) => {
        set({ language: lang });
        Storage.setStoreValue('userLanguage', lang);
      },
    }),
    {
      name: 'language-storage', 
      getStorage: () => AsyncStorage, // Use AsyncStorage for persistence
    }
  )
);

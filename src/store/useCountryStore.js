// src/store/useStore.js
import { create } from 'zustand';
import { settingsApi } from '../../services/settingsServices';

export const useCountryStore = create((set) => ({
    countries: [],
    loading: false,
    error: null,

    fetchCountries: async () => {
        set({ loading: true });
        try {
            const response = await settingsApi.getCountry();
            if (response && response.status === 200) {
                set({ countries: response.data, loading: false });
            } else {
                set({ error: response?.message || 'An error occurred', loading: false });
            }
        } catch (error) {
            set({ error: 'Failed to fetch data', loading: false });
        }
    },
}));

import { create } from 'zustand';
import { settingsApi } from '../utils/services/settingsServices';


export const useCountryStore = create((set) => ({
    countries: [],
    selectedCountry: 'United Arab Emirates',
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
    setSelectedCountry: (country) => set({ selectedCountry: country }),
}));

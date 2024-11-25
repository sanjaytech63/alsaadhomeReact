import { create } from 'zustand';
import { homeApi } from '../../services/homeServices';
import { showToastMessage } from '../../utils/toast';

const useCategoryStore = create((set) => ({
    categories: [],

    setCategories: (categories) => set({ categories }),

    fetchCategories: async () => {
        try {
            const response = await homeApi.getHomeData({});

            if (response?.status === 200 && Array.isArray(response.data)) {
                set({ categories: response.data });
            } else {
                showToastMessage(response?.message || 'Failed to fetch categories');
            }
        } catch (error) {
            console.error("Error fetching categories:", error);
            showToastMessage('Error fetching categories');
        }
    },
}));

export default useCategoryStore;

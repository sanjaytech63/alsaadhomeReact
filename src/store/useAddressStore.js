import { create } from 'zustand';
import { shippingApi } from '../utils/services/shippingApi';

export const useAddressStore = create((set) => ({
    addressData: [],
    isLoading: false,
    setAddressData: (data) => set({ addressData: data }),
    fetchAddress: async (showLoader = true) => {
        set({ isLoading: true });
        try {
            const res = await shippingApi.getShippingAddress();
            if (res && res.status === 200) {
                set({ addressData: res.data });
            }
            return res;
        } catch (error) {
            console.log(error);
        } finally {
            set({ isLoading: false });
        }
    },
}));

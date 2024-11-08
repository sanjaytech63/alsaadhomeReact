import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import ApiService from '../auth/ApiService/ApiService';
import { showToast } from '../utils/helper';

const useAuthStore = create(
    persist(
        (set, get) => ({
            user: null,
            accessToken: null,
            isAuthenticated: false,
            loading: false,

            loginUser: async (params) => {
                set({ loading: true });
                try {
                    const response = await ApiService.loginUser(params);
                    if (response.status === 200) {
                        const { user, accessToken } = response.data.data;
                        set({
                            user,
                            accessToken,
                            isAuthenticated: true,
                            loading: false,
                        });
                        showToast('success', 'Logged in successfully');
                    } else {
                        showToast('error', response.data.message);
                        set({ loading: false });
                    }
                } catch (error) {
                    set({ loading: false });
                    showToast('error', 'Login failed. Please try again.');
                }
            },

            logoutUser: () => {
                set({ user: null, accessToken: null, isAuthenticated: false });
                localStorage.removeItem('accessToken');
                showToast('success', 'Logged out successfully');
            },

            checkAuth: () => {
                const storedToken = localStorage.getItem('accessToken');
                if (storedToken) {
                    set({ accessToken: storedToken, isAuthenticated: true });
                }
            },
        }),
        {
            name: 'auth-storage',
            getStorage: () => localStorage,
        }
    )
);

export default useAuthStore;

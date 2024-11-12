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

            // Register User
            // registerUser: async (params) => {
            //     set({ loading: true });
            //     try {
            //         const response = await ApiService.registerUser(params);
            //         if (response.status) {
            //             showToast("success", 'Registered successfully');
            //         }
            //         set({ loading: false });
            //     } catch (error) {
            //         showToast('error', 'Registration failed. Please try again.');
            //         console.error('Registration Error:', error);
            //         return false;
            //     } finally {
            //         set({ loading: false });
            //     }
            // },

            // Login User
            // loginUser: async (params) => {
            //     set({ loading: true });
            //     try {
            //         const response = await ApiService.loginUser(params);
            //         if (response.status) {
            //             const { user, accessToken } = response.data.data;
            //             set({
            //                 user,
            //                 accessToken,
            //                 isAuthenticated: true,
            //                 loading: false,
            //             });
            //             showToast('success', 'Logged in successfully');
            //         } else {
            //             showToast('error', response.data.message);
            //         }
            //         set({ loading: false });
            //     } catch (error) {
            //         showToast('error', 'Login failed. Please try again.');
            //     } finally {
            //         set({ loading: false });
            //     }
            // },

            // Logout User
            // logoutUser: async () => {
            //     try {
            //         const response = await ApiService.logoutUser();
            //         if (response.status) {
            //             set({ user: null, accessToken: null, isAuthenticated: false });
            //             showToast('success', 'Logged out successfully');
            //         } else {
            //             showToast('error', 'Logout failed!');
            //         }
            //     } catch (error) {
            //         set({ user: null, accessToken: null, isAuthenticated: false });
            //         showToast('success', 'Logged out successfully');
            //         console.error('Logout error:', error);
            //     }
            // },

            checkAuth: () => {
                const { accessToken } = get();
                if (accessToken) {
                    set({ isAuthenticated: true });
                } else {
                    set({ user: null, accessToken: null, isAuthenticated: false });
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

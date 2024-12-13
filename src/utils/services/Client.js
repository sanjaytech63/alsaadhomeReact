import axios from "axios";
import useLoaderStore from "../../store/loaderStore";

import { showToast } from "../helper";
import useUserStore from "../../store/user";
import { useSettingsStore } from "../../store/useSettingsStore";

const axiosInstance = axios.create({
  baseURL: "https://stagingapp.alsaadhome.com/api/v23/",
  headers: {
    'Accept': 'application/json',
    'Authorization': 'gUmwgu9OVfXE9LVCaAU8xw74CownYWQ0HIfFGvWw',
    'lng': 'en',
    'currency': 'AED',
    'country-id': '2',
    'type': 'online',
    'retailer-id': '1',
    token: ""
  }
});
// Utility to check network connectivity
export const checkNetworkConnectivity = async () => {
  try {
    const online = window.navigator.onLine;
    return online;
  } catch (error) {
    console.error("Error checking network connectivity:", error);
    return false;
  }
};

export const resetStack = (route) => {
  console.log(`Navigating to: ${route}`);
};

// Request Interceptor
axiosInstance.interceptors.request.use(
  async (config) => {
    const userStore = useUserStore.getState();
    const settingsStore = useSettingsStore.getState();

    // Check network connectivity
    const isAvailable = await checkNetworkConnectivity();
    if (!isAvailable) {
      showToast("error", 'No internet connection');
      showToast("error", 'No internet connection');
    }

    // Modify headers if required
    if (config.data instanceof FormData) {
      config.headers["Content-Type"] = "multipart/form-data";
    }

    if (settingsStore.selectedCountry?.id) {
      config.headers['country-id'] = settingsStore.selectedCountry.id;
    }

    if (settingsStore.selectedCountry?.currency_code) {
      config.headers['currency'] = settingsStore.selectedCountry.currency_code;
    }

    // Show loader if required
    if (config?.showLoader !== false) {
      useLoaderStore.getState().setLoading(true);
    }
    return config;
  },
  (error) => {
    useLoaderStore.getState().setLoading(false);
    return Promise.reject(error);
  }
);

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    useLoaderStore.getState().setLoading(false);
    if (response?.data?.status === 401) {
      const userStore = useUserStore.getState();
      resetStack("Login");
      userStore.logout();
    }

    return response.data;
  },
  (error) => {
    useLoaderStore.getState().setLoading(false);
    if (error.response?.status === 401) {
      const userStore = useUserStore.getState();
      resetStack("Login");
      userStore.logout();
    }

    return Promise.reject(error.response?.data);
  }
);

export default axiosInstance;

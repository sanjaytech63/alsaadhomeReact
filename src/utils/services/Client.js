import axios from "axios";
import useLoaderStore from "../../store/loaderStore";
import { showToast } from "../helper";
import useUserStore from "../../store/user";
import { useSettingsStore } from "../../store/useSettingsStore";

const axiosInstance = axios.create({
  baseURL: "https://stagingapp.alsaadhome.com/api/v24/",
  headers: {
    Accept: "application/json",
    lng: "en",
    currency: "AED",
    "country-id": "1",
    type: "online",
    "retailer-id": "1",
    Authorization: 'gUmwgu9OVfXE9LVCaAU8xw74CownYWQ0HIfFGvWw',
    token:
      'KMETvUfeIgQB3m/bvmvhdkwLMrGMiBZnLUwiNMTEObuJZbiuAvro/KRRyAmFcpDEkgWlTi9jB0+lXugmGtck8mVQ8e6+qWYlQ3lInnJE2cYv1nsBm9vaf7JBQsKIjcdG7TxnM7FuPmWUTQklf0KT3cVPoSy8fNK5K1gbGpfUO91+6uqxSycc5vYU8WEl82zfZ+7/uWVPbGRqAJBiUhlm8UXOJjOPolu2WESsW/eNNGkJd/tPKNGgRyIEPWjBhXqBYuEDrlmHucQQ2AIxj4pZky8g39YC3FlcuP+apiOKFLZtjVyXQ/rZbnZA4e2bmj7BRGxNTorAM+3ejmekq6Vz7A==',
  },
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

// export const resetStack = (route) => {
//   console.log(`Navigating to: ${route}`);
// };

// Request Interceptor
axiosInstance.interceptors.request.use(
  async (config) => {
    const userStore = useUserStore.getState();
    const settingsStore = useSettingsStore.getState();

    // Check network connectivity
    const isAvailable = await checkNetworkConnectivity();
    if (!isAvailable) {
      showToast("error", "No internet connection");
    }

    if (userStore && userStore?.userInfo?.token) {
      config.headers["Authorization"] = `Bearer ${userStore?.userInfo?.token}`;
    }

    // Modify headers if required
    if (config.data instanceof FormData) {
      config.headers["Content-Type"] = "multipart/form-data";
    }
    if (settingsStore.selectedCountry?.id) {
      config.headers["country-id"] = settingsStore.selectedCountry.id;
    }

    if (settingsStore.selectedCountry?.currency_code) {
      config.headers["currency"] = settingsStore.selectedCountry.currency_code;
    }

    // Show loader if required
    if (config?.showLoader !== false) {
      useLoaderStore.getState().setIsLoading(true);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    useLoaderStore.getState().setIsLoading(false);
    if (response?.data?.status === 401) {
      const userStore = useUserStore.getState();
      userStore.logout();
      window.location.href = "/";
    }

    return response.data;
  },
  (error) => {
    useLoaderStore.getState().setIsLoading(false);
    if (error.response?.status === 401) {
      const userStore = useUserStore.getState();
      userStore.logout();
      window.location.href = "/";
    }

    return Promise.reject(error.response?.data);
  }
);

export default axiosInstance;

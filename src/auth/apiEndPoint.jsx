import axios from "axios";
import useAuthStore from "../store/authStore";

const axiosInstance = axios.create({
    baseURL: "https://api.freeapi.app/api/v1",
    headers: {
        'Content-Type': 'application/json',
    }
})

axiosInstance.interceptors.request.use(
    config => {
        const token = useAuthStore.getState().accessToken;
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

export default axiosInstance;

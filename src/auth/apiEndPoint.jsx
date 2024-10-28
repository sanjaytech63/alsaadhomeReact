import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://api.freeapi.app/api/v1",
    headers: {
        'Content-Type': 'application/json',
    }
})

axiosInstance.interceptors.request.use(
    config => {
        const token = localStorage.getItem('accessToken');
        console.log(token, "sdfasdfsdf");
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

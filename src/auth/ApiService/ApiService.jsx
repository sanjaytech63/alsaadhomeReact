import axiosInstance from "../apiEndPoint";

const ApiService = {
    loginUser: (data) => axiosInstance.post('/login', data),
    registerUser: (data) => axiosInstance.post('/register', data),
    logoutUser: (data) => axiosInstance.post('/logout', data),
}

export default ApiService;

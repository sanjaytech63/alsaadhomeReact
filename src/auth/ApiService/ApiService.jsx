import axiosInstance from "../apiEndPoint";

const ApiService = {
    loginUser: (data) => axiosInstance.post('/users/login', data),
    registerUser: (data) => axiosInstance.post('/users/register', data),
    logoutUser: (data) => axiosInstance.post('/users/logout', data),
    getTodo: () => axiosInstance.get('/todos'),
    deleteTodo: (id) => axiosInstance.delete(`/todos/${id}`),
    updateTodo: (id, data) => axiosInstance.patch(`/todos/${id}`, data),
    addTodo: (data) => axiosInstance.post('/todos/', data),
    getProducts: () => axiosInstance.get('/ecommerce/products'),
};

export default ApiService;

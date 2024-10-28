import axiosInstance from "../apiEndPoint";

const ApiService = {
    loginUser: (data) => axiosInstance.post('/login', data),
    registerUser: (data) => axiosInstance.post('/register', data),
    logoutUser: (data) => axiosInstance.post('/logout', data),
    getTodo: () => axiosInstance.get('/todos'),
    deleteTodo: (id) => axiosInstance.delete(`/todos/${id}`),
    updateTodo: (id, data) => axiosInstance.patch(`/todos/${id}`, data),
    addTodo: (data) => axiosInstance.post('/todos/', data),
}

export default ApiService;

import axiosInstance from "./Client";
import API from "./Endpoints";

const orderServiceApi = {
    getOrders: (data) => {
        return axiosInstance.post(API.ORDERS, data);
    }
};


export default orderServiceApi;
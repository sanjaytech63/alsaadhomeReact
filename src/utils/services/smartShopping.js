import axiosInstance from "./Client";
import API from "./Endpoints";


export const smartShoppingApi = {
    smartShopping: async (data) => {
        return await axiosInstance.get(API.SMART_SHOPPING, data);
    },
}
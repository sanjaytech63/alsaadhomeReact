import axiosInstance from "./Client";
import API from "./Endpoints";


export const smartShoppingApi = {
    smartShopping:  (data) => {
        return  axiosInstance.get(API.SMART_SHOPPING, data);
    },
}
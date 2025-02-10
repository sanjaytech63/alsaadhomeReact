import axiosInstance from "./Client";
import API from "./Endpoints";


export const smartShoppingApi = {
    smartShopping: (showLoader = false) => {
        return axiosInstance.get(API.SMART_SHOPPING, {
            showLoader
        });
    },

    smartShoppinSubcategory: (data) => {
        return axiosInstance.post(API.SMART_SHOPPING_SUBCATEGORY, data);
    },

    smartShoppingDetailsApi: (data) => {
        return axiosInstance.post(API.SMART_SHOPPING_DETAILS, data);
    }
}
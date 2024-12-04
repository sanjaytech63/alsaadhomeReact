import axiosInstance from "./Client";
import API from "./Endpoints";


export const searchApi = {
    getSearchData: async (title, showLoader = true) => {
        return await axiosInstance.post(API.PRODUCTS, {
            showLoader: showLoader,
            title
        });
    },
}
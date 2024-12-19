import axiosInstance from "./Client";
import API from "./Endpoints";


export const searchApi = {
    getSearchData:  (title, showLoader = true) => {
        return axiosInstance.post(API.PRODUCTS, {
            showLoader: showLoader,
            title
        });
    },
}
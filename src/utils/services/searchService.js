import axiosInstance from "./Client";
import API from "./Endpoints";


export const searchApi = {
    getSearchData: async (keywords, per_page, page, showLoader = true) => {
        return await axiosInstance.post(API.SEARCH, {
            showLoader: showLoader,
            keywords, per_page, page
        });
    },
}
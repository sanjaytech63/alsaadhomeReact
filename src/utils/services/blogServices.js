import axiosInstance from "./Client";
import API from "./Endpoints";


export const blogApi = {
    getHomeBlogData: (data) => {
        return  axiosInstance.get(API.BLOG_HOME, data);
    },

    getBlog: async (data) => {
        return await axiosInstance.post(API.BLOG_SEARCH, data);
    },

    getBlogDetails: async (data) => {
        return await axiosInstance.post(API.BLOG_DETAILS, data);
    },
};
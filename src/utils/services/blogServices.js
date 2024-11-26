import axiosInstance from "./Client";
import API from "./Endpoints";


export const blogApi = {
    getHomeBlogData: async (data) => {
        return await axiosInstance.get(API.BLOG_HOME, data);
    },
};
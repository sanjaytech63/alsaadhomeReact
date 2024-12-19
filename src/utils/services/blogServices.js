import axiosInstance from "./Client";
import API from "./Endpoints";


export const blogApi = {
    getHomeBlogData: (data) => {
        return  axiosInstance.get(API.BLOG_HOME, data);
    },
};
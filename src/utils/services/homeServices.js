import axiosInstance from './Client';
import API from './Endpoints';

export const homeApi = {
    // Method to fetch home data
    getHomeData: async (data, showLoader = true) => {
        return await axiosInstance.post(API.HOME, data, {
            showLoader: showLoader,
        });
    },

    // Method to fetch category data
    getCategory: async (data) => {
        return await axiosInstance.get(API.CATEGORY, data);
    },

    // Method to fetch subcategory data
    getSubCategory: async (data) => {
        return await axiosInstance.post(API.SUB_CATEGORY, data);
    },

    // Method to fetch product data
    getProduct: async (data, showLoader = true) => {
        return await axiosInstance.post(API.PRODUCTS, data, {
            showLoader: showLoader,
        });
    },

    // Method to fetch filter data
    getFilter: async (data, showLoader = true) => {
        return await axiosInstance.post(API.FILTER, data, {
            showLoader: showLoader,
        });
    },

    // Method to fetch product details
    getProductDetails: async (data, showLoader = true) => {
        return await axiosInstance.post(API.PRODUCT_DETAILS, data, {
            showLoader: showLoader,
        });
    },

};

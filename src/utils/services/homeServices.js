import axiosInstance from "./Client";
import API from "./Endpoints";

export const homeApi = {
  getHomeData: (showLoader = true) => {
    return axiosInstance.get(API.HOME, {
      showLoader: showLoader,
    });
  },

  getRecommended: (data, showLoader = true) => {
    return axiosInstance.get(API.GETRECOMMENDEDPRODUCTS, data, {
      showLoader: showLoader,
    });
  },

  getCategory: () => {
    return axiosInstance.get(API.CATEGORY);
  },

  getSubCategory: (data) => {
    return axiosInstance.post(API.SUB_CATEGORY, data);
  },

  getProduct: (data, showLoader = true) => {
    return axiosInstance.post(API.PRODUCTS, data, {
      showLoader: showLoader,
    });
  },

  getFilter: (data, showLoader = true) => {
    return axiosInstance.post(API.FILTER, data, {
      showLoader: showLoader,
    });
  },

  // Method to fetch product details
  getProductDetails: (data, showLoader = true) => {
    return axiosInstance.post(API.PRODUCT_DETAILS, data, {
      showLoader: showLoader,
    });
  },
};

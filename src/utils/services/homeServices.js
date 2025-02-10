import axiosInstance from "./Client";
import API from "./Endpoints";

export const homeApi = {
  getHomeData: (showLoader = true) => {
    return axiosInstance.get(API.HOME, {
      showLoader: showLoader,
    });
  },

  getRecommended: (showLoader = true) => {
    return axiosInstance.get(API.GETRECOMMENDEDPRODUCTS, {
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

  getProductDetails: (params, showLoader = true) => {
    return axiosInstance.get(API.PRODUCT_DETAILS, {
      params,
      showLoader: showLoader,
    });
  },

  getNewProductsApi: (showLoader = true) => {
    return axiosInstance.get(API.NEW_PRODUCTS, {
      showLoader: showLoader,
    });
  },


  getBundleProductItemApi: (data, showLoader = true) => {
    return axiosInstance.post(API.GET_BUNDLE_PRODUCTS_ITEM, data, {
      showLoader: showLoader,
    });
  },

  getBundleProductApi: (data, showLoader = true) => {
    return axiosInstance.post(API.GET_BUNDLE_PRODUCTS, data, {
      showLoader: showLoader,
    });
  },

  getSimilarProductApi: (showLoader = true) => {
    return axiosInstance.get(API.GET_SIMILAR_PRODUCT, {
      showLoader: showLoader,
    });
  },

};

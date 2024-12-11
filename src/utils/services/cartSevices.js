import useUserStore from '../../store/user';
import axiosInstance from './Client';
import API from './Endpoints';

export const cardApi = {
  creteCart: async (data, showLoader = false) => {
    return axiosInstance.post(API.CREATE_CART, data, { showLoader });
  },
  addToCart: async (data, showLoader = true) => {
    return axiosInstance.post(API.ADD_TO_CART, data, { showLoader });
  },
  removeCartItem: async (data, showLoader = true) => {
    return axiosInstance.post(API.REMOVE_CART_ITEM, data, { showLoader });
  },
  getCart: async (data, showLoader = true) => {
    return axiosInstance.post(API.GET_CART, data, { showLoader });
  },
  getCartProductIds: async (data, showLoader = false) => {
    return axiosInstance.post(API.CART_PRODUCT_IDS, data, { showLoader });
  },
  mergeCart: async (data, showLoader = true) => {
    return axiosInstance.post(API.Merge_Cart, data, { showLoader });
  },
};

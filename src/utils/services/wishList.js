import axiosInstance from "./Client";
import API from "./Endpoints";

export const wishListApi = {
    addToWishList: (data) => {
        return axiosInstance.post(API.ADD_WISHLIST, data);
    },

    getWishList: ( showLoader) => {
        return axiosInstance.get(API.Wishlist, {
            showLoader: showLoader,
        });
    },
    removeWishList: (data) => {
        return axiosInstance.post(API.REMOVE_WISHLIST, data);
    }
}
import axiosInstance from './Client';
import API from './Endpoints';

export const shippingApi = {
    addShippingAddress: (data) => {
        return axiosInstance.post(API.ADD_SHIPPING_ADDRESS, data);
    },
    getCountry: () => {
        return axiosInstance.get(API.COUNTRY);
    },
    getCity: (data) => {
        return axiosInstance.post(API.CITY, data);
    },
    getArea: (data, showLoader) => {
        return axiosInstance.post(API.AREA, data, {
            showLoader: showLoader
        });
    },
    getShippingAddress: (data) => {
        return axiosInstance.get(API.SHIPPING_ADDRESS, data);
    },
    deleteShippingAddress: (data) => {
        return axiosInstance.post(API.DELETE_SHIPPING_ADDRESS, data);
    },
    updateShippingAddress: (data) => {
        return axiosInstance.post(API.UPDATE_SHIPPING_ADDRESS, data);
    },
    getCountryCode: () => {
        return axiosInstance.get(API.COUNTRY);
    },
};

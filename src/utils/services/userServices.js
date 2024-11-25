import useUserStore from '../DataManager/store/user';
import axiosInstance from './Client';
import API from './Endpoints';


export const userService = {
    // Method for signing in the user
    signIn: (data) => {
        return axiosInstance.post(API.LOGIN, data);
    },

    // Method for logging out the user
    logout: async () => {
        return await axiosInstance.post(API.LOGOUT);
    },

    // Method for sending a forgot password request
    forgotPassword: async (data) => {
        return await axiosInstance.post(API.FORGOTPASSWORD, data);
    },

    // Method for resetting the password (currently not active)
    // verifyOtp: async (params) => {
    //     return await axiosInstance.post(API.v, params);
    // },

    // Method for resetting the user's password
    resetPassword: async (params) => {
        return await axiosInstance.post(API.CHANGE_PASSWORD, params);
    },

    // Method for fetching home data (could be used for a dashboard or main page)
    home: async (params, config = { showLoader: true }) => {
        return await axiosInstance.post(API.HOME, params, config);
    },

    // Method for fetching the user's profile data
    profile: async (data, config = { showLoader: true }) => {
        return await axiosInstance.post(API.PROFILE, data, config);
    },

    // Method for editing the user's profile
    editProfile: async (data) => {
        return await axiosInstance.post(API.UPDATE_PROFILE, data);
    },

    // Method for changing the user's password
    changePassword: async (data) => {
        return await axiosInstance.post(API.CHANGE_PASSWORD, data);
    }
};

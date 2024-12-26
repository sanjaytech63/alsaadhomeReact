import useUserStore from "../DataManager/store/user";
import axiosInstance from "./Client";
import API from "./Endpoints";

export const userService = {
  signIn: (data) => {
    return axiosInstance.post(API.LOGIN, data);
  },

  logout: () => {
    return axiosInstance.post(API.LOGOUT);
  },

  forgotPassword: (data) => {
    return axiosInstance.post(API.FORGOTPASSWORD, data);
  },

  resetPassword: (params) => {
    return axiosInstance.post(API.CHANGE_PASSWORD, params);
  },

  home: (params, config = { showLoader: true }) => {
    return axiosInstance.post(API.HOME, params, config);
  },

  profile: (data, config = { showLoader: true }) => {
    return axiosInstance.post(API.PROFILE, data, config);
  },

  editProfile: (data) => {
    return axiosInstance.post(API.UPDATE_PROFILE, data);
  },

  changePassword: (data) => {
    return axiosInstance.post(API.CHANGE_PASSWORD, data);
  },
};

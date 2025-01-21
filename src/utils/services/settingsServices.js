import axiosInstance from './Client';
import API from './Endpoints';

export const settingsApi = {
  getCountry: () => {
    return axiosInstance.get(API.GET_COUNTRY);
  },
  getGlobalSettings:() => {
    return axiosInstance.get(API.SETTING)
  }
};






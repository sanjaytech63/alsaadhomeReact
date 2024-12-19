import axiosInstance from "./Client";
import API from "./Endpoints";

export const unboxingData = {
    unboxingChanllege: async (data) => {
        return await axiosInstance.get(API.UNBOXING_CHANLLENG, data);
    },
};
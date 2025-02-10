import axiosInstance from "./Client";
import API from "./Endpoints";

const contactApi = {
    contactEnquire: (data) => {
        return axiosInstance.post(API.CONTACT_ENQUIRY, data);
    }
}


export default contactApi;
import axios from "axios";
import apiConfig from "./apiConfig";

const axiosPayment = axios.create({
    baseURL: apiConfig.paymentUrl,
});

axiosPayment.interceptors.request.use(async (config) => config);
axiosPayment.interceptors.response.use(
    (response) => {
        if (response && response.data) {
            return response.data;
        }
        return response;
    },
    (error) => {
        // return error.response.data;
        throw error;
    }
);

export default axiosPayment;

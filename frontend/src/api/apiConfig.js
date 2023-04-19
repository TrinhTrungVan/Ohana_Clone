import { ENV } from "../constants/env";

const apiConfig = {
    baseUrl: ENV.BASE_URL + "/api",
    paymentUrl: "http://10.0.2.2:8888/order"
};

export default apiConfig;

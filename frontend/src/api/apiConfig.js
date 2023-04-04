import { ENV } from "../constants/env";

const apiConfig = {
    baseUrl: ENV.BASE_URL + "/api" || "http://10.0.3.2:2001/api",
};

export default apiConfig;

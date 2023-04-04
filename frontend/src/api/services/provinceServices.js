import axios from "axios";

const provinceServices = {
    getDistrictList: (code) => {
        return axios.get(`https://provinces.open-api.vn/api/p/${code}?depth=2`);
    },
    getWardList: (code) => {
        return axios.get(`https://provinces.open-api.vn/api/d/${code}?depth=2`);
    },
};

export default provinceServices;

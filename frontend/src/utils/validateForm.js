export const validatePostInfo = (data) => {
    if (!data) return "Vui lòng điền đầy đủ các trường";
    const {
        roomArea,
        capacity,
        expenses,
        deposit,
        electricityCost,
        waterCost,
        internetCost,
        parkingAvailable,
        parkingCost,
    } = data;
    if (
        !roomArea ||
        !capacity ||
        !expenses ||
        !deposit ||
        !electricityCost ||
        !waterCost ||
        !internetCost
    ) {
        return "Vui lòng điền đầy đủ các trường";
    }

    if (!validateNumber(roomArea)) return "Trường Diện tích phải là số";
    if (!validateNumber(capacity)) return "Trường Sức chứa phải là số";
    if (!validateNumber(expenses)) return "Trường Giá cho thuê phải là số";
    if (!validateNumber(deposit)) return "Trường Đặt cọc phải là số";
    if (!validateNumber(electricityCost)) return "Trường Tiền điện phải là số";
    if (!validateNumber(waterCost)) return "Trường Tiền nước phải là số";
    if (!validateNumber(internetCost)) return "Trường Tiền Internet phải là số";
    if (parkingAvailable) {
        if (!validateNumber(parkingCost)) return "Trường Phí giữ xe phải là số";
    }
    return "";
};

export const validateAddress = (data) => {
    if (!data) return "Vui lòng điền đầy đủ các trường";
    const { city, district, ward, streetName, houseNumber } = data;
    if (!city || !district || !ward || !streetName || !houseNumber) {
        return "Vui lòng điền đầy đủ các trường";
    }
};

export const validateConfirmForm = (data) => {
    if (!data) return "Vui lòng điền đầy đủ các trường";
    const { phone, title, description } = data;
    if (!phone || !title || !description) {
        return "Vui lòng điền đầy đủ các trường";
    }
    if (!validateNumber(phone)) return "Số điện thoại sai định dạng";
};

export const validateEmail = (email) => {
    const regex =
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(email);
};

export const validatePhone = (phone) => {
    const regex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;
    return regex.test(phone);
};

export const validateNumber = (str) => {
    const regex = /^\d+$/;
    return regex.test(str);
};

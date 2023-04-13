import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeData = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
        alert("Đã xảy ra lỗi");
    }
};

export const getData = async (key) => {
    try {
        const value = await AsyncStorage.getItem(key);
        if (value == null) {
            alert("Đã xảy ra lỗi");
        }
        return JSON.parse(value);
    } catch (e) {
        alert("Đã xảy ra lỗi");
    }
};

export const clearData = async () => {
    try {
        await AsyncStorage.clear();
    } catch (e) {
        alert('Đã xảy ra lỗi')
    }
};

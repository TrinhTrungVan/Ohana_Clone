import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeData = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
        alert("Failed to save the data to the storage");
    }
};

export const getData = async (key) => {
    try {
        const value = await AsyncStorage.getItem(key);
        if (value == null) {
            alert("Failed to save the data to the storage");
        }
        return JSON.parse(value);
    } catch (e) {
        alert("Failed to save the data to the storage");
    }
};

export const clearData = async () => {
    try {
        await AsyncStorage.clear()
    } catch (e) {
        alert('Delete data failed')
    }
}

import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Button from "./Button";
import CheckBox from "./CheckBox";
import Input from "./Input";
import { validatePostInfo } from "../utils/validateForm";

const PostForm = (props) => {
    const { handleChangeForm } = props;
    const [data, setData] = useState({});
    const [textError, setTextError] = useState("");
    const toggleParking = () => {
        setData({ ...data, parkingAvailable: !data?.parkingAvailable });
    };

    const handleChange = (name, value) => {
        setData({
            ...data,
            [name]: value,
        });
    };
    const handleChangeFree = (name, value) => {
        setData({
            ...data,
            [name]: value,
        });
    };

    const handleNext = () => {
        saveData();
        console.log("Data", data);
        const errorText = validatePostInfo(data);
        if (errorText) {
            setTextError(errorText);
            return;
        }
        handleChangeForm(1);
    };

    const saveData = async () => {
        try {
            await AsyncStorage.setItem("@postInfo", JSON.stringify(data));
            // await AsyncStorage.clear();
        } catch (e) {
            alert("Failed to save the data to the storage");
        }
    };

    const readData = async () => {
        try {
            const value = await AsyncStorage.getItem("@postInfo");
            if (value !== null) {
                setData(JSON.parse(value));
            }
        } catch (e) {
            alert("Failed to fetch the input from storage");
        }
    };

    useEffect(() => {
        readData();
    }, []);

    return (
        <View style={{ paddingTop: 8, paddingBottom: 16 }}>
            <Input
                label='Diện tích'
                suffix='m&sup2;'
                placeholder='Nhập diện tích phòng'
                value={data?.roomArea}
                maxLength={10}
                keyboardType='numeric'
                onChangeText={(value) => handleChange("roomArea", value)}
            />
            <Input
                label='Sức chứa'
                suffix='người/phòng'
                placeholder='Nhập số người/phòng'
                value={data?.capacity}
                maxLength={10}
                keyboardType='numeric'
                onChangeText={(value) => handleChange("capacity", value)}
            />
            <Input
                label='Giá cho thuê'
                suffix='VNĐ/tháng'
                placeholder='Nhập giá cho thuê'
                value={data?.expenses}
                maxLength={10}
                keyboardType='numeric'
                onChangeText={(value) => handleChange("expenses", value)}
            />
            <Input
                label='Đặt cọc'
                suffix='VNĐ'
                placeholder='Nhập số tiền'
                value={data?.deposit}
                maxLength={10}
                keyboardType='numeric'
                onChangeText={(value) => handleChange("deposit", value)}
            />
            <Input
                label='Tiền điện'
                suffix='VNĐ'
                placeholder='Nhập số tiền'
                value={data?.electricityCost}
                maxLength={10}
                keyboardType='numeric'
                onChangeText={(value) => handleChange("electricityCost", value)}
                optionFree={true}
                onChangeFree={(value) => handleChangeFree("electricityCost", value)}
            />
            <Input
                label='Tiền nước'
                suffix='VNĐ'
                placeholder='Nhập số tiền'
                value={data?.waterCost}
                maxLength={10}
                keyboardType='numeric'
                onChangeText={(value) => handleChange("waterCost", value)}
                optionFree={true}
                onChangeFree={(value) => handleChangeFree("waterCost", value)}
            />
            <Input
                label='Tiền Internet'
                suffix='VNĐ'
                placeholder='Nhập số tiền'
                value={data?.internetCost}
                maxLength={10}
                keyboardType='numeric'
                onChangeText={(value) => handleChange("internetCost", value)}
                optionFree={true}
                onChangeFree={(value) => handleChangeFree("internetCost", value)}
            />
            <CheckBox
                isChecked={data?.parkingAvailable}
                onPress={toggleParking}
                label='Có chỗ để xe'
            />
            {data?.parkingAvailable && (
                <Input
                    label='Phí giữ xe'
                    suffix='VNĐ'
                    placeholder='Nhập số tiền'
                    value={data?.parkingCost}
                    maxLength={10}
                    keyboardType='numeric'
                    onChangeText={(value) => handleChange("parkingCost", value)}
                    optionFree={true}
                    onChangeFree={(value) => handleChangeFree("parkingCost", value)}
                />
            )}
            {/* <Button onPress={() => navigation.navigate("Address", { screen: "PostScreen" })}>
                Next
            </Button> */}
            <Text style={styles.textError}>{textError}</Text>
            <Button onPress={handleNext}>Tiếp theo</Button>
        </View>
    );
};

export default PostForm;

const styles = StyleSheet.create({
    textError: {
        textAlign: "center",
        color: "red",
        fontSize: 14,
        marginBottom: 8,
    },
});

import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { useSelector } from "react-redux";
import Button from "../components/Button";
import Input from "../components/Input";
import Loading from "../components/Loading";

const ConfirmationScreen = (props) => {
    const { handleChangeForm, navigation } = props;
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (name, value) => {
        setData({ ...data, [name]: value });
    };

    const handlePrevious = () => {
        saveData();
        handleChangeForm(2);
    };
    const handlePublish = async () => {
        setLoading(true);
        try {
            const response = await fetch("http://10.0.3.2:2001/api/post/create", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            const result = await response.json();
            console.log("Result", result);
        } catch (error) {
            console.error(error);
        }
        setLoading(false);
        handleChangeForm(0);
        clearStorage();
        navigation.navigate("Home");
    };

    const saveData = async () => {
        try {
            await AsyncStorage.setItem("@postInfo", JSON.stringify(data));
            console.log(data);
        } catch (e) {
            alert("Failed to save the data to the storage");
        }
    };

    const clearStorage = async () => {
        try {
            await AsyncStorage.removeItem("@postInfo");
        } catch (e) {
            alert("Failed to save the data to the storage");
        }
    };

    const readData = async () => {
        try {
            const value = await AsyncStorage.getItem("@postInfo");
            if (value !== null) {
                // console.log(value);
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
        <View>
            <Input
                label='Số điện thoại'
                placeholder='Nhập số điện thoại'
                value={data?.phone}
                maxLength={10}
                onChangeText={(value) => handleChange("phone", value)}
            />
            <Input
                label='Tiêu đề bài đăng'
                placeholder='Nhập tiêu đề bài đăng'
                value={data?.title}
                maxLength={100}
                multiline
                onChangeText={(value) => handleChange("title", value)}
            />
            <Input
                label='Nội dung mô tả'
                placeholder='Nhập nội dung mô tả'
                value={data?.description}
                maxLength={200}
                multiline
                onChangeText={(value) => handleChange("description", value)}
            />
            <View style={{ width: "50%", flexDirection: "row" }}>
                <Button onPress={handlePrevious} type='Secondary'>
                    Quay lại
                </Button>
                <Button onPress={handlePublish}>{loading ? <Loading /> : "Đăng bài"}</Button>
            </View>
        </View>
    );
};

export default ConfirmationScreen;

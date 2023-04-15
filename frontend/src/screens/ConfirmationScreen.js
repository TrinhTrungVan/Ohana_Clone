import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Button from "../components/Button";
import Input from "../components/Input";
import Loading from "../components/Loading";
import { validateConfirmForm } from "../utils/validateForm";
import postServices from "../api/services/postServices";

const ConfirmationScreen = (props) => {
    const { handleChangeForm, navigation } = props;
    const [data, setData] = useState(null);
    const [textError, setTextError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (name, value) => {
        setData({ ...data, [name]: value });
    };

    const handlePrevious = () => {
        saveData();
        handleChangeForm(2);
    };
    const handlePublish = async () => {
        const errorText = validateConfirmForm(data);
        if (errorText) {
            setTextError(errorText);
            return;
        }
        setLoading(true);
        try {
            // const response = await fetch("http://10.0.3.2:2001/api/post/create", {
            //     method: "POST",
            //     headers: {
            //         Accept: "application/json",
            //         "Content-Type": "application/json",
            //     },
            //     body: JSON.stringify(data),
            // });
            // const result = await response.json();
            // console.log("Result", result);
            await postServices.createPost(data);
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
            alert("Đã xảy ra lỗi");
        }
    };

    const clearStorage = async () => {
        try {
            await AsyncStorage.removeItem("@postInfo");
        } catch (e) {
            alert("Đã xảy ra lỗi");
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
            alert("Đã xảy ra lỗi");
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
                keyboardType='numeric'
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
            <Text style={styles.textError}>{textError}</Text>
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

const styles = StyleSheet.create({
    textError: {
        textAlign: "center",
        color: "red",
        fontSize: 14,
        marginBottom: 8,
    },
});

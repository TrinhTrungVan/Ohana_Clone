import React, { useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useDispatch } from "react-redux";
import { loginUser } from "../api/services/authServices";
import Button from "../components/Button";
import Input from "../components/Input";
import COLORS from "../constants/color";
import { getData } from "../utils/asyncStorage";
import { validateLoginForm } from '../utils/validateForm'

function LoginScreen({ navigation }) {
    const [user, setUser] = useState({})
    const [textError, setTextError] = useState("");
    const dispatch = useDispatch();

    const handleChange = (name, value) => {
        setUser({
            ...user,
            [name]: value
        })
    }

    const handleLogin = async () => {
        const errorMsg = validateLoginForm(user)
        if(errorMsg) return setTextError(errorMsg)

        await loginUser(user, dispatch);
        const status = await getData("@statusLogin");
        if (status == 500) {
            alert("Lỗi hệ thống");
        } else if (status == 404) {
            setTextError("Sai mật khẩu!");
        } else if (status == 403) {
            setTextError("Sai tên đăng nhập!");
        } else {
            navigation.navigate("Main", { screen: "Home" });
            setTextError("");
            setUser({});
        }
    };

    const handleChangeSignup = () => {
        navigation.navigate("Đăng ký");
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={{ paddingHorizontal: 16 }}>
                <View style={{ paddingTop: 8, paddingBottom: 32 }}>
                    <Input
                        label='Địa chỉ email'
                        placeholder='Nhập địa chỉ email'
                        value={user?.email}
                        onChangeText={(text) => handleChange("email", text)}
                    />
                    <Input
                        label='Mật khẩu'
                        placeholder='Nhập mật khẩu'
                        value={user?.password}
                        onChangeText={(text) => handleChange("password", text)}
                        secureTextEntry={true}
                    />
                    <Button onPress={handleLogin}>Đăng nhập</Button>
                    <Text style={styles.textError}>{textError}</Text>
                    <View style={styles.signupContainer}>
                        <Text>Bạn không có tài khoản?</Text>
                        <TouchableOpacity onPress={handleChangeSignup}>
                            <Text style={styles.signupBtn}>Đăng ký</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        backgroundColor: COLORS.white,
        marginBottom: 68,
    },
    signupContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    signupBtn: {
        fontWeight: "bold",
        marginLeft: 8,
        marginBottom: 1,
    },
    textError: {
        color: "red",
        fontSize: 12
    }
});

import React, { useState } from "react";
import {
    View,
    SafeAreaView,
    ScrollView,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-native";
import Button from "../components/Button";
import Input from "../components/Input";
import COLORS from "../constants/color";
import { loginUser } from "../redux/apiRequest";
import { getData } from "../utils/asyncStorage";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

function LoginScreen({ setIsCheckAuthen, navigation, route }) {
    const BASE_URL = "http://10.0.3.2:2001/api/auth";
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [textError, setTextError] = useState("");

    const dispatch = useDispatch();

    const fetchLogin = async (user) => {
        console.log("login");
        try {
            const res = await fetch(`${BASE_URL}/login`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: user.username,
                    password: user.password,
                }),
            });
            console.log("3");
            const json = await res.json();
            console.log(JSON.stringify(json));
            console.log("2");
            // if(res.status == '403') setTextError("Wrong username!")
            // else if(res.status == '404') setTextError('Wrong password!')
            // else {
            //     console.log(JSON.stringify(json))
            //     setTextError('')
            // }
        } catch (e) {
            console.error(e);
        }
    };

    const handleLogin = async () => {
        const user = {
            username: username,
            password: password,
        };
        await loginUser(user, dispatch);
        const status = await getData("@statusLogin")
        if(status == 404) {
            setTextError("Wrong password!")
        }
        else if(status == 403) {
            setTextError("Wrong username!")
        }
        else {
            setTextError("")
            setUsername("")
            setPassword("")
            navigation.navigate("Main", { screen: "Home" });
        }
    };

    const handleChangeSignup = () => {
        navigation.navigate("SignUp");
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={{ paddingHorizontal: 16 }}>
                <View style={{ paddingTop: 8, paddingBottom: 32 }}>
                    <Input
                        label='Email'
                        placeholder='Nhập email'
                        onChangeText={(text) => setUsername(text)}
                    />
                    <Input
                        label='Mật khẩu'
                        placeholder='Nhập mật khẩu'
                        onChangeText={(text) => setPassword(text)}
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

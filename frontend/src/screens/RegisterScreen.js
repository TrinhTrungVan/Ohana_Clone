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
import { useDispatch } from "react-redux";
import Button from "../components/Button";
import Input from "../components/Input";
import COLORS from "../constants/color";
import { registerUser } from "../redux/apiRequest";

function RegisterScreen({ navigation }) {
    const BASE_URL = "http://10.0.2.2:2001/api/auth";
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [email, setEmail] = useState("");
    const [textError, setTextError] = useState("");
    const dispatch = useDispatch();

    const handleRegister = () => {
        console.log('hi')
        const user = {
            username: username,
            password: password,
            email: email,
        };
        if (password2 != user.password) setTextError("Password don't match");
        else if (!user.email.includes("@gmail.com"))
            setTextError("Email must be in the format @gmail.com");
        else {
            setTextError("");
            registerUser(user, dispatch);
            navigation.navigate("SignIn")
        }
    };

    const handleChangeSignin = () => {
        navigation.navigate("SignIn");
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={{ paddingHorizontal: 16 }}>
                <View style={{ paddingTop: 8, paddingBottom: 32 }}>
                    <Input
                        label='Tài khoản'
                        placeholder='Nhập email'
                        onChangeText={(text) => setUsername(text)}
                    />
                    <Input
                        label='Mật khẩu'
                        placeholder='Nhập mật khẩu'
                        onChangeText={(text) => setPassword(text)}
                        secureTextEntry={true}
                    />
                    <Input
                        label='Xác nhận mật khẩu'
                        placeholder='Nhập lại mật khẩu'
                        onChangeText={(text) => setPassword2(text)}
                        secureTextEntry={true}
                    />
                    <Input
                        label='Email'
                        placeholder='Nhập email'
                        onChangeText={(text) => setEmail(text)}
                    />
                    <Button title='Sign Up' onPress={handleRegister}>
                        Đăng ký
                    </Button>
                    <Text style={styles.textError}>{textError}</Text>
                    <View style={styles.signinContainer}>
                        <Text>Bạn đã có tài khoản?</Text>
                        <TouchableOpacity onPress={handleChangeSignin}>
                            <Text style={styles.signinBtn}>Đăng nhập</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

export default RegisterScreen;

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        backgroundColor: COLORS.white,
        marginBottom: 68,
    },
    textError: {
        color: COLORS.red,
    },
    signinContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    signinBtn: {
        fontWeight: "bold",
        marginLeft: 8,
        marginBottom: 1,
    },
});

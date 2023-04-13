import React, { useState } from "react";
import {
    View,
    SafeAreaView,
    ScrollView,
    Text,
    StyleSheet,
    TouchableOpacity,
} from "react-native";
import { useDispatch } from "react-redux";
import Button from "../components/Button";
import Input from "../components/Input";
import COLORS from "../constants/color";
import { registerUser } from "../api/services/authServices";

function RegisterScreen({ navigation }) {
    const [user, setUser] = useState({})
    const [checkPassword, setCheckPassword] = useState("");
    const [textError, setTextError] = useState("");
    const dispatch = useDispatch();

    const handleChange = (name, value) => {
        setUser({
            ...user, 
            [name]: value,
        })
    }

    const handleRegister = () => {
        if (checkPassword != user.password) setTextError("Mật khẩu không khớp");
        else if (!user.email.includes("@gmail.com"))
            setTextError("Email phải có @gmail.com");
        else {
            setTextError("");
            registerUser(user, dispatch);
            setUser({})
            navigation.navigate("Đăng nhập")
        }
    };

    const handleChangeSignin = () => {
        navigation.navigate("Đăng nhập");
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={{ paddingHorizontal: 16 }}>
                <View style={{ paddingTop: 8, paddingBottom: 32 }}>
                    <Input
                        label='Tên đăng nhập'
                        placeholder='Nhập tên đăng nhập'
                        value={user?.username}
                        onChangeText={(text) => handleChange('username', text)}
                    />
                    <Input
                        label='Mật khẩu'
                        placeholder='Nhập mật khẩu'
                        value={user?.password}
                        onChangeText={(text) => handleChange('password', text)}
                        secureTextEntry={true}
                    />
                    <Input
                        label='Xác nhận mật khẩu'
                        placeholder='Nhập lại mật khẩu'
                        value={checkPassword}
                        onChangeText={(text) => setCheckPassword(text)}
                        secureTextEntry={true}
                    />
                    <Input
                        label='Email'
                        placeholder='Nhập email'
                        value={user?.email}
                        onChangeText={(text) => handleChange('email', text)}
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

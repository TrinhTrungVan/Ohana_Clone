import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import { StyleSheet, Text, View } from "react-native";
import COLORS from "../constants/color";
import ConfirmOTPScreen from "../screens/ConfirmOTPScreen";
import ResetPasswordScreen from "../screens/ResetPasswordScreen";

const Stack = createNativeStackNavigator();

const AuthNavigation = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name='Đăng nhập'
                component={LoginScreen}
                options={{
                    headerShown: true,
                    header: () => (
                        <View style={styles.header}>
                            <Text style={styles.title}>Đăng nhập</Text>
                        </View>
                    ),
                }}
            />
            <Stack.Screen
                name='Đăng ký'
                component={RegisterScreen}
                options={{
                    headerShown: true,
                    header: () => (
                        <View style={styles.header}>
                            <Text style={styles.title}>Đăng ký</Text>
                        </View>
                    ),
                }}
            />
            <Stack.Screen
                name='Lấy lại mật khẩu'
                component={ResetPasswordScreen}
                // options={{
                //     headerShown: true,
                //     header: () => (
                //         <View style={styles.header}>
                //             <Text style={styles.title}>Xác nhận mã OTP</Text>
                //         </View>
                //     ),
                // }}
            />
        </Stack.Navigator>
    );
}

export default AuthNavigation;

const styles = StyleSheet.create({
    // shadow: {
    //     shadowColor: "#7F5DF0",
    //     shadowOffset: {
    //         width: 0,
    //         height: 10,
    //     },
    //     shadowOpacity: 0.25,
    //     shadowRadius: 3.5,
    //     elevation: 5,
    // },
    header: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        height: 55,
        marginTop: 24,
        position: "relative",
        borderBottomColor: COLORS.black,
        borderBottomWidth: 0.5,
    },
    title: {
        fontSize: 24,
        fontWeight: "500",
        zIndex: 10,
    },
});
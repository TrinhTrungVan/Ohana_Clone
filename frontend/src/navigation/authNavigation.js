import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";

const Stack = createNativeStackNavigator();

const AuthNavigation = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name='Đăng nhập' component={LoginScreen} />
            <Stack.Screen name='Đăng ký' component={RegisterScreen} />
        </Stack.Navigator>
    );
}

export default AuthNavigation;

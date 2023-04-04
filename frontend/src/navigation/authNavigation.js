import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";

const Stack = createNativeStackNavigator();

function AuthNavigation() {
    return (
        <Stack.Navigator>
            <Stack.Screen name='SignIn' component={LoginScreen} />
            <Stack.Screen name='SignUp' component={RegisterScreen} />
        </Stack.Navigator>
    );
}

export default AuthNavigation;

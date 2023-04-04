import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import HomeScreen from "../screens/HomeScreen";
import SavedScreen from "../screens/SavedScreen";
import CreatePostScreen from "../screens/CreatePostScreen";
import ChatScreen from "../screens/ChatScreen";
import AccountScreen from "../screens/AccountScreen";
import COLORS from "../constants/color";
import LoginScreen from "../screens/LoginScreen";
import InformationScreen from "../screens/InformationScreen";
import RegisterScreen from "../screens/RegisterScreen";
import PostScreen from "../screens/PostScreen";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const MainNavigation = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: { position: "absolute", height: 68 },
            }}
        >
            <Tab.Screen
                name='App'
                component={App}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignItems: "center", justifyContent: "center" }}>
                            <Image
                                source={
                                    focused
                                        ? require("../../assets/icons/home_focused.png")
                                        : require("../../assets/icons/home.png")
                                }
                                resizeMode='contain'
                                style={{
                                    width: 25,
                                    height: 25,
                                    tintColor: focused ? COLORS.red : COLORS.grey,
                                }}
                            />
                            <Text
                                style={{ color: focused ? COLORS.red : COLORS.grey, fontSize: 12 }}
                            >
                                Trang chủ
                            </Text>
                        </View>
                    ),
                }}
            />
            <Tab.Screen
                name='Saved'
                component={SavedScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignItems: "center", justifyContent: "center" }}>
                            <Image
                                source={
                                    focused
                                        ? require("../../assets/icons/love_focused.png")
                                        : require("../../assets/icons/love.png")
                                }
                                resizeMode='contain'
                                style={{
                                    width: 25,
                                    height: 25,
                                    tintColor: focused ? COLORS.red : COLORS.grey,
                                }}
                            />
                            <Text
                                style={{ color: focused ? COLORS.red : COLORS.grey, fontSize: 12 }}
                            >
                                Yêu thích
                            </Text>
                        </View>
                    ),
                }}
            />
            <Tab.Screen
                name='Post'
                component={CreatePostScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View
                            style={{
                                alignItems: "center",
                                justifyContent: "center",
                                backgroundColor: COLORS.red,
                                width: 50,
                                height: 50,
                                bottom: 5,
                                borderRadius: 8,
                            }}
                        >
                            <Image
                                source={require("../../assets/icons/plus.png")}
                                resizeMode='contain'
                                style={{ width: 25, height: 25, tintColor: "#FFFFFF" }}
                            />
                            {/* <Text style={{ color: focused ? COLORS.red : COLORS.grey, fontSize: 12 }}>Post</Text> */}
                        </View>
                    ),
                    headerShown: true,
                    header: () => (
                        <View style={styles.header}>
                            <Text style={styles.title}>Đăng bài</Text>
                            <Text style={styles.cancelBtn}>Huỷ</Text>
                        </View>
                    ),
                }}
            />
            <Tab.Screen
                name='Chat'
                component={ChatScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignItems: "center", justifyContent: "center" }}>
                            <Image
                                source={
                                    focused
                                        ? require("../../assets/icons/chat_focused.png")
                                        : require("../../assets/icons/chat.png")
                                }
                                resizeMode='contain'
                                style={{
                                    width: 25,
                                    height: 25,
                                    tintColor: focused ? COLORS.red : COLORS.grey,
                                }}
                            />
                            <Text
                                style={{ color: focused ? COLORS.red : COLORS.grey, fontSize: 12 }}
                            >
                                Tin nhắn
                            </Text>
                        </View>
                    ),
                }}
            />
            <Tab.Screen
                name='Account'
                component={AccountScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignItems: "center", justifyContent: "center" }}>
                            <Image
                                source={
                                    focused
                                        ? require("../../assets/icons/user_focused.png")
                                        : require("../../assets/icons/user.png")
                                }
                                resizeMode='contain'
                                style={{
                                    width: 25,
                                    height: 25,
                                    tintColor: focused ? COLORS.red : COLORS.grey,
                                }}
                            />
                            <Text
                                style={{ color: focused ? COLORS.red : COLORS.grey, fontSize: 12 }}
                            >
                                Tài khoản
                            </Text>
                        </View>
                    ),
                    headerShown: true,
                    header: () => (
                        <View style={styles.header}>
                            <Text style={styles.title}>Tài khoản</Text>
                            <Text style={styles.cancelBtn}>Đăng xuất</Text>
                        </View>
                    ),
                }}
            />
        </Tab.Navigator>
    );
};

export default MainNavigation;
function App() {
    return (
        <Stack.Navigator initialRouteName='App'>
            <Stack.Screen name='Home' component={HomeScreen} />
            <Stack.Screen name='Login' component={LoginScreen} />
            <Stack.Screen name='Information' component={InformationScreen} />
            <Stack.Screen name='SignUp' component={RegisterScreen} />
            <Stack.Screen
                name='Post Detail'
                component={PostScreen}
                options={{
                    headerShown: true,
                    header: ({ navigation }) => (
                        <View style={styles.header}>
                            <Text style={styles.title}>Chi tiết phòng</Text>
                            <TouchableOpacity
                                onPress={() => navigation.goBack()}
                                style={styles.backBtn}
                            >
                                <Image
                                    source={require("../../assets/icons/back.png")}
                                    resizeMode='contain'
                                    style={{
                                        width: 25,
                                        height: 25,
                                        tintColor: COLORS.grey,
                                    }}
                                />
                            </TouchableOpacity>
                        </View>
                    ),
                }}
            />
        </Stack.Navigator>
    );
}
// export default App
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
    cancelBtn: {
        position: "absolute",
        right: 24,
    },
    backBtn: {
        position: "absolute",
        left: 24,
    },
});

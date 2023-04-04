import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import COLORS from "../constants/color";
import AccountScreen from "../screens/AccountScreen";
import ChatScreen from "../screens/ChatScreen";
import CreatePostScreen from "../screens/CreatePostScreen";
import HomeScreen from "../screens/HomeScreen";
import SavedScreen from "../screens/SavedScreen";

const Tab = createBottomTabNavigator();

const MainNavigation = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: true,
                headerStyle: {},
                tabBarShowLabel: false,
                tabBarStyle: { position: "absolute", height: 68 },
            }}
        >
            <Tab.Screen
                name='Home'
                component={HomeScreen}
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
                    headerShown: true,
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

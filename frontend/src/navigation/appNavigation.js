import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import COLORS from '../constants/color'
import PaymentScreen from '../screens/PaymentScreen'
import VnpayScreen from '../screens/VnpayScreen'
import PostScreen from '../screens/PostScreen'
import AuthNavigation from './authNavigation'
import MainNavigation from './mainNavigation'
import ConversationScreen from '../screens/ConversationScreen'
import ConfirmOTPScreen from '../screens/ConfirmOTPScreen'
import MyPostsScreen from '../screens/MyPostsScreen'

const Stack = createNativeStackNavigator()

const AppNavigation = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Main"
                component={MainNavigation}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="Auth"
                component={AuthNavigation}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="Conversation"
                component={ConversationScreen}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="Post Detail"
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
                                    source={require('../../assets/icons/back.png')}
                                    resizeMode="contain"
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
            <Stack.Screen
                name="Payment"
                component={PaymentScreen}
                options={{
                    headerShown: true,
                    header: () => (
                        <View style={styles.header}>
                            <Text style={styles.title}>Thanh toán</Text>
                        </View>
                    ),
                }}
            />
            <Stack.Screen
                name="Vnpay"
                component={VnpayScreen}
                options={{
                    headerShown: true,
                    header: () => (
                        <View style={styles.header}>
                            <Text style={styles.title}>Thanh toán</Text>
                        </View>
                    ),
                }}
            />
            <Stack.Screen
                name="Xác thực mã OTP"
                component={ConfirmOTPScreen}
                // options={{
                //     headerShown: true,
                //     header: () => (
                //         <View style={styles.header}>
                //             <Text style={styles.title}>Xác nhận mã OTP</Text>
                //         </View>
                //     ),
                // }}
            />
            <Stack.Screen
                name="My Posts"
                component={MyPostsScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <Image
                                source={
                                    focused
                                        ? require('../../assets/icons/love_focused.png')
                                        : require('../../assets/icons/love.png')
                                }
                                resizeMode="contain"
                                style={{
                                    width: 25,
                                    height: 25,
                                    tintColor: focused ? COLORS.red : COLORS.grey,
                                }}
                            />
                            <Text
                                style={{ color: focused ? COLORS.red : COLORS.grey, fontSize: 12 }}
                            >
                                Bài đăng của tôi
                            </Text>
                        </View>
                    ),
                    headerShown: true,
                    header: ({ navigation }) => (
                        <View style={styles.header}>
                            <Text style={styles.title}>Bài đăng của tôi</Text>
                            <TouchableOpacity
                                style={styles.backBtn}
                                onPress={() => navigation.goBack()}
                            >
                                <Image
                                    source={require('../../assets/icons/back.png')}
                                    resizeMode="contain"
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
    )
}

export default AppNavigation

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
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 55,
        marginTop: 24,
        position: 'relative',
        borderBottomColor: COLORS.black,
        borderBottomWidth: 0.5,
    },
    title: {
        fontSize: 24,
        fontWeight: '500',
        zIndex: 10,
    },
    cancelBtn: {
        position: 'absolute',
        right: 24,
    },
    backBtn: {
        position: 'absolute',
        left: 24,
    },
})

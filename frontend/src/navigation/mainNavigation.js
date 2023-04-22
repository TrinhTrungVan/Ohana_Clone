import AsyncStorage from '@react-native-async-storage/async-storage'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React, { useEffect } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import COLORS from '../constants/color'
import ChatScreen from '../screens/ChatScreen'
import CreatePostScreen from '../screens/CreatePostScreen'
import HomeScreen from '../screens/HomeScreen'
import SavedScreen from '../screens/SavedScreen'
import AccountNavigation from './accountNavigation'

const Tab = createBottomTabNavigator()

const MainNavigation = ({ navigation }) => {
    const readData = async () => {
        try {
            const res = await AsyncStorage.getItem('@userLogin')
            if (!res) {
                navigation.navigate('Auth')
            }
        } catch (e) {
            console.log('Error')
        }
    }

    useEffect(() => {
        readData()
    }, [])
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: true,
                headerStyle: {},
                tabBarShowLabel: false,
                tabBarStyle: { position: 'absolute', height: 68 },
            }}
        >
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <Image
                                source={
                                    focused
                                        ? require('../../assets/icons/home_focused.png')
                                        : require('../../assets/icons/home.png')
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
                                Trang chủ
                            </Text>
                        </View>
                    ),
                    headerShown: true,
                    unmountOnBlur: true,
                }}
            />
            <Tab.Screen
                name="Saved"
                component={SavedScreen}
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
                                Yêu thích
                            </Text>
                        </View>
                    ),
                    headerShown: true,
                    unmountOnBlur: true,
                    header: ({ navigation }) => (
                        <View style={styles.header}>
                            <Text style={styles.title}>Yêu thích</Text>
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
            <Tab.Screen
                name="Post"
                component={CreatePostScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View
                            style={{
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: COLORS.red,
                                width: 50,
                                height: 50,
                                bottom: 5,
                                borderRadius: 8,
                            }}
                        >
                            <Image
                                source={require('../../assets/icons/plus.png')}
                                resizeMode="contain"
                                style={{ width: 25, height: 25, tintColor: '#FFFFFF' }}
                            />
                            {/* <Text style={{ color: focused ? COLORS.red : COLORS.grey, fontSize: 12 }}>Post</Text> */}
                        </View>
                    ),
                    headerShown: true,
                    header: ({ navigation }) => (
                        <View style={styles.header}>
                            <Text style={styles.title}>Đăng phòng</Text>
                            <TouchableOpacity
                                style={styles.cancelBtn}
                                onPress={() => navigation.navigate('Home')}
                            >
                                <Text>Huỷ</Text>
                            </TouchableOpacity>
                        </View>
                    ),
                }}
            />
            <Tab.Screen
                name="Chat"
                component={ChatScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <Image
                                source={
                                    focused
                                        ? require('../../assets/icons/chat_focused.png')
                                        : require('../../assets/icons/chat.png')
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
                                Tin nhắn
                            </Text>
                        </View>
                    ),
                    headerShown: true,
                    unmountOnBlur: true,
                    header: ({ navigation }) => (
                        <View style={styles.header}>
                            <Text style={styles.title}>Tin nhắn</Text>
                            <TouchableOpacity
                                style={styles.backBtn}
                                onPress={() => navigation.navigate('Home')}
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
            <Tab.Screen
                name="Account"
                component={AccountNavigation}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <Image
                                source={
                                    focused
                                        ? require('../../assets/icons/user_focused.png')
                                        : require('../../assets/icons/user.png')
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
                                Tài khoản
                            </Text>
                        </View>
                    ),
                    headerShown: false,
                    // header: () => (
                    //     <View style={styles.header}>
                    //         <Text style={styles.title}>Thông tin tài khoản</Text>
                    //         <Text style={styles.cancelBtn}></Text>
                    //     </View>
                    // ),
                }}
            />
        </Tab.Navigator>
    )
}

export default MainNavigation

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
        position: 'relative',
        borderBottomColor: COLORS.black,
        borderBottomWidth: 0.5,
        backgroundColor: COLORS.abs_white,
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

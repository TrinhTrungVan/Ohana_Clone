import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import dayjs from "dayjs";
import jwt_decode from "jwt-decode";
import React, { useEffect, useState } from "react";
import { Image, SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../api/services/authServices";
import Button from "../components/Button";
import Information from "../components/Information";
import Loading from "../components/Loading";
import COLORS from "../constants/color";

function ProfileScreen({ navigation }) {
    const isLogin = useSelector(state => state.auth.login)
    const [user, setUser] = useState(isLogin.currentUser)
    const dispatch = useDispatch()

    let axiosJWT = axios.create()

    const refreshToken = async () => {
        try {
            const res = await axios.post(`http://10.0.2.2:2001/api/auth/refresh`, {
                withCredentials: true
            })
            return res.data
        }
        catch (e) {
            console.log('errorRefresh', e)
        }
    }

    axiosJWT.interceptors.request.use(async (config) => {
        const decodedToken = jwt_decode(isLogin.currentUser?.accessToken)
        const isExpired = dayjs.unix(decodedToken.exp).diff(dayjs()) < 1
        if (isExpired) {
            const data = await refreshToken()
            config.headers["Token"] = data.accessToken
        }
        return config
    }, err => {
        return Promise.reject(err)
    })

    const handleClickEdit = () => {
        navigation.navigate('Settings')
    }

    const handleClickLogout = () => {
        logoutUser(dispatch, user?.accessToken, axiosJWT)
        navigation.navigate('Auth')
    }

    const readData = async () => {
        try {
            const res = await AsyncStorage.getItem('@userLogin')
            if (res !== null) {
                console.log('profile', res)
                setUser(JSON.parse(res))
            }
        }
        catch (e) {
            alert('Đã xảy ra lỗi')
        }
    }

    useEffect(() => {
        readData()
    }, [isLogin.isFetching]);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={{ paddingHorizontal: 16 }}>
                <View style={styles.view}>
                    <Image
                        source={{
                            uri: user?.avatar_url,
                        }}
                        style={styles.avatar}
                    />
                    <Information
                        label='Họ tên'
                        text={isLogin.isFetching ? <Loading /> : user?.fullname}
                    />
                    <Information
                        label='Số điện thoại'
                        text={isLogin.isFetching ? <Loading /> : user?.phoneNumber}
                    />
                    <Information
                        label='Email'
                        text={isLogin.isFetching ? <Loading /> : user?.email}
                    />
                    <Button type='Profile' onPress={handleClickEdit}>
                        Chỉnh sửa thông tin
                    </Button>
                    <Button type='Logout' onPress={handleClickLogout}>
                        Đăng xuất
                    </Button>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default ProfileScreen

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        backgroundColor: COLORS.white,
        marginBottom: 68,
    },
    view: {
        width: "100%",
        paddingTop: 8,
        paddingBottom: 32,
        alignItems: "center"
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 100,
        marginTop: 16,
    },
});
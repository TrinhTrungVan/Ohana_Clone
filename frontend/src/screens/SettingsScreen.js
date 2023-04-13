import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, SafeAreaView, ScrollView, Text, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import Button from "../components/Button";
import Input from "../components/Input";
import COLORS from "../constants/color";
import Loading from "../components/Loading";
import { updateUser } from "../redux/apiRequest";
import { loginFailed, loginStart, loginSuccess } from "../redux/slices/authSlice";
import axios from "axios";
import jwt_decode from 'jwt-decode';
import dayjs from 'dayjs';

function SettingsScreen({ navigation }) {
    const [user, setUser] = useState(null)
    const isLogin = useSelector(state => state.auth.login)
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
            console.log(e)
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

    const handleChange = (name, value) => {
        setUser({
            ...user,
            [name]: value,
        });
    };

    const handleClickUpdate = () => {
        console.log('click update')
        updateUser(user?._id, user, isLogin.currentUser.accessToken, dispatch, axiosJWT)
        saveStorage("@userLogin", user)
        alert('Update Successful!')
        navigation.navigate('Profile')
    }

    const handleClickOut = () => {
        navigation.navigate('Profile')
    }

    const saveStorage = async (name, data) => {
        try {
            await AsyncStorage.setItem(name, JSON.stringify(data))
        } catch (e) {
            alert("Failed to save the data to the storage")
        }
    }

    const readData = async () => {
        try {
            const res = await AsyncStorage.getItem('@userLogin')
            if (res !== null) {
                console.log('update', res)
                setUser(JSON.parse(res))
            }
        }
        catch (e) {
            alert('Failed to fetch the input from storage')
        }
    }

    useEffect(() => {
        readData()
    }, [])

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={{ paddingHorizontal: 16 }}>
                <View style={{ paddingTop: 8, paddingBottom: 32 }}>
                    <Input
                        label='Họ tên'
                        placeholder="Nhập họ và tên"
                        onChangeText={text => handleChange('fullname', text)}
                        // onChangeText={text => setFullname(text)}
                        value={isLogin.isFetching ? <Loading /> : user?.fullname}
                    />
                    <Input
                        label='Địa chỉ'
                        placeholder='Nhập địa chỉ'
                        onChangeText={text => handleChange("address", text)}
                        // onChangeText={text => setAddress(text)}
                        value={isLogin.isFetching ? <Loading /> : user?.address}
                    />
                    <Input
                        label='Số điện thoại'
                        placeholder='Nhập số điện thoại'
                        onChangeText={text => handleChange("phoneNumber", text)}
                        // onChangeText={text => setPhoneNumber(text)}
                        value={isLogin.isFetching ? <Loading /> : user?.phoneNumber}
                    />
                    <Input
                        label='Email'
                        placeholder='Nhập email'
                        onChangeText={text => handleChange("email", text)}
                        value={isLogin.isFetching ? <Loading /> : user?.email}
                        editable={false} selectTextOnFocus={false}
                    />
                    <Input
                        label='Tài khoản ngân hàng'
                        placeholder='Nhập tài khoản ngân hàng'
                        onChangeText={text => handleChange("bankAcount", text)}
                        value={isLogin.isFetching ? <Loading /> : user?.bankAcount}
                    />
                    <Button onPress={handleClickUpdate}>Cập nhật</Button>
                    <Button type="Logout" onPress={handleClickOut}>Thoát</Button>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default SettingsScreen

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        backgroundColor: COLORS.white,
        marginBottom: 68,
    },
});

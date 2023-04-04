import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect } from "react";
import { View, SafeAreaView, ScrollView, Text, StyleSheet, TouchableOpacity, TextInformation } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import Button from "../components/Button";
import Information from "../components/Information";
import Loading from "../components/Loading";
import COLORS from "../constants/color";
import { logoutUser } from "../redux/apiRequest";




function ProfileScreen({navigation}) {
    const isLogin = useSelector(state => state.auth.login)
    const [user, setUser] = useState(isLogin.currentUser)
    const dispatch = useDispatch()

    const handleClickEdit = () => {
        navigation.navigate('Settings')
    }

    const handleClickLogout = () => {
        logoutUser(dispatch, user?.accessToken)
        navigation.navigate('Authen')
    }

    const readData = async () => {
        try {
            const res = await AsyncStorage.getItem('@userLogin')
            if(res !== null) {
                console.log('profile', res)
                setUser(JSON.parse(res))
            }
        }
        catch(e) {
            alert('Failed to fetch the input from storage')
        }
    }

    useEffect(() => {
        readData()
    }, [isLogin.isFetching]);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={{ paddingHorizontal: 16 }}>
                    <View style={{ paddingTop: 8, paddingBottom: 32 }}>
                        <Information label='Họ tên' text={isLogin.isFetching ? <Loading /> : user?.fullname} />
                        <Information label='Địa chỉ' text={isLogin.isFetching ? <Loading /> : user?.address} />
                        <Information label='Số điện thoại' text={isLogin.isFetching ? <Loading /> : user?.phoneNumber} />
                        <Information label='Email' text={isLogin.isFetching ? <Loading /> : user?.email} />
                        <Information label='Tài khoản ngân hàng' />
                        <Button type="Profile" onPress={handleClickEdit}>Chỉnh sửa thông tin</Button>
                        <Button type="Logout" onPress={handleClickLogout}>Đăng xuất</Button>
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
});
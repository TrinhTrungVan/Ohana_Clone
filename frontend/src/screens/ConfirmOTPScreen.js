import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { View, Text, StyleSheet, Image } from 'react-native'
import Input from '../components/Input'
import Button from '../components/Button'
import { getData } from '../utils/asyncStorage'
import { registerUser } from '../api/services/authServices'

function ConfirmOTPScreen({ route, navigation }) {
    const [otp, setOtp] = useState("")
    const { type, user, email } = route.params
    const dispatch = useDispatch()

    const handleClick = async () => {
        const tokenOtp = await getData("@tokenOtp")
        if (tokenOtp == otp) {
            if (type == 'Register') {
                await registerUser(user, dispatch);
                navigation.navigate("Đăng nhập");
                alert("Đăng ký thành công, hãy đăng nhập để tiếp tục.");
            }
            if (type == 'ResetPassword') {
                navigation.navigate("Lấy lại mật khẩu", { sent: "ok" })
            }
            if (type == 'UpdatePassword') {
                navigation.navigate("Thay đổi mật khẩu", { sent: "ok" })
            }
        }
        else {
            alert("Mã xác thực OTP không chính xác")
            setOtp("")
        }

    }
    return (
        <View style={styles.container}>
            {/* <Text style={styles.title}>Xác thực mã OTP</Text> */}
            <Text style={styles.text}>Quý khách vui lòng nhập mã OTP đã được gửi qua email {user?.email || email}</Text>
            <Input
                placeholder="Nhập OTP"
                value={otp}
                onChangeText={text => setOtp(text)}
            />
            <Button type='otp' onPress={handleClick}>Xác nhận</Button>
        </View>
    )
}

export default ConfirmOTPScreen

const styles = StyleSheet.create({
    containers: {
        // padding: 10
    },
    container: {
        margin: 10
    },
    title: {
        fontSize: 18,
        fontWeight: "bold"
    },
    text: {
        fontSize: 14,
    },
    header: {
        width: "100%",
        height: 50,
        backgroundColor: "red"
    }
})
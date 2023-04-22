import React, { useState } from 'react'
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useDispatch } from 'react-redux'
import { registerUser, sendEmail, checkEmail } from '../api/services/authServices'
import Button from '../components/Button'
import Input from '../components/Input'
import COLORS from '../constants/color'
import { getData } from '../utils/asyncStorage'
import { validateRegisterForm } from '../utils/validateForm'

function RegisterScreen({ navigation }) {
    const [user, setUser] = useState({})
    const [textError, setTextError] = useState('')
    const dispatch = useDispatch()

    const handleChange = (name, value) => {
        setUser({
            ...user,
            [name]: value,
        })
    }

    const handleRegister = async () => {
        const errorMsg = validateRegisterForm(user)
        if (errorMsg) return setTextError(errorMsg)

        await checkEmail(user.email)

        const status = await getData('@checkEmail')

        if (status == 500) return setTextError('Lỗi hệ thống')
        if (status == 402) return setTextError('Email đã tồn tại')

        await sendEmail(user.email)
        navigation.navigate('Xác thực mã OTP', { type: 'Register', user: user })
        setTextError('')
        setUser({})
    }

    const handleChangeSignin = () => {
        navigation.navigate('Đăng nhập')
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={{ paddingHorizontal: 16 }}>
                <View style={{ paddingTop: 8, paddingBottom: 32 }}>
                    <Input
                        label="Email"
                        placeholder="Nhập địa chỉ email"
                        value={user?.email}
                        onChangeText={(text) => handleChange('email', text)}
                    />
                    <Input
                        label="Mật khẩu"
                        placeholder="Nhập mật khẩu"
                        value={user?.password}
                        onChangeText={(text) => handleChange('password', text)}
                        secureTextEntry={true}
                    />
                    <Input
                        label="Xác nhận mật khẩu"
                        placeholder="Nhập lại mật khẩu"
                        value={user?.repeatPassword}
                        onChangeText={(text) => handleChange('repeatPassword', text)}
                        secureTextEntry={true}
                    />
                    <Input
                        label="Họ tên"
                        placeholder="Nhập họ và tên"
                        value={user?.fullname}
                        onChangeText={(text) => handleChange('fullname', text)}
                    />
                    <Input
                        label="Số điện thoại"
                        placeholder="Nhập số điện thoại"
                        value={user?.phoneNumber}
                        onChangeText={(text) => handleChange('phoneNumber', text)}
                    />
                    <Button title="Sign Up" onPress={handleRegister}>
                        Đăng ký
                    </Button>
                    <Text style={styles.textError}>{textError}</Text>
                    <View style={styles.signinContainer}>
                        <Text>Bạn đã có tài khoản?</Text>
                        <TouchableOpacity onPress={handleChangeSignin}>
                            <Text style={styles.signinBtn}>Đăng nhập</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default RegisterScreen

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        backgroundColor: COLORS.white,
        marginBottom: 68,
    },
    textError: {
        color: COLORS.red,
    },
    signinContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    signinBtn: {
        fontWeight: 'bold',
        marginLeft: 8,
        marginBottom: 1,
    },
})

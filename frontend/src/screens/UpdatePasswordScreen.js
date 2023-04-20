import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Input from '../components/Input'
import Button from '../components/Button'
import { getData } from '../utils/asyncStorage'
import { sendEmail, checkEmail } from '../api/services/authServices'
import { updatePassword } from '../api/services/userServices'

function UpdatePasswordScreen({ route, navigation }) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [password2, setPassword2] = useState("")
    const [textError, setTextError] = useState("")
    const { sent, user } = route.params || ""

    const handleClick = async () => {
        if (user?.email != email) {
            setTextError("Nhập sai email")
        }
        else {
            setTextError("")
            await sendEmail(email)
            navigation.navigate("Xác thực mã OTP", { type: "UpdatePassword", email: email })
        }
    }

    const handleResetPassword = async () => {
        const user = {
            email: email,
            password: password
        }
        if (password != password2) {
            setTextError("Mật khẩu không khớp")
        }
        else {
            setTextError('')
            await updatePassword(user)
            navigation.navigate("Profile")
            alert("Thay đổi mật khẩu thành công.")
        }
    }
    return (
        <View style={styles.container}>
            {!sent ?
                <View>
                    <Text style={styles.text}>Vui lòng điền Email bạn sử dụng để đăng nhập Ohana</Text>
                    <Input
                        placeholder="Nhập Email"
                        value={email}
                        onChangeText={text => setEmail(text)}
                    />
                    <Text style={styles.textError}>{textError}</Text>
                    <Button onPress={handleClick} >Tiếp theo</Button>
                </View>
                :
                <View>
                    <Text style={styles.text}>Cài đặt mật khẩu mới</Text>
                    <View style={styles.password}>
                        <Input
                            placeholder='Nhập mật khẩu mới của bạn'
                            value={password}
                            onChangeText={text => setPassword(text)}
                            secureTextEntry={true}
                        />
                    </View>
                    <View>
                        <Input
                            placeholder="Nhập lại mật khẩu mới của bạn"
                            value={password2}
                            onChangeText={text => setPassword2(text)}
                            secureTextEntry={true}
                        />
                    </View>
                    <View>
                        <Text style={styles.textError}>{textError}</Text>
                    </View>
                    <Button onPress={handleResetPassword}>Xác nhận</Button>
                </View>
            }
        </View>
    )
}

export default UpdatePasswordScreen

const styles = StyleSheet.create({
    container: {
        margin: 10
    },
    text: {
        fontSize: 18
    },
    password: {
        marginBottom: 20
    },
    textError: {
        color: "red",
        marginTop: 50
    }
})
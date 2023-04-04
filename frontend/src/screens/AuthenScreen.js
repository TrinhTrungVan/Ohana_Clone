import React from "react";
import { View, StyleSheet, Image } from "react-native";
import Button from "../components/Button";

const AuthenScreen = ({navigation}) => {
    return (
        <View style={styles.container}>
            <Image style={styles.img} source={require('../../assets/accountBackground.jpg')}></Image>
            <View style={styles.button}>
                <Button type="Authen" onPress={() => navigation.navigate('Login')}>Đăng nhập</Button>
                <Button type="Authen" onPress={() => navigation.navigate('SignUp')}>Đăng ký</Button>
            </View>
        </View>
    )
}

export default AuthenScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    img: {
        width: "100%",
        height: 400
    },
    button: {
        alignItems: "center",
    },
});
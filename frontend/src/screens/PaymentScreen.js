import React, { useState, useEffect } from "react";
import { View, SafeAreaView, ScrollView, StyleSheet, Text } from "react-native";
import Button from "../components/Button";
import Input from "../components/Input";
import RadioButotn from '../components/RadioButotn';
import { createPayment } from "../api/services/paymentServices";

function PaymentScreen({ navigation, route }) {
    const { deposit } = route.params || ""
    const [bankCode, setBankCode] = useState("")
    const [language, setLanguage] = useState("vn")
    // const [amount, setAmount] = useState(deposit)

    const BANKCODE = [
        {
            key: "",
            text: "Cổng thanh toán VNPAYQR"
        },
        {
            key: "VNPAYQR",
            text: "Thanh toán qua ứng dụng hỗ trợ VNPAYQR"
        },
        {
            key: "VNBANK",
            text: "Thanh toán qua ATM-Tài khoản ngân hàng nội địa"
        },
        {
            key: "INTCARD",
            text: "Thanh toán qua thẻ quốc tế"
        }
    ]

    const LANGUAGE = [
        {
            key: "vn",
            text: "Tiếng Việt"
        },
        {
            key: "en",
            text: "Tiếng Anh"
        }
    ]

    const handleClick = async () => {
        const pay = {
            amount: parseInt(deposit),
            bankCode: bankCode,
            language: language
        }
        const uri = await createPayment(pay)
        navigation.navigate("Vnpay", { uri: uri })
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={{ paddingHorizontal: 16 }}>
                <View style={{ paddingTop: 8, paddingBottom: 32 }}>
                    <View>
                        <Text style={styles.amount}>Số tiền: {deposit}</Text>
                    </View>
                    <View style={styles.radio}>
                        <RadioButotn value={bankCode} setValue={setBankCode} title="Chọn phương thức thanh toán" OPTION={BANKCODE} />
                    </View>
                    <View style={styles.radio}>
                        <RadioButotn value={language} setValue={setLanguage} title="Ngôn ngữ" OPTION={LANGUAGE} />
                    </View>
                    <Button onPress={handleClick}>Thanh toán</Button>
                    <Button type="Logout" onPress={() => navigation.navigate("Post Detail")}>Quay lại</Button>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default PaymentScreen

// const styles = StyleSheet.create({
//     container: {
//         width: "100%",
//         height: "100%",
//         fontSize: "120%"
//         // flex: 1,
//         // alignItems: "center",
//         // justifyContent: "center",
//         // backgroundColor: "#8fcbbc",
//     },
// });
const styles = StyleSheet.create({
    radio: {
        flex: 1,
        // alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30
    },
    container: {
        marginTop: 50
    },
    amount: {
        fontSize: 18,
        fontWeight: "bold",
    }
});
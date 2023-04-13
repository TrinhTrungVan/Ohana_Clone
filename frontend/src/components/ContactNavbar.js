import React from "react";
import { Linking, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import COLORS from "../constants/color";

const ContactNavbar = (props) => {
    const { navigation } = props;

    const handleNavigateToChat = () => {
        navigation.navigate("Chat");
    };

    const handleNavigateToPayment = () => {
        console.log("Payment");
    };

    const handleNavigateToCall = () => {
        Linking.openURL(`tel:${"0338886754"}`);
    };
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => handleNavigateToChat()}>
                <View
                    style={{
                        ...styles.btn,
                        backgroundColor: COLORS.blue,
                        borderColor: COLORS.blue,
                    }}
                >
                    <Image
                        source={require("../../assets/icons/chat.png")}
                        style={{
                            ...styles.btnIcon,
                            width: 32,
                            height: 32,
                            tintColor: COLORS.white,
                        }}
                    />
                    <Text style={{ ...styles.btnText, color: COLORS.white }}>Chat</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleNavigateToPayment()}>
                <View style={{ ...styles.btn, borderColor: COLORS.red }}>
                    <Image
                        source={require("../../assets/icons/dollar.png")}
                        style={{ ...styles.btnIcon, width: 32, height: 32, tintColor: COLORS.red }}
                    />
                    <Text style={{ ...styles.btnText, color: COLORS.red }}>Đặt cọc</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleNavigateToCall()}>
                <View
                    style={{
                        ...styles.btn,
                        backgroundColor: COLORS.blue,
                        borderColor: COLORS.blue,
                    }}
                >
                    <Image
                        source={require("../../assets/icons/phone-call.png")}
                        style={{
                            ...styles.btnIcon,
                            width: 30,
                            height: 30,
                            tintColor: COLORS.white,
                        }}
                    />
                    <Text style={{ ...styles.btnText, color: COLORS.white }}>Gọi</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
};

export default ContactNavbar;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderTopWidth: 0.5,
        borderColor: COLORS.grey,
        paddingVertical: 8,
        paddingHorizontal: 24,
    },
    btn: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        height: 50,
        borderWidth: 1,
        borderRadius: 6,
        paddingHorizontal: 8,
        paddingVertical: 4,
    },
    btnIcon: {
        marginVertical: 4,
    },
    btnText: {
        marginHorizontal: 8,
        fontSize: 18,
    },
});

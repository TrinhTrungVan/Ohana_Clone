import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import COLORS from "../constants/color";

export default function Button({ children, onPress, type = "Primary" }) {
    return (
        <TouchableOpacity
            style={{
                ...styles.button,
                backgroundColor: type === "Secondary" ? COLORS.white : ( type === "Logout" ? COLORS.logout : COLORS.red)
            }}
            onPress={onPress}
        >
            {typeof children === "string" ? (
                <Text
                    style={{
                        ...styles.text,
                        color: type === "Secondary" || type === "Logout" ? COLORS.blue : COLORS.abs_white,
                    }}
                >
                    {children}
                </Text>
            ) : (
                <View>{children}</View>
            )}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        width: "100%",
        height: 55,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 4,
        marginBottom: 10
    },
    text: {
        fontSize: 14,
        lineHeight: 55,
        fontWeight: "bold",
        letterSpacing: 1,
    },
});

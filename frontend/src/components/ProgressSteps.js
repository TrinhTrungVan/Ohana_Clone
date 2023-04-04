import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import COLORS from "../constants/color";

const ProgressSteps = (props) => {
    const { step, label } = props;

    return (
        <View style={styles.container}>
            <View style={styles.step}>
                <Image source={require("../../assets/icons/rec.png")} style={styles.circle} />
                <Text style={styles.number}>1</Text>
                <Text style={{ ...styles.label, left: -12, color: COLORS.red }}>{label[0]}</Text>
            </View>
            <View style={styles.step}>
                <Image
                    source={require("../../assets/icons/rec.png")}
                    style={{ ...styles.circle, tintColor: step > 0 ? COLORS.red : COLORS.grey }}
                />
                <Text style={{ ...styles.number, color: step > 0 ? COLORS.red : COLORS.grey }}>
                    2
                </Text>
                <Text
                    style={{
                        ...styles.label,
                        left: -5,
                        color: step > 0 ? COLORS.red : COLORS.grey,
                    }}
                >
                    {label[1]}
                </Text>
                <Image
                    source={require("../../assets/icons/substract.png")}
                    style={{ ...styles.line, tintColor: step > 0 ? COLORS.red : COLORS.grey }}
                />
            </View>
            <View style={styles.step}>
                <Image
                    source={require("../../assets/icons/rec.png")}
                    style={{ ...styles.circle, tintColor: step > 1 ? COLORS.red : COLORS.grey }}
                />
                <Text style={{ ...styles.number, color: step > 1 ? COLORS.red : COLORS.grey }}>
                    3
                </Text>
                <Text
                    style={{
                        ...styles.label,
                        left: -10,
                        color: step > 1 ? COLORS.red : COLORS.grey,
                    }}
                >
                    {label[2]}
                </Text>
                <Image
                    source={require("../../assets/icons/substract.png")}
                    style={{ ...styles.line, tintColor: step > 1 ? COLORS.red : COLORS.grey }}
                />
            </View>
            <View style={styles.step}>
                <Image
                    source={require("../../assets/icons/rec.png")}
                    style={{ ...styles.circle, tintColor: step > 2 ? COLORS.red : COLORS.grey }}
                />
                <Text style={{ ...styles.number, color: step > 2 ? COLORS.red : COLORS.grey }}>
                    4
                </Text>
                <Text
                    style={{
                        ...styles.label,
                        left: -12,
                        color: step > 2 ? COLORS.red : COLORS.grey,
                    }}
                >
                    {label[3]}
                </Text>
                <Image
                    source={require("../../assets/icons/substract.png")}
                    style={{ ...styles.line, tintColor: step > 2 ? COLORS.red : COLORS.grey }}
                />
            </View>
        </View>
    );
};

export default ProgressSteps;

const styles = StyleSheet.create({
    container: {
        width: 380,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        height: 80,
        position: "relative",
        marginBottom: 16,
    },
    step: {
        position: "relative",
        alignItems: "center",
        justifyContent: "center",
    },
    circle: {
        width: 36,
        height: 36,
        tintColor: COLORS.red,
        zIndex: 10,
    },
    number: {
        position: "absolute",
        color: COLORS.red,
        fontWeight: "700",
    },
    label: {
        position: "absolute",
        left: -20,
        top: 36,
        width: 120,
        fontWeight: "700",
    },
    line: {
        position: "absolute",
        right: 32,
        height: 6,
        width: 66,
        tintColor: COLORS.red,
    },
});

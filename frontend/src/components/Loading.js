import React from "react";
import { Animated, Easing, Image, StyleSheet } from "react-native";
import COLORS from "../constants/color";

const Loading = ({ color }) => {
    let spinValue = new Animated.Value(0);

    const spin = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ["0deg", "360deg"],
    });

    Animated.loop(
        Animated.timing(spinValue, {
            toValue: 1,
            duration: 1500,
            easing: Easing.linear,
            useNativeDriver: true,
        })
    ).start();

    return (
        <Animated.View style={{ transform: [{ rotate: spin }] }}>
            <Image
                source={require("../../assets/icons/loading.png")}
                style={{ ...styles.loading, tintColor: color ? color : COLORS.abs_white }}
            />
        </Animated.View>
    );
};

export default Loading;

const styles = StyleSheet.create({
    loading: {
        width: 25,
        height: 25,
    },
});

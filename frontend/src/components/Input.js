import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import CheckBox from "./CheckBox";

const Input = ({
    label,
    value,
    suffix,
    error,
    password,
    optionFree,
    onChangeFree,
    onFocus = () => {},
    secureTextEntry,
    onChangeText = () => {},
    ...props
}) => {
    const [isChecked, setIsChecked] = useState(false);

    const handleClick = () => {
        if (isChecked) {
            onChangeFree("");
            setIsChecked(false);
            return;
        }
        onChangeFree(0);
        setIsChecked(true);
    };

    useEffect(() => {
        if (value === 0) setIsChecked(true);
    }, [value]);

    return (
        <View style={{ marginBottom: 16 }}>
            <Text style={styles.label}>{label}</Text>
            <View style={styles.container}>
                <View style={{ ...styles.inputContainer, width: optionFree ? "80%" : "100%" }}>
                    <TextInput
                        value={value === 0 ? "Free" : value}
                        {...props}
                        onChangeText={onChangeText}
                        secureTextEntry={secureTextEntry}
                    />
                    {suffix && <Text>{suffix}</Text>}
                </View>
                {optionFree && (
                    <CheckBox isChecked={isChecked} onPress={handleClick} label='Free' />
                )}
            </View>
        </View>
    );
};

export default Input;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    label: {
        marginVertical: 5,
        fontSize: 14,
    },
    inputContainer: {
        width: "80%",
        height: 55,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderWidth: 0.5,
        paddingHorizontal: 16,
        borderRadius: 6,
    },
});

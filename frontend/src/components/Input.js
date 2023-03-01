import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import CheckBox from "./CheckBox";

<<<<<<< Updated upstream
const Input = ({
    label,
    value,
    suffix,
    error,
    password,
    optionFree,
    onChangeFree,
    onFocus = () => {},
    ...props
}) => {
=======
const Input = ({ label, suffix, error, password, value, optionFree, secureTextEntry, onFocus = () => {}, onChangeText = () => {}, ...props }) => {
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
                    <TextInput value={value === 0 ? "Free" : value} {...props} />
                    {suffix && <Text>{suffix}</Text>}
=======
                    <TextInput {...props} value={value} onChangeText={onChangeText} secureTextEntry={secureTextEntry} />
                    <Text>{suffix}</Text>
>>>>>>> Stashed changes
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

import React, { useState } from "react";
import {
    Image,
    Modal,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    Touchable,
    TouchableOpacity,
    View,
} from "react-native";
import COLORS from "../constants/color";

import Button from "./Button";
import Loading from "./Loading";

const Select = ({ label, options = [], value, handleSelect, loading }) => {
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <>
            <Text style={styles.label}>{label}</Text>
            <Pressable style={{ ...styles.inputContainer }} onPress={() => setModalVisible(true)}>
                <Text>{value ? value : `Nhấn để chọn ${label}`}</Text>
                <Image
                    source={require("../../assets/icons/arrow-down-sign-to-navigate.png")}
                    resizeMode='contain'
                    style={{ width: 25, height: 25, tintColor: COLORS.grey }}
                />
            </Pressable>
            <View style={styles.centeredView}>
                <Modal animationType='slide' transparent={true} visible={modalVisible}>
                    <View style={styles.centeredView}>
                        <TouchableOpacity
                            style={styles.modalView}
                            activeOpacity={1}
                            onPress={() => setModalVisible(false)}
                        >
                            <TouchableOpacity activeOpacity={1} style={styles.content}>
                                <Text style={styles.label}>{label}</Text>
                                <ScrollView style={styles.selectSpace}>
                                    <View onStartShouldSetResponder={() => true}>
                                        {options.map((item, index) => {
                                            return (
                                                <Pressable
                                                    key={index}
                                                    style={{
                                                        ...styles.optionItem,
                                                        backgroundColor:
                                                            value === item.name
                                                                ? "rgba(0,0,0,0.1)"
                                                                : COLORS.abs_white,
                                                    }}
                                                    onPress={() => handleSelect(item)}
                                                >
                                                    <Text
                                                        style={{ ...styles.label, paddingLeft: 16 }}
                                                    >
                                                        {item.name}
                                                    </Text>
                                                </Pressable>
                                            );
                                        })}
                                    </View>
                                </ScrollView>
                                <Button onPress={() => setModalVisible(false)}>
                                    {loading ? <Loading /> : "OK"}
                                </Button>
                            </TouchableOpacity>
                        </TouchableOpacity>
                    </View>
                </Modal>
            </View>
        </>
    );
};

export default Select;

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalView: {
        flex: 1,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0,0,0,0.5)",
        alignItems: "center",
        justifyContent: "center",
    },
    content: {
        width: "80%",
        backgroundColor: COLORS.white,
        height: 500,
        alignItems: "center",
        borderRadius: 6,
        padding: 16,
    },
    selectSpace: {
        marginVertical: 16,
        width: "100%",
        backgroundColor: COLORS.abs_white,
        borderRadius: 6,
    },
    inputContainer: {
        height: 55,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderWidth: 0.5,
        paddingHorizontal: 16,
        borderRadius: 6,
        marginBottom: 16,
    },
    label: {
        marginVertical: 5,
        fontSize: 14,
        alignSelf: "flex-start",
    },
    optionItem: {
        flex: 1,
        justifyContent: "center",
        height: 55,
        marginBottom: 8,
        borderRadius: 6,
    },
});

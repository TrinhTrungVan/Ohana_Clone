import React from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";
import COLORS from "../constants/color";

const UploadedImage = (props) => {
    const { source, handleRemoveImage } = props;

    return (
        <View style={styles.container}>
            <View style={styles.uploadBtn}>
                <Image source={{ uri: source }} style={styles.uploadBtn} />
            </View>
            {source && (
                <Pressable onPress={() => handleRemoveImage(source)} style={styles.removeBtn}>
                    <Image
                        source={require("../../assets/icons/remove.png")}
                        style={styles.removeIcon}
                    />
                </Pressable>
            )}
        </View>
    );
};

export default UploadedImage;

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
    },
    uploadBtn: {
        justifyContent: "center",
        alignItems: "center",
        width: 100,
        height: 100,
        borderColor: COLORS.grey,
        borderWidth: 1,
        borderRadius: 6,
        margin: 8,
    },
    uploadIcon: {
        width: 36,
        height: 36,
        tintColor: COLORS.grey,
    },
    removeBtn: {
        position: "absolute",
        top: 0,
        right: 0,
        backgroundColor: COLORS.abs_white,
        borderRadius: 100,
    },
    removeIcon: {
        width: 32,
        height: 32,
        tintColor: COLORS.grey,
    },
});

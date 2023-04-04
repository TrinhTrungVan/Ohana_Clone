import React, { useState } from "react";
import { Image, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import COLORS from "../constants/color";

function GroupImage(props) {
    const { images } = props;
    const [modalVisible, setModalVisible] = useState(false);
    return (
        <>
            <View style={styles.container}>
                <TouchableOpacity>
                    <Image source={{ uri: images[0] }} style={styles.image} />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image source={{ uri: images[1] }} style={styles.image} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.lastImage}>
                    <Image source={{ uri: images[0] }} style={styles.image} />
                    <View style={styles.overlay}>
                        <Text style={styles.moreImage}>{`+${images.length - 3}`}</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={styles.container}>
                <Modal animationType='slide' transparent={true} visible={modalVisible}>
                    <View style={styles.container}>
                        <TouchableOpacity
                            style={styles.modalView}
                            activeOpacity={1}
                            onPress={() => setModalVisible(false)}
                        ></TouchableOpacity>
                    </View>
                </Modal>
            </View>
        </>
    );
}

export default GroupImage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexWrap: "wrap",
        flexDirection: "row",
        justifyContent: "space-evenly",
        marginBottom: 16,
    },
    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    image: {
        width: 130,
        height: 130,
        margin: 4,
        borderRadius: 6,
    },
    lastImage: {
        position: "relative",
        width: 130,
        height: 130,
    },
    overlay: {
        position: "absolute",
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
        top: 4,
        left: 4,
        borderRadius: 6,
    },
    moreImage: {
        color: COLORS.abs_white,
        fontSize: 20,
    },
});

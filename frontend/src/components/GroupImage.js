import React, { useState } from "react";
import { Image, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import COLORS from "../constants/color";
import Swiper from "react-native-swiper";

function GroupImage(props) {
    const { images } = props;
    const [modalVisible, setModalVisible] = useState(false);
    const [imgIndex, setImgIndex] = useState(0);

    const handleShowImage = (index) => {
        setImgIndex(index);
        setModalVisible(true);
    };
    return (
        <>
            <View style={styles.container}>
                <TouchableOpacity onPress={() => handleShowImage(0)}>
                    <Image source={{ uri: images[0] }} style={styles.image} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleShowImage(1)}>
                    <Image source={{ uri: images[1] }} style={styles.image} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.lastImage} onPress={() => handleShowImage(2)}>
                    <Image source={{ uri: images[2] }} style={styles.image} />
                    {images.length > 3 && (
                        <View style={styles.overlay}>
                            <Text style={styles.moreImage}>{`+${images.length - 3}`}</Text>
                        </View>
                    )}
                </TouchableOpacity>
            </View>
            <View style={styles.container}>
                <Modal animationType='slide' transparent={true} visible={modalVisible}>
                    <View style={styles.modalContainer}>
                        <TouchableOpacity
                            onPress={() => setModalVisible(false)}
                            style={styles.closeBtn}
                        >
                            <Text style={styles.closeText}>Close</Text>
                            <Image
                                source={require("../../assets/icons/cancel.png")}
                                style={styles.closeIcon}
                            />
                        </TouchableOpacity>
                        <Swiper showsButtons={true} index={imgIndex}>
                            {images.map((url, index) => {
                                return (
                                    <View style={styles.sliderContainer} key={index}>
                                        <Image source={{ uri: url }} style={styles.sliderContent} />
                                    </View>
                                );
                            })}
                        </Swiper>
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
        position: "relative",
    },
    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    image: {
        width: 120,
        height: 120,
        margin: 4,
        borderRadius: 6,
    },
    lastImage: {
        position: "relative",
        width: 120,
        height: 120,
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
    modalContainer: {
        flex: 1,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0,0,0,0.8)",
        alignItems: "center",
        justifyContent: "center",
    },
    closeBtn: {
        display: "flex",
        flexDirection: "row",
        position: "absolute",
        justifyContent: "center",
        alignItems: "center",
        top: 200,
        right: 32,
        zIndex: 1000000,
    },
    closeText: {
        color: COLORS.abs_white,
        fontSize: 24,
        marginRight: 8,
    },
    closeIcon: {
        tintColor: COLORS.abs_white,
        width: 32,
        height: 32,
    },
    sliderContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    sliderContent: {
        width: 360,
        height: 360,
    },
});

import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import COLORS from "../constants/color";

const Post = ({ data }) => {
    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Image
                    source={{
                        uri: data.images[0],
                    }}
                    style={styles.image}
                />
                <View style={styles.info}>
                    <Text style={styles.price}>5.0M VNĐ/phòng</Text>
                    <Text style={styles.title} numberOfLines={2}>
                        {data.title}
                    </Text>
                    <Text style={styles.address} numberOfLines={2}>
                        {data.description}
                    </Text>
                </View>
                <Image
                    source={
                        true
                            ? require("../../assets/icons/love.png")
                            : require("../../assets/icons/love_focused.png")
                    }
                    style={styles.saved}
                />
            </View>
        </View>
    );
};

export default Post;

const styles = StyleSheet.create({
    container: {
        margin: 8,
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        borderRadius: 6,
        backgroundColor: COLORS.abs_white,
    },
    content: {
        position: "relative",
        width: "100%",
        flexDirection: "row",
    },
    info: {
        flex: 1,
        flexDirection: "column",
        paddingRight: 36,
        marginVertical: 8,
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 6,
        margin: 8,
        marginRight: 16,
    },
    saved: {
        position: "absolute",
        top: 8,
        right: 8,
        width: 20,
        height: 20,
    },
    price: {
        color: COLORS.red,
    },
    title: {
        fontWeight: "700",
    },
    address: {
        color: COLORS.grey,
    },
});

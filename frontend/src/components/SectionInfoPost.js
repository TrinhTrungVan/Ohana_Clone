import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { convertToMillions } from "../utils/convertPrice";
import COLORS from "../constants/color";

const SectionInfoPost = (props) => {
    const { capacity, roomArea, deposit } = props;
    return (
        <View style={styles.container}>
            <View style={styles.infoItem}>
                <Text style={styles.infoTitle}>Sức chứa</Text>
                <Text style={styles.infoContent}>{`${capacity} người`}</Text>
            </View>
            <View style={styles.infoItem}>
                <Text style={styles.infoTitle}>Diện tích</Text>
                <Text style={styles.infoContent}>{`${roomArea}`}m&sup2;</Text>
            </View>
            <View style={styles.infoItem}>
                <Text style={styles.infoTitle}>Đặt cọc</Text>
                <Text style={styles.infoContent}>{`${convertToMillions(deposit)}tr`}</Text>
            </View>
        </View>
    );
};

export default SectionInfoPost;

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 32,
        paddingTop: 16,
    },
    infoItem: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    infoTitle: {
        marginBottom: 8,
    },
    infoContent: {
        marginBottom: 8,
        color: COLORS.red,
    },
});

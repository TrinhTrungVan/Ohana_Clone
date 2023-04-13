import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { convertToThousands } from "../utils/convertPrice";

const GroupCost = (props) => {
    const { electricityCost, waterCost, internetCost } = props;
    return (
        <View style={styles.container}>
            <View style={styles.priceItem}>
                <Image
                    source={require("../../assets/icons/idea.png")}
                    style={{ ...styles.priceIcon, width: 36, height: 36 }}
                />
                <Text style={styles.price}>{`${convertToThousands(electricityCost)}k`}</Text>
            </View>
            <View style={styles.priceItem}>
                <Image
                    source={require("../../assets/icons/drop.png")}
                    style={{ ...styles.priceIcon, width: 32, height: 32 }}
                />
                <Text style={styles.price}>{`${convertToThousands(waterCost)}k`}</Text>
            </View>
            <View style={styles.priceItem}>
                <Image
                    source={require("../../assets/icons/wifi.png")}
                    style={{ ...styles.priceIcon, width: 32, height: 32 }}
                />
                <Text style={styles.price}>{`${convertToThousands(internetCost)}k`}</Text>
            </View>
        </View>
    );
};

export default GroupCost;

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 42,
        borderTopWidth: 0.5,
        paddingTop: 16,
    },
    priceItem: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    priceIcon: {
        marginBottom: 8,
    },
});

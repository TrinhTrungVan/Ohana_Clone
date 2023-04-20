import React, { useEffect } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import COLORS from "../constants/color";

const ChatItem = ({ navigation, data, participants }) => {
    // const data = {
    //     avatar_url:
    //         "https://res.cloudinary.com/trungvan1904/image/upload/v1679152072/nextjs_ecommerce/w6vfpeityddtffzmwaal.jpg",
    //     username: "TrungVan",
    //     lastMessage: "Helloooooo",
    //     userId: "641c878610033b42c52d472d",
    //     unreadMessage: 10,
    // };
    const handleNavigateToConversation = () => {
        navigation.navigate("Conversation", { participants });
    }

    return (
        <TouchableOpacity onPress={handleNavigateToConversation}>
            <View style={styles.container}>
                <Image
                    source={{
                        uri: data.avatar_url,
                    }}
                    style={styles.image}
                />
                {/* <Text
                    style={{
                        ...styles.unreadMessage,
                        paddingHorizontal: data.unreadMessage > 9 ? 6 : 9,
                    }}
                >
                    {data.unreadMessage}
                </Text> */}
                <View style={styles.content}>
                    <Text style={styles.username}>{data.fullname}</Text>
                    {/* <Text style={styles.lastMessage}>{data.lastMessage}</Text> */}
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default ChatItem;

const styles = StyleSheet.create({
    container: {
        margin: 8,
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        borderRadius: 6,
        backgroundColor: COLORS.abs_white,
        padding: 8,
        position: "relative",
    },
    content: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
    },
    image: {
        width: 60,
        height: 60,
        borderRadius: 100,
        margin: 8,
        marginRight: 16,
    },
    username: {
        fontWeight: "700",
        marginBottom: 8,
    },
    lastMessage: {
        color: COLORS.grey,
    },
    unreadMessage: {
        position: "absolute",
        top: 10,
        left: 55,
        backgroundColor: COLORS.red,
        color: COLORS.abs_white,
        paddingVertical: 4,
        borderRadius: 100,
    },
});

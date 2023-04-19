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
                <View style={styles.content}></View>
                <Text style={styles.username}>{data.fullname}</Text>
                {/* <Text style={styles.lastMessage}>{data.lastMessage}</Text> */}
            </View>
        </TouchableOpacity >
    )
}
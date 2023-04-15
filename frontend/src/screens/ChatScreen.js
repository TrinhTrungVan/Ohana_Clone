import React from "react";
import { View, Text, Button, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import ChatItem from "../components/ChatItem";

const ChatScreen = ({ navigation }) => {
    return (
        <SafeAreaView>
            <ScrollView>
                <ChatItem navigation={navigation} />
                <ChatItem navigation={navigation} />
                <ChatItem navigation={navigation} />
                <ChatItem navigation={navigation} />
                <ChatItem navigation={navigation} />
                <ChatItem navigation={navigation} />
            </ScrollView>
        </SafeAreaView>
    );
};

export default ChatScreen;

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#8fcbbc",
    },
});

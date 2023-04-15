import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    Button,
    StyleSheet,
    ScrollView,
    SafeAreaView,
    Image,
    TouchableOpacity,
    Modal,
    TextInput,
} from "react-native";
import { getUser } from "../api/services/userServices";
import COLORS from "../constants/color";
import Loading from "../components/Loading";
import Message from "../components/Message";

const MESS = [
    {
        message:
            "Hellooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo",
        userId: "6437a028b93ecd8ee32349ca",
        avatar_url:
            "https://res.cloudinary.com/trungvan1904/image/upload/v1679152072/nextjs_ecommerce/w6vfpeityddtffzmwaal.jpg",
    },
    {
        message: "Hellooooooooooooooooooooooooooooooooooo",
        userId: "6437a028b93ecd8ee32349ca",
        avatar_url:
            "https://res.cloudinary.com/trungvan1904/image/upload/v1679152072/nextjs_ecommerce/w6vfpeityddtffzmwaal.jpg",
    },
    {
        message: "Hellooooooooooooooooooooooooooooooooooooooooo",
        userId: "641c878610033b42c52d472d",
        avatar_url:
            "https://res.cloudinary.com/trungvan1904/image/upload/v1681483280/ohana_clone/sjfsghn0z6lrxs2xvxd0.jpg",
    },
    {
        message: "Hellooooooooooooooooooooooooooooooooooooooooo",
        userId: "641c878610033b42c52d472d",
        avatar_url:
            "https://res.cloudinary.com/trungvan1904/image/upload/v1681483280/ohana_clone/sjfsghn0z6lrxs2xvxd0.jpg",
    },
    {
        message: "Hello",
        userId: "6437a028b93ecd8ee32349ca",
        avatar_url:
            "https://res.cloudinary.com/trungvan1904/image/upload/v1679152072/nextjs_ecommerce/w6vfpeityddtffzmwaal.jpg",
    },
    {
        message: "Hello",
        userId: "641c878610033b42c52d472d",
        avatar_url:
            "https://res.cloudinary.com/trungvan1904/image/upload/v1681483280/ohana_clone/sjfsghn0z6lrxs2xvxd0.jpg",
    },
    {
        message: "Hello",
        userId: "6437a028b93ecd8ee32349ca",
        avatar_url:
            "https://res.cloudinary.com/trungvan1904/image/upload/v1679152072/nextjs_ecommerce/w6vfpeityddtffzmwaal.jpg",
    },
    {
        message: "Hello",
        userId: "641c878610033b42c52d472d",
        avatar_url:
            "https://res.cloudinary.com/trungvan1904/image/upload/v1681483280/ohana_clone/sjfsghn0z6lrxs2xvxd0.jpg",
    },
    {
        message: "Hello",
        userId: "6437a028b93ecd8ee32349ca",
        avatar_url:
            "https://res.cloudinary.com/trungvan1904/image/upload/v1679152072/nextjs_ecommerce/w6vfpeityddtffzmwaal.jpg",
    },
    {
        message: "Hello",
        userId: "641c878610033b42c52d472d",
        avatar_url:
            "https://res.cloudinary.com/trungvan1904/image/upload/v1681483280/ohana_clone/sjfsghn0z6lrxs2xvxd0.jpg",
    },
];

const ConversationScreen = ({ route, navigation }) => {
    const { userId } = route.params;

    const [user, setUser] = useState(null);
    const [messages, setMessages] = useState(MESS);
    const [modalVisible, setModalVisible] = useState(false);

    const handleDelete = () => {
        setModalVisible(false);
    };

    useEffect(() => {
        const getUserInfo = async () => {
            const res = await getUser(userId);
            setUser(res);
        };
        getUserInfo();
    }, []);

    if (!user)
        return (
            <View style={styles.container}>
                <Loading color={COLORS.red} />
            </View>
        );

    return (
        <>
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>{user.username}</Text>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("Chat")}
                        style={styles.backBtn}
                    >
                        <Image
                            source={require("../../assets/icons/back.png")}
                            resizeMode='contain'
                            style={styles.icon}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.moreBtn} onPress={() => setModalVisible(true)}>
                        <Image
                            source={require("../../assets/icons/more.png")}
                            resizeMode='contain'
                            style={styles.icon}
                        />
                    </TouchableOpacity>
                </View>
                <ScrollView style={{ width: "100%", marginTop: 8 }}>
                    <View style={styles.messages}>
                        {messages.map((item, index) => {
                            return (
                                <Message
                                    data={item}
                                    isSender={item.userId === "6437a028b93ecd8ee32349ca"}
                                    key={index}
                                />
                            );
                        })}
                    </View>
                </ScrollView>
                <View style={styles.sendContainer}>
                    <TouchableOpacity>
                        <Image
                            source={require("../../assets/icons/image.png")}
                            resizeMode='contain'
                            style={styles.sendIcon}
                        />
                    </TouchableOpacity>
                    <TextInput
                        onChangeText={() => {}}
                        placeholder='Nhắn tin...'
                        style={styles.sendInput}
                    />
                    <TouchableOpacity>
                        <Image
                            source={require("../../assets/icons/send.png")}
                            resizeMode='contain'
                            style={{ ...styles.sendIcon, width: 40, height: 40 }}
                        />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
            <Modal animationType='fade' transparent={true} visible={modalVisible}>
                <View style={styles.centeredView}>
                    <TouchableOpacity
                        style={styles.modalView}
                        activeOpacity={1}
                        onPress={() => setModalVisible(false)}
                    >
                        <TouchableOpacity
                            activeOpacity={1}
                            style={styles.content}
                            onPress={handleDelete}
                        >
                            <Text style={styles.deleteBtn}>Xoá cuộc trò chuyện</Text>
                        </TouchableOpacity>
                    </TouchableOpacity>
                </View>
            </Modal>
        </>
    );
};

export default ConversationScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
    },
    header: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        height: 55,
        marginTop: 14,
        borderBottomColor: COLORS.black,
        borderBottomWidth: 0.5,
    },
    title: {
        fontSize: 24,
        fontWeight: "500",
        zIndex: 10,
    },
    moreBtn: {
        position: "absolute",
        right: 24,
    },
    backBtn: {
        position: "absolute",
        left: 24,
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalView: {
        flex: 1,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0,0,0,0.1)",
        position: "relative",
    },
    content: {
        backgroundColor: COLORS.white,
        alignItems: "center",
        borderRadius: 6,
        padding: 16,
        position: "absolute",
        top: 55,
        right: 8,
    },
    deleteBtn: {
        color: "red",
    },
    icon: {
        width: 25,
        height: 25,
        tintColor: COLORS.grey,
    },
    messages: {
        width: "100%",
        position: "relative",
        paddingHorizontal: 24,
        marginBottom: 80,
    },
    sendContainer: {
        position: "absolute",
        width: "100%",
        paddingHorizontal: 16,
        paddingVertical: 8,
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        backgroundColor: COLORS.abs_white,
        bottom: 0,
    },
    sendInput: {
        flex: 1,
        marginHorizontal: 18,
        height: 55,
        borderWidth: 0.5,
        paddingHorizontal: 16,
        paddingVertical: 16,
        borderRadius: 6,
    },
    sendIcon: {
        width: 50,
        height: 50,
        tintColor: COLORS.red,
    },
});

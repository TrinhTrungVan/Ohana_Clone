import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet, ScrollView } from "react-native";
import COLORS from "../constants/color";
import Loading from "../components/Loading";
import postServices from "../api/services/postServices";
import GroupImage from "../components/GroupImage";

const PostScreen = ({ route, navigation }) => {
    const { id } = route.params;
    const [postInfo, setPostInfo] = useState(null);

    useEffect(() => {
        const getPostInfo = async () => {
            const res = await postServices.getPostDetail(id);
            setPostInfo(res);
        };
        getPostInfo();
    }, []);

    if (!postInfo)
        return (
            <ScrollView contentContainerStyle={styles.container}>
                <Loading color={COLORS.red} />
            </ScrollView>
        );

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <GroupImage images={postInfo.images} />
        </ScrollView>
    );
};

export default PostScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: COLORS.white,
    },
});

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
    Dimensions,
} from "react-native";
import COLORS from "../constants/color";
import Loading from "../components/Loading";
import postServices from "../api/services/postServices";
import GroupImage from "../components/GroupImage";
import { convertToMillions, convertToThousands } from "../utils/convertPrice";
import GroupCost from "../components/GroupCost";
import SectionInfoPost from "../components/SectionInfoPost";
import { calcDayAgo } from "../utils/calcDayAgo";
import ContactNavbar from "../components/ContactNavbar";
import { useIsFocused } from "@react-navigation/native";

const PostScreen = ({ route, navigation }) => {
    const { id } = route.params || "";
    const [postInfo, setPostInfo] = useState(null);

    // const windowHeight = Dimensions.get("window").height;

    // console.log(windowHeight);

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
        <SafeAreaView style={styles.container}>
            <View style={styles.contactNavbar}>
                <ContactNavbar deposit={postInfo.deposit} author={postInfo.user} navigation={navigation} />
            </View>
            <ScrollView>
                <View style={styles.content}>
                    <GroupImage images={postInfo.images} />
                    <Text style={styles.title}>{postInfo.title}</Text>
                    <Text style={styles.price}>{`Giá: ${convertToMillions(
                        postInfo.expenses
                    )} triệu VNĐ/phòng`}</Text>
                    <SectionInfoPost
                        capacity={postInfo.capacity}
                        roomArea={postInfo.roomArea}
                        deposit={postInfo.deposit}
                    />
                    <GroupCost
                        electricityCost={postInfo.electricityCost}
                        waterCost={postInfo.waterCost}
                        internetCost={postInfo.internetCost}
                    />
                    <View style={styles.section}>
                        <Text style={styles.title}>Chi tiết</Text>
                        {postInfo.parkingAvailable && (
                            <>
                                <Text>{`Có chỗ để xe, Phí giữ xe: ${postInfo.parkingCost == 0
                                    ? "Miễn phí"
                                    : convertToThousands(postInfo.parkingCost) + "k"
                                    }`}</Text>
                            </>
                        )}
                        <Text>{postInfo.description}</Text>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.title}>Địa chỉ</Text>
                        <View>
                            <Text>
                                {`Số ${postInfo.houseNumber} ${postInfo.streetName}, ${postInfo.ward}, ${postInfo.district}, ${postInfo.city}`}
                            </Text>
                            <TouchableOpacity onPress={() => console.log("View on map.")}>
                                <Text style={styles.viewOnMapBtn}>Xem trên bản đồ</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.section}>
                        <Text style={styles.title}>Ngày đăng</Text>
                        <Text>{calcDayAgo(postInfo.createdAt)}</Text>
                    </View>
                    <View style={styles.section}>
                        <Text style={styles.title}>Người đăng</Text>
                        <View style={styles.authorInfo}>
                            <Image
                                source={{
                                    uri: postInfo.user.avatar_url,
                                }}
                                style={styles.authorImage}
                            />
                            <View>
                                <Text style={styles.authorName}>{postInfo.user.fullname}</Text>
                                <Text>{postInfo.user.phoneNumber}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.section}>
                        <Text style={styles.title}>Cùng tiêu chí</Text>
                        <Text>Call API postSimilar + Show more Btn</Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default PostScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: COLORS.white,
        position: "relative",
    },
    content: {
        position: "relative",
        paddingHorizontal: 24,
        marginBottom: 100,
    },
    price: {
        color: COLORS.red,
        fontSize: 24,
        paddingVertical: 8,
    },
    title: {
        fontSize: 24,
        marginBottom: 16,
    },
    section: {
        marginTop: 16,
    },
    icon: {
        width: 24,
        height: 24,
        marginRight: 8,
    },
    viewOnMapBtn: {
        marginTop: 8,
        color: COLORS.blue,
    },
    authorInfo: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
    },
    authorImage: {
        width: 50,
        height: 50,
        borderRadius: 100,
        marginRight: 16,
    },
    authorName: {
        fontWeight: "bold",
        marginBottom: 4,
    },
    contactNavbar: {
        position: "absolute",
        width: "100%",
        backgroundColor: COLORS.abs_white,
        zIndex: 1,
        bottom: 0,
    },
});

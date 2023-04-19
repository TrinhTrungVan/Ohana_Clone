import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
    View,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Image,
    TouchableOpacity,
    Text,
} from "react-native";
import Button from "../components/Button";
import Input from "../components/Input";
import COLORS from "../constants/color";
import Loading from "../components/Loading";
import { updateUser } from "../api/services/userServices";
import axios from "axios";
import jwt_decode from "jwt-decode";
import dayjs from "dayjs";
import { uploadImage } from "../api/services/cloudinaryServices";

function SettingsScreen({ navigation }) {
    const [user, setUser] = useState(null);
    // const [imgUrl, setImgUrl] = useState(null);
    const [loading, setLoading] = useState(false);
    const isLogin = useSelector((state) => state.auth.login);
    const dispatch = useDispatch();

    let axiosJWT = axios.create();

    const refreshToken = async () => {
        try {
            const res = await axios.post(`http://10.0.2.2:2001/api/auth/refresh`, {
                withCredentials: true,
            });
            return res.data;
        } catch (e) {
            console.log(e);
        }
    };

    axiosJWT.interceptors.request.use(
        async (config) => {
            const decodedToken = jwt_decode(isLogin.currentUser?.accessToken);
            const isExpired = dayjs.unix(decodedToken.exp).diff(dayjs()) < 1;
            if (isExpired) {
                const data = await refreshToken();
                config.headers["Token"] = data.accessToken;
            }
            return config;
        },
        (err) => {
            return Promise.reject(err);
        }
    );

    const handleChange = (name, value) => {
        setUser({
            ...user,
            [name]: value,
        });
    };

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
            base64: true,
        });

        if (!result.canceled) {
            setLoading(true);
            let base64Img = `data:image/jpg;base64,${result.assets[0].base64}`;
            const res = await uploadImage(base64Img);
            // const imgUrl =
            //     "https://res.cloudinary.com/trungvan1904/image/upload/v1677146545/ohana_clone/broken-image_xqpdvp.png";
            setUser({ ...user, avatar_url: res });
            setLoading(false);
        }
    };

    const handleClickUpdate = () => {
        console.log("click update");
        updateUser(user?._id, user, isLogin.currentUser.accessToken, dispatch, axiosJWT);
        // console.log("Info", user);
        saveStorage("@userLogin", user);
        alert("Cập nhật thông tin thành công");
        navigation.navigate("Profile");
    };

    const handleClickOut = () => {
        navigation.navigate("Profile");
    };

    const saveStorage = async (name, data) => {
        try {
            await AsyncStorage.setItem(name, JSON.stringify(data));
        } catch (e) {
            alert("Đã xảy ra lỗi");
        }
    };

    const readData = async () => {
        try {
            const res = await AsyncStorage.getItem("@userLogin");
            if (res !== null) {
                console.log("update", res);
                const data = JSON.parse(res);
                setUser(data);
                // setImgUrl(data.avatar_url);
            }
        } catch (e) {
            alert("Đã xảy ra lỗi");
        }
    };

    useEffect(() => {
        readData();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={{ paddingHorizontal: 16 }}>
                <View
                    style={{
                        paddingTop: 8,
                        paddingBottom: 32,
                        width: "100%",
                        position: "relative",
                    }}
                >
                    <Image
                        source={{
                            uri: user?.avatar_url,
                        }}
                        style={styles.avatar}
                    />
                    <TouchableOpacity onPress={pickImage} style={styles.changeAvatarBtn}>
                        {loading ? <Loading /> : <Text style={styles.uploadText}>Upload</Text>}
                    </TouchableOpacity>
                    <Input
                        label='Tên đầy đủ'
                        placeholder='Nhập tên đầy đủ'
                        onChangeText={(text) => handleChange("fullname", text)}
                        // onChangeText={text => setFullname(text)}
                        value={isLogin.isFetching ? <Loading /> : user?.fullname}
                    />
                    <Input
                        label='Số điện thoại'
                        placeholder='Nhập số điện thoại'
                        onChangeText={(text) => handleChange("phoneNumber", text)}
                        // onChangeText={text => setPhoneNumber(text)}
                        value={isLogin.isFetching ? <Loading /> : user?.phoneNumber}
                    />
                    <Button onPress={handleClickUpdate}>Cập nhật</Button>
                    <Button type='Logout' onPress={handleClickOut}>
                        Thoát
                    </Button>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

export default SettingsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
        marginBottom: 68,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 100,
        marginTop: 16,
        alignSelf: "center",
    },
    changeAvatarBtn: {
        width: 100,
        height: 55,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 4,
        marginBottom: 10,
        backgroundColor: COLORS.red,
        alignSelf: "center",
    },
    uploadText: {
        fontSize: 14,
        lineHeight: 55,
        fontWeight: "bold",
        letterSpacing: 1,
        color: COLORS.white,
    },
});

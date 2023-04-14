import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import React, { useEffect, useState } from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";
import Button from "../components/Button";
import Loading from "../components/Loading";
import UploadedImage from "../components/UploadedImage";
import COLORS from "../constants/color";
import { uploadImage } from "../api/services/cloudinaryServices";

const UploadImageScreen = (props) => {
    const { handleChangeForm } = props;
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

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
            const imgUrl = await uploadImage(base64Img);
            // const imgUrl =
            //     "https://res.cloudinary.com/trungvan1904/image/upload/v1677146545/ohana_clone/broken-image_xqpdvp.png";
            setData([...data, imgUrl]);
            setLoading(false);
        }
    };

    const handleRemoveImage = (url) => {
        const newData = data.filter((item) => item !== url);
        setData(newData);
    };

    const handleNext = () => {
        saveData();
        if (data.length < 3 || data.length > 6) {
            setError(true);
            return;
        }
        handleChangeForm(3);
    };

    const saveData = async () => {
        try {
            await AsyncStorage.mergeItem("@postInfo", JSON.stringify({ images: data }));
            // console.log(data);
        } catch (e) {
            alert("Đã xảy ra lỗi");
        }
    };

    const readData = async () => {
        try {
            const value = await AsyncStorage.getItem("@postInfo");
            if (value) {
                const parseData = JSON.parse(value);
                if (!parseData.images) {
                    setData([]);
                    return;
                }
                setData(parseData.images);
            }
        } catch (e) {
            setData([]);
        }
    };

    useEffect(() => {
        readData();
    }, []);

    return (
        <>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
                <View style={styles.container}>
                    {data?.map((item, index) => {
                        return (
                            <UploadedImage
                                key={index}
                                source={item}
                                handleRemoveImage={handleRemoveImage}
                            />
                        );
                    })}
                    {data.length < 6 && (
                        <View style={styles.btnContainer}>
                            <Pressable onPress={pickImage} style={styles.uploadBtn}>
                                {loading ? (
                                    <Loading color={COLORS.red} />
                                ) : (
                                    <Image
                                        source={require("../../assets/icons/upload.png")}
                                        style={styles.uploadIcon}
                                    />
                                )}
                            </Pressable>
                        </View>
                    )}
                </View>
            </View>
            {error && (
                <Text style={styles.textError}>
                    Vui lòng tải lên tối thiểu 3 ảnh và tối đa 6 ảnh
                </Text>
            )}
            <View style={{ width: "50%", flexDirection: "row" }}>
                <Button onPress={() => handleChangeForm(1)} type='Secondary'>
                    Quay lại
                </Button>
                <Button onPress={handleNext}>Tiếp theo</Button>
            </View>
        </>
    );
};

export default UploadImageScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexWrap: "wrap",
        flexDirection: "row",
        width: 368,
        height: 250,
        padding: 8,
        marginTop: 32,
        marginBottom: 16,
        marginHorizontal: 5,
        justifyContent: "flex-start",
        alignItems: "flex-start",
        borderWidth: 1,
        borderColor: COLORS.grey,
        borderRadius: 6,
        borderStyle: "dashed",
    },
    btnContainer: {
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
    },
    uploadBtn: {
        justifyContent: "center",
        alignItems: "center",
        width: 100,
        height: 100,
        borderColor: COLORS.grey,
        borderWidth: 1,
        borderRadius: 6,
        margin: 8,
    },
    uploadIcon: {
        width: 36,
        height: 36,
        tintColor: COLORS.grey,
    },
    textError: {
        textAlign: "center",
        color: "red",
        fontSize: 14,
        marginBottom: 8,
    },
});

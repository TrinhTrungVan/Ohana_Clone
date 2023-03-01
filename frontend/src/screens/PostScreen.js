import React, { useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet } from "react-native";
import PostForm from "../components/PostForm";
import ProgressSteps from "../components/ProgressSteps";
import COLORS from "../constants/color";
import AddressScreen from "../screens/AddressScreen";
import UploadImageScreen from "../screens/UploadImageScreen";
import ConfirmationScreen from "./ConfirmationScreen";

const PostScreen = ({ navigation }) => {
    const [formIndex, setFormIndex] = useState(0);

    const handleChangeForm = (index) => {
        setFormIndex(index);
    };

    const LABEL = ["Information", "Address", "Image", "Confirmation"];
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={{ paddingHorizontal: 16 }}>
                <ProgressSteps step={formIndex} label={LABEL} />
                {formIndex === 0 && <PostForm handleChangeForm={handleChangeForm} />}
                {formIndex === 1 && <AddressScreen handleChangeForm={handleChangeForm} />}
                {formIndex === 2 && <UploadImageScreen handleChangeForm={handleChangeForm} />}
                {formIndex === 3 && (
                    <ConfirmationScreen
                        handleChangeForm={handleChangeForm}
                        navigation={navigation}
                    />
                )}
            </ScrollView>
        </SafeAreaView>
    );
};

export default PostScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
        marginBottom: 68,
    },
});

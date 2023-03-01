import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import Button from "./Button";
import CheckBox from "./CheckBox";
import Input from "./Input";

const PostForm = (props) => {
    const { handleChangeForm } = props;
    const [data, setData] = useState(null);
    const toggleParking = () => {
        setData({ ...data, parkingAvailable: !data?.parkingAvailable });
    };

    const handleChange = (name, value) => {
        setData({
            ...data,
            [name]: value,
        });
    };
    const handleChangeFree = (name, value) => {
        setData({
            ...data,
            [name]: value,
        });
    };

    const handleNext = () => {
        saveData();
        handleChangeForm(1);
    };

    const saveData = async () => {
        try {
            await AsyncStorage.setItem("@postInfo", JSON.stringify(data));
            // await AsyncStorage.clear();
        } catch (e) {
            alert("Failed to save the data to the storage");
        }
    };

    const readData = async () => {
        try {
            const value = await AsyncStorage.getItem("@postInfo");
            if (value !== null) {
                console.log(value);
                setData(JSON.parse(value));
            }
        } catch (e) {
            alert("Failed to fetch the input from storage");
        }
    };

    useEffect(() => {
        readData();
    }, []);

    return (
        <View style={{ paddingTop: 8, paddingBottom: 16 }}>
            <Input
                label='Room Area'
                suffix='m&sup2;'
                placeholder='Enter the room area'
                value={data?.roomArea}
                maxLength={20}
                onChangeText={(value) => handleChange("roomArea", value)}
            />
            <Input
                label='Capacity'
                suffix='person(s)/room'
                placeholder='Number of people/room'
                value={data?.capacity}
                maxLength={20}
                onChangeText={(value) => handleChange("capacity", value)}
            />
            <Input
                label='Expenses'
                suffix='VND/month'
                placeholder='Enter the rental price'
                value={data?.expenses}
                maxLength={20}
                onChangeText={(value) => handleChange("expenses", value)}
            />
            <Input
                label='Deposit'
                suffix='VND'
                placeholder='The amount of money'
                value={data?.deposit}
                maxLength={20}
                onChangeText={(value) => handleChange("deposit", value)}
            />
            <Input
                label='Electricity Cost'
                suffix='VND'
                placeholder='The amount of money'
                value={data?.electricityCost}
                maxLength={20}
                onChangeText={(value) => handleChange("electricityCost", value)}
                optionFree={true}
                onChangeFree={(value) => handleChangeFree("electricityCost", value)}
            />
            <Input
                label='Water Cost'
                suffix='VND'
                placeholder='The amount of money'
                value={data?.waterCost}
                maxLength={20}
                onChangeText={(value) => handleChange("waterCost", value)}
                optionFree={true}
                onChangeFree={(value) => handleChangeFree("waterCost", value)}
            />
            <Input
                label='Internet Cost'
                suffix='VND'
                placeholder='The amount of money'
                value={data?.internetCost}
                maxLength={20}
                onChangeText={(value) => handleChange("internetCost", value)}
                optionFree={true}
                onChangeFree={(value) => handleChangeFree("internetCost", value)}
            />
            <CheckBox
                isChecked={data?.parkingAvailable}
                onPress={toggleParking}
                label='Is there space for parking?'
            />
            {data?.parkingAvailable && (
                <Input
                    label='Parking Cost'
                    suffix='VND'
                    placeholder='The amount of money'
                    value={data?.parkingCost}
                    maxLength={20}
                    onChangeText={(value) => handleChange("parkingCost", value)}
                    optionFree={true}
                    onChangeFree={(value) => handleChangeFree("parkingCost", value)}
                />
            )}
            {/* <Button onPress={() => navigation.navigate("Address", { screen: "PostScreen" })}>
                Next
            </Button> */}
            <Button onPress={handleNext}>Next</Button>
        </View>
    );
};

export default PostForm;

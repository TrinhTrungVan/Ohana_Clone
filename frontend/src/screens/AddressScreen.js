import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import Select from "../components/Select";
import Input from "../components/Input";
import PROVINCE from "../constants/province";
import Button from "../components/Button";
import { useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

const initialState = {
    city: null,
    district: null,
    ward: null,
    streetName: "",
    houseNumber: "",
};

const AddressScreen = (props) => {
    const { handleChangeForm } = props;
    const [data, setData] = useState(null);
    const [districtList, setDistrictList] = useState([]);
    const [wardList, setWardList] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleChange = (name, value) => {
        setData({
            ...data,
            [name]: value,
        });
    };

    const handleSelectCity = async (item) => {
        setLoading(true);
        setData({ ...data, city: item.name, district: null, ward: null });
        await fetch(`https://provinces.open-api.vn/api/p/${item.code}?depth=2`)
            .then((res) => res.json())
            .then((res) => setDistrictList(res.districts));
        setLoading(false);
    };

    const handleSelectDistrict = async (item) => {
        setLoading(true);
        setData({ ...data, district: item.name });
        await fetch(`https://provinces.open-api.vn/api/d/${item.code}?depth=2`)
            .then((res) => res.json())
            .then((res) => setWardList(res.wards));
        setLoading(false);
    };

    const handleSelectWard = (item) => {
        setData({ ...data, ward: item.name });
    };

    const handleNext = () => {
        saveData();
        handleChangeForm(2);
    };

    const saveData = async () => {
        try {
            await AsyncStorage.setItem("@postInfo", JSON.stringify(data));
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
            <Select
                label='City'
                value={data?.city}
                options={PROVINCE}
                handleSelect={handleSelectCity}
                loading={loading}
            />
            <Select
                label='District'
                value={data?.district}
                options={districtList}
                handleSelect={handleSelectDistrict}
                loading={loading}
            />
            <Select
                label='Ward'
                value={data?.ward}
                options={wardList}
                handleSelect={handleSelectWard}
                loading={loading}
            />
            <Input
                label='Street Name'
                placeholder='Enter the street name'
                value={data?.streetName}
                onChangeText={(value) => handleChange("streetName", value)}
            />
            <Input
                label='House Number'
                placeholder='Enter the house number'
                value={data?.houseNumber}
                onChangeText={(value) => handleChange("houseNumber", value)}
            />
            <View style={{ width: "50%", flexDirection: "row" }}>
                <Button onPress={() => handleChangeForm(0)} type='Secondary'>
                    Previous
                </Button>
                <Button onPress={handleNext}>Next</Button>
            </View>
        </View>
    );
};

export default AddressScreen;

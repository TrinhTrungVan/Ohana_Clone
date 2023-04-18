import * as React from "react";
import { useState, useEffect, useLayoutEffect } from "react";
import {
    ScrollView,
    Modal,
    View,
    Text,
    Button,
    StyleSheet,
    SafeAreaView,
    TextInput,
    Image,
    TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import Select from "../components/Select";
import PROVINCE from "../constants/province";
import COLORS from "../constants/color";
import postServices from "../api/services/postServices";
import axios from "axios";
import Post from "../components/Post";

export default function HomeSearch({ navigation }) {
    const [data, setData] = useState([]);

    const [filteredData, setFilteredData] = useState([]);


    React.useEffect(() => {
        const getPost = async () => {
            const res = await postServices.getPosts();
            setData(res);
            setFilteredData(res);
        };
        getPost();
    }, [navigation]);



    function handleFilter(searchTerm) {
        if (searchTerm != undefined
            || (searchTerm == undefined && seCity != null)) {
            var newData = [];

            if (searchTerm == undefined) {
                newData = data
                console.log("Empty search")
            } else {
                for (let i = 0; i < data.length; i++) {
                    if (data[i].title != undefined && data[i].title.toUpperCase().includes(searchTerm.toUpperCase())) {
                        //console.log(data[i])
                        newData.push(data[i])
                    }
                }
            }
            if (seCity.length != 0) {
                newData = newData.filter(i => i.city.toUpperCase().includes(seCity.toUpperCase()))
                
            }
            if (seDistrict.length != 0) {
                newData = newData.filter(i => i.district.toUpperCase().includes(seDistrict.toUpperCase()))
            }
            if (seWard.length != 0) {
                newData = newData.filter(i => i.ward.toUpperCase().includes(seWard.toUpperCase()))
            }
            if (priceRange) {
                if (priceRange == 1) {
                    newData = newData.filter(
                        (item) =>
                            item.expenses < 1000000
                    );
                } else if (priceRange == 2) {
                    newData = newData.filter(
                        (item) =>
                            item.expenses < 2500000 && item.expenses >= 1000000
                    );
                } else if (priceRange == 3) {
                    newData = newData.filter(
                        (item) =>
                            item.expenses < 5000000 && item.expenses >= 2500000
                    );
                } else if (priceRange == 4) {
                    newData = newData.filter(
                        (item) =>
                            item.expenses >= 5000000
                    );
                }

            }
            setFilteredData(newData);
            console.log("\n")
            console.log(newData)
            console.log("\n")
           
        } else {
            getPost()
        }

    }

    const [showModal, setShowModal] = useState(false);

    const [searchInp, setSearchInp] = useState();

    const [districtList, setDistrictList] = useState([]);
    const [wardList, setWardList] = useState([]);

    const [cdata, setcData] = useState(null);

    const [priceRange, setPriceRange] = useState([]);

    const [seCity, setSeCity] = useState([]);
    const [seDistrict, setSeDistrict] = useState([]);
    const [seWard, setSeWard] = useState([]);

    const handleSelectCity = async (item) => {
        setcData({ ...cdata, city: item.name, district: null, ward: null });
        await fetch(`https://provinces.open-api.vn/api/p/${item.code}?depth=2`)
            .then((res) =>
                res.json()

            )
            .then((res) => {
                setDistrictList(res.districts)
            });
    
        setSeCity(item.name)
        setSeDistrict([])
        setSeWard([])

    };

    const handleSelectDistrict = async (item) => {
        setcData({ ...cdata, district: item.name });
        await fetch(`https://provinces.open-api.vn/api/d/${item.code}?depth=2`)
            .then((res) => res.json())
            .then((res) => setWardList(res.wards));
    
        setSeDistrict(item.name)
        console.log(seDistrict)
    };


    const handleSelectWard = (item) => {
        setcData({ ...cdata, ward: item.name });
        setSeWard(item.name)
        console.log(seWard)

    };

    return (
        <SafeAreaView style={styles.container}>
            <TextInput
                style={styles.textInputStyle}
                onChangeText={(text) => {
                    handleFilter(text)
                    setSearchInp(text)
                }
                }
                value={data}
                placeholder='Tìm kiếm'
            />

            <View style={styles.container}>
                <Modal
                    animationType={"slide"}
                    transparent={false}
                    visible={showModal}
                    onRequestClose={() => {
                        console.log("Modal has been closed.");
                    }}
                >
                    <View style={styles.modal}>
                        <Button
                            title='Đóng bộ lọc'
                            onPress={() => {
                                setShowModal(!showModal);
                            }}
                        />

                        <Select
                            label='Thành Phố'
                            value={cdata?.city}
                            options={PROVINCE}
                            handleSelect={handleSelectCity}
                        />
                        <Select
                            label='Quận'
                            value={cdata?.district}
                            options={districtList}
                            handleSelect={handleSelectDistrict}
                        />
                        <Select
                            label='Phường'
                            value={cdata?.ward}
                            options={wardList}
                            handleSelect={handleSelectWard}
                        />


                        <Text>Giá</Text>
                        <View style={styles.pickerTest}>
                            <Picker
                                selectedValue={priceRange}
                                onValueChange={(itemValue, itemIndex) => {
                                    setPriceRange(itemValue);

                                    console.log(priceRange);

                                }
                                }
                            >
                                <Picker.Item label='Không chọn' value={null} />
                                <Picker.Item label='0 -> 1,000,000' value='1' />
                                <Picker.Item label='1,000,000 -> 2,500,000' value='2' />
                                <Picker.Item label='2,500,000 -> 5,000,000' value='3' />
                                <Picker.Item label='> 5,000,000' value='4' />

                            </Picker>

                        </View>
                        <View style={styles.applyButtonSection}>
                            <Button
                                title='Áp dụng bộ lọc'
                                onPress={() => {
                                    handleFilter(searchInp)
                                    setShowModal(!showModal);

                                }}
                                color="red"
                            />
                        </View>

                    </View>
                </Modal>
                <Button
                    title='Lọc kết quả'
                    onPress={() => {
                        setShowModal(!showModal);
                    }}

                />
            </View>

            <ScrollView contentContainerStyle={styles.resultContainer}>
                {filteredData.map((post, index) => (
                    <TouchableOpacity
                        key={index}
                        onPress={() => navigation.navigate("Post Detail", { id: post._id })}
                    >
                        <Post data={post} />
                    </TouchableOpacity>
                ))}
                <View style={{ height: 120 }} />

            </ScrollView>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#8fcbbc",
    },
    resultContainer: {
        flexGrow: 1,
        //flex: 1,
        alignItems: "center",
    },
    textInputStyle: {
        height: 40,
        alignSelf: "stretch",
        borderWidth: 1,
        paddingLeft: 20,
        margin: 5,
        borderColor: "#009688",
        backgroundColor: "#FFFFFF",
        //position: 'absolute'
    },
    pickerStyle: {
        backgroundColor: "white",
        alignSelf: "stretch",
        color: "white",
        height: 60,
    },
    pickerTest: {
        borderColor: "black",
        borderRadius: 5,
        borderWidth: 0.5,
        //backgroundColor: "green",
    },
    applyButtonSection: {
        width: '100%',
        height: '20%',
        justifyContent: 'center',
        alignItems: 'center'
    },

});

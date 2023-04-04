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
    // const navigation = useNavigation();
    const [data, setData] = useState([]);

    const [option, setOption] = useState();
    const [filteredData, setFilteredData] = useState([]);

    // const url = "https://jsonplaceholder.typicode.com/posts";

    React.useEffect(() => {
        // fetch(url)
        //     .then((response) => response.json())
        //     .then((json) => {
        //         setData(json);
        //         setmainData(json);
        //     })
        //     .catch((error) => {
        //         console.error(error);
        //     });
        const getPost = async () => {
            const res = await postServices.getPosts();
            setData(res);
            setFilteredData(res);
        };
        getPost();
    }, []);

    // const updateData = () => {
    //     fetch(url)
    //         .then((response) => response.json())
    //         .then((json) => {
    //             setData(json);
    //         });
    // };

    const [isSearched, setIsSearched] = useState(false);

    //All 3 scenario: Quas, Aut, Molestias
    function handleFilter(searchTerm) {
        var newData;
        if (searchTerm || (!searchTerm && idRange)) {
            if (option == "title") {
                // if (data.hasOwnProperty(key)) {
                //     console.log(key + " -> " + data[key].title);
                //     setData(
                //         data.filter((item) =>
                //             item.title.toUpperCase().includes(searchTerm.toUpperCase())
                //         )
                //     );

                // }
                var newData = mainData.filter((item) =>
                    item.title.toUpperCase().includes(searchTerm.toUpperCase())
                );
            } else if (option == "id") {
                var newData = mainData.filter((item) =>
                    item.id.toString().toUpperCase().includes(searchTerm.toUpperCase())
                );
            } else if (!option) {
                setOption("title");
                var newData = mainData.filter((item) =>
                    item.title.toUpperCase().includes(searchTerm.toUpperCase())
                );
            }
            // if (option1) {
            //     newData =
            //         newData.filter((item) =>
            //             item.title.toUpperCase().includes(option1.toUpperCase())
            //         )

            // }
            // if (option2) {
            //     newData =
            //         newData.filter((item) =>
            //             item.title.toUpperCase().includes(option2.toUpperCase())
            //         )

            // }
            // if (option3) {
            //     newData =
            //         newData.filter((item) =>
            //             item.title.toUpperCase().includes(option3.toUpperCase())
            //         )

            // }

            if (idRange) {
                if (idRange == 1) {
                    newData = newData.filter(
                        (item) =>
                            //item.id.toString().toUpperCase().includes(idRange.toUpperCase())
                            item.id <= 10
                    );
                } else if (idRange == 2) {
                    newData = newData.filter(
                        (item) =>
                            //item.id.toString().toUpperCase().includes(idRange.toUpperCase())
                            item.id <= 20 && item.id > 10
                    );
                } else if (idRange == 3) {
                    newData = newData.filter(
                        (item) =>
                            //item.id.toString().toUpperCase().includes(idRange.toUpperCase())
                            item.id > 20
                    );
                }

                //setData(newData)
            }
            setData(newData);
        } else if (!searchTerm) {
            updateData();
        }
    }

    const [showModal, setShowModal] = useState(false);

    const [option1, setOption1] = useState();
    const [option2, setOption2] = useState();
    const [option3, setOption3] = useState();

    const [searchInp, setSearchInp] = useState();

    const [districtList, setDistrictList] = useState([]);
    const [wardList, setWardList] = useState([]);

    const [cdata, setcData] = useState(null);

    const [idRange, setidRange] = useState([]);

    const handleSelectCity = async (item) => {
        // setLoading(true);
        setcData({ ...cdata, city: item.name, district: null, ward: null });
        await fetch(`https://provinces.open-api.vn/api/p/${item.code}?depth=2`)
            .then((res) => res.json())
            .then((res) => setDistrictList(res.districts));
        // setLoading(false);
    };

    const handleSelectDistrict = async (item) => {
        // setLoading(true);
        setcData({ ...cdata, district: item.name });
        await fetch(`https://provinces.open-api.vn/api/d/${item.code}?depth=2`)
            .then((res) => res.json())
            .then((res) => setWardList(res.wards));
        // setLoading(false);
    };

    // const handleIdRange = async (item) => {
    //     var newData = mainData.filter((item) =>
    //         item.title.toUpperCase().includes(searchTerm.toUpperCase())
    //     )
    //     setData(newData);
    // };

    const handleSelectWard = (item) => {
        setcData({ ...cdata, ward: item.name });
        console.log(cdata.ward)
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* <ScrollView style={styles.pickerStyle} >
                <Picker

                    selectedValue={option}
                    onValueChange={(itemValue, itemIndex) => {
                        setOption(itemValue);
                        console.log(option);
                    }
                    }>
                    <Picker.Item label="Title" value="title" />
                    <Picker.Item label="Id" value="id" />
                </Picker>
            </ScrollView> */}
            <TextInput
                style={styles.textInputStyle}
                onChangeText={(text) => handleFilter(text)}
                //onChangeText={(text) => setSearchInp(text)}
                value={data}
                placeholder='Search Here'
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
                    {/*All views of Modal*/}
                    {/*Animation can be slide, slide, none*/}
                    <View style={styles.modal}>
                        <Button
                            title='Close search filter'
                            onPress={() => {
                                setShowModal(!showModal);
                            }}
                        />

                        <Select
                            label='Thanh Pho'
                            value={cdata?.city}
                            options={PROVINCE}
                            handleSelect={handleSelectCity}
                        />
                        <Select
                            label='Quan'
                            value={cdata?.district}
                            options={districtList}
                            handleSelect={handleSelectDistrict}
                        />
                        <Select
                            label='Phuong'
                            value={cdata?.ward}
                            options={wardList}
                            handleSelect={handleSelectWard}
                        />
                        {/* 
                        <Text>Option 1 (Thanh Pho):</Text>
                        <Picker
                            selectedValue={option1}
                            onValueChange={(itemValue, itemIndex) => {
                                //console.log(filtersearchOpt1(data,itemValue))
                                setOption1(itemValue);
                                console.log(option1);
                            }}
                        >
                            <Picker.Item label="None" value={null} />
                            <Picker.Item label="Odio" value="odio" />
                            <Picker.Item label="Quas" value="quas" />
                        </Picker>
                        <Text>Option 2 (Huyen):</Text>
                        <Picker
                            selectedValue={option2}
                            onValueChange={(itemValue, itemIndex) => {
                                setOption2(itemValue);
                                console.log(option2);
                            }}>
                            <Picker.Item label="None" value={null} />
                            <Picker.Item label="Aut" value="aut" />
                            <Picker.Item label="Sunt" value="sunt" />
                        </Picker>
                        <Text>Option 3 (Xa):</Text>
                        <Picker
                            selectedValue={option3}
                            onValueChange={(itemValue, itemIndex) => {
                                setOption3(itemValue);
                                console.log(option3);
                            }}
                        >
                            <Picker.Item label="None" value={null} />
                            <Picker.Item label="Molestias" value="molestias" />
                            <Picker.Item label="Dolor" value="dolor" />
                        </Picker> */}
                        {/* <Text>Tim theo:</Text>
                        <Picker
                            style={styles.selectSpace}
                            selectedValue={option}
                            onValueChange={(itemValue, itemIndex) => {
                                setOption(itemValue);
                                console.log(option);
                            }
                            }>
                            <Picker.Item label="Title" value="title" />
                            <Picker.Item label="None" value={null} />
                        </Picker> */}
                        {/* <Select
                            label='Id'
                            // value={idRange}
                            // options={[{name:"1"},{name:"2"},{name:"3"}]}
                            // handleSelect={handleIdRange}
                            
                        /> */}

                        <Text>Id:</Text>
                        <View style={styles.pickerTest}>
                        <Picker
                            selectedValue={idRange}
                            onValueChange={(itemValue, itemIndex) => {
                                setidRange(itemValue);
                                console.log(idRange);
                            }}
                        >
                            <Picker.Item label='None' value={null} />
                            <Picker.Item label='0-10' value='1' />
                            <Picker.Item label='11-20' value='2' />
                            <Picker.Item label='20<' value='3' />
                        </Picker>
                        </View>
                    </View>
                </Modal>
                <Button
                    title='Search Filter'
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
        //position: 'absolute',
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
        borderWidth: .5,
        //backgroundColor: "green",
    },
});

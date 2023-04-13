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
        //console.log(priceRange)
        const getPost = async () => {
            const res = await postServices.getPosts();
            setData(res);
            setFilteredData(res);
            //console.log(res);
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
        // var newData;
        // if (searchTerm || (!searchTerm && idRange)) {
        //     if (option == "title") {
        //         // if (data.hasOwnProperty(key)) {
        //         //     console.log(key + " -> " + data[key].title);
        //         //     setData(
        //         //         data.filter((item) =>
        //         //             item.title.toUpperCase().includes(searchTerm.toUpperCase())
        //         //         )
        //         //     );

        //         // }
        //         var newData = filteredData.filter((item) =>
        //             item.title.toUpperCase().includes(searchTerm.toUpperCase())
        //         );
        //     } 
        //     // else if (option == "id") {
        //     //     var newData = mainData.filter((item) =>
        //     //         item.id.toString().toUpperCase().includes(searchTerm.toUpperCase())
        //     //     );
        //     // } 
        //     else if (!option) {
        //         setOption("title");
        //         var newData = filteredData.filter((item) =>
        //             item.title.toUpperCase().includes(searchTerm.toUpperCase())
        //         );
        //     }

        //     if (idRange) {
        //         if (idRange == 1) {
        //             newData = newData.filter(
        //                 (item) =>
        //                     //item.id.toString().toUpperCase().includes(idRange.toUpperCase())
        //                     item.id <= 10
        //             );
        //         } else if (idRange == 2) {
        //             newData = newData.filter(
        //                 (item) =>
        //                     //item.id.toString().toUpperCase().includes(idRange.toUpperCase())
        //                     item.id <= 20 && item.id > 10
        //             );
        //         } else if (idRange == 3) {
        //             newData = newData.filter(
        //                 (item) =>
        //                     //item.id.toString().toUpperCase().includes(idRange.toUpperCase())
        //                     item.id > 20
        //             );
        //         }

        //         //setData(newData)
        //     }
        //     setData(newData);
        // } else if (!searchTerm) {
        //     updateData();
        // }
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
            //console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA")
            //console.log(newData);

            //setFilteredData(newData);
            if (seCity.length != 0) {
                // if (data[i].city != undefined && data[i].city.toUpperCase().includes(seCity.toUpperCase())) {
                //     console.log(data[i].city)
                //     //newData[i] = data[i]
                // }
                console.log("---------------------------------------------------------------")
                // for (let i =0; i<newData.length; i++) {
                //     console.log(newData[i].title + ", " +newData[i].city)
                //     if (!newData[i].city.toUpperCase().includes(seCity.toUpperCase())) {
                //         // console.log("Exist: \n" + newData[i].title + "; " +newData[i].city  + "\n")
                //         //console.log(newData[i].title)
                //         // var newstuff = newData[i];
                //         // newData[i] = newData[newData.length-1];
                //         // newData[newData.length-1] = newstuff;
                //         console.log(", 0" )
                //         //newData.pop()
                //         //console.log(", 0" )
                //         newData = 
                //     } 
                //     console.log("\n")
                // }
                newData = newData.filter(i => i.city.toUpperCase().includes(seCity.toUpperCase()))
                //console.log(newData)
                //setFilteredData(newData)
                console.log(newData.length)
                console.log("---------------------------------------------------------------")
                console.log(seCity)
            }
            if (seDistrict.length != 0) {
                newData = newData.filter(i => i.district.toUpperCase().includes(seDistrict.toUpperCase()))
                console.log('123123123123123123123213')
            }
            if (seWard.length != 0) {
                newData = newData.filter(i => i.ward.toUpperCase().includes(seWard.toUpperCase()))
                //console.log(seWard)
            }
            if (priceRange) {
                if (priceRange == 1) {
                    newData = newData.filter(
                        (item) =>
                            //item.id.toString().toUpperCase().includes(idRange.toUpperCase())
                            item.expenses <= 1000
                    );
                } else if (priceRange == 2) {
                    newData = newData.filter(
                        (item) =>
                            //item.id.toString().toUpperCase().includes(idRange.toUpperCase())
                            item.expenses <= 10000 && item.expenses > 1000
                    );
                } else if (priceRange == 3) {
                    newData = newData.filter(
                        (item) =>
                            //item.id.toString().toUpperCase().includes(idRange.toUpperCase())
                            item.expenses > 10000
                    );
                }

            }
            setFilteredData(newData);
            console.log("\n")
            console.log(newData)
            console.log("\n")
            // console.log(data.filter((item) => {
            //     if (item.title != undefined && item.title.toUpperCase().includes(searchTerm.toUpperCase())) {
            //         console.log("-----\n"+item.title +"\n-----\n")
            //     }
            // }))
            //setFilteredData(newData)
            //console.log(data[0].title)

            // data.filter((item)=> {
            //     if (item.title != undefined) {
            //         console.log("-----\n"+item.title +"\n-----\n")
            //     }
            // });
        } else {
            getPost()
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

    const [priceRange, setPriceRange] = useState([]);

    const [seCity, setSeCity] = useState([]);
    const [seDistrict, setSeDistrict] = useState([]);
    const [seWard, setSeWard] = useState([]);

    const handleSelectCity = async (item) => {
        // setLoading(true);
        setcData({ ...cdata, city: item.name, district: null, ward: null });
        await fetch(`https://provinces.open-api.vn/api/p/${item.code}?depth=2`)
            .then((res) =>
                res.json()

            )
            .then((res) => {
                setDistrictList(res.districts)
                //console.log(res)
            });
        // setLoading(false);
        //console.log(cdata.city)

        setSeCity(item.name)
        //console.log(cdata.city)
        //console.log(seCity)

        setSeDistrict([])
        setSeWard([])
        //handleFilter(undefined)

    };

    const handleSelectDistrict = async (item) => {
        // setLoading(true);
        setcData({ ...cdata, district: item.name });
        await fetch(`https://provinces.open-api.vn/api/d/${item.code}?depth=2`)
            .then((res) => res.json())
            .then((res) => setWardList(res.wards));
        // setLoading(false);
        //console.log(cdata.district)
        setSeDistrict(item.name)
        console.log(seDistrict)
    };

    // const handleIdRange = async (item) => {
    //     var newData = mainData.filter((item) =>
    //         item.title.toUpperCase().includes(searchTerm.toUpperCase())
    //     )
    //     setData(newData);
    // };

    const handleSelectWard = (item) => {
        setcData({ ...cdata, ward: item.name });
        //console.log(cdata.ward);
        setSeWard(item.name)
        console.log(seWard)

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
                onChangeText={(text) => {
                    handleFilter(text)
                    setSearchInp(text)
                }
                }
                //onChangeText={(text) => setSearchInp(text)}
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
                    {/*All views of Modal*/}
                    {/*Animation can be slide, slide, none*/}
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
                                <Picker.Item label='0-1000' value='1' />
                                <Picker.Item label='1000-10000' value='2' />
                                <Picker.Item label='10000<' value='3' />

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

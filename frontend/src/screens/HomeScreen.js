import * as React from 'react';
import { useState, useEffect, useLayoutEffect } from 'react';
import { ScrollView, Modal, View, Text, Button, StyleSheet, SafeAreaView, TextInput } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import Post from "../components/Post";
import COLORS from "../constants/color";

export default function HomeSearch() {

    const navigation = useNavigation();


    const [option, setOption] = useState();

    const [data, setData] = useState([]);
    const [mainData, setmainData] = useState([]);

    const url = "https://jsonplaceholder.typicode.com/posts";

    React.useEffect(() => {
        fetch(url)
            .then((response) => response.json())
            .then((json) => {
                setData(json);
                setmainData(json);
            })
            .catch((error) => {
                console.error(error);
            })

    }, [])

    const updateData = () => {
        fetch(url)
            .then((response) => response.json())
            .then((json) => {
                setData(json);
            })
    }

    const [isSearched, setIsSearched] = useState(false);


    //All 3 scenario: Quas, Aut, Molestias
    function handleFilter(searchTerm) {
        var newData = mainData;
        if (searchTerm) {

            if (option == 'title') {

                // if (data.hasOwnProperty(key)) {
                //     console.log(key + " -> " + data[key].title);
                //     setData(
                //         data.filter((item) =>
                //             item.title.toUpperCase().includes(searchTerm.toUpperCase())
                //         )
                //     );

                // }
                newData = mainData.filter((item) =>
                    item.title.toUpperCase().includes(searchTerm.toUpperCase())
                )

            } else if (option == 'id') {
                newData = mainData.filter((item) =>
                    item.id.toString().toUpperCase().includes(searchTerm.toUpperCase())
                )

            } else if (!option) {
                setOption("title")
                newData = mainData.filter((item) =>
                    item.title.toUpperCase().includes(searchTerm.toUpperCase())
                )

            }
        } 

        if (option1 || option2 || option3) {

            if (option1) {
                newData =
                    newData.filter((item) =>
                        item.title.toUpperCase().includes(option1.toUpperCase())
                    )

            }
            if (option2) {
                newData =
                    newData.filter((item) =>
                        item.title.toUpperCase().includes(option2.toUpperCase())
                    )

            }
            if (option3) {
                newData =
                    newData.filter((item) =>
                        item.title.toUpperCase().includes(option3.toUpperCase())
                    )

            }

            setData(newData);
        }
        if (!searchTerm && !option1 && !option2 && !option3) {
            updateData();
        } 

    }


    const [showModal, setShowModal] = useState(false);

    const [option1, setOption1] = useState();
    const [option2, setOption2] = useState();
    const [option3, setOption3] = useState();

    const [searchInp, setSearchInp] = useState();

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
                //onChangeText={(text) => handleFilter(text)}
                onChangeText={(text) => setSearchInp(text)}
                value={data}
                placeholder="Search Here"
            />

            <View style={styles.container}>
                <Modal
                    animationType={'slide'}
                    transparent={false}
                    visible={showModal}
                    onRequestClose={() => {
                        console.log('Modal has been closed.');
                    }}>
                   
                    <View style={styles.modal}>
                        <Button
                            title="Close search filter"
                            onPress={() => {
                                setShowModal(!showModal);
                            }}
                        />
                        <Text>Option 1 (Thanh Pho):</Text>
                        <Picker
                            selectedValue={option1}
                            onValueChange={(itemValue, itemIndex) => {
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
                        </Picker>
                        <Text>Tim theo:</Text>
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
                        <Button
                            title="Search"
                            onPress={() => {
                                if (!option) {
                                    setOption("title")
                                }
                                console.log(option)
                                handleFilter(searchInp);
                                setShowModal(!showModal);
                            }}
                        />
                    </View>
                </Modal>
                <Button
                    title="Search Filter"
                    onPress={() => {
                        setShowModal(!showModal);
                    }}
                />
            </View>

            <ScrollView contentContainerStyle={styles.resultContainer}>
                {

                    data.map((post, i) => (
                        <View key={i}>
                            <Text>{post.id}. {post.title}</Text>
                        </View>
                    ))

                }
            </ScrollView>
        </SafeAreaView>
    )
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
        alignSelf: 'stretch',
        borderWidth: 1,
        paddingLeft: 20,
        margin: 5,
        borderColor: '#009688',
        backgroundColor: '#FFFFFF',
        //position: 'absolute',
    },
    pickerStyle: {
        backgroundColor: 'white',
        alignSelf: 'stretch',
        color: 'white',
        height: 60,
    }
});
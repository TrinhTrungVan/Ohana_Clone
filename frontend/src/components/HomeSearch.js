import * as React from 'react';
import { useState, useEffect, useLayoutEffect } from 'react';
import { ScrollView, View, Text, Button, StyleSheet, SafeAreaView, TextInput } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';


const URL = "https://randomuser.me/api/?result=5";


export default function HomeSearch() {
    // const navigation = useNavigation();
    // const [users, setUsers] = React.useState([]);

    // React.useEffect(() =>{
    //     fetchUsers();
    // },[]);

    // React.useLayoutEffect(() =>{
    //     navigation.setOptions({
    //         headerLargeTitle: true,
    //         headerSearchBarOptions: {
    //             placeHolder: "Search",
    //         },
    //     });
    // },[navigation]);

    // const navigation = useNavigation();
    // const [data, setData] = React.useState([]);
    // const [filteredData, setFilteredData] = React.useState([]);


    // React.useEffect(()=>{
    //     fetchData("https://randomuser.me/api/?result=25");
    // },[]);

    // React.useEffect(() => {
    //     navigation.setOptions({
    //         headerLargeTitle: true,
    //         headerSearchBarOptions: {
    //             placeHolder: "Search",
    //         },
    //     });
    // },[navigation]);

    // const fetchData = async(url)=> {
    //     try {
    //         const response = await fetch(url);
    //         const json = await response.json();
    //         setData(json.results);
    //         setFilteredData(json.results);
    //         console.log(json.results);
    //     } catch(error) {
    //         console.error(error);
    //     }
    // }

    const navigation = useNavigation();


    const [option, setOption] = useState();

    const [data, setData] = useState([]);

    const url = "https://jsonplaceholder.typicode.com/posts";

    React.useEffect(() => {
        fetch(url)
            .then((response) => response.json())
            .then((json) => {
                setData(json);
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


    function handleFilter(searchTerm) {
        if (searchTerm) {
            //console.log(data[Object.keys(data)])
            //console.log(data)
            for (var key in data) {
                console.log(option)
                if (option == 'title') {
                    // if (data.hasOwnProperty(key)) {
                    //     console.log(key + " -> " + data[key].title);
                    //     setData(
                    //         data.filter((item) =>
                    //             item.title.toUpperCase().includes(searchTerm.toUpperCase())
                    //         )
                    //     );

                    // }
                    setData(
                        data.filter((item) =>
                            item.title.toUpperCase().includes(searchTerm.toUpperCase())
                        )
                    );
                } else if (option == 'id') {
                    // if (data.hasOwnProperty(key)) {
                    //     console.log(key + " -> " + data[key].id);
                    //     setData(
                    //         data.filter((item) =>
                    //             item.id.toString().toUpperCase().includes(searchTerm.toUpperCase())
                    //         )
                    //     );

                    // }
                    setData(
                        data.filter((item) =>
                            item.id.toString().toUpperCase().includes(searchTerm.toUpperCase())
                        )
                    );
                } else if (!option) {
                    setData(
                        data.filter((item) =>
                            item.title.toUpperCase().includes(searchTerm.toUpperCase())
                        )
                    );
                }
            }
            // setData(
            //     data.filter((item) =>
            //         item.title.toUpperCase().includes(searchTerm.toUpperCase())
            //     )
            // );


            // blah = JSON.parse(data[Object.keys(data)])
            // console.log(blah)

            // console.log(data.title)
        } else {
            updateData();

        }



        //setData(mainData);
        // data.map((post,i)=>(
        //     console.log(post1.title)
        // ))
    }



    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.pickerStyle} >
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
            </ScrollView>
            <TextInput
                style={styles.textInputStyle}
                onChangeText={(text) => handleFilter(text)}
                value={data}
                placeholder="Search Here"
            />

            <ScrollView contentContainerStyle={styles.resultContainer}>
                {/* {users.map((user,idx) => {
                <View key={idx
                    <Text>{user.email}</Text>
                </View>
            })} */}


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
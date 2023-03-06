import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import { useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import Post from "../components/Post";
import COLORS from "../constants/color";

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

    const [selectedLanguage, setSelectedLanguage] = useState();

    const [posts, setPosts] = useState([]);

    const url = "http://10.0.3.2:2001/api/post";

    React.useEffect(() => {
        fetch(url)
            .then((response) => response.json())
            .then((json) => {
                setPosts(json);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    const updateData = () => {
        fetch(url)
            .then((response) => response.json())
            .then((json) => {
                setData(json);
            });
    };

    function handleFilter(searchTerm) {
        if (searchTerm) {
            setData(
                data.filter((item) => item.title.toUpperCase().includes(searchTerm.toUpperCase()))
            );
        } else {
            updateData();
        }

        //setData(mainData);
        // data.map((post,i)=>(
        //     console.log(post1.title)
        // ))
    }

    const getOption = () => {
        return selectedLanguage;
        //console.log(selectedLanguage);
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.pickerStyle}>
                <Picker
                    selectedValue={selectedLanguage}
                    onValueChange={(itemValue, itemIndex) => {
                        setSelectedLanguage(itemValue);
                        getOption();
                    }}
                >
                    <Picker.Item label='Title' value='title' />
                    <Picker.Item label='Id' value='id' />
                </Picker>
            </ScrollView>
            <TextInput
                style={styles.textInputStyle}
                onChangeText={(text) => handleFilter(text)}
                // value={data}
                placeholder='Search Here'
            />

            <ScrollView contentContainerStyle={styles.resultContainer}>
                {/* {users.map((user,idx) => {
                <View key={idx
                    <Text>{user.email}</Text>
                </View>
            })} */}

                {posts.map((post, i) => (
                    <View key={i}>
                        <Post data={post} />
                    </View>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: COLORS.white,
        paddingHorizontal: 16,
    },
    resultContainer: {
        width: "100%",
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
});

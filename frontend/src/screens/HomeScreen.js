import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

import HomeSearch from "../components/HomeSearch";

const Stack = createNativeStackNavigator();

function MyStack() {
    return (
        <Stack.Navigator >
            <Stack.Screen name="HomeSearch" 
            
            component={HomeSearch}
            />
        </Stack.Navigator>
    );
}

const HomeScreen = () => {
    return (
        // <View style={styles.container}>
        //     <Text>Turd turd search crap goes here</Text>
        //     <Button title='Home Screen' onPress={() => alert("Button Clicked!")} />
        // </View>
        <NavigationContainer  
        independent={true}
        >
            <MyStack/>
        </NavigationContainer>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#8fcbbc",
    },
});

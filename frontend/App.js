import React from "react";
import { Provider } from "react-redux";
import store from "./src/redux/store";
import { NavigationContainer } from "@react-navigation/native";
import MainNavigation from "./src/navigation/mainNavigation";

export default function App() {
    return (
        <Provider store={store}>
            <NavigationContainer>
                <MainNavigation />
            </NavigationContainer>
        </Provider>
    );
}

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: "#fff",
//         alignItems: "center",
//         justifyContent: "center",
//     },
// });

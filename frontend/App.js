import React from "react";
import { Provider } from "react-redux";
import store from "./src/redux/store";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigation from "./src/navigation/appNavigation";
import VnpayScreen from "./src/screens/VnpayScreen";
import PaymentScreen from "./src/screens/PaymentScreen";

export default function App() {
    return (
        <Provider store={store}>
            <NavigationContainer>
                <AppNavigation />
                {/* <VnpayScreen /> */}
                {/* <PaymentScreen /> */}
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

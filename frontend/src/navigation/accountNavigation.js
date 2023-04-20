import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import { View, Text } from 'react-native'
import ProfileScreen from '../screens/ProfileScreen'
import SettingsScreen from '../screens/SettingsScreen'
import { StyleSheet } from 'react-native'
import COLORS from '../constants/color'
import UpdatePasswordScreen from '../screens/UpdatePasswordScreen'

const Stack = createNativeStackNavigator()

const AccountNavigation = ({ navigation }) => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name='Profile'
                component={ProfileScreen}
                options={{
                    headerShown: true,
                    header: () => (
                        <View style={styles.header}>
                            <Text style={styles.title}>Thông tin tài khoản</Text>
                            <Text style={styles.cancelBtn}></Text>
                        </View>
                    ),
                }}
            />
            <Stack.Screen
                name='Settings'
                component={SettingsScreen}
                options={{
                    headerShown: true,
                    header: ({ navigation }) => (
                        <View style={styles.header}>
                            <Text style={styles.title}>Cập nhật thông tin</Text>
                            <Text onPress={() => navigation.navigate('Profile')} style={styles.cancelBtn}>Đóng</Text>
                        </View>
                    ),
                }}
            />
            <Stack.Screen
                name='Thay đổi mật khẩu'
                component={UpdatePasswordScreen}
            // options={{
            //     headerShown: true,
            //     header: () => (
            //         <View style={styles.header}>
            //             <Text style={styles.title}>Xác nhận mã OTP</Text>
            //         </View>
            //     ),
            // }}
            />
        </Stack.Navigator>
    )
}

export default AccountNavigation

const styles = StyleSheet.create({
    // shadow: {
    //     shadowColor: "#7F5DF0",
    //     shadowOffset: {
    //         width: 0,
    //         height: 10,
    //     },
    //     shadowOpacity: 0.25,
    //     shadowRadius: 3.5,
    //     elevation: 5,
    // },
    header: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        height: 55,
        marginTop: 24,
        position: "relative",
        borderBottomColor: COLORS.black,
        borderBottomWidth: 0.5,
    },
    title: {
        fontSize: 24,
        fontWeight: "500",
        zIndex: 10,
    },
    cancelBtn: {
        position: "absolute",
        right: 24,
    },
    backBtn: {
        position: "absolute",
        left: 24,
    },
});
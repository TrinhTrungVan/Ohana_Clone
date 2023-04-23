import React, { useEffect, useState } from 'react'
import {
    View,
    Text,
    Button,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    StatusBar,
} from 'react-native'
import postServices from '../api/services/postServices'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useIsFocused } from '@react-navigation/native'
import COLORS from '../constants/color'
import MyPostItem from '../components/MyPostItem'

const MyPostsScreen = ({ navigation }) => {
    const isFocused = useIsFocused()
    const [data, setData] = useState([])

    useEffect(() => {
        const getPosts = async () => {
            const value = await AsyncStorage.getItem('@userLogin')
            const user = JSON.parse(value)
            const res = await postServices.getPostOfUser(user._id)
            setData(res)
        }
        getPosts()
    }, [isFocused])

    if (data.length == 0) {
        return (
            <SafeAreaView style={styles.container}>
                <Text style={styles.text}>Bạn không có phòng yêu thích</Text>
            </SafeAreaView>
        )
    }
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar animated={true} barStyle={'dark-content'} />
            <ScrollView contentContainerStyle={styles.resultContainer}>
                {data.map((post, index) => (
                    // <TouchableOpacity
                    //     key={index}
                    //     onPress={() => navigation.navigate('Post Detail', { id: post._id })}
                    // >
                    <MyPostItem data={post} navigation={navigation} key={index} />
                    // </TouchableOpacity>
                ))}
                <View style={{ height: 120 }} />
            </ScrollView>
        </SafeAreaView>
    )
}

export default MyPostsScreen

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#8fcbbc',
    },
    resultContainer: {
        width: '100%',
        alignItems: 'center',
    },
    text: {
        color: COLORS.black,
    },
})

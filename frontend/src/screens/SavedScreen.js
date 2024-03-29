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
import PostItem from '../components/PostItem'
import { useIsFocused } from '@react-navigation/native'
import COLORS from '../constants/color'

const SavedScreen = ({ navigation }) => {
    const isFocused = useIsFocused()
    const [data, setData] = useState([])

    useEffect(() => {
        const getLikedPost = async () => {
            const value = await AsyncStorage.getItem('@userLogin')
            const user = JSON.parse(value)
            const res = await postServices.getLikedPost(user._id)
            setData(res)
        }
        getLikedPost()
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
                    <TouchableOpacity
                        key={index}
                        onPress={() => navigation.navigate('Post Detail', { id: post._id })}
                    >
                        <PostItem data={post} />
                    </TouchableOpacity>
                ))}
                <View style={{ height: 120 }} />
            </ScrollView>
        </SafeAreaView>
    )
}

export default SavedScreen

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#8fcbbc',
    },
    resultContainer: {
        flexGrow: 1,
        //flex: 1,
        alignItems: 'center',
    },
    text: {
        color: COLORS.black,
    },
})

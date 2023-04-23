import React, { useEffect, useState } from 'react'
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, View } from 'react-native'
import ChatItem from '../components/ChatItem'
import Loading from '../components/Loading'
import COLORS from '../constants/color'
import conversationServices from '../api/services/conversationServices'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useIsFocused } from '@react-navigation/native'

const ChatScreen = ({ navigation }) => {
    const isFocused = useIsFocused()
    const [me, setMe] = useState(null)
    const [users, setUsers] = useState([])

    const getData = async () => {
        const user = await AsyncStorage.getItem('@userLogin')
        const parsedUser = JSON.parse(user)
        console.log('user', parsedUser)
        setMe(parsedUser)

        const users = await conversationServices.getAllConversationOfUser(parsedUser._id)
        console.log(users)
        setUsers(users)
    }

    useEffect(() => {
        getData()
    }, [isFocused])

    // if (route.params.reload) getData();
    if (users.length == 0 || !me) {
        return (
            <View style={styles.container}>
                <Loading color={COLORS.red} />
            </View>
        )
    }

    if (users.length == 0) {
        return (
            <View style={styles.container}>
                <Text>Bạn không có tin nhắn</Text>
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar animated={true} barStyle={'dark-content'} />
            <ScrollView>
                {users
                    .filter((item) => item.uid !== me._id)
                    .map((user, index) => {
                        return (
                            <ChatItem
                                navigation={navigation}
                                data={user}
                                key={index}
                                participants={[me._id, user._id]}
                            />
                        )
                    })}
            </ScrollView>
        </SafeAreaView>
    )
}

export default ChatScreen

const styles = StyleSheet.create({
    container: {
        // flexGrow: 1,
        // alignItems: 'center',
        // justifyContent: 'center',
        minHeight: '100%',
        backgroundColor: '#8fcbbc',
    },
})

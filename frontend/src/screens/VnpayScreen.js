import React, { useState } from 'react'
import { WebView } from 'react-native-webview'
import { StyleSheet, View } from 'react-native'
import Button from '../components/Button'

function VnpayScreen({ route, navigation }) {
    const [webView, setWebView] = useState({})
    const { uri } = route.params
    console.log('uri', uri)

    const handleNavigationStateChange = (newState) => {
        console.log('newState', newState)
        setWebView(newState)
    }
    return (
        <View style={styles.container}>
            <WebView
                source={{ uri: uri }}
                // onNavigationStateChange={handleNavigationStateChange}
                // scalesPageToFit={true}
                // allowFileAccess={true}
                // originWhitelist={['*']}
            />
            <Button type='Logout' onPress={() => navigation.navigate("Post Detail")}>Trở lại</Button>
        </View>
    )
}

export default VnpayScreen

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // alignItems: 'center',
        flex: 1,
        width: "100%",
        height: "100%"
    }
})
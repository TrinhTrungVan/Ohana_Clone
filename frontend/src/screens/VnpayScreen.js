import React, { useState } from 'react'
import { WebView } from 'react-native-webview'
import { StyleSheet, View } from 'react-native'

function VnpayScreen({ route, navigation }) {
    const [webView, setWebView] = useState({})
    const { uri } = route.params

    const getParameterByName = (name, url) => {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, '\\$&');
        var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }
    
    const handleNavigationStateChange = (newState) => {
        const vnp_ResponCode = getParameterByName('vnp_ResponseCode', newState.title) || ''
        if(vnp_ResponCode == '00'){
            alert('Thanh toán thành công')
            navigation.navigate('Post Detail')
        }
        else if(vnp_ResponCode == '24') {
            alert('Thanh toán thất bại')
            navigation.navigate('Post Detail')
        }
        else {
            setWebView(newState)
        }
    }

    return (
        <View style={styles.container}>
            <WebView
                source={{ uri: uri }}
                onNavigationStateChange={handleNavigationStateChange}
                startInLoadingState={true}
            />
        </View>
    )
}

export default VnpayScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        height: "100%"
    }
})
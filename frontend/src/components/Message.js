import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import COLORS from '../constants/color'

const Message = ({ data, isSender, friendAvatar }) => {
    const { content } = data
    return (
        <View style={{ ...styles.container, flexDirection: isSender ? 'row-reverse' : 'row' }}>
            {!isSender && (
                <Image
                    source={{
                        uri: friendAvatar,
                    }}
                    style={styles.image}
                />
            )}
            <Text
                style={{
                    ...styles.message,
                    backgroundColor: isSender ? COLORS.red : COLORS.abs_white,
                    color: isSender ? COLORS.white : COLORS.grey,
                }}
            >
                {content}
            </Text>
        </View>
    )
}

export default Message

const styles = StyleSheet.create({
    container: {
        marginVertical: 4,
        justifyContent: 'flex-start',
        alignItems: 'center',
        position: 'relative',
    },
    image: {
        width: 48,
        height: 48,
        borderRadius: 100,
    },
    message: {
        marginLeft: 16,
        backgroundColor: COLORS.abs_white,
        borderRadius: 6,
        padding: 16,
        marginHorizontal: 0,
        maxWidth: '75%',
    },
})

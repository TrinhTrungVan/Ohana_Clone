import React, { useState } from 'react'
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

function RadioButotn(props) {
    const {value, setValue, title, OPTION} = props

    return (
        <View>
            <Text style={styles.title}>{title}</Text>
            {OPTION.map(res => {
                return (
                    <View key={res.key} style={styles.container}>
                        <TouchableOpacity
                            style={styles.radioCircle}
                            onPress={() => setValue(res.key)}>
                            {value === res.key && <View style={styles.selectedRb} />}
                        </TouchableOpacity>
                        <Text style={styles.radioText}>{res.text}</Text>
                    </View>
                );
            })}
            <Text> Selected: {value} </Text>
        </View>
    )
}

export default RadioButotn

const styles = StyleSheet.create({
    container: {
        marginBottom: 25,
        marginLeft: 25,
        alignItems: 'center',
        flexDirection: 'row',
        // justifyContent: 'space-between',
    },
    radioText: {
        marginLeft: 10,
        marginRight: 35,
        fontSize: 14,
        // color: '#000',
        // fontWeight: '700'
    },
    radioCircle: {
        height: 20,
        width: 20,
        borderRadius: 100,
        borderWidth: 2,
        borderColor: '#000000',
        alignItems: 'center',
        justifyContent: 'center',
    },
    selectedRb: {
        width: 10,
        height: 10,
        borderRadius: 50,
        backgroundColor: '#000000',
    },
    result: {
        marginTop: 20,
        color: 'white',
        fontWeight: '600',
        backgroundColor: '#F3FBFE',
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 15
    }
});
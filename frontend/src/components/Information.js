import React from 'react'
import { StyleSheet, Text, TextInput, View } from "react-native";
import COLORS from '../constants/color';

function Information({ label, text }) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.label}>{text}</Text>
    </View>
  )
}

export default Information

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 10,
    paddingTop: 10,
    borderWidth: 1,
    borderColor: COLORS.white,
    borderBottomColor: COLORS.logout
  },
  label: {
    marginVertical: 5,
    fontSize: 16,
  },
})
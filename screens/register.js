import React from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import Constants from "expo-constants";

export default function Register(props) {
  return (
    <View style={styles.container}>
      <View style={styles.upperFormWrapper}>
        <Text style={styles.title}>Sign Up</Text>
      </View>
      <View style={styles.downFormWrapper}>
        <TextInput style={styles.input} placeholder="username" />
        <TextInput style={styles.input} placeholder="email" />
        <TextInput style={styles.input} placeholder="password" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    backgroundColor: "#512DA8",
  },
  upperFormWrapper: {
    flex: 1,
    width: "100%",
    paddingVertical: "10%",
    paddingHorizontal: "10%",
    backgroundColor: "#512DA8",
  },
  title: {
    fontFamily: "sf-semibold",
    fontSize: 36,
    color: "white",
  },
  downFormWrapper: {
    flex: 25,
    backgroundColor: "white",
    width: "100%",
    borderTopLeftRadius: 200,
    borderBottomRightRadius: 200,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    borderWidth: 1,
    width: "80%",
    paddingVertical: 5,
    paddingHorizontal: 15,
    marginVertical: 10,
    borderRadius: 100,
  },
});

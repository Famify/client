import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Constants from "expo-constants";

export default function ParentDashboard(props) {
  return (
    <View style={styles.container}>
      <Text>Ini adalah dashboard parent</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
});

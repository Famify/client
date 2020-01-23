import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import * as Font from "expo-font";
import Register from "./screens/register";

export default function App() {
  const [font, setFont] = useState(false);

  useEffect(() => {
    Font.loadAsync({
      "sf-light": require("./assets/font/sf_light.otf"),
      "sf-medium": require("./assets/font/sf_medium.otf"),
      "sf-regular": require("./assets/font/sf_regular.otf"),
      "sf-semibold": require("./assets/font/sf_semibold.otf"),
    }).then(() => {
      setFont(true);
    });
  }, []);

  if (font) {
    return (
      <View style={styles.container}>
        <Register />
      </View>
    );
  } else {
    return <ActivityIndicator size="large" color="#512DA8" />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

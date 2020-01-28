import React from "react";
import { View, Text, Image } from "react-native";
import Picture from "../assets/index";

export default function Loading(props) {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
      }}
    >
      <Image source={Picture.loading} style={{ width: 100, height: 100 }} />
    </View>
  );
}

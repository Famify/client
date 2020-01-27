import React, { useState, useEffect } from "react";
import { ActivityIndicator } from "react-native";
import * as Font from "expo-font";
import Navigation from "./navigation/switch";
import { Provider, useSelector } from 'react-redux'
import store from './store'

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
      <Provider store={ store }>
        <Navigation />
      </Provider>
    );
  } else {
    return <ActivityIndicator size="large" color="#512DA8" />;
  }
}

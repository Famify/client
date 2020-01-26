import React from "react";
import { View, Text } from "react-native";
import { withNavigation } from "react-navigation";

function DetailChallenge({ navigation }) {
  reuturn(
    <View>
      <Text>ini adalah detail challenge</Text>
    </View>
  );
}

export default withNavigation(DetailChallenge);

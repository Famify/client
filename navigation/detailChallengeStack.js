import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { createStackNavigator } from "react-navigation-stack";
import DetailChallenge from "../components/challengeDetail";
import ChallengesDashboard from "../screens/challengeDashboard";

const detailChallengeStack = createStackNavigator(
  {
    challenge: {
      screen: ChallengesDashboard,
      navigationOptions: ({ navigation }) => ({
        headerTransparent: true,
        title: "Challenges",
        headerRight: props => {
          return (
            <TouchableOpacity
              onPress={() => navigation.navigate("parent")}
              style={{ marginRight: 10 }}
            >
              <Text
                style={{
                  color: "#0D47A1",
                  fontFamily: "sf-light",
                  fontSize: 20,
                }}
              >
                Back
              </Text>
            </TouchableOpacity>
          );
        },
      }),
    },
    detail: {
      screen: DetailChallenge,
      navigationOptions: {
        title: "Detail",
      },
    },
  },
  {
    defaultNavigationOptions: {
      headerTitleStyle: {
        fontFamily: "sf-medium",
        fontSize: 26,
      },
    },
  }
);

export default detailChallengeStack;

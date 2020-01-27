import React from "react";
import { Text, TouchableOpacity, BackHandler } from "react-native";
import { createStackNavigator } from "react-navigation-stack";
import DetailChallenge from "../components/challengeDetail";
import ChallengesDashboard from "../screens/challengeDashboard";

const detailChallengeStack = createStackNavigator(
  {
    challenge: {
      screen: ChallengesDashboard,
      navigationOptions: ({ screenProps, navigation }) => ({
        headerTransparent: true,
        title: "Challenges",
        headerRight: props => {
          return (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate(`${navigation.state.params.back}`)
              }
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
    "detail challenge": {
      screen: DetailChallenge,
      navigationOptions: {
        title: "Detail",
        navigationOptions: ({ navigation }) => {
          
          const back = () => {
            if (navigation.state.params.back && navigation.state.params.back === 'message') return navigation.navigate("message")
          }
          
          BackHandler.addEventListener('hardwareBackPress', back())
        }
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

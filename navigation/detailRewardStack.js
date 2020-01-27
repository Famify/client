import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { createStackNavigator } from "react-navigation-stack";
import RewardDetail from "../components/rewardDetail";
import RewardDashboard from "../screens/rewardDashboard";

const detailChallengeStack = createStackNavigator(
  {
    reward: {
      screen: RewardDashboard,
      navigationOptions: ({ navigation }) => ({
        headerTransparent: true,
        title: "Rewards",
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
    "detail reward": {
      screen: RewardDetail,
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

import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { createStackNavigator } from "react-navigation-stack";
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
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
      navigationOptions: ({ navigation }) => ({
        title: "Detail",
        headerLeft: props => {
          return (
            <TouchableOpacity
              onPress={() => {
                if (navigation.state.params.back) {
                  navigation.navigate(`${navigation.state.params.back}`)
                } else {
                  navigation.navigate('challenge')
                }
              }}
              style={{ marginLeft: 10 }}
            >
              <MaterialIcon name="arrow-back" size={30} />
            </TouchableOpacity>
          )
        }
      })
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

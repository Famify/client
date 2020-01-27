import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { createStackNavigator } from "react-navigation-stack";
import ChildDashboard from "../screens/childDashboard";
import FamilyDashboard from "../screens/familyDashboard";
import historyChallenge from "../screens/historyChallenge";
import historyReward from "../screens/historyReward";
import SettingChild from "./settingChildStack"
import DetailChallengeStack from "./detailChallengeStack";
import DetailRewardStack from "./detailRewardStack";

const childStack = createStackNavigator(
  {
    child: {
      screen: ChildDashboard,
      navigationOptions: {
        headerShown: false,
      },
    },
    "family child": {
      screen: FamilyDashboard,
      navigationOptions: ({ navigation }) => ({
        headerTransparent: true,
        title: "Family",
        headerRight: props => {
          return (
          <TouchableOpacity onPress={()=>{ navigation.navigate('setting child') }} style={{ marginRight: 20 }} >
              <Ionicons
                name="ios-settings"
                size={30}
                color="purple"
              />
          </TouchableOpacity>
          );
        },
      }),
    },
    "challenge child": {
      screen: DetailChallengeStack,
      navigationOptions: {
        headerShown: false,
      },
    },
    "reward child": {
      screen: DetailRewardStack,
      navigationOptions: {
        headerShown: false,
      },
    },
    "history challenge": {
      screen: historyChallenge,
      navigationOptions: {
        title: "History Challenges",
      },
    },
    "history reward": {
      screen: historyReward,
      navigationOptions: {
        title: "History Rewards",
      },
    },
    "setting child" : {
      screen: SettingChild,
      navigationOptions: {
        headerTintColor: 'white',
        headerTransparent: true,
        title: 'Setting'
      },
    }
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

export default childStack;

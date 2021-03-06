import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { createStackNavigator } from "react-navigation-stack";
import Constants from "expo-constants";
import ParentDashboard from "../screens/parentDashboard";
import FamilyDashboard from "../screens/familyDashboard";
import ChallengeStack from "./challengeStack";
import RewardStack from "./rewardStack";
import DetailChallengeStack from "./detailChallengeStack";
import SettingParent from './settingParentStack'
import DetailRewardStack from "./detailRewardStack";

const parentStack = createStackNavigator(
  {
    parent: {
      screen: ParentDashboard,
      navigationOptions: {
        headerShown: false,
      },
    },
    "family parent": {
      screen: FamilyDashboard,
      navigationOptions: ({ navigation }) => ({
        headerTransparent: true,
        title: "Family",
        headerRight: props => {
          return (
          <TouchableOpacity onPress={()=>{ navigation.navigate('setting parent') }} style={{ marginRight: 20 }} >
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
    "challenge parent": {
      screen: DetailChallengeStack,
      navigationOptions: {
        headerShown: false,
      },
    },
    "reward parent": {
      screen: DetailRewardStack,
      navigationOptions: {
        headerShown: false,
      },
    },
    "add reward": {
      screen: RewardStack,
      navigationOptions: {
        title: "New Reward",
        headerStatusBarHeight: Constants.statusBarHeight,
        headerTransparent: true,
        headerTitleStyle: {
          fontFamily: "sf-medium",
          fontSize: 24,
        },
      },
    },
    "add challenge": {
      screen: ChallengeStack,
      navigationOptions: {
        title: "New Challenge",
        headerStatusBarHeight: Constants.statusBarHeight,
        headerTransparent: true,
        headerTitleStyle: {
          fontFamily: "sf-medium",
          fontSize: 24,
        },
      },
    },
    "setting parent" : {
      screen: SettingParent,
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

export default parentStack;

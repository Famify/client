import { createStackNavigator } from "react-navigation-stack";
import Constants from "expo-constants";
import ParentDashboard from "../screens/parentDashboard";
import FamilyDashboard from "../screens/familyDashboard";
import ChallengeStack from "./challengeStack";
import RewardStack from "./rewardStack";
import DetailChallengeStack from "./detailChallengeStack";
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
      navigationOptions: {
        headerTransparent: true,
        title: "Family",
      },
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

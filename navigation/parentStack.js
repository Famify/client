import { createStackNavigator } from "react-navigation-stack";
import Constants from "expo-constants";
import ParentDashboard from "../screens/parentDashboard";
import FamilyDashboard from "../screens/familyDashboard";
import RewardsDashboard from "../screens/rewardDashboard";
import ChallengeStack from "./challengeStack";
import RewardStack from "./rewardStack";
import DetailChallengeStack from "./detailChallengeStack";

const parentStack = createStackNavigator(
  {
    parent: {
      screen: ParentDashboard,
      navigationOptions: {
        headerShown: false,
      },
    },
    family: {
      screen: FamilyDashboard,
      navigationOptions: {
        headerTransparent: true,
        title: "Family",
      },
    },
    challenge: {
      screen: DetailChallengeStack,
      navigationOptions: {
        headerShown: false,
      },
    },
    reward: {
      screen: RewardsDashboard,
      navigationOptions: {
        headerTransparent: true,
        title: "Rewards",
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

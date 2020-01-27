import { createStackNavigator } from "react-navigation-stack";
import ChildDashboard from "../screens/childDashboard";
import FamilyDashboard from "../screens/familyDashboard";
import historyChallenge from "../screens/historyChallenge";
import historyReward from "../screens/historyReward";
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
      navigationOptions: {
        headerTransparent: true,
        title: "Family",
      },
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

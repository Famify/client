import { createStackNavigator } from "react-navigation-stack";
import ParentDashboard from "../screens/parentDashboard";
import FamilyDashboard from "../screens/familyDashboard";
import ChallengesDashboard from "../screens/challengeDashboard";
import RewardsDashboard from "../screens/rewardDashboard";
import RewardForm from "../components/rewardForm";
import ChallengeForm from "../components/challengeForm";

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
      screen: ChallengesDashboard,
      navigationOptions: {
        headerTransparent: true,
        title: "Challenges",
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
      screen: RewardForm,
      navigationOptions: {
        headerTransparent: true,
        title: "Add Reward",
      },
    },
    "add challenge": {
      screen: ChallengeForm,
      navigationOptions: {
        headerTransparent: true,
        title: "Add Challenge",
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

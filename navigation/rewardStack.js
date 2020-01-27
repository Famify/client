import { createMaterialTopTabNavigator } from "react-navigation-tabs";
import TitleReward from "../components/titleReward";
import ImageReward from "../components/imageReward";

const rewardStack = createMaterialTopTabNavigator(
  {
    "title reward": {
      screen: TitleReward,
      navigationOptions: {
        title: "Description",
      },
    },
    "image reward": {
      screen: ImageReward,
      navigationOptions: {
        title: "Image",
      },
    },
  },
  {
    tabBarOptions: {
      tabStyle: {
        display: "none",
      },
      style: {
        backgroundColor: "#512DA8",
      },
      labelStyle: {
        fontFamily: "sf-medium",
      },
    },
    defaultNavigationOptions: {
      swipeEnabled: false,
    },
    backBehavior: "history",
  }
);

export default rewardStack;

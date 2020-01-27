import { createMaterialTopTabNavigator } from "react-navigation-tabs";
import TitleChallenge from "../components/titleChallenge";
import ImageChallenge from "../components/imageChallenge";

const challengeStack = createMaterialTopTabNavigator(
  {
    "title challenge": {
      screen: TitleChallenge,
      navigationOptions: {
        title: "Description",
      },
    },
    "image challenge": {
      screen: ImageChallenge,
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

export default challengeStack;

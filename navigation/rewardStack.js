import { createMaterialTopTabNavigator } from "react-navigation-tabs";
import TitleReward from "../components/titleReward";
import ImageReward from "../components/imageReward";

const rewardStack = createMaterialTopTabNavigator(
  {
    title: {
      screen: TitleReward,
      navigationOptions: {
        title: "Description",
      },
    },
    image: {
      screen: ImageReward,
      navigationOptions: {
        title: "Image",
      },
    },
  },
  {
    tabBarOptions: {
      tabStyle: {
        marginTop: 70,
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
  }
);

export default rewardStack;

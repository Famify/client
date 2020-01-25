import { createSwitchNavigator, createAppContainer } from "react-navigation";
import Register from "../screens/register";
import Login from "../screens/login";
import ParentStack from "./parentStack";
import ChildStack from "./childStack";
import FamilyTopTab from './familyTopTab'
import MessageScreen from '../screens/messageDasboard'

const switchNavigation = createSwitchNavigator({
  register: {
    screen: Register,
  },
  login: {
    screen: Login,
  },
  "parent dashboard": {
    screen: ParentStack,
  },
  "child dashboard": {
    screen: ChildStack,
  },
  "add family form":{
    screen: FamilyTopTab
  },
  "message" : {
    screen: MessageScreen
  }
});

export default createAppContainer(switchNavigation);

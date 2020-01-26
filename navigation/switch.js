import { createSwitchNavigator, createAppContainer } from "react-navigation";
import Register from "../screens/register";
import Login from "../screens/login";
import ParentStack from "./parentStack";
import ChildStack from "./childStack";
import FamilyTopTab from './familyTopTab'
// import MessageScreen from '../screens/messageDasboard'
import Chat from '../screens/chat'

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
    screen: Chat,
  }
}, {
  backBehavior: 'history'
});

export default createAppContainer(switchNavigation);

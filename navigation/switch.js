import { createSwitchNavigator, createAppContainer } from "react-navigation";
import Register from "../screens/register";
import Login from "../screens/login";
import ParentStack from "./parentStack";
import ChildStack from "./childStack";
import FamilyTopTab from './familyTopTab'
// import MessageScreen from '../screens/messageDasboard'
import Chat from '../screens/chat'
import Location from '../screens/location'
import { HeaderBackButton } from "react-navigation-stack";
import { TouchableOpacity } from "react-native-gesture-handler";
import React from 'react'

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
    navigationOptions: ({navigation}) => {
      HeaderBackButton : () => {
        return (
          <TouchableOpacity onPress={() => navigation.navigate(`${navigation.state.params.back} dashboard`)}>
            <Text>Back</Text>
          </TouchableOpacity>
        )
      }
    }
  },
  "location" : {
    screen: Location,
  },
}, {
  backBehavior: 'history'
});

export default createAppContainer(switchNavigation);

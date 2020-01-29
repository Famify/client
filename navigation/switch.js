import { createSwitchNavigator, createAppContainer } from "react-navigation";
import Register from "../screens/register";
import Login from "../screens/login";
import ParentStack from "./parentStack";
import ChildStack from "./childStack";
import FamilyTopTab from './familyTopTab'
import Chat from '../screens/chat'
// import ChatStack from '../navigation/chatStack'
import Location from '../screens/location'
import { TouchableOpacity } from "react-native-gesture-handler";
import React from 'react'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'

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

    // navigationOptions: ({navigation}) => ({
    //   title: "Family chat",
    //   headerLeft: props => {
    //     return (
    //       <TouchableOpacity
    //         onPress={() => {
    //           if (navigation.state.params.back) {
    //             navigation.navigate(`${navigation.state.params.back}`)
    //           } else {
    //             navigation.navigate('challenge')
    //           }
    //         }}
    //         style={{ marginLeft: 10 }}
    //       >
    //         <MaterialIcon name="arrow-back" size={30} />
    //       </TouchableOpacity>
    //     )
    //   }
    // })
    
  },
  "location" : {
    screen: Location,
  },
}, {
  backBehavior: 'history'
});

export default createAppContainer(switchNavigation);

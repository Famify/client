import React from "react";
import { TouchableOpacity } from "react-native";
import { createStackNavigator } from 'react-navigation-stack'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import Chat from '../screens/chat'

const chatStack = createStackNavigator(
  {
    chat: {
      screen: Chat,
      navigationOptions: ({ navigation }) => ({
        title: "",
        headerLeft: props => {
          console.log('ini params', navigation.state.params)
          
          // return (
          //   <TouchableOpacity
          //     onPress={() => {
          //       if (navigation.state.params.back) {
          //         navigation.navigate(`${navigation.state.params.back}`)
          //       }
          //     }}
          //     style={{ marginLeft: 10 }}
          //   >
          //     <MaterialIcon name="arrow-back" size={30} />
          //   </TouchableOpacity>
          // )
        },
        headerRight: props => {
          <TouchableOpacity
            onPress={() => {
                navigation.navigate('challenge')
            }}
            style={{ marginLeft: 10 }}
          >
            <MaterialIcon name="photo-camera" size={30} />
          </TouchableOpacity>
        }
      })
    }
  }
)

export default chatStack

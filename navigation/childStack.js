import React from 'react'
import { TouchableOpacity, Text } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { createStackNavigator } from "react-navigation-stack";
import ChildDashboard from "../screens/childDashboard";
import FamilyDashboard from "../screens/familyDashboard";
import historyChallenge from "../screens/historyChallenge";
import historyReward from "../screens/historyReward";
import SettingChild from "./settingChildStack"
import DetailChallengeStack from "./detailChallengeStack";
import DetailRewardStack from "./detailRewardStack";
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import Chat from '../screens/chat'
import * as ImagePicker from "expo-image-picker"

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
      navigationOptions: ({ navigation }) => ({
        headerTransparent: true,
        title: "Family",
        headerRight: props => {
          return (
            <TouchableOpacity onPress={() => { navigation.navigate('setting child') }} style={{ marginRight: 20 }} >
              <Ionicons
                name="ios-settings"
                size={30}
                color="purple"
              />
            </TouchableOpacity>
          );
        },
      }),
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
    "setting child": {
      screen: SettingChild,
      navigationOptions: {
        headerTintColor: 'white',
        headerTransparent: true,
        title: 'Setting'
      },
    },
    // "message child": {
    //   screen: Chat,
      // navigationOptions: ({ navigation }) => ({
        
        // title: "",
        // headerLeft: props => {
        //   return (
        //     <TouchableOpacity
        //       onPress={() => {
        //         if (navigation.state.params.back) {
        //           navigation.navigate(`${navigation.state.params.back}`)
        //         }
        //       }}
        //       style={{ marginLeft: 10 }}
        //     >
        //       <MaterialIcon name="arrow-back" size={30} />
        //     </TouchableOpacity>
        //   )
        // },

        // headerRight: props => {
          // const [image, setImage] = useState(null)
          // const [imageSet, setStatusImageSet] = useState(false)

          // const getPermissionAsync = async () => {
          //   if (Constants.platform.ios) {
          //     const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
          //     if (status !== "granted") {
          //       alert("Sorry, we need camera roll permissions to make this work!");
          //     }
          //   }
          // }

          // const _pickImage = async () => {
          //   getPermissionAsync();
          //   let cameraPick = await ImagePicker.launchCameraAsync({
          //     allowsEditing: true
          //   })

          //   let libraryPick = await ImagePicker.launchImageLibraryAsync({
          //     mediaTypes: ImagePicker.MediaTypeOptions.All,
          //     allowsEditing: true,
          //     aspect: [4, 3],
          //     quality: 1,
          //   });

            // if (!cameraPick.cancelled) {
            //   setImage(result.uri);
            //   setStatusImageSet(true);
            // }

            // if (!libraryPick.cancelled) {
            //   setImage(result.uri);
            //   setStatusImageSet(true);
            // }
          // }

          // return (
          //   <TouchableOpacity
          //     onPress={() => {
          //       // alert('PRESSED')
          //       _pickImage()
          //       // navigation.navigate('challenge')
          //     }}
          //     style={{ marginRight: 10 }}
          //   >
          //     {/* <Text>Tes</Text> */}
          //     <MaterialIcon name="photo-camera" size={30} />
          //   </TouchableOpacity>
          // )
        // }
      // })
    // }
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

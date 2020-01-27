import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import ParentSetting from "../components/settingParent";

const SettingParent = createMaterialTopTabNavigator(
  {
    "setting parent": {
      screen: ParentSetting,
      navigationOptions: {
        title: "Setting",
      },
    }
  },{
      tabBarOptions:{
        tabStyle: {
          height: 0,
        },
        style:{
          backgroundColor: '',
        }
      }
  }
);

export default SettingParent;

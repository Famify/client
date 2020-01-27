import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import ChildSetting from "../components/settingChild";

const SettingChild = createMaterialTopTabNavigator(
  {
    "setting child": {
      screen: ChildSetting,
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

export default SettingChild;

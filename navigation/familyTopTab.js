import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import ParentForm from "../components/addParent";
import childForm from "../components/addChild";

const FamilyTopTab = createMaterialTopTabNavigator(
  {
    FormChild: {
      screen: childForm,
    },
    FormParent: {
      screen: ParentForm,
    },
  },{
      tabBarOptions:{
        tabStyle: {
          height: 0
        },
        style:{
          backgroundColor: ''
        }
      }
  }
);

export default FamilyTopTab;

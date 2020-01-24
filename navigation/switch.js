import { createSwitchNavigator, createAppContainer } from "react-navigation";
import Register from "../screens/register";
import Login from "../screens/login";
import ParentDashboard from "../screens/parentDashboard";
import FamilyDashboard from "../screens/parentDashboard";


const switchNavigation = createSwitchNavigator({
  register: {
    screen: Register,
  },
  login: {
    screen: Login,
  },
  "parent dashboard": {
    screen: FamilyDashboard,
  },
});

export default createAppContainer(switchNavigation);

import { createSwitchNavigator, createAppContainer } from "react-navigation";
import Register from "../screens/register";
import Login from "../screens/login";
import ParentDashboard from "../screens/parentDashboard";
import ChildDashboard from "../screens/childDashboard";

const switchNavigation = createSwitchNavigator({
  register: {
    screen: Register,
  },
  login: {
    screen: Login,
  },
  "parent dashboard": {
    screen: ParentDashboard,
  },
  "child dashboard": {
    screen: ChildDashboard,
  },
});

export default createAppContainer(switchNavigation);

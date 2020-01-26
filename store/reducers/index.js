import { combineReducers } from "redux";
import { userReducer } from "./user";
import { challengeReducer } from "./challenge";
import { rewardReducers } from "./reward";

export default combineReducers({
  user: userReducer,
  challenge: challengeReducer,
  reward: rewardReducers,
});

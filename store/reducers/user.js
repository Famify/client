import {
  USER_REGISTER_LOADING,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_ERROR,
} from "./constant";
import produce from "immer";

const initialUserState = {
  loading: false,
  error: "",
  data: {},
  isLogin: false,
};

export function userReducer(state = initialUserState, actions) {
  switch (actions.type) {
    case USER_REGISTER_LOADING:
      return produce(state, newState => {
        newState.loading = actions.loading;
      });
    case USER_REGISTER_SUCCESS:
      return produce(state, newState => {
        newState.loading = actions.loading;
        newState.data = actions.data;
      });
    case USER_REGISTER_ERROR:
      return produce(state, newState => {
        newState.loading = actions.loading;
        newState.error = actions.error;
      });
    default:
      return state;
  }
}

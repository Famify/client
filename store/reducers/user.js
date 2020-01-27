import {
  PARENT_REGISTER_LOADING,
  PARENT_REGISTER_SUCCESS,
  PARENT_REGISTER_ERROR,
  PARENT_REGISTER_2_ERROR,
  PARENT_REGISTER_2_SUCCESS,
  PARENT_REGISTER_2_LOADING,
  PARENT_LOGIN_LOADING,
  PARENT_LOGIN_SUCCESS,
  PARENT_LOGIN_ERROR,
  CHILD_LOGIN_LOADING,
  CHILD_LOGIN_ERROR,
  CHILD_LOGIN_SUCCESS,
  CHILD_REGISTER_ERROR,
  CHILD_REGISTER_LOADING,
  CHILD_REGISTER_SUCCESS,
  ALL_FAMILY_ERROR,
  ALL_FAMILY_LOADING,
  ALL_FAMILY_SUCCESS,
} from "./constantUser";
import produce from "immer";

const initialUserState = {
  loading: false,
  error: "",
  data: {familyId: 'qwerty', username: 'orang1'},
  isLogin: false,
  token: "",
  family: [],
  register: false
};

export function userReducer(state = initialUserState, actions) {
  switch (actions.type) {
    case "USER_ERROR_CLEAR":
      return produce(state, newState => {
        newState.error = actions.error
      })
    case "USER_REGISTER_SUCCESS":
      return produce(state, newState => {
        newState.register = actions.status;
      });
    case "USER_REGISTER_CLEAR":
      return produce(state, newState => {
        newState.register = actions.status;
      });
    case PARENT_REGISTER_LOADING:
      return produce(state, newState => {
        newState.loading = actions.loading;
      });
    case PARENT_REGISTER_ERROR:
      return produce(state, newState => {
        newState.loading = actions.loading;
        newState.error = actions.error;
      });
    case PARENT_REGISTER_SUCCESS:
      return produce(state, newState => {
        newState.loading = actions.loading;
      });
    case PARENT_LOGIN_LOADING:
      return produce(state, newState => {
        newState.loading = actions.loading;
      });
    case PARENT_LOGIN_SUCCESS:
      return produce(state, newState => {
        newState.loading = actions.loading;
        newState.data = actions.data.parent;
        newState.token = actions.data.token;
      });
    case PARENT_LOGIN_ERROR:
      return produce(state, newState => {
        newState.loading = actions.loading;
        newState.error = actions.error;
      });
    case PARENT_REGISTER_2_ERROR:
      return produce(state, newState => {
        newState.loading = actions.loading;
        newState.error = actions.error;
      });
    case PARENT_REGISTER_2_SUCCESS:
      return produce(state, newState => {
        newState.loading = actions.loading;
      });
    case PARENT_REGISTER_2_LOADING:
      return produce(state, newState => {
        newState.loading = actions.loading;
      });
    case CHILD_REGISTER_LOADING:
      return produce(state, newState => {
        newState.loading = actions.loading;
      });
    case CHILD_REGISTER_SUCCESS:
      return produce(state, newState => {
        newState.loading = actions.loading;
      });
    case CHILD_REGISTER_ERROR:
      return produce(state, newState => {
        newState.loading = actions.loading;
        newState.error = actions.error;
      });
    case CHILD_LOGIN_LOADING:
      return produce(state, newState => {
        newState.loading = actions.loading;
      });
    case CHILD_LOGIN_SUCCESS:
      return produce(state, newState => {
        newState.loading = actions.loading;
        newState.data = actions.data.child;
        newState.token = actions.data.token;
      });
    case CHILD_LOGIN_ERROR:
      return produce(state, newState => {
        newState.loading = actions.loading;
        newState.error = actions.error;
      });
    case ALL_FAMILY_LOADING:
      return produce(state, newState => {
        newState.loading = actions.loading;
        newState.error = actions.error;
      });
    case ALL_FAMILY_SUCCESS:
      console.log('test');
      
      return produce(state, newState => {
        newState.loading = actions.loading;
        newState.family = actions.data;
      });
    case ALL_FAMILY_ERROR:
      return produce(state, newState => {
        newState.loading = actions.loading;
        newState.error = actions.error;
      });
    default:
      return state;
  }
}

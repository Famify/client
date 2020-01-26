import {
  CREATE_REWARD_LOADING,
  CREATE_REWARD_SUCCESS,
  CREATE_REWARD_ERROR,
  GET_REWARD_LOADING,
  GET_REWARD_SUCCESS,
  GET_REWARD_ERROR,
  ALL_REWARD_LOADING,
  ALL_REWARD_SUCCESS,
  ALL_REWARD_ERROR,
  CLAIM_REWARD_LOADING,
  CLAIM_REWARD_SUCCESS,
  CLAIM_REWARD_ERROR,
  DELETE_REWARD_LOADING,
  DELETE_REWARD_SUCCESS,
  DELETE_REWARD_ERROR,
  SET_TITLE_DESC,
} from "./constantReward";
import produce from "immer";

const initialValueReward = {
  data: {},
  loading: false,
  error: [],
  rewardList: [],
  message: "",
  titleDesc: {},
};

export function rewardReducers(state = initialValueReward, actions) {
  switch (actions.type) {
    case CREATE_REWARD_LOADING:
      return produce(state, newState => {
        newState.loading = actions.loading;
      });
    case CREATE_REWARD_SUCCESS:
      return produce(state, newState => {
        newState.loading = actions.loading;
        newState.data = actions.data;
        newState.message = actions.message;
      });
    case CREATE_REWARD_ERROR:
      return produce(state, newState => {
        newState.loading = actions.loading;
        newState.error = actions.error;
      });
    case GET_REWARD_LOADING:
      return produce(state, newState => {
        newState.loading = actions.loading;
      });
    case GET_REWARD_SUCCESS:
      return produce(state, newState => {
        newState.loading = actions.loading;
        newState.data = actions.data;
        newState.message = actions.message;
      });
    case GET_REWARD_ERROR:
      return produce(state, newState => {
        newState.loading = actions.loading;
        newState.error = actions.error;
      });
    case ALL_REWARD_LOADING:
      return produce(state, newState => {
        newState.loading = actions.loading;
      });
    case ALL_REWARD_SUCCESS:
      return produce(state, newState => {
        newState.loading = actions.loading;
        newState.rewardList = actions.data;
      });
    case ALL_REWARD_ERROR:
      return produce(state, newState => {
        newState.loading = actions.loading;
        newState.error = actions.error;
      });
    case CLAIM_REWARD_LOADING:
      return produce(state, newState => {
        newState.loading = actions.loading;
      });
    case CLAIM_REWARD_SUCCESS:
      return produce(state, newState => {
        newState.loading = actions.loading;
      });
    case CLAIM_REWARD_ERROR:
      return produce(state, newState => {
        newState.loading = actions.loading;
        newState.error = actions.error;
      });
    case DELETE_REWARD_LOADING:
      return produce(state, newState => {
        newState.loading = actions.loading;
      });
    case DELETE_REWARD_SUCCESS:
      return produce(state, newState => {
        newState.loading = actions.loading;
      });
    case DELETE_REWARD_ERROR:
      return produce(state, newState => {
        newState.loading = actions.loading;
        newState.error = actions.error;
      });
    case SET_TITLE_DESC:
      return produce(state, newState => {
        newState.titleDesc = actions.data;
      });
    default:
      return state;
  }
}

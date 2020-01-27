import {
  CREATE_CHALLENGE_LOADING,
  CREATE_CHALLENGE_SUCCESS,
  CREATE_CHALLENGE_ERROR,
  GET_CHALLENGE_LOADING,
  GET_CHALLENGE_SUCCESS,
  GET_CHALLENGE_ERROR,
  ALL_CHALLENGE_LOADING,
  ALL_CHALLENGE_SUCCESS,
  ALL_CHALLENGE_ERROR,
  CLAIM_CHALLENGE_LOADING,
  CLAIM_CHALLENGE_SUCCESS,
  CLAIM_CHALLENGE_ERROR,
  FINISH_CHALLENGE_LOADING,
  FINISH_CHALLENGE_SUCCESS,
  FINISH_CHALLENGE_ERROR,
  DELETE_CHALLENGE_LOADING,
  DELETE_CHALLENGE_SUCCESS,
  DELETE_CHALLENGE_ERROR,
  SET_TITLE_DESC,
} from "./constantChallenge";
import produce from "immer";

const initialStateChallenge = {
  data: {},
  challengeList: [],
  loading: false,
  error: "",
  titleDesc: {},
};

export function challengeReducer(state = initialStateChallenge, actions) {
  switch (actions.type) {
    case CREATE_CHALLENGE_LOADING:
      return produce(state, newState => {
        newState.loading = actions.loading;
      });
    case CREATE_CHALLENGE_SUCCESS:
      return produce(state, newState => {
        newState.loading = actions.loading;
      });
    case CREATE_CHALLENGE_ERROR:
      return produce(state, newState => {
        newState.loading = actions.loading;
        newState.error = actions.error;
      });
    case GET_CHALLENGE_LOADING:
      return produce(state, newState => {
        newState.loading = actions.loading;
      });
    case GET_CHALLENGE_SUCCESS:
      return produce(state, newState => {
        newState.loading = actions.loading;
        newState.data = actions.data;
      });
    case GET_CHALLENGE_ERROR:
      return produce(state, newState => {
        newState.loading = actions.loading;
        newState.error = actions.error;
      });
    case ALL_CHALLENGE_LOADING:
      return produce(state, newState => {
        newState.loading = actions.loading;
      });
    case ALL_CHALLENGE_SUCCESS:
      return produce(state, newState => {
        newState.loading = actions.loading;
        newState.challengeList = actions.data;
      });
    case ALL_CHALLENGE_ERROR:
      return produce(state, newState => {
        newState.loading = actions.loading;
        newState.error = actions.error;
      });
    case CLAIM_CHALLENGE_LOADING:
      return produce(state, newState => {
        newState.loading = actions.loading;
      });
    case CLAIM_CHALLENGE_SUCCESS:
      return produce(state, newState => {
        newState.loading = actions.loading;
      });
    case CLAIM_CHALLENGE_ERROR:
      return produce(state, newState => {
        newState.loading = actions.loading;
        newState.error = actions.error;
      });
    case FINISH_CHALLENGE_LOADING:
      return produce(state, newState => {
        newState.loading = actions.loading;
      });
    case FINISH_CHALLENGE_SUCCESS:
      return produce(state, newState => {
        newState.loading = actions.loading;
      });
    case FINISH_CHALLENGE_ERROR:
      return produce(state, newState => {
        newState.loading = actions.loading;
        newState.error = actions.error;
      });
    case DELETE_CHALLENGE_LOADING:
      return produce(state, newState => {
        newState.loading = actions.loading;
      });
    case DELETE_CHALLENGE_SUCCESS:
      return produce(state, newState => {
        newState.loading = actions.loading;
      });
    case DELETE_CHALLENGE_ERROR:
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

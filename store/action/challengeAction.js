import axios from "../../config/axios";
import { AsyncStorage } from "react-native";

export const createChallenge = payload => {
  return async dispatch => {
    dispatch({
      type: "CREATE_CHALLENGE_LOADING",
      loading: false,
    });
    try {
      const token = await AsyncStorage.getItem("token");
      const { data } = await axios({
        url: "/tasks",
        method: "POST",
        data: payload.data,
        headers: {
          access_token: token,
          "Content-Type": "multipart/form-data",
        },
      });
      dispatch({
        type: "CREATE_CHALLENGE_SUCCESS",
        loading: false,
      });
    } catch ({ response }) {
      let err = "";
      if (typeof response.data.message.error === "string") {
        err = response.data.message;
      } else {
        err = response.data.message.join(", ");
      }
      dispatch({
        type: "CREATE_CHALLENGE_ERROR",
        loading: false,
        error: err,
      });
    }
  };
};

export const getChallenge = payload => {
  return async dispatch => {
    dispatch({
      type: "GET_CHALLENGE_LOADING",
      loading: true,
    });
    try {
      const token = await AsyncStorage.getItem("token");
      const { data } = await axios({
        url: `/tasks/${payload.id}`,
        method: "GET",
        headers: {
          access_token: token,
        },
      });
      dispatch({
        type: "GET_CHALLENGE_SUCCESS",
        loading: false,
        data,
      });
    } catch ({ response }) {
      let err = "";
      if (typeof response.data.message.error === "string") {
        err = response.data.message;
      } else {
        err = response.data.message.join(", ");
      }
      dispatch({
        type: "GET_CHALLENGE_ERROR",
        loading: false,
        error: err,
      });
    }
  };
};

export const getAllChallenge = payload => {
  return async dispatch => {
    dispatch({
      type: "ALL_CHALLENGE_LOADING",
      loading: true,
    });
    try {
      const token = await AsyncStorage.getItem("token");
      const { data } = await axios({
        url: "/tasks",
        method: "GET",
        headers: {
          access_token: token,
        },
      });
      dispatch({
        type: "ALL_CHALLENGE_SUCCESS",
        loading: false,
        data,
      });
    } catch ({ response }) {
      let err = "";
      if (typeof response.data.message.error === "string") {
        err = response.data.message;
      } else {
        err = response.data.message.join(", ");
      }
      dispatch({
        type: "ALL_CHALLENGE_ERROR",
        loading: false,
        error: err,
      });
    }
  };
};

export const claimChallenge = payload => {
  return async dispatch => {
    dispatch({
      type: "CLAIM_CHALLENGE_LOADING",
      loading: false,
    });
    try {
      const token = await AsyncStorage.getItem("token");
      const { data } = await axios({
        url: `/tasks/${payload.id}/claim`,
        method: "PATCH",
        headers: {
          access_token: token,
        },
      });
      dispatch({
        type: "CLAIM_CHALLENGE_SUCCESS",
        loading: false,
        data,
      });
    } catch ({ response }) {
      let err = "";
      if (typeof response.data.message.error === "string") {
        err = response.data.message;
      } else {
        err = response.data.message.join(", ");
      }
      dispatch({
        type: "CLAIM_CHALLENGE_ERROR",
        loading: false,
        error: err,
      });
    }
  };
};

export const finishChallenge = payload => {
  return async dispatch => {
    dispatch({
      type: "FINISH_CHALLENGE_LOADING",
      loading: false,
    });
    try {
      const token = await AsyncStorage.getItem("token");
      const { data } = await axios({
        url: `/tasks/${payload.id}/finish`,
        method: "PATCH",
        headers: {
          access_token: token,
        },
      });
      dispatch({
        type: "FINISH_CHALLENGE_SUCCESS",
        data,
        loading: false,
      });
    } catch ({ response }) {
      let err = "";
      if (typeof response.data.message.error === "string") {
        err = response.data.message;
      } else {
        err = response.data.message.join(", ");
      }
      dispatch({
        type: "CLAIM_CHALLENGE_ERROR",
        loading: false,
        error: err,
      });
    }
  };
};

export const deleteChallenge = payload => {
  return async dispatch => {
    dispatch({
      type: "DELETE_CHALLENGE_LOADING",
      loading: true,
    });
    try {
      const token = await AsyncStorage.getItem("token");
      const { data } = await axios({
        url: `/tasks/${payload.id}`,
        method: "DELETE",
        headers: {
          access_token: token,
        },
      });
      dispatch({
        type: "DELETE_CHALLENGE_SUCCESS",
        data,
        loading: false,
      });
    } catch ({ response }) {
      let err = "";
      if (typeof response.data.message.error === "string") {
        err = response.data.message;
      } else {
        err = response.data.message.join(", ");
      }
      dispatch({
        type: "DELETE_CHALLENGE_ERROR",
        loading: false,
        error: err,
      });
    }
  };
};

export const setTitleAndDescription = payload => {
  return dispatch => {
    dispatch({
      type: "SET_TITLE_DESC",
      data: payload,
    });
  };
};

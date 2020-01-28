import axios from "../../config/axios";
import { AsyncStorage } from "react-native";

export const createReward = payload => {
  return async dispatch => {
    dispatch({
      type: "CREATE_REWARD_LOADING",
      loading: false,
    });
    try {
      const token = await AsyncStorage.getItem("token");
      const { data } = await axios({
        url: "/rewards",
        method: "POST",
        data: payload.data,
        headers: {
          access_token: token,
          "Content-Type": "multipart/form-data",
        },
      });
      dispatch({
        type: "CREATE_REWARD_SUCCESS",
        loading: false,
        data,
      });
    } catch ({ response }) {
      let err = "";
      if (typeof response.data.message.error == "string") {
        err = response.data.message.error;
      } else {
        err = response.data.message.error.join(", ");
      }
      dispatch({
        type: "CREATE_REWARD_ERROR",
        loading: false,
        error: err,
      });
    }
  };
};

export const getReward = payload => {
  return async dispatch => {
    dispatch({
      type: "GET_REWARD_LOADING",
      loading: true,
    });
    try {
      const token = await AsyncStorage.getItem("token");
      const { data } = await axios({
        url: `/rewards/${payload.id}`,
        method: "GET",
        headers: {
          access_token: token,
        },
      });

      dispatch({
        type: "GET_REWARD_SUCCESS",
        loading: false,
        data,
      });
    } catch ({ response }) {
      let err = "";
      if (typeof response.data.message.error == "string") {
        err = response.data.message.error;
      } else {
        err = response.data.message.error.join(", ");
      }
      dispatch({
        type: "GET_REWARD_ERROR",
        loading: false,
        error: err,
      });
    }
  };
};

export const getAllReward = payload => {
  return async dispatch => {
    dispatch({
      type: "ALL_REWARD_LOADING",
      loading: true,
    });
    try {
      const token = await AsyncStorage.getItem("token");
      const { data } = await axios({
        url: "/rewards",
        method: "GET",
        headers: {
          access_token: token,
        },
      });

      dispatch({
        type: "ALL_REWARD_SUCCESS",
        loading: false,
        data,
      });
    } catch ({ response }) {
      let err = "";
      if (typeof response.data.message.error == "string") {
        err = response.data.message.error;
      } else {
        err = response.data.message.error.join(", ");
      }
      dispatch({
        type: "ALL_REWARD_ERROR",
        loading: false,
        error: err,
      });
    }
  };
};

export const claimReward = payload => {
  return async dispatch => {
    dispatch({
      type: "CLAIM_REWARD_LOADING",
      loading: true,
    });
    try {
      const token = await AsyncStorage.getItem("token");
      const { data } = await axios({
        url: `/rewards/${payload.id}`,
        method: "PATCH",
        headers: {
          access_token: token,
        },
      });
      dispatch({
        type: "CLAIM_REWARD_SUCCESS",
        loading: false,
        data,
      });
    } catch ({ response }) {
      let err = "";
      if (typeof response.data.message.error == "string") {
        err = response.data.message.error;
      } else {
        err = response.data.message.error.join(", ");
      }
      dispatch({
        type: "CLAIM_REWARD_ERROR",
        loading: false,
        error: err,
      });
    }
  };
};

export const deleteReward = payload => {
  return async dispatch => {
    dispatch({
      type: "DELETE_REWARD_LOADING",
      loading: true,
    });
    try {
      const token = await AsyncStorage.getItem("token");
      const { data } = await axios({
        url: `/rewards/${payload.id}`,
        method: "DELETE",
        headers: {
          access_token: token,
        },
      });
      dispatch({
        type: "DELETE_REWARD_SUCCESS",
        data,
        loading: false,
      });
    } catch ({ response }) {
      let err = "";
      if (typeof response.data.message.error == "string") {
        err = response.data.message.error;
      } else {
        err = response.data.message.error.join(", ");
      }
      dispatch({
        type: "DELETE_REWARD_ERROR",
        loading: false,
        error: err,
      });
    }
  };
};

export const setTitleDesc = payload => {
  return async dispatch => {
    dispatch({
      type: "SET_TITLE_DESC",
      data: payload,
    });
  };
};

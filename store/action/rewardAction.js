import axios from "../../config/axios";
import { AsyncStorage } from "react-native";
import { sendNotification } from "./notification";

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
      alert(data.message);
      sendNotification(
        payload.family,
        "New Reward Post !",
        "Let's take a look to new reward !"
      );
      dispatch({
        type: "CREATE_REWARD_SUCCESS",
        loading: false,
        data,
      });
    } catch ({ response }) {
      let err = "";
      if (typeof response.data.error == "string") {
        err = response.data.error;
      } else {
        err = response.data.error.join(", ");
      }
      alert(err);
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
      if (typeof response.data.error == "string") {
        err = response.data.error;
      } else {
        err = response.data.error.join(", ");
      }
      alert(err);
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
      if (typeof response.data.error == "string") {
        err = response.data.error;
      } else {
        err = response.data.error.join(", ");
      }
      alert(err);
      dispatch({
        type: "ALL_REWARD_ERROR",
        loading: false,
        error: err,
      });
    }
  };
};

export const getMyAllReward = payload => {
  return async dispatch => {
    dispatch({
      type: "GET_MYREWARD_LOADING",
      loading: true,
    });
    try {
      const token = await AsyncStorage.getItem("token");
      const id = await AsyncStorage.getItem("id");
      const { data } = await axios({
        url: "/rewards",
        method: "GET",
        headers: {
          access_token: token,
        },
      });
      let myRewards = []
      data.forEach( async reward => {
        if (id === reward.childId) {
          myRewards.push(reward)
        }
      });      
      dispatch({
        type: "GET_MYREWARD_SUCCESS",
        loading: false,
        data : myRewards,
      });
    } catch ({ response }) {
      let err = "";
      if (typeof response.data.error == "string") {
        err = response.data.error;
      } else {
        err = response.data.error.join(", ");
      }
      alert(err);
      dispatch({
        type: "GET_MYREWARD_ERROR",
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
      const poin = await axios({
        url: `/children/${payload.userId}/min`,
        method: "PATCH",
        data: {
          point: payload.point,
        },
        headers: {
          access_token: token,
        },
      });
      dispatch({
        type: "MIN_POIN_LOADING",
        loading: true,
      });
    } catch ({ response }) {
      let err = "";
      if (typeof response.data.error == "string") {
        err = response.data.error;
      } else {
        err = response.data.error.join(", ");
      }
      alert(err);
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
      if (typeof response.data.error == "string") {
        err = response.data.error;
      } else {
        err = response.data.error.join(", ");
      }
      alert(err);
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

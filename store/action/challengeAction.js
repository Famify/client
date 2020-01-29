import axios from "../../config/axios";
import { AsyncStorage } from "react-native";
import { sendNotification } from "./notification";

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
      await sendNotification(
        payload.family,
        "New Challenge created",
        `Let's take a look for new challenge !`
      );
      dispatch({
        type: "CREATE_CHALLENGE_SUCCESS",
        loading: false,
      });
    } catch ({ response }) {
      let err = "";
      if (typeof response.data.error === "string") {
        err = response.data;
      } else {
        err = response.data.join(", ");
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
      if (typeof response.data.error === "string") {
        err = response.data;
      } else {
        err = response.data.join(", ");
      }
      alert(err);
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
      if (typeof response.data.error === "string") {
        err = response.data;
      } else {
        err = response.data.join(", ");
      }
      alert(err);
      dispatch({
        type: "ALL_CHALLENGE_ERROR",
        loading: false,
        error: err,
      });
    }
  };
};

export const getMyChallenge = payload => {
  return async dispatch => {
    dispatch({
      type: "GET_MYCHALLENGE_LOADING",
      loading: true,
    });
    try {
      const token = await AsyncStorage.getItem("token");
      const id = await AsyncStorage.getItem("id");
      const { data } = await axios({
        url: "/tasks",
        method: "GET",
        headers: {
          access_token: token,
        },
      });
      let myChallenge = []
      data.forEach( async challenge => {
        if (id === challenge.childId) {
          myChallenge.push(challenge)
        }
      });

      await dispatch({
        type: "GET_MYCHALLENGE_SUCCESS",
        loading: false,
        data : myChallenge,
      });

    } catch ({ response }) {
      let err = "";
      if (typeof response.data.error === "string") {
        err = response.data;
      } else {
        err = response.data.join(", ");
      }
      alert(err);
      dispatch({
        type: "GET_MYCHALLENGE_ERROR",
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
      alert(data.message)
      await sendNotification(
        payload.family,
        `${data.claimedTask.title} Challenge has been claim`,
        "There are still another challenge, keep fighting !"
      );
      dispatch({
        type: "CLAIM_CHALLENGE_SUCCESS",
        loading: false,
        data,
      });
    } catch ({ response }) {
      let err = "";
      if (typeof response.data.error === "string") {
        err = response.data;
      } else {
        err = response.data.join(", ");
      }
      alert(err);
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
      if (typeof response.data.error === "string") {
        err = response.data;
      } else {
        err = response.data.join(", ");
      }
      alert(err);
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
      if (typeof response.data.error === "string") {
        err = response.data;
      } else {
        err = response.data.join(", ");
      }
      alert(err);
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

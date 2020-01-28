import axios from "../../config/axios";
import { AsyncStorage, InteractionManager, Platform } from "react-native";
import { Notifications } from "expo";
import * as Permissions from "expo-permissions";

const _setTimeout = global.setTimeout;
const _clearTimeout = global.clearTimeout;
const MAX_TIMER_DURATION_MS = 60 * 1000;
if (Platform.OS === "android") {
  // Work around issue `Setting a timer for long time`
  // see: https://github.com/firebase/firebase-js-sdk/issues/97
  const timerFix = {};
  const runTask = (id, fn, ttl, args) => {
    const waitingTime = ttl - Date.now();
    if (waitingTime <= 1) {
      InteractionManager.runAfterInteractions(() => {
        if (!timerFix[id]) {
          return;
        }
        delete timerFix[id];
        fn(...args);
      });
      return;
    }

    const afterTime = Math.min(waitingTime, MAX_TIMER_DURATION_MS);
    timerFix[id] = _setTimeout(() => runTask(id, fn, ttl, args), afterTime);
  };

  global.setTimeout = (fn, time, ...args) => {
    if (MAX_TIMER_DURATION_MS < time) {
      const ttl = Date.now() + time;
      const id = "_lt_" + Object.keys(timerFix).length;
      runTask(id, fn, ttl, args);
      return id;
    }
    return _setTimeout(fn, time, ...args);
  };

  global.clearTimeout = id => {
    if (typeof id === "string" && id.startWith("_lt_")) {
      _clearTimeout(timerFix[id]);
      delete timerFix[id];
      return;
    }
    _clearTimeout(id);
  };
}

export const parentRegister = payload => {
  return async dispatch => {
    dispatch({
      type: "PARENT_REGISTER_LOADING",
      loading: true,
    });
    try {
      const { data } = await axios({
        url: "/parents/signup",
        data: payload,
        method: "POST",
      });
      dispatch({
        type: "PARENT_REGISTER_SUCCESS",
        data,
        loading: true,
      });
      dispatch({
        type: "USER_REGISTER_SUCCESS",
        status: true,
      });
    } catch ({ response }) {
      let err = "";
      if (typeof response.data.error === "string") {
        err = response.data.error;
      } else {
        err = response.data.error.join(", ");
      }
      alert(err);
      dispatch({
        type: "PARENT_REGISTER_ERROR",
        loading: false,
        error: err,
      });
    }
  };
};

export const clearError = () => {
  return dispatch => {
    dispatch({
      type: "USER_ERROR_CLEAR",
      error: "",
    });
  };
};

export const clearRegisterStatus = () => {
  return dispatch => {
    dispatch({
      type: "USER_REGISTER_CLEAR",
      status: false,
    });
  };
};

export const parentRegister2 = payload => {
  return async dispatch => {
    dispatch({
      type: "PARENT_REGISTER_2_LOADING",
      loading: true,
    });
    try {
      const token = await AsyncStorage.getItem("token");
      const { data } = await axios({
        url: "/parents/signup",
        data: payload,
        method: "POST",
        headers: {
          access_token: token,
          "Content-Type": "multipart/form-data",
        },
      });
      dispatch({
        type: "PARENT_REGISTER_2_SUCCESS",
        data,
        loading: true,
      });
    } catch ({ response }) {
      let err = "";
      if (typeof response.data.error === "string") {
        err = response.data.error;
      } else {
        err = response.data.error.join(", ");
      }
      alert(err);
      dispatch({
        type: "PARENT_REGISTER_2_ERROR",
        loading: false,
        error: err,
      });
    }
  };
};

export const parentLogin = payload => {
  return async dispatch => {
    dispatch({
      type: "PARENT_LOGIN_LOADING",
      loading: true,
    });

    try {
      const { data } = await axios({
        url: "/parents/signin",
        method: "POST",
        data: payload,
      });
      await AsyncStorage.setItem("token", data.token);
      await AsyncStorage.setItem("role", data.parent.role);
      dispatch({
        type: "PARENT_LOGIN_SUCCESS",
        loading: false,
        data,
      });
    } catch ({ response }) {
      let err = "";
      if (typeof response.data.error === "string") {
        err = response.data.error;
      } else {
        err = response.data.error.join(", ");
      }
      alert(err);
      dispatch({
        type: "PARENT_LOGIN_ERROR",
        loading: false,
        error: err,
      });
    }
  };
};

export const childLogin = payload => {
  return async dispatch => {
    dispatch({
      type: "CHILD_LOGIN_LOADING",
      loading: true,
    });

    try {
      const { data } = await axios({
        url: "/children/signin",
        method: "POST",
        data: payload,
      });

      await AsyncStorage.setItem("token", data.token);
      await AsyncStorage.setItem("role", data.child.role);

      dispatch({
        type: "CHILD_LOGIN_SUCCESS",
        loading: false,
        data,
      });
    } catch ({ response }) {
      let err = "";
      if (typeof response.data.error === "string") {
        err = response.data.error;
      } else {
        err = response.data.error.join(", ");
      }
      alert(err);
      dispatch({
        type: "CHILD_LOGIN_ERROR",
        loading: false,
        error: err,
      });
    }
  };
};

export const childRegister = payload => {
  return async dispatch => {
    dispatch({
      type: "CHILD_REGISTER_LOADING",
      loading: true,
    });

    try {
      const token = await AsyncStorage.getItem("token");
      const { data } = await axios({
        url: "/children/signup",
        method: "POST",
        data: payload.data,
        headers: {
          access_token: token,
          "Content-Type": "multipart/form-data",
        },
      });
      dispatch({
        type: "CHILD_REGISTER_SUCCESS",
        loading: false,
        data,
      });
    } catch ({ response }) {
      console.log(response.data);

      let err = "";
      if (typeof response.data.error === "string") {
        err = response.data.error;
      } else {
        err = response.data.error.join(", ");
      }
      alert(err);
      dispatch({
        type: "CHILD_REGISTER_ERROR",
        loading: false,
        error: err,
      });
    }
  };
};

export const getAllFamily = payload => {
  return async dispatch => {
    dispatch({
      type: "ALL_FAMILY_LOADING",
      loading: true,
    });

    try {
      const token = await AsyncStorage.getItem("token");

      const parent = await axios({
        url: "/parents",
        method: "GET",
        headers: {
          access_token: token,
        },
      });

      const children = await axios({
        url: "/children",
        method: "GET",
        headers: {
          access_token: token,
        },
      });

      let family = [...parent.data, ...children.data];
      dispatch({
        type: "ALL_FAMILY_SUCCESS",
        data: family,
        loading: false,
      });
    } catch ({ response }) {
      let err = "";
      if (typeof response.data.error === "string") {
        err = response.data.error;
      } else {
        err = response.data.error.join(", ");
      }
      alert(err);
      dispatch({
        type: "ALL_FAMILY_ERROR",
        loading: false,
        error: err,
      });
    }
  };
};

export const childUpdate = payload => {
  return async dispatch => {
    dispatch({
      type: "CHILD_UPDATE_LOADING",
      loading: true,
    });

    try {
      const token = await AsyncStorage.getItem("token");
      const result = await axios({
        url: "/children/" + payload.id,
        method: "PATCH",
        data: payload.data,
        headers: {
          access_token: token,
          "Content-Type": "multipart/form-data",
        },
      });
      dispatch({
        type: "CHILD_UPDATE_SUCCESS",
        loading: false,
      });
    } catch ({ response }) {
      let err = "";
      if (typeof response.data.error === "string") {
        err = response.data.error;
      } else {
        err = response.data.error.join(", ");
      }
      alert(err);
      dispatch({
        type: "CHILD_UPDATE_ERROR",
        loading: false,
        error: err,
      });
    }
  };
};

export const userLogout = () => {
  return async dispatch => {
    dispatch({
      type: "LOGOUT_USER",
    });

    await AsyncStorage.clear();
  };
};

export const parentUpdate = payload => {
  return async dispatch => {
    dispatch({
      type: "PARENT_UPDATE_LOADING",
      loading: true,
    });

    try {
      const token = await AsyncStorage.getItem("token");
      const { data } = await axios({
        url: "/parents/" + payload.id,
        method: "PATCH",
        data: payload.payload,
        headers: {
          access_token: token,
          "Content-Type": "multipart/form-data",
        },
      });
      dispatch({
        type: "PARENT_UPDATE_SUCCESS",
        loading: false,
        data,
      });
    } catch ({ response }) {
      let err = "";
      if (typeof response.data.error === "string") {
        err = response.data.error;
      } else {
        err = response.data.error.join(", ");
      }
      alert(err);
      dispatch({
        type: "PARENT_UPDATE_ERROR",
        loading: false,
        error: err,
      });
    }
  };
};

export const addPoin = payload => {
  return async dispatch => {
    dispatch({
      type: "ADD_POIN_LOADING",
      loading: true,
    });

    try {
      const token = await AsyncStorage.getItem("token");
      const { data } = await axios({
        url: `/children/${payload.childId}/add`,
        method: "PATCH",
        data: {
          point: payload.data,
        },
        headers: {
          access_token: token,
        },
      });
      dispatch({
        type: "ADD_POIN_SUCCESS",
        data,
        loading: false,
      });
    } catch (error) {
      let err = "";
      if (typeof response.data.error === "string") {
        err = response.data.error;
      } else {
        err = response.data.error.join(", ");
      }
      alert(err);
      dispatch({
        type: "ADD_POIN_SUCCESS",
        error: err,
        loading: false,
      });
    }
  };
};

export const checkLogin = () => async dispatch => {
  const token = await AsyncStorage.getItem("token");
  if (token) {
    const { data } = await axios({
      url: "/profile",
      method: "GET",
      headers: {
        access_token: token,
      },
    });
    if (data) {
      dispatch({
        type: "LOGIN",
        data,
      });
    }
  }
};

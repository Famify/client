import React from 'react'
import {
  Alert
} from 'react-native'
import axios from "../../config/axios";

export const parentRegister = (payload) => {
  return dispatch => {
    dispatch({
      type: "PARENT_REGISTER_LOADING",
      loading: true,
    });
    axios({
      url: "/parents/signup",
      data: payload,
      method: "POST",
    })
      .then(({ data }) => {
        dispatch({
          type: "PARENT_REGISTER_SUCCESS",
          data,
          loading: true,
        });
        dispatch({
          type: "USER_REGISTER_SUCCESS",
          status: true
        })
      })
      .catch(error => {
        let err = error.response.data.error.join(", ");
        dispatch({
          type: "PARENT_REGISTER_ERROR",
          loading: false,
          error: err,
        });
      });
  };
};

export const clearError = () => {
  return dispatch => {
    dispatch({
      type: "USER_ERROR_CLEAR",
      error: ""
    })
  }
}

export const clearRegisterStatus = () => {
  return dispatch => {
    dispatch({
      type: "USER_REGISTER_CLEAR",
      status: false
    })
  }
}

export const parentRegister2 = payload => {
  return dispatch => {
    dispatch({
      type: "PARENT_REGISTER_2_LOADING",
      loading: true,
    });
    axios({
      url: "/parents/signup",
      data: payload.payload,
      method: "POST",
      headers : payload.token
    })
      .then(({ data }) => {
        dispatch({
          type: "PARENT_REGISTER_2_SUCCESS",
          data,
          loading: true,
        });
      })
      .catch(error => {
        let err = error.response.data.error.join(", ");
        dispatch({
          type: "PARENT_REGISTER_2_ERROR",
          loading: false,
          error: err,
        });
      });
  };
};

export const parentLogin = (payload) => {
  return dispatch => {
    dispatch({
      type: "PARENT_LOGIN_LOADING",
      loading: true,
    });
    axios({
      url: "/parents/signin",
      method: "POST",
      data: payload,
    })
    .then(({ data }) => {
      dispatch({
        type: "PARENT_LOGIN_SUCCESS",
        loading: false,
        data,
      });
    })
      .catch(error => {
        let err = error.response.data.error.join(", ");
        dispatch({
          type: "PARENT_LOGIN_ERROR",
          loading: false,
          error: err,
        });
      });
  };
};

export const childLogin = payload => {
  return dispatch => {
    dispatch({
      type: "CHILD_LOGIN_LOADING",
      loading: true,
    });
    axios({
      url: "/children/signin",
      method: "POST",
      data: payload,
    })
      .then(({ data }) => {
        dispatch({
          type: "CHILD_LOGIN_SUCCESS",
          loading: false,
          data,
        });
      })
      .catch(error => {
        let err = error.response.data.error.join(", ");
        dispatch({
          type: "CHILD_LOGIN_ERROR",
          loading: false,
          error: err,
        });
      });
  };
};

export const childRegister = payload => {
  return dispatch => {
    dispatch({
      type: "CHILD_REGISTER_LOADING",
      loading: true,
    });
    axios({
      url: "/children/signup",
      method: "POST",
      data: payload,
      headers: {
        access_token: payload.token
      },
    })
      .then(({ data }) => {
        dispatch({
          type: "CHILD_REGISTER_SUCCESS",
          loading: false,
          data,
        });
      })
      .catch(error => {
        let err = error.response.data.error.join(", ");
        dispatch({
          type: "CHILD_REGISTER_ERROR",
          loading: false,
          error: err,
        });
      });
  };
};

export const getAllFamily = payload => {
  return dispatch => {
    dispatch({
      type: "ALL_FAMILY_LOADING",
      loading: true,
    });
    let listParent = [];
    axios({
      url: "/parents",
      method: "GET",
      headers: {
        access_token: payload.token
      },
    })
      .then(({ data }) => {
        listParent = data;
        return axios({
          url: "/children",
          method: "GET",
          headers: {
            access_token: payload.token
          },
        });
      })
      .then(({ data }) => {
        let newData = [...listParent, ...data];
        dispatch({
          type: "ALL_FAMILY_SUCCESS",
          data: newData,
          loading: false,
        });
      })
      .catch(error => {
        let err = error.response.data.error.join(", ");
        dispatch({
          type: "ALL_FAMILY_ERROR",
          loading: false,
          error: err,
        });
      });
  };
};

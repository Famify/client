import axios from "../../config/axios";

export const parentRegister = payload => {
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
          status: true,
        });
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
  console.log(payload);
  return dispatch => {
    dispatch({
      type: "PARENT_REGISTER_2_LOADING",
      loading: true,
    });
    axios({
      url: "/parents/signup",
      data: payload.payload,
      method: "POST",
      headers: {
        access_token: payload.token,
      },
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

export const parentLogin = payload => {
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
      data: payload.data,
      headers: {
        access_token: payload.token,
      },
    })
      .then(({ data }) => {
        alert("success register");
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
        access_token: payload.token,
      },
    })
      .then(({ data }) => {
        listParent = data;
        return axios({
          url: "/children",
          method: "GET",
          headers: {
            access_token: payload.token,
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

export const childUpdate = payload => {
  return dispatch => {
    dispatch({
      type: "CHILD_UPDATE_LOADING",
      loading: true,
    });
    axios({
      url: "/children/" + payload.id,
      method: "PATCH",
      data: payload.data,
      headers: {
        access_token: payload.token,
      },
    })
    .then(({ data }) => {
      alert("success register");
      dispatch({
        type: "CHILD_UPDATE_SUCCESS",
        loading: false,
      });
    })
    .catch(error => {
      let err = error.response.data.error.join(", ");
      dispatch({
        type: "CHILD_UPDATE_ERROR",
        loading: false,
        error: err,
      });
    });
  };
};

export const userLogout = () => {
  return dispatch => {
    dispatch({
      type: "LOGOUT_USER",
    });
  };
};

export const parentUpdate = payload => {
  return dispatch => {
    dispatch({
      type: "PARENT_UPDATE_LOADING",
      loading: true,
    });
    axios({
      url: "/parents/" + payload.id,
      method: "PATCH",
      data: payload.payload,
      headers: {
        access_token: payload.token,
      },
    })
      .then(({ data }) => {
        dispatch({
          type: "PARENT_UPDATE_SUCCESS",
          loading: false,
          data,
        });
      })
      .catch(error => {
        let err = error.response.data.error.join(", ");
        dispatch({
          type: "PARENT_UPDATE_ERROR",
          loading: false,
          error: err,
        });
      });
  };
};

export const minPoin = payload => {
  return dispatch => {
    dispatch({
      type: "MIN_POIN_LOADING",
      loading: true,
    });
    axios({
      url: `/children/${payload.id}/min`,
      method: "PATCH",
      data: payload.data,
      headers: {
        access_token: payload.token,
      },
    })
      .then(({ data }) => {
        dispatch({
          type: "MIN_POIN_SUCCESS",
          data,
          loading: false,
        });
      })
      .catch(error => {
        let err = error.response.data.message.join(", ");
        dispatch({
          type: "MIN_POIN_ERROR",
          loading: false,
          error: err,
        });
      });
  };
};

export const addPoin = payload => {
  return dispatch => {
    dispatch({
      type: "ADD_POIN_LOADING",
      loading: true,
    });

    axios({
      url: `/children/${payload.id}/add`,
      method: "PATCH",
      data: payload.data,
      headers: {
        access_token: payload.token,
      },
    })
      .then(({ data }) => {
        dispatch({
          type: "ADD_POIN_SUCCESS",
          data,
          loading: false,
        });
      })
      .catch(error => {
        let err = error.response.data.message.join(", ");
        dispatch({
          type: "ADD_POIN_SUCCESS",
          error: err,
          loading: false,
        });
      });
  };
};

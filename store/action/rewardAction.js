import axios from "../../config/axios";

export const createReward = payload => {
  alert("oke");
  return dispatch => {
    dispatch({
      type: "CREATE_REWARD_LOADING",
      loading: false,
    });

    axios({
      url: "/rewards",
      method: "POST",
      data: payload.data,
      headers: {
        access_token: payload.token,
      },
    })
      .then(({ data }) => {
        dispatch({
          type: "CREATE_REWARD_SUCCESS",
          loading: false,
          data,
        });
      })
      .catch(error => {
        alert("error");
        let err = error.response.data.error;
        dispatch({
          type: "CREATE_REWARD_ERROR",
          loading: false,
          error: err,
        });
      });
  };
};

export const getReward = payload => {
  return dispatch => {
    dispatch({
      type: "GET_REWARD_LOADING",
      loading: true,
    });
    axios({
      url: `/rewards/${payload.id}`,
      method: "GET",
      headers: {
        access_token: payload.token,
      },
    })
      .then(({ data }) => {
        dispatch({
          type: "GET_REWARD_SUCCESS",
          loading: false,
          data,
        });
      })
      .catch(error => {
        let err = error.response.data.error;
        dispatch({
          type: "GET_REWARD_ERROR",
          loading: false,
          error: err,
        });
      });
  };
};

export const getAllReward = payload => {
  return dispatch => {
    dispatch({
      type: "ALL_REWARD_LOADING",
      loading: true,
    });
    axios({
      url: "/rewards",
      method: "GET",
      headers: {
        access_token: payload.token,
      },
    })
      .then(({ data }) => {
        dispatch({
          type: "ALL_REWARD_SUCCESS",
          loading: false,
          data,
        });
      })
      .catch(error => {
        let err = error.response.data.error;
        dispatch({
          type: "ALL_REWARD_ERROR",
          loading: false,
          error: err,
        });
      });
  };
};

export const claimReward = payload => {
  return dispatch => {
    dispatch({
      type: "CLAIM_REWARD_LOADING",
      loading: true,
    });

    axios({
      url: `/rewards/${payload.id}`,
      method: "PATCH",
      headers: {
        access_token: payload.token,
      },
    })
      .then(({ data }) => {
        dispatch({
          type: "CLAIM_REWARD_SUCCESS",
          loading: false,
          data,
        });
      })
      .catch(error => {
        let err = error.response.data.error;
        dispatch({
          type: "CLAIM_REWARD_ERROR",
          loading: false,
          error: err,
        });
      });
  };
};

export const deleteReward = payload => {
  return dispatch => {
    dispatch({
      type: "DELETE_REWARD_LOADING",
      loading: true,
    });
    axios({
      url: `/rewards/${payload.id}`,
      method: "DELETE",
      headers: {
        access_token: payload.token,
      },
    })
      .then(({ data }) => {
        dispatch({
          type: "DELETE_REWARD_SUCCESS",
          data,
          loading: false,
        });
      })
      .catch(error => {
        let err = error.response.data.error;
        dispatch({
          type: "DELETE_REWARD_ERROR",
          loading: false,
          error: err,
        });
      });
  };
};

export const setTitleDesc = payload => {
  return dispatch => {
    dispatch({
      type: "SET_TITLE_DESC",
      data: payload,
    });
  };
};

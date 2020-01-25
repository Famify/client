import axios from "../../config/axios";

import axios from "../../config/axios";

const createReward = payload => {
  return dispatch => {
    dispatch({
      type: "CREATE_REWARD_LOADING",
      loading: false,
    });

    axios({
      url: "/rewards",
      method: "POST",
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
        let err = error.response.data.error;
        dispatch({
          type: "CREATE_REWARD_ERROR",
          loading: false,
          error: err,
        });
      });
  };
};

const getReward = payload => {
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

const getAllReward = payload => {
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

const claimReward = payload => {
  return dispatch => {
    dispatch({
      type: "CLAIM_REWARD_LOADING",
      loading: false,
    });

    axios({
      url: "/rewards/${payload.id}",
      type: "PATCH",
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

const deleteReward = payload => {
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

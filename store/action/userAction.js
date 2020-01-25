import axios from "../../config/axios";

export const userRegister = payload => {
  return dispatch => {
    dispatch({
      type: "USER_REGISTER_LOADING",
      loading: true,
    });
    axios({
      url: '/parents/signup',
      data: payload,
      method: 'POST'
    })
      .then(({ data }) => {
        alert('asasas')
        dispatch({
          type: "USER_REGISTER_SUCCESS",
          data,
          loading: true,
        });
      })
      .catch(error => {
        alert('error')        
        dispatch({
          type: "USER_REGISTER_ERROR",
          loading: false,
          error: JSON.stringify(error),
        });
      });
  };
};

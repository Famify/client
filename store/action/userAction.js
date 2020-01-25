import axios from "axios";

export const userRegister = payload => {
  return dispatch => {
    dispatch({
      type: "USER_REGISTER_LOADING",
      loading: true,
    });
    fetch({
      url: "http://localhost:3000/parents/signup",
      method: "POST",
      data: payload,
    })
      .then(({ data }) => {
        alert("sempet nembak");
        dispatch({
          type: "USER_REGISTER_SUCCESS",
          data,
          loading: true,
        });
      })
      .catch(error => {
        console.log(error);
        alert("error");
        dispatch({
          type: "USER_REGISTER_ERROR",
          loading: false,
          error: JSON.stringify(error),
        });
      });
  };
};

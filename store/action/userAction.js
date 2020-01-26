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

export const parentRegister2 = payload => {
  return dispatch => {
    dispatch({
      type: "PARENT_REGISTER_2_LOADING",
      loading: true,
    });
    axios({
      url: "/parents/signup",
      data: payload,
      method: "POST",
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
      data: payload,
      headers: {
        access_token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTJjNzRhMmNjZDk4NzEyOGEyNmE1ZWIiLCJ1c2VybmFtZSI6ImRhbmFuZyIsImVtYWlsIjoiZGFuYW5nQG1haWwuY29tIiwiZmFtaWx5SWQiOiI3NjVlMWI1MC0zZjk0LTExZWEtOTc2NC03Zjc3YzNlZGEyOTAiLCJpYXQiOjE1ODAwMDY3Njd9.ngbaO_uY1A0HvGn_mjGKcnnsACMXDVkvz_a4WVJvvUI",
      },
    })
      .then(({ data }) => {
        alert("success register");
        console.log(data);
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
        access_token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTJjNzRhMmNjZDk4NzEyOGEyNmE1ZWIiLCJ1c2VybmFtZSI6ImRhbmFuZyIsImVtYWlsIjoiZGFuYW5nQG1haWwuY29tIiwiZmFtaWx5SWQiOiI3NjVlMWI1MC0zZjk0LTExZWEtOTc2NC03Zjc3YzNlZGEyOTAiLCJpYXQiOjE1ODAwMDY3Njd9.ngbaO_uY1A0HvGn_mjGKcnnsACMXDVkvz_a4WVJvvUI",
      },
    })
      .then(({ data }) => {
        listParent = data;
        return axios({
          url: "/children",
          method: "GET",
          headers: {
            access_token:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTJjNzRhMmNjZDk4NzEyOGEyNmE1ZWIiLCJ1c2VybmFtZSI6ImRhbmFuZyIsImVtYWlsIjoiZGFuYW5nQG1haWwuY29tIiwiZmFtaWx5SWQiOiI3NjVlMWI1MC0zZjk0LTExZWEtOTc2NC03Zjc3YzNlZGEyOTAiLCJpYXQiOjE1ODAwMDY3Njd9.ngbaO_uY1A0HvGn_mjGKcnnsACMXDVkvz_a4WVJvvUI",
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

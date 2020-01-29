import axios from "axios";

export const sendNotification = (payload, title, message) => {
  let token = [];
  payload.forEach(data => {
    if (data.tokenExpo) {
      token.push(data.tokenExpo);
    }
  });
  if (token.length > 0) {
    axios({
      url: "https://exp.host/--/api/v2/push/send",
      method: "POST",
      headers: {
        host: "exp.host",
        accept: "application/json",
        "accept-encoding": "gzip, deflate",
        "content-type": "application/json",
      },
      data: {
        to: token,
        title: title,
        body: message,
      },
    })
      .then(({ data }) => {})
      .catch(error => {});
  } else {
    return;
  }
};

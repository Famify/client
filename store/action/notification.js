import axios from "axios";

export const sendNotification = (payload, title, message) => {
  let token = [];
  payload.forEach(data => {
    token.push(data.tokenExpo);
  });
  axios({
    url: "https://exp.host/--/api/v2/push/send",
    method: "POST",
    headers: {
      host: "exp.host",
      accept: "application/json",
      "accept-encoding": "gzip, deflate",
      "content-type": "application/json",
    },
    data: JSON.stringify({
      to: token,
      title: title,
      body: message,
    }),
  }).catch(error => {
    throw new Error({
      response: {
        data: {
          error: "Notif gagal",
        },
      },
    });
  });
};

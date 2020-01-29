import axios from "axios";

// SERVER DEPLOY
// const instance = axios.create({
//   baseURL: "http://35.197.142.247",
// });

// DEBUG LOCAL
const instance = axios.create({
  baseURL: "http://localhost:3000",
});

export default instance;
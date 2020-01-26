import axios from "axios";

// SERVER DEPLOY
const instance = axios.create({
  baseURL: "http://107.178.223.28",
});

// DEBUG LOCAL
// const instance = axios.create({
//   baseURL: "http://localhost:3000",
// });


export default instance;

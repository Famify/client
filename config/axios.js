import axios from "axios";
const instance = axios.create({
  baseURL: "http://107.178.223.28",
});

export default instance;

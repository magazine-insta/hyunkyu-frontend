import axios from "axios";

const instance = axios.create({
  baseURL: "http://13.209.40.211",
});

export default instance;

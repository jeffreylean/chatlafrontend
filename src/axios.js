import axios from "axios";

const instance = axios.create({
  baseURL: "https://chatla-backend.herokuapp.com",
});

export default instance;

import axios from "axios";

const api = axios.create({
  baseURL: "https://5e4bfc87a641ed0014b02740.mockapi.io/api/clane",
});

export default api;

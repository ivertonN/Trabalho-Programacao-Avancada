import axios from "axios";

// Store import
// import { store } from "../store";

// Create axios instance
const api = axios.create({
  baseURL: "http://localhost:8080",
});

export default api;

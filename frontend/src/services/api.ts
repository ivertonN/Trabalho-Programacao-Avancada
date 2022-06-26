import axios from "axios";

// Store import
// import { store } from "../store";

// Create axios instance
const api = axios.create({
  baseURL: "https://poli-oportunidades-backend.herokuapp.com",
});

export default api;

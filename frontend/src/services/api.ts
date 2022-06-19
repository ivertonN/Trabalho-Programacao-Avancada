import axios from "axios";

// Store import
// import { store } from "../store";

// Create axios instance
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

api.interceptors.response.use(
  (successResponse: any) => successResponse,
  (errorResponse: any) => {
    // When 401 error, sign out

    return Promise.reject(errorResponse);
  }
);

export default api;

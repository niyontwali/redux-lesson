import axios from "axios";

// App Base API URL
const { REACT_APP_API_KEY  } = process.env;
const API = axios.create({
  baseURL: REACT_APP_API_KEY 
});

// interceptor
API.interceptors.request.use((req) => {
  // You can if your token has expired and redirect a user to the login page
  // You can also check if the token is valid and accept the request
  // define your token
  const token = localStorage.getItem("test_token");
  if (token) {
    // decode the token 
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
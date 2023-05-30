import { loginEndpoint } from "../../../constants";
import API from "../../api";

const {REACT_APP_API_KEY} = process.env

const login = async (data) => {
  const response = await API.post(`${REACT_APP_API_KEY}/${loginEndpoint}`, data);
  localStorage.setItem("test-token", response.data.token); 

  return response.data.token;
};


const authServices = { login };

export default authServices;
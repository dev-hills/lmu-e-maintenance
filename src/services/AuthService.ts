import axios from "axios";

const base_url = "https://maintenance.lmu.edu.ng:5001/api/User";

export const register = async (data) => {
  const response = await axios.post(`${base_url}/Register`, data);
  return response.data;
};

export const verifyEmail = async (data) => {
  const response = await axios.post(`${base_url}/VerifyEmail`, data);
  return response.data;
};

export const login = async (data) => {
  const response = await axios.post(`${base_url}/Login`, data);
  return response.data;
};

export const forgotPassword = async (data) => {
  const response = await axios.post(`${base_url}/ForgotPassword`, data);
  return response.data;
};

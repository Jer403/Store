import axios from "./axios.ts";

export const registerRequest = async (user: {
  username: string;
  email: string;
  password: string;
}) => {
  return await axios.post(`/register`, user);
};

export const loginRequest = async (user: {
  email: string;
  password: string;
}) => {
  return await axios.post(`/login`, user);
};

export const verifyTokenRequest = async () => {
  return await axios.get(`/verify`);
};

export const logoutRequest = async () => {
  return await axios.get(`/logout`);
};

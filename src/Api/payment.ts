import axios from "./axios.ts";

export const getPurchasedRequest = async () => {
  return await axios.get(`/purchases`);
};

export const getWaitingRequest = async () => {
  return await axios.get(`/waiting`);
};

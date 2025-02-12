import axios from "./axios.ts";

export const getPurchasedRequest = async () => {
  return await axios.get(`/purchases`);
};

export const getPaymentRequest = async (reference: string) => {
  return await axios.post(`/paymentui`, { id: reference });
};

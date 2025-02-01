import axios from "./axios.ts";

export const getCartRequest = async () => {
  return await axios.get(`/cart`);
};

export const addProductToCartRequest = async (id: string) => {
  return await axios.post(`/cart/add`, { id });
};

export const removeProductFromCartRequest = async (id: string) => {
  return await axios.post(`/cart/remove`, { id });
};

export const clearCartRequest = async () => {
  return await axios.post(`/cart/clear`);
};

export const getPaymentsRequest = async () => {
  return await axios.get(`/payments`);
};

export const validateCouponRequest = async (id: string) => {
  return await axios.post(`/cart/coupon/validate`, { id });
};
